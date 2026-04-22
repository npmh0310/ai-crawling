export const FEED_ENDPOINTS = {
  list: "/feed",
  detail: (id: string) => `/feed/${id}`,
  markRead: (id: string) => `/feed/${id}/read`,
} as const
