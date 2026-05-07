# Open Issues

## 1. RSSHub 403 Forbidden

**Vấn đề:** `rsshub.app` public instance chặn server-side requests — tất cả 6 sources đều trả 403.

**Root cause:** rsshub.app detect bot traffic dù đã set browser User-Agent.

**Các hướng giải quyết cần research:**
- Self-host RSSHub bằng Docker: `docker run -d -p 1200:1200 diygod/rsshub` → đổi `RSSHUB_BASE_URL=http://localhost:1200`
- Dùng public instance khác: `rss.shab.fun`, `rsshub.rssforever.com`, `rsshub.aierlive.com`
- Dùng official RSS trực tiếp cho các source có sẵn (OpenAI, Google, NVIDIA) thay vì qua RSSHub

**Config cần thay đổi:** `RSSHUB_BASE_URL` trong `.env`

---

## 2. Gemini API Quota `limit: 0`

**Vấn đề:** Google AI Studio API key trả `429 Too Many Requests` với `free_tier_requests, limit: 0` cho `gemini-2.0-flash`.

**Root cause:** Project Google Cloud chưa bật billing → free tier quota = 0 requests/day.

**Các hướng giải quyết cần research:**
- Bật billing tại [console.cloud.google.com/billing](https://console.cloud.google.com/billing)
- Tạo API key mới từ project khác còn free quota
- Dùng **Gemma 4 27B** (model hiện tại đã set `AI_MODEL=gemma-3-27b-it`) — user confirm TPM unlimited

**Config cần thay đổi:** `AI_MODEL` trong `.env` — xác nhận exact model ID của Gemma 4 26B tại [aistudio.google.com](https://aistudio.google.com)

---

## 3. RSSHub Routes chưa verify

**Vấn đề:** Một số RSSHub routes có thể không tồn tại hoặc trả data sai.

**Routes cần verify:**

| Source | Route | Trạng thái |
|--------|-------|-----------|
| OpenAI | `/openai/news` | ❓ Chưa test |
| Anthropic | `/anthropic/news` | ✅ Route tồn tại (bị 403 bởi instance) |
| Google DeepMind | `/deepmind/blog` | ❓ Chưa test |
| Meta AI | `/meta/ai/blog` | ✅ Route tồn tại (bị 403 bởi instance) |
| xAI | `/xai/blog` | ❓ Chưa test |
| NVIDIA | `/nvidia/blog` | ❓ Chưa test |

**Cách verify:** Mở browser vào `https://rsshub.app/<route>` — nếu trả XML là route hợp lệ.
