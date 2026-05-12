"use client"

import { useEffect, useRef } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CopyIcon, ExternalLinkIcon, HashIcon, ZapIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { toast } from "@/lib/toast"

import { feedApiService, feedQueryKeys } from "../services/feed"
import { FeedItem } from "./types"

type Props = {
  item: FeedItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeedDetailSheet({ item, open, onOpenChange }: Props) {
  const t = useTranslations("neuralFeed")
  const queryClient = useQueryClient()
  const markedIdsRef = useRef<Set<string>>(new Set())

  const markReadMutation = useMutation({
    mutationFn: (id: string) => feedApiService.markFeedRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedQueryKeys.lists() })
    },
  })

  useEffect(() => {
    if (!open || !item || item.isRead) return
    if (markedIdsRef.current.has(item.id)) return
    markedIdsRef.current.add(item.id)
    markReadMutation.mutate(item.id)
  }, [open, item, markReadMutation])

  async function handleCopyLink() {
    if (!item?.originalUrl) return
    try {
      await navigator.clipboard.writeText(item.originalUrl)
      toast.success(t("linkCopied"))
    } catch {
      toast.error(t("linkCopyFailed"))
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex w-full flex-col gap-0 p-0 sm:w-80 sm:max-w-80"
      >
        {item && (
          <>
            <SheetHeader className="flex-row h-18 items-center justify-between border-b px-4 py-3 gap-0">
              <SheetTitle className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {t("intelligenceBrief")}
              </SheetTitle>
              {item.originalUrl && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    aria-label={t("copyLink")}
                    title={t("copyLink")}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <CopyIcon className="size-3.5 shrink-0" />
                  </button>
                  <a
                    href={item.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("openOriginal")}
                    title={t("openOriginal")}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLinkIcon className="size-3.5 shrink-0" />
                  </a>
                </div>
              )}
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px] uppercase tracking-widest">
                  {item.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
              </div>

              <h2 className="mb-3 text-xl font-bold leading-tight">{item.title}</h2>

              {(item.body || item.quote) && (
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.body ?? item.quote}
                </p>
              )}

              {item.takeaways && item.takeaways.length > 0 && (
                <div className="mb-5">
                  <div className="mb-2.5 flex items-center gap-1.5">
                    <ZapIcon className="size-3.5 text-amber-500" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-500">
                      {t("keyTakeaways")}
                    </span>
                  </div>
                  <ol className="space-y-2.5">
                    {item.takeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="shrink-0 pt-0.5 text-xs tabular-nums text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {item.tags && item.tags.length > 0 && (
                <div>
                  <div className="mb-2.5 flex items-center gap-1.5">
                    <HashIcon className="size-3.5 text-muted-foreground" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {t("tags")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-full text-xs text-muted-foreground">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
