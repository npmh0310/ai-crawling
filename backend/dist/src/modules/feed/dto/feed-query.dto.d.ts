export declare enum CompanyFilter {
    OpenAI = "OpenAI",
    Anthropic = "Anthropic",
    Google = "Google",
    Meta = "Meta",
    Mistral = "Mistral",
    NVIDIA = "NVIDIA",
    xAI = "xAI"
}
export declare enum SourceTypeFilter {
    news = "news",
    social = "social"
}
export declare class FeedQueryDto {
    company?: CompanyFilter;
    sourceType?: SourceTypeFilter;
    page?: number;
    take?: number;
}
