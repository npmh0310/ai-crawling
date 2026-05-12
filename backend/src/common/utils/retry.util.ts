export interface RetryOptions {
  maxAttempts: number
  baseDelayMs: number
  maxDelayMs: number
  shouldRetry?: (err: Error) => boolean
}

export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions): Promise<T> {
  let lastError!: Error

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err as Error
      if (attempt === opts.maxAttempts) break
      if (opts.shouldRetry && !opts.shouldRetry(lastError)) break

      const delay = Math.min(opts.baseDelayMs * 2 ** (attempt - 1), opts.maxDelayMs)
      const jitter = Math.random() * delay * 0.2
      await new Promise((r) => setTimeout(r, delay + jitter))
    }
  }

  throw lastError
}
