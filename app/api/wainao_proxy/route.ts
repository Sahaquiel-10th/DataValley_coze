// Backward compatibility: keep the old /api/wainao_proxy route pointing to the Coze proxy logic.
export { POST } from "../coze_proxy/route"
// Turbopack requires config fields inline, not re-exported.
export const runtime = "nodejs"
