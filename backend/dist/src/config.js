"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
exports.CONFIG = {
    ingest: {
        firstRunLookbackDays: 30,
        maxItemsPerFetch: 50,
        aiCallDelayMs: 4000,
    },
    crawler: {
        maxContentLength: 4000,
        minContentLength: 100,
    },
    ai: {
        defaultModel: 'gemma-4-26b-a4b-it',
        promptContentLength: 3000,
        maxTakeaways: 3,
        maxTags: 5,
    },
    scheduler: {
        defaultCron: '0 6,12,18,0 * * *',
    },
};
//# sourceMappingURL=config.js.map