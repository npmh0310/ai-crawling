"use client"

import { useTransition } from "react"
import { LogOutIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"

import { logoutAdmin } from "../login/actions"

export function LogoutButton() {
  const t = useTranslations("admin")
  const [isPending, startTransition] = useTransition()

  function handleLogout() {
    startTransition(() => {
      void logoutAdmin()
    })
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={isPending}
      className="gap-1.5"
    >
      <LogOutIcon className="size-3.5" />
      {t("logout")}
    </Button>
  )
}
