"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
class RateLimiter {
    maxTokens;
    refillRatePerMs;
    tokens;
    lastRefillTime;
    constructor(maxTokens, refillRatePerMs) {
        this.maxTokens = maxTokens;
        this.refillRatePerMs = refillRatePerMs;
        this.tokens = maxTokens;
        this.lastRefillTime = Date.now();
    }
    async acquire() {
        this.refill();
        if (this.tokens >= 1) {
            this.tokens -= 1;
            return;
        }
        const msNeeded = (1 - this.tokens) / this.refillRatePerMs;
        await new Promise((r) => setTimeout(r, Math.ceil(msNeeded)));
        this.tokens = 0;
    }
    refill() {
        const now = Date.now();
        const elapsed = now - this.lastRefillTime;
        this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRatePerMs);
        this.lastRefillTime = now;
    }
}
exports.RateLimiter = RateLimiter;
//# sourceMappingURL=rate-limiter.util.js.map