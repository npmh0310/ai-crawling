import type { ApiResponse } from "./types"

export type { ApiResponse } from "./types"
export type { PaginationMeta } from "./types"

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

const BASE_URL = "/api/proxy"

async function request<T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  })

  if (!response.ok) {
    let message = response.statusText
    try {
      const json = await response.json()
      message = json.message ?? message
    } catch { /* proxy returned non-JSON */ }
    throw new ApiError(message, response.status)
  }

  if (response.status === 204) return { statusCode: 204, success: true, data: undefined as T, message: "" }

  return response.json() as Promise<ApiResponse<T>>
}

export const api = {
  get: <T>(path: string) =>
    request<T>(path, { method: "GET" }),

  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),

  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),

  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),

  delete: <T>(path: string) =>
    request<T>(path, { method: "DELETE" }),
}
