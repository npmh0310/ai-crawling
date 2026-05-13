"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { PowerIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/lib/toast"
import { cn } from "@/lib/utils"

import { type AdminSource, adminApiService, adminQueryKeys } from "../services/admin"

function formatRelative(dateStr: string | null): string {
  if (!dateStr) return "—"
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "now"
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  return `${Math.floor(hrs / 24)}d`
}

function groupByCompany(sources: AdminSource[]): { company: string; items: AdminSource[] }[] {
  const map = new Map<string, AdminSource[]>()
  for (const s of sources) {
    const arr = map.get(s.company) ?? []
    arr.push(s)
    map.set(s.company, arr)
  }
  return Array.from(map.entries()).map(([company, items]) => ({ company, items }))
}

export function SourcesTable() {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const t = useTranslations("admin")
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery(adminQueryKeys.sources())

  const toggleMutation = useMutation({
    mutationFn: (id: string) => adminApiService.toggleSource(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      toast.success(res.data?.isActive ? t("sourceEnabled") : t("sourceDisabled"))
    },
    onError: () => toast.error(t("toggleFailed")),
  })

  // ── Early returns ──────────────────────────────────────────────────────────
  if (isLoading) return <Skeleton className="h-64 w-full rounded-lg" />

  // ── Derived state ──────────────────────────────────────────────────────────
  const groups = groupByCompany(data?.data ?? [])

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="overflow-hidden rounded-lg border">
      {groups.map((g, gi) => (
        <div key={g.company} className={cn(gi > 0 && "border-t")}>
          <div className="flex items-center gap-2 bg-muted/40 px-3 py-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {g.company}
            </span>
            <span className="text-[10px] tabular-nums text-muted-foreground">
              {g.items.length}
            </span>
          </div>

          <ul className="divide-y">
            {g.items.map((s) => (
              <li
                key={s.id}
                className="flex items-center gap-3 px-3 py-2 text-xs transition-colors hover:bg-muted/30"
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    s.isActive ? "bg-emerald-500" : "bg-muted-foreground/40",
                  )}
                />

                <div className="min-w-0 flex-1 truncate font-medium">{s.name}</div>

                <div className="flex shrink-0 items-center gap-4 tabular-nums text-muted-foreground">
                  <span className="w-10 text-right">{s.totalItems.toLocaleString()}</span>
                  <span className="w-8 text-right">{formatRelative(s.lastSyncAt)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleMutation.mutate(s.id)}
                  disabled={toggleMutation.isPending}
                  aria-label={s.isActive ? t("disable") : t("enable")}
                  title={s.isActive ? t("disable") : t("enable")}
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-md transition-colors disabled:opacity-50",
                    s.isActive
                      ? "text-foreground hover:bg-muted"
                      : "text-muted-foreground/60 hover:bg-muted hover:text-foreground",
                  )}
                >
                  <PowerIcon className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
