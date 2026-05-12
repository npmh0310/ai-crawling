# Stack Rules

## Next.js App Router

- Default to **Server Components**; add `"use client"` only when required (event handlers, hooks, browser APIs)
- Use **Server Actions** for mutations — no separate API routes unless a client can't use actions
- Co-locate page-specific code inside `app/<route>/`; shared components go in `components/`
- Check `node_modules/next/dist/docs/` before using any Next.js API — version 16 has breaking changes

## Page Structure

Each route folder (`app/<route>/`) owns exactly three sub-folders:

```
app/(route)/
  components/        ← UI components scoped to this page
  constants/
    routes.ts        ← Route path constants
    endpoints.ts     ← API endpoint strings for this page
  services/
    <domain>.ts      ← API calls + queryOptions co-located
```

- **No root-level `constants/` or `features/`** — everything is co-located inside its route
- Shared UI → `components/common/`; layout pieces → `components/layouts/`
- Shared lib/utils → `lib/`

## TanStack Query (v5) Architecture

### services/<domain>.ts structure

```ts
// 1. API service — plain async functions using `api` from lib/api-client
export const feedApiService = {
  getFeeds: () => api.get<FeedItem[]>(FEED_ENDPOINTS.list),
  markRead:  (id: string) => api.patch<void>(FEED_ENDPOINTS.markRead(id)),
}

// 2. Query key factory + queryOptions co-located
export const feedQueryKeys = {
  all:   ["feed"] as const,
  lists: () => [...feedQueryKeys.all, "list"] as const,
  list:  () => queryOptions({
    queryKey: feedQueryKeys.lists(),
    queryFn:  () => feedApiService.getFeeds(),
  }),
  detail: (id: string) => queryOptions({
    queryKey: [...feedQueryKeys.all, "detail", id],
    queryFn:  () => feedApiService.getFeedById(id),
    enabled:  Boolean(id),
  }),
}
```

### Usage in components (no custom hook wrappers)

```tsx
// Query
const { data, isLoading, isFetching } = useQuery(feedQueryKeys.list())

// Mutation
const { mutate, isPending } = useMutation({
  mutationFn: (id: string) => feedApiService.markRead(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: feedQueryKeys.lists() })
    toast.success("Done")
  },
  onError: () => toast.error("Failed"),
})
```

### Rules

- `queryOptions()` is the only pattern for defining keys + fn — no bare objects
- Invalidate by key factory (`feedQueryKeys.lists()`), never hardcode string arrays
- Global query errors are handled in `QueryProvider` via `QueryCache.onError` → auto toast
- Mutation errors are handled inline in `onError` callback — explicit per-mutation messaging
- `retry: 1` for queries, `retry: 0` for mutations (set in `lib/query-client.ts`)

## API Layer

```
Browser → /api/proxy/[...path]  →  BACKEND_URL (server-side)
```

- All requests go through the proxy — never call `BACKEND_URL` directly from the client
- Auth token is read from httpOnly cookie server-side in the proxy route
- `ApiError` extends `Error` so TanStack Query v5 handles it correctly
- `api-client.ts` base URL is always `/api/proxy` — no `NEXT_PUBLIC_API_URL` on the client

## TypeScript

- No `any` — use `unknown` + narrow, or define the type
- Use `zod` schemas at API/form boundaries; infer types with `z.infer<>`
- Export types from the same file as their implementation
- Errors thrown from `api-client` must be `ApiError extends Error` instances

## i18n (next-intl)

- Never hardcode user-visible strings — use `useTranslations()` (client) or `getTranslations()` (server)
- Update **both** `messages/vi.json` and `messages/en.json` at the same time
- Key convention: `PascalCaseNamespace.camelCaseKey`

## Components (shadcn/ui)

- Extend via `className` + `cn()` — never fork a shadcn component
- Use `cva` for variants, not inline ternaries
