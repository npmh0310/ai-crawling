import { FetchRssQueryDto } from './dto/fetch-rss-query.dto';
import { RssService } from './rss.service';
import { ArticleService } from './article.service';
export declare class IngestController {
    private readonly rssService;
    private readonly articleService;
    constructor(rssService: RssService, articleService: ArticleService);
    fetchOpenAIFeed(query: FetchRssQueryDto): never[] | Promise<import("../../common/interfaces/api-response.interface").PaginatedResponse<import("./rss.service").NormalizedRssItem>>;
    previewSource(sourceId: string): Promise<{
        error: string;
        sourceId?: undefined;
        urls?: undefined;
        count?: undefined;
        items?: undefined;
    } | {
        sourceId: string;
        urls: string[];
        count: number;
        items: {
            title: string;
            link: string;
            publishedAt: Date | null;
            guid: string;
        }[];
        error?: undefined;
    }>;
    resetAll(): Promise<{
        deleted: {
            feedItems: number;
            crawlLogs: number;
            feedSources: number;
        };
    }>;
    ingestAll(): Promise<import("./article.service").IngestResult[]>;
    ingestSource(sourceId: string): Promise<import("./article.service").IngestResult>;
}
