"use client"

import { useActionState } from "react"
import { LockIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { type LoginState, loginAdmin } from "./actions"

const INITIAL_STATE: LoginState = undefined

export default function AdminLoginPage() {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const t = useTranslations("adminLogin")
  const [state, formAction, isPending] = useActionState(loginAdmin, INITIAL_STATE)

  // ── Derived state ──────────────────────────────────────────────────────────
  const errorMessage = state?.error === "invalid"
    ? t("invalidPassword")
    : state?.error === "server-misconfigured"
      ? t("serverMisconfigured")
      : null

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-svh items-center justify-center px-4 py-10">
      <form
        action={formAction}
        className="w-full max-w-sm space-y-5 rounded-xl border bg-card p-6 shadow-sm"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-10 items-center justify-center rounded-full border bg-muted">
            <LockIcon className="size-4" />
          </div>
          <h1 className="text-sm font-semibold uppercase tracking-widest">{t("title")}</h1>
          <p className="text-xs text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="space-y-2">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            placeholder={t("passwordPlaceholder")}
            aria-invalid={errorMessage ? true : undefined}
          />
          {errorMessage && (
            <p className="text-xs text-destructive">{errorMessage}</p>
          )}
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? t("submitting") : t("submit")}
        </Button>
      </form>
    </div>
  )
}
