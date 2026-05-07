export declare class RateLimiter {
    private readonly maxTokens;
    private readonly refillRatePerMs;
    private tokens;
    private lastRefillTime;
    constructor(maxTokens: number, refillRatePerMs: number);
    acquire(): Promise<void>;
    private refill;
}
