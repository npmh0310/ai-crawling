"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = withRetry;
async function withRetry(fn, opts) {
    let lastError;
    for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (err) {
            lastError = err;
            if (attempt === opts.maxAttempts)
                break;
            if (opts.shouldRetry && !opts.shouldRetry(lastError))
                break;
            const delay = Math.min(opts.baseDelayMs * 2 ** (attempt - 1), opts.maxDelayMs);
            const jitter = Math.random() * delay * 0.2;
            await new Promise((r) => setTimeout(r, delay + jitter));
        }
    }
    throw lastError;
}
//# sourceMappingURL=retry.util.js.map