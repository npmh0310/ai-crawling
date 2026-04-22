import { QueryCache, QueryClient } from "@tanstack/react-query"

const MINUTE = 1000 * 60

export function makeQueryClient(onError?: (error: Error) => void) {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => onError?.(error as Error),
    }),
    defaultOptions: {
      queries: {
        staleTime: MINUTE,
        gcTime: 5 * MINUTE,
        retry: 1,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  })
}
