"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
exports.CONFIG = {
    ingest: {
        firstRunLookbackDays: 7,
        maxItemsPerFetch: 50,
    },
    crawler: {
        maxContentLength: 4000,
        minContentLength: 100,
        concurrency: 3,
    },
    ai: {
        defaultModel: 'gemma-4-26b-a4b-it',
        promptContentLength: 3000,
        maxTakeaways: 3,
        maxTags: 5,
        rateLimit: {
            maxRequestsPerMinute: 14,
        },
        retry: {
            maxAttempts: 3,
            baseDelayMs: 2000,
            maxDelayMs: 30000,
        },
    },
    scheduler: {
        defaultCron: '0 6,12,18,0 * * *',
    },
};
//# sourceMappingURL=config.js.map