"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/lib/toast"

import { adminApiService, adminQueryKeys } from "../services/admin"

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

export function SourcesTable() {
  const t = useTranslations("admin")
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery(adminQueryKeys.sources())
  const sources = data?.data ?? []

  const toggleMutation = useMutation({
    mutationFn: (id: string) => adminApiService.toggleSource(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      toast.success(res.data?.isActive ? t("sourceEnabled") : t("sourceDisabled"))
    },
    onError: () => toast.error(t("toggleFailed")),
  })

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-lg" />
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("company")}</TableHead>
            <TableHead>{t("name")}</TableHead>
            <TableHead className="text-right">{t("items")}</TableHead>
            <TableHead>{t("lastSync")}</TableHead>
            <TableHead>{t("status")}</TableHead>
            <TableHead className="text-right">{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sources.map((s) => (
            <TableRow key={s.id}>
              <TableCell className="font-semibold uppercase tracking-wide">{s.company}</TableCell>
              <TableCell className="text-muted-foreground">{s.name}</TableCell>
              <TableCell className="text-right tabular-nums">{s.totalItems.toLocaleString()}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{formatRelative(s.lastSyncAt)}</TableCell>
              <TableCell>
                <Badge variant={s.isActive ? "default" : "secondary"}>
                  {s.isActive ? t("active") : t("inactive")}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={toggleMutation.isPending}
                  onClick={() => toggleMutation.mutate(s.id)}
                >
                  {s.isActive ? t("disable") : t("enable")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
