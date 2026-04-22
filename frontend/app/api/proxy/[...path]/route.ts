import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

// Server-side only — never exposed to the browser bundle
const BACKEND_URL = process.env.BACKEND_URL
const API_SECRET = process.env.API_SECRET_KEY

type RouteContext = { params: Promise<{ path: string[] }> }

async function proxyRequest(req: NextRequest, context: RouteContext) {
  if (!BACKEND_URL) {
    return NextResponse.json({ message: "BACKEND_URL is not configured" }, { status: 500 })
  }

  const { path } = await context.params
  const backendPath = `/${path.join("/")}`
  const search = req.nextUrl.search
  const url = `${BACKEND_URL}${backendPath}${search}`

  // Build forwarded headers
  const headers = new Headers()
  headers.set("Content-Type", "application/json")

  // Token is read from httpOnly cookie server-side — JS in the browser never sees it
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value
  if (token) headers.set("Authorization", `Bearer ${token}`)

  // Internal API secret — injected here, never sent to the client
  if (API_SECRET) headers.set("X-Api-Key", API_SECRET)

  const hasBody = req.method !== "GET" && req.method !== "HEAD"

  const upstream = await fetch(url, {
    method: req.method,
    headers,
    // Stream the request body through — avoids buffering large payloads
    ...(hasBody && { body: req.body, duplex: "half" }),
  } as RequestInit)

  // Normalize error shape to match the ApiError interface in api-client.ts
  if (!upstream.ok) {
    let message = upstream.statusText
    try {
      const json = await upstream.json()
      message = json.message ?? message
    } catch { /* upstream returned non-JSON error */ }

    return NextResponse.json(
      { message, status: upstream.status },
      { status: upstream.status }
    )
  }

  if (upstream.status === 204) {
    return new NextResponse(null, { status: 204 })
  }

  // Pipe upstream body stream directly — no double JSON parse/stringify
  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  })
}

// One handler for all HTTP methods
export const GET = proxyRequest
export const POST = proxyRequest
export const PUT = proxyRequest
export const PATCH = proxyRequest
export const DELETE = proxyRequest
