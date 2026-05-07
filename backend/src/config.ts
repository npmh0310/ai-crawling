export const CONFIG = {
  ingest: {
    firstRunLookbackDays: 7,
    cronLookbackHours: 25,
    maxItemsPerFetch: 50,
  },
  crawler: {
    maxContentLength: 4000,
    minContentLength: 100,
    concurrency: 3,
  },
  ai: {
    defaultModel: 'gemma-4-26b-a4b-it',
    promptContentLength: 4000,
    maxBodyChars: 1000,
    maxTakeaways: 3,
    maxTags: 5,
    rateLimit: {
      maxRequestsPerMinute: 14,
    },
    retry: {
      maxAttempts: 3,
      baseDelayMs: 2000,
      maxDelayMs: 30000,
    },
  },
  scheduler: {
    defaultCron: '0 6,12,18,0 * * *',
  },
}
