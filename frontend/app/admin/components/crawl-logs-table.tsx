"use client"

import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { type CrawlLogStatus, adminQueryKeys } from "../services/admin"

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatDuration(ms: number | null): string {
  if (ms === null) return "—"
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

function statusVariant(status: CrawlLogStatus): "default" | "secondary" | "destructive" | "outline" {
  if (status === "success") return "default"
  if (status === "partial") return "outline"
  return "destructive"
}

export function CrawlLogsTable() {
  const t = useTranslations("admin")
  const { data, isLoading } = useQuery(adminQueryKeys.crawlLogs({ take: 30 }))
  const logs = data?.data ?? []

  if (isLoading) return <Skeleton className="h-64 w-full rounded-lg" />

  if (logs.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
        {t("noCrawlLogs")}
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("startedAt")}</TableHead>
            <TableHead>{t("source")}</TableHead>
            <TableHead>{t("status")}</TableHead>
            <TableHead className="text-right">{t("found")}</TableHead>
            <TableHead className="text-right">{t("new")}</TableHead>
            <TableHead className="text-right">{t("duration")}</TableHead>
            <TableHead>{t("error")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((l) => (
            <TableRow key={l.id}>
              <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                {formatDateTime(l.startedAt)}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <span className="font-semibold uppercase tracking-wide">{l.company}</span>
                <span className="ml-2 text-xs text-muted-foreground">{l.sourceName}</span>
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant(l.status)}>{l.status}</Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">{l.itemsFound}</TableCell>
              <TableCell className="text-right tabular-nums font-semibold">{l.itemsNew}</TableCell>
              <TableCell className="text-right tabular-nums text-xs text-muted-foreground">
                {formatDuration(l.durationMs)}
              </TableCell>
              <TableCell className="max-w-xs truncate text-xs text-destructive">
                {l.errorMsg ?? ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
