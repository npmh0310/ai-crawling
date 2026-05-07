export declare const CONFIG: {
    ingest: {
        firstRunLookbackDays: number;
        cronLookbackHours: number;
        maxItemsPerFetch: number;
    };
    crawler: {
        maxContentLength: number;
        minContentLength: number;
        concurrency: number;
    };
    ai: {
        defaultModel: string;
        promptContentLength: number;
        maxBodyChars: number;
        maxTakeaways: number;
        maxTags: number;
        rateLimit: {
            maxRequestsPerMinute: number;
        };
        retry: {
            maxAttempts: number;
            baseDelayMs: number;
            maxDelayMs: number;
        };
    };
    scheduler: {
        defaultCron: string;
    };
};
