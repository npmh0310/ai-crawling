import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_SESSION_COOKIE = "admin_session"
const ADMIN_SESSION_VALUE = "ok"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/admin/login") return NextResponse.next()

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  if (session === ADMIN_SESSION_VALUE) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = "/admin/login"
  return NextResponse.redirect(url)
}

export const config = {
  matcher: "/admin/:path*",
}
