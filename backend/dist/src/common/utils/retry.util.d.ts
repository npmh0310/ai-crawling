export interface RetryOptions {
    maxAttempts: number;
    baseDelayMs: number;
    maxDelayMs: number;
    shouldRetry?: (err: Error) => boolean;
}
export declare function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions): Promise<T>;
