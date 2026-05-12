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
    defaultCron: process.env.CRON_SCHEDULE ?? '0 0,12 * * *',
  },
  twitter: {
    serviceUrl: process.env.TWITTER_SERVICE_URL ?? 'http://localhost:3010',
    concurrency: 2,
    filter: {
      minBodyLength: 100,
      maxPerCrawl: 5,
    },
  },
  reddit: {
    concurrency: 2,
    timeframe: (process.env.REDDIT_TIMEFRAME as 'hour' | 'day' | 'week') ?? 'day',
    fetchLimit: 50,
    maxPerCrawl: 8,
  },
}
