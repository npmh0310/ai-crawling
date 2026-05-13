"use client"

import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { type CrawlLogStatus, adminQueryKeys } from "../services/admin"

const PAGE_SIZE = 10
const PAGE_PARAM = "page"
const SIBLING_COUNT = 1

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

function buildPageRange(current: number, total: number, siblings: number): (number | "ellipsis")[] {
  if (total <= 1) return [1]
  const range: (number | "ellipsis")[] = []
  const start = Math.max(2, current - siblings)
  const end = Math.min(total - 1, current + siblings)

  range.push(1)
  if (start > 2) range.push("ellipsis")
  for (let i = start; i <= end; i++) range.push(i)
  if (end < total - 1) range.push("ellipsis")
  if (total > 1) range.push(total)

  return range
}

export function CrawlLogsTable() {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const t = useTranslations("admin")
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawPage = Number(searchParams.get(PAGE_PARAM) ?? "1")
  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1

  const { data, isLoading, isFetching } = useQuery(
    adminQueryKeys.crawlLogs({ page, take: PAGE_SIZE }),
  )

  // ── Derived state ──────────────────────────────────────────────────────────
  const logs = data?.data ?? []
  const meta = data?.meta
  const totalPages = meta?.pageCount ?? 1
  const pageRange = buildPageRange(page, totalPages, SIBLING_COUNT)

  function buildHref(targetPage: number): string {
    const params = new URLSearchParams(searchParams.toString())
    if (targetPage <= 1) params.delete(PAGE_PARAM)
    else params.set(PAGE_PARAM, String(targetPage))
    const qs = params.toString()
    return qs ? `?${qs}` : "?"
  }

  function handlePageClick(targetPage: number, disabled: boolean) {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      if (disabled || targetPage === page) return
      router.replace(buildHref(targetPage), { scroll: false })
    }
  }

  // ── Early returns ──────────────────────────────────────────────────────────
  if (isLoading) return <Skeleton className="h-64 w-full rounded-lg" />

  if (logs.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
        {t("noCrawlLogs")}
      </div>
    )
  }

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      <div className={`rounded-lg border ${isFetching ? "opacity-70" : ""}`}>
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

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={buildHref(page - 1)}
                onClick={handlePageClick(page - 1, !meta?.hasPreviousPage)}
                aria-disabled={!meta?.hasPreviousPage}
                className={!meta?.hasPreviousPage ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>

            {pageRange.map((p, i) =>
              p === "ellipsis" ? (
                <PaginationItem key={`e-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    href={buildHref(p)}
                    onClick={handlePageClick(p, false)}
                    isActive={p === page}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                href={buildHref(page + 1)}
                onClick={handlePageClick(page + 1, !meta?.hasNextPage)}
                aria-disabled={!meta?.hasNextPage}
                className={!meta?.hasNextPage ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
