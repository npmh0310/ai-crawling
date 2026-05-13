export const FEED_ENDPOINTS = {
  list: "/feed",
  search: "/feed/search",
  hot: "/feed/hot",
  crawlStats: "/feed/crawl-stats",
  readAll: "/feed/read-all",
  detail: (id: string) => `/feed/${id}`,
  markRead: (id: string) => `/feed/${id}/read`,
} as const
