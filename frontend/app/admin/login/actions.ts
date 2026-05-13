"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_SESSION_COOKIE = "admin_session"
const ADMIN_SESSION_VALUE = "ok"
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export type LoginState = { error?: string } | undefined

export async function loginAdmin(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = formData.get("password")?.toString() ?? ""
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return { error: "server-misconfigured" }
  if (password !== expected) return { error: "invalid" }

  const cookieStore = await cookies()
  cookieStore.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  })

  redirect("/admin")
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
  redirect("/admin/login")
}
