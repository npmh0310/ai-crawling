export const CONFIG = {
  ingest: {
    // Số ngày lấy về trong lần chạy đầu tiên (khi DB rỗng)
    firstRunLookbackDays: 30,
    // Số bài tối đa lấy mỗi lần fetch RSS
    maxItemsPerFetch: 50,
    // Delay giữa các lần gọi AI (ms) — gemma-3-27b free tier: 15k tokens/min
    aiCallDelayMs: 4000,
  },
  crawler: {
    // Giới hạn độ dài content gửi lên DB
    maxContentLength: 4000,
    // Bỏ qua bài có content quá ngắn
    minContentLength: 100,
  },
  ai: {
    // Model mặc định nếu không set AI_MODEL trong .env
    defaultModel: 'gemma-4-26b-a4b-it',
    // Số ký tự content tối đa gửi vào prompt
    promptContentLength: 3000,
    // Số takeaways tối đa
    maxTakeaways: 3,
    // Số tags tối đa
    maxTags: 5,
  },
  scheduler: {
    // Cron mặc định: 6h, 12h, 18h, 0h
    defaultCron: '0 6,12,18,0 * * *',
  },
}
