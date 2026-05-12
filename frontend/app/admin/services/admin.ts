import { queryOptions } from "@tanstack/react-query"

import { api } from "@/lib/api-client"

import { ADMIN_ENDPOINTS } from "../constants/endpoints"

// ─── Types ────────────────────────────────────────────────────────────────────

export type AdminSource = {
  id: string
  company: string
  name: string
  rssUrl: string | null
  isActive: boolean
  totalItems: number
  lastSyncAt: string | null
}

export type ToggleSourceResult = {
  id: string
  company: string
  name: string
  isActive: boolean
}

export type CrawlLogStatus = "success" | "failed" | "partial"

export type CrawlLogEntry = {
  id: string
  sourceId: string
  company: string
  sourceName: string
  status: CrawlLogStatus
  itemsFound: number
  itemsNew: number
  startedAt: string
  finishedAt: string | null
  errorMsg: string | null
  durationMs: number | null
}

export type AdminStats = {
  totalItems: number
  todayItems: number
  unreadCount: number
  lastSyncAt: string | null
  byCompany: { company: string; count: number }[]
}

export type CrawlLogQuery = {
  sourceId?: string
  page?: number
  take?: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildQueryString(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue
    search.set(key, String(value))
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ""
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const adminApiService = {
  getSources: () => api.get<AdminSource[]>(ADMIN_ENDPOINTS.sources),

  toggleSource: (id: string) => api.patch<ToggleSourceResult>(ADMIN_ENDPOINTS.toggleSource(id)),

  getCrawlLogs: (params?: CrawlLogQuery) =>
    api.get<CrawlLogEntry[]>(ADMIN_ENDPOINTS.crawlLogs + buildQueryString({ ...params })),

  getStats: () => api.get<AdminStats>(ADMIN_ENDPOINTS.stats),
}

// ─── Query keys ───────────────────────────────────────────────────────────────

export const adminQueryKeys = {
  all: ["admin"] as const,
  sources: () =>
    queryOptions({
      queryKey: [...adminQueryKeys.all, "sources"] as const,
      queryFn: () => adminApiService.getSources(),
    }),
  crawlLogs: (params?: CrawlLogQuery) =>
    queryOptions({
      queryKey: [...adminQueryKeys.all, "crawl-logs", params] as const,
      queryFn: () => adminApiService.getCrawlLogs(params),
    }),
  stats: () =>
    queryOptions({
      queryKey: [...adminQueryKeys.all, "stats"] as const,
      queryFn: () => adminApiService.getStats(),
      staleTime: 60_000,
    }),
}
