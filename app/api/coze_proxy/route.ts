const DEFAULT_COZE_API_URL = "https://cz6m3ygnfy.coze.site/stream_run"
const COZE_API_URL = (process.env.dv_coze_api_url ?? DEFAULT_COZE_API_URL).trim()
const PROJECT_ID = Number(process.env.dv_coze_project_id ?? 7589126757580767247)
const UPSTREAM_TIMEOUT_MS = 25000

const pickText = (value: any): string => {
  if (!value) return ""

  if (typeof value === "string") return value
  if (typeof value.text === "string") return value.text

  if (typeof value.content === "string") return value.content
  if (value.content && typeof value.content === "object") {
    const nested = pickText(value.content)
    if (nested) return nested
  }

  if (typeof value.message === "string") return value.message
  if (value.message) {
    const msg = pickText(value.message)
    if (msg) return msg
  }

  if (typeof value.answer === "string") return value.answer
  if (value.answer) {
    const ans = pickText(value.answer)
    if (ans) return ans
  }

  if (value.message_end) {
    const end = pickText(value.message_end)
    if (end) return end
  }

  if (value.error) {
    const err = pickText(value.error)
    if (err) return err
  }

  if (value.reason) {
    const reason = pickText(value.reason)
    if (reason) return reason
  }

  if (value.delta) {
    const deltaText = pickText(value.delta)
    if (deltaText) return deltaText
  }

  if (value.choices) {
    const choiceText = pickText(value.choices)
    if (choiceText) return choiceText
  }

  if (value.data) {
    const dataText = pickText(value.data)
    if (dataText) return dataText
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const text = pickText(item)
      if (text) return text
    }
  }

  return ""
}

const extractChunkText = (record: unknown): string => {
  if (!record || typeof record !== "object") return ""
  const data: any = record

  const direct = pickText(data)
  if (direct) return direct

  if (data.messages) {
    const msgText = pickText(data.messages)
    if (msgText) return msgText
  }

  if (data.data) {
    const nested = extractChunkText(data.data)
    if (nested) return nested
  }

  return ""
}

const extractErrorMessage = (payload: any): string => {
  if (!payload || typeof payload !== "object") return ""

  const code = payload?.content?.message_end?.code
  const message = payload?.content?.message_end?.message
  if (code && code !== "0" && code !== 0 && message) {
    return `${message}`
  }

  if (payload?.content?.error) {
    const err = pickText(payload.content.error)
    if (err) return err
  }

  if (payload?.error) {
    const err = pickText(payload.error)
    if (err) return err
  }

  return ""
}

const readStreamText = async (
  body: ReadableStream<Uint8Array>
): Promise<{ text: string; lastPayload: string | null; lastParsed: any }> => {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""
  let fullText = ""
  let lastPayload: string | null = null
  let lastParsed: any = null

  const handleLine = (line: string) => {
    const trimmed = line.trim()
    if (!trimmed.startsWith("data:")) return

    const payload = trimmed.slice(5).trim()
    if (!payload || payload === "[DONE]" || payload.toLowerCase() === "done") return
    lastPayload = payload

    try {
      const parsed = JSON.parse(payload)
      lastParsed = parsed
      const chunkText = extractChunkText(parsed)
      if (chunkText) {
        fullText += chunkText
      }
    } catch (err) {
      console.error("Failed to parse Coze stream chunk", err)
    }
  }

  while (true) {
    const { done, value } = await reader.read()
    buffer += decoder.decode(value ?? new Uint8Array(), { stream: !done })

    const lines = buffer.split("\n")
    buffer = lines.pop() ?? ""
    lines.forEach(handleLine)

    if (done) {
      if (buffer) {
        handleLine(buffer)
      }
      break
    }
  }

  return { text: fullText.trim(), lastPayload, lastParsed }
}

export async function POST(req: Request) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  try {
    const { text } = (await req.json()) as { text?: string }
    const question = text?.trim()

    if (!question) {
      return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 })
    }

    const apiKey = process.env.dv_key_coze
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "dv_key_coze is not set on the server" }), { status: 500 })
    }

    if (!COZE_API_URL) {
      return new Response(JSON.stringify({ error: "dv_coze_api_url is not set" }), { status: 500 })
    }

    if (Number.isNaN(PROJECT_ID)) {
      return new Response(JSON.stringify({ error: "dv_coze_project_id is invalid" }), { status: 500 })
    }

    const controller = new AbortController()
    timeoutId = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

    const upstreamResponse = await fetch(COZE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        content: {
          query: {
            prompt: [
              {
                type: "text",
                content: { text: question },
              },
            ],
          },
        },
        type: "query",
        project_id: PROJECT_ID,
      }),
      signal: controller.signal,
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }

    if (!upstreamResponse.ok || !upstreamResponse.body) {
      const errorText = await upstreamResponse.text().catch(() => "Failed to fetch from upstream")
      return new Response(JSON.stringify({ error: errorText || "Failed to fetch from upstream" }), {
        status: upstreamResponse.status || 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const contentType = upstreamResponse.headers.get("content-type") || ""
    if (contentType.includes("text/event-stream")) {
      const { text: replyText, lastPayload, lastParsed } = await readStreamText(upstreamResponse.body)
      const upstreamError = extractErrorMessage(lastParsed)
      if (!replyText) {
        let fallback = ""
        if (lastParsed) {
          fallback = pickText(lastParsed)
        } else if (lastPayload) {
          try {
            const parsedPayload = JSON.parse(lastPayload)
            fallback = pickText(parsedPayload)
          } catch {
            fallback = lastPayload
          }
        }

        if (!fallback && upstreamError) {
          fallback = upstreamError
        }

        if (fallback) {
          return new Response(
            JSON.stringify({ text: fallback, upstream: { status: "error", raw: lastParsed ?? lastPayload } }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store",
              },
            }
          )
        }

        return new Response(JSON.stringify({ error: "No content returned from upstream", raw: lastPayload }), {
          status: 502,
          headers: { "Content-Type": "application/json" },
        })
      }

      if (upstreamError) {
        return new Response(
          JSON.stringify({ error: upstreamError, upstream: { status: "error", raw: lastParsed ?? lastPayload } }),
          {
            status: 502,
            headers: { "Content-Type": "application/json" },
          }
        )
      }

      return new Response(JSON.stringify({ text: replyText }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      })
    }

    // Non-streaming fallback: try JSON first, then plain text
    const rawText = await upstreamResponse.text().catch(() => "")
    let replyText = ""
    let parsedBody: any = null
    try {
      if (rawText) {
        parsedBody = JSON.parse(rawText)
        replyText = extractChunkText(parsedBody)
      }
    } catch {
      // ignore parse errors; will fall back to raw text
    }

    const upstreamError = parsedBody ? extractErrorMessage(parsedBody) : ""

    if (!replyText && rawText) {
      replyText = rawText.trim()
    }

    if (!replyText && parsedBody) {
      const fallback = pickText(parsedBody)
      if (fallback) {
        replyText = fallback
      }
    }

    if (upstreamError) {
      return new Response(JSON.stringify({ error: upstreamError, raw: parsedBody ?? (rawText || undefined) }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!replyText) {
      return new Response(JSON.stringify({ error: "No content returned from upstream", raw: rawText || undefined }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ text: replyText }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    })
  } catch (error: any) {
    console.error("Error handling Coze proxy", error)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if (error?.name === "AbortError") {
      return new Response(JSON.stringify({ error: "Upstream request timed out" }), {
        status: 504,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export const runtime = "nodejs"
