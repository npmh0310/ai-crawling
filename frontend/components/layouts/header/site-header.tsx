"use client"

import { LocaleToggleButton } from "@/components/common/button/locale-toggle-button"
import { ThemeToggleButton } from "@/components/common/button/theme-toggle-button"
import { SearchDialog } from "@/components/common/dialog/search-dialog"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <SearchDialog />
        <div className="ml-auto flex items-center gap-2">
          <kbd className="pointer-events-none hidden items-center gap-1 rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground md:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
          <ThemeToggleButton />
          <LocaleToggleButton />
        </div>
      </div>
    </header>
  )
}
