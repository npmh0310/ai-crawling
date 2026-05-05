export class RateLimiter {
  private tokens: number
  private lastRefillTime: number

  constructor(
    private readonly maxTokens: number,
    private readonly refillRatePerMs: number,
  ) {
    this.tokens = maxTokens
    this.lastRefillTime = Date.now()
  }

  async acquire(): Promise<void> {
    this.refill()
    if (this.tokens >= 1) {
      this.tokens -= 1
      return
    }
    const msNeeded = (1 - this.tokens) / this.refillRatePerMs
    await new Promise((r) => setTimeout(r, Math.ceil(msNeeded)))
    this.tokens = 0
  }

  private refill(): void {
    const now = Date.now()
    const elapsed = now - this.lastRefillTime
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRatePerMs)
    this.lastRefillTime = now
  }
}
