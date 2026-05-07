"use client"

import { ExternalLinkIcon, HashIcon, ZapIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"

import { FeedItem } from "./types"

type Props = {
  item: FeedItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeedDetailSheet({ item, open, onOpenChange }: Props) {
  const t = useTranslations("neuralFeed")

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" showCloseButton={false} className="flex w-80 flex-col gap-0 p-0 sm:max-w-80">
        {item && (
          <>
            <SheetHeader className="flex-row h-18 items-center justify-between border-b px-4 py-3 gap-0">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {t("intelligenceBrief")}
              </span>
              {item.originalUrl && (
                <a
                  href={item.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLinkIcon className="size-3.5 shrink-0" />
                </a>
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

            <div className="border-t p-4">
              <Button className="w-full" size="lg">
                {t("addToWorkspace")}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
