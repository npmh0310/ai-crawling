export declare const Company: {
    readonly OpenAI: "OpenAI";
    readonly Anthropic: "Anthropic";
    readonly Google: "Google";
    readonly Meta: "Meta";
    readonly Mistral: "Mistral";
    readonly NVIDIA: "NVIDIA";
    readonly xAI: "xAI";
};
export type Company = (typeof Company)[keyof typeof Company];
export declare const SourceType: {
    readonly news: "news";
    readonly social: "social";
};
export type SourceType = (typeof SourceType)[keyof typeof SourceType];
export declare const CrawlStatus: {
    readonly success: "success";
    readonly failed: "failed";
    readonly partial: "partial";
};
export type CrawlStatus = (typeof CrawlStatus)[keyof typeof CrawlStatus];
