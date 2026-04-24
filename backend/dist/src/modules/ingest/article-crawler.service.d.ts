export type ArticleContent = {
    title: string;
    content: string;
    url: string;
};
export declare class ArticleCrawlerService {
    private readonly logger;
    fetchArticleContent(url: string): Promise<ArticleContent | null>;
    private stripHtml;
}
