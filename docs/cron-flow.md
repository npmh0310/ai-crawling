# Cron Job Flow

## Trigger

Chạy tự động theo `CRON_SCHEDULE` trong `.env` (mặc định: `0 6,12,18,0 * * *` → 6h, 12h, 18h, 0h).  
Hoặc trigger thủ công:

```
GET /ingest/run              # toàn bộ sources
GET /ingest/run/:sourceId    # 1 source cụ thể
```

---

## Luồng chi tiết

```
SchedulerService.handleCron()
│
├── 1. Tạo crawl_log { status: "partial", startedAt }
│
└── 2. ArticleService.ingestAll()
    │
    └── Chạy song song 6 sources
        │
        └── ingestSource(sourceId)  [lặp cho mỗi source]
            │
            ├── 3. Lấy ngưỡng thời gian (getIngestSince)
            │       ├── Có data trong DB  → publishedAt bài mới nhất
            │       └── Chưa có data      → now - 7 ngày
            │
            ├── 4. RssService.fetchAndParse(source, { since })
            │       └── Gọi RSS URL → parse XML → filter & sort theo publishedAt
            │
            ├── 5. Lọc guid chưa có trong DB
            │       └── prisma.feedItem.findMany({ guid: { in: guids } })
            │
            └── 6. Với mỗi bài mới  [tuần tự]
                    │
                    ├── 6a. ArticleCrawlerService.fetchArticleContent(url)
                    │         ├── Thành công → full text (tối đa 4000 ký tự)
                    │         └── Thất bại   → fallback: RSS summary hoặc title
                    │
                    ├── 6b. AiProcessorService.analyze(title, content, company)
                    │         ├── Gọi Gemini API
                    │         ├── Trả về { category, takeaways[], tags[] }
                    │         └── Thất bại   → fallback: { category: "general", takeaways: [], tags: [] }
                    │
                    └── 6c. prisma.feedItem.create(...)
                              └── Lưu vào DB

3. Cập nhật crawl_log { status: "success" | "failed", itemsNew, finishedAt }
```

---

## Kết quả trả về

```json
[
  { "sourceId": "openai",        "inserted": 3, "skipped": 7, "failed": 0 },
  { "sourceId": "anthropic",     "inserted": 1, "skipped": 4, "failed": 0 },
  { "sourceId": "google-deepmind","inserted": 2, "skipped": 5, "failed": 0 },
  { "sourceId": "meta-ai",       "inserted": 0, "skipped": 3, "failed": 0 },
  { "sourceId": "xai",           "inserted": 1, "skipped": 2, "failed": 0 },
  { "sourceId": "nvidia-ai",     "inserted": 2, "skipped": 1, "failed": 0 }
]
```

| Field      | Ý nghĩa                                      |
|------------|----------------------------------------------|
| `inserted` | Bài mới được lưu vào DB                      |
| `skipped`  | Bài đã có trong DB (dedup theo guid)         |
| `failed`   | Bài lỗi khi crawl hoặc gọi AI               |

---

## Fallback strategy

| Bước       | Lỗi xảy ra           | Xử lý                                      |
|------------|----------------------|--------------------------------------------|
| Crawl URL  | Timeout / blocked    | Dùng RSS summary hoặc title thay thế       |
| Gemini AI  | Rate limit / lỗi API | category = "general", takeaways/tags = []  |
| DB insert  | Lỗi bất kỳ           | Log warn, tăng `failed`, tiếp tục bài kế  |
| Toàn source| Exception            | Log error, source đó failed = 1, tiếp tục |

---

## Manual test flow

```bash
# 1. Trigger crawl OpenAI
GET http://localhost:3009/ingest/run/openai

# 2. Trigger toàn bộ
GET http://localhost:3009/ingest/run

# 3. Xem data đã vào DB
GET http://localhost:3009/feed

# 4. Filter theo company
GET http://localhost:3009/feed?company=OpenAI&page=1&take=10

# 5. Xem detail 1 bài
GET http://localhost:3009/feed/:id

# 6. Mark as read
PATCH http://localhost:3009/feed/:id/read
```

---

## Files liên quan

| File | Vai trò |
|------|---------|
| `src/modules/scheduler/scheduler.service.ts` | Trigger cron, ghi crawl_log |
| `src/modules/ingest/article.service.ts` | Orchestrator chính |
| `src/modules/ingest/rss.service.ts` | Fetch + parse RSS XML |
| `src/modules/ingest/article-crawler.service.ts` | Crawl full text từ URL |
| `src/modules/ai-processor/ai-processor.service.ts` | Gọi Gemini API |
| `src/modules/ai-processor/prompts/analyze-article.prompt.ts` | Prompt template |
| `src/modules/sources/rss-sources.ts` | Danh sách RSS sources |
