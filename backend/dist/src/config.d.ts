export declare const CONFIG: {
    ingest: {
        firstRunLookbackDays: number;
        maxItemsPerFetch: number;
        aiCallDelayMs: number;
    };
    crawler: {
        maxContentLength: number;
        minContentLength: number;
    };
    ai: {
        defaultModel: string;
        promptContentLength: number;
        maxTakeaways: number;
        maxTags: number;
    };
    scheduler: {
        defaultCron: string;
    };
};
