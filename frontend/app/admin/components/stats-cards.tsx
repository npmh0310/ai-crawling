"use client"

import { useQuery } from "@tanstack/react-query"
import { ActivityIcon, EyeOffIcon, LayersIcon, SparklesIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Skeleton } from "@/components/ui/skeleton"

import { adminQueryKeys } from "../services/admin"

function formatRelative(dateStr: string | null): string {
  if (!dateStr) return "—"
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export function StatsCards() {
  const t = useTranslations("admin")
  const { data, isLoading } = useQuery(adminQueryKeys.stats())
  const stats = data?.data

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    )
  }

  if (!stats) return null

  const cards = [
    {
      label: t("totalItems"),
      value: stats.totalItems.toLocaleString(),
      icon: <LayersIcon className="size-4" />,
    },
    {
      label: t("todayItems"),
      value: stats.todayItems.toLocaleString(),
      icon: <SparklesIcon className="size-4" />,
    },
    {
      label: t("unread"),
      value: stats.unreadCount.toLocaleString(),
      icon: <EyeOffIcon className="size-4" />,
    },
    {
      label: t("lastSync"),
      value: formatRelative(stats.lastSyncAt),
      icon: <ActivityIcon className="size-4" />,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-lg border p-4">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[10px] font-semibold uppercase tracking-widest">{c.label}</span>
            {c.icon}
          </div>
          <div className="mt-2 text-2xl font-bold tabular-nums">{c.value}</div>
        </div>
      ))}

      {stats.byCompany.length > 0 && (
        <div className="col-span-2 rounded-lg border p-4 md:col-span-4">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t("byCompany")}
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.byCompany.map((b) => (
              <div key={b.company} className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs">
                <span className="font-semibold uppercase tracking-wide">{b.company}</span>
                <span className="tabular-nums text-muted-foreground">{b.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
