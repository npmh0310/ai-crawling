export const ADMIN_ENDPOINTS = {
  sources: "/sources",
  toggleSource: (id: string) => `/sources/${id}/toggle`,
  crawlLogs: "/crawl-logs",
  stats: "/stats",
} as const
