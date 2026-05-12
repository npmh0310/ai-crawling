"use client"

import { useTransition } from "react"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"

import { setLocale } from "@/actions/locale"
import { Button } from "@/components/ui/button"

export function LocaleToggleButton() {
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleToggle() {
    const next = locale === "vi" ? "en" : "vi"
    startTransition(async () => {
      await setLocale(next)
      router.refresh()
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isPending}
      onClick={handleToggle}
      className="font-mono text-xs font-medium"
    >
      {locale === "vi" ? "VI" : "EN"}
    </Button>
  )
}
