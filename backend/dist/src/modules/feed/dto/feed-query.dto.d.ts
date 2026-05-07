export declare enum LangParam {
    en = "en",
    vi = "vi"
}
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
    category?: string;
    unreadOnly?: boolean;
    lang?: LangParam;
    page?: number;
    take?: number;
}
export declare class SearchQueryDto {
    q: string;
    lang?: LangParam;
    page?: number;
    take?: number;
}
