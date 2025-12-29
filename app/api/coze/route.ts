const DEFAULT_COZE_API_URL = "https://cz6m3ygnfy.coze.site/stream_run"
const COZE_API_URL = (process.env.dv_coze_api_url ?? DEFAULT_COZE_API_URL).trim()
const PROJECT_ID = Number(process.env.dv_coze_project_id ?? 7589126757580767247)
const UPSTREAM_TIMEOUT_MS = 25000

export async function POST(req: Request) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  try {
    const { message } = (await req.json()) as { message?: string }

    if (!message?.trim()) {
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
      },
      body: JSON.stringify({
        content: {
          query: {
            prompt: [
              {
                type: "text",
                content: { text: message },
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
      })
    }

    const headers = new Headers(upstreamResponse.headers)
    headers.set("Cache-Control", "no-store")
    headers.set("Content-Type", upstreamResponse.headers.get("content-type") ?? "text/event-stream")

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers,
    })
  } catch (error) {
    console.error("Error handling Coze request", error)
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if ((error as any)?.name === "AbortError") {
      return new Response(JSON.stringify({ error: "Upstream request timed out" }), { status: 504 })
    }

    return new Response(JSON.stringify({ error: "Unexpected server error" }), { status: 500 })
  }
}

export const runtime = "nodejs"
