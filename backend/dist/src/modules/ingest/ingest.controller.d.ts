import { FetchRssQueryDto } from './dto/fetch-rss-query.dto';
import { RssService } from './rss.service';
import { ArticleService } from './article.service';
export declare class IngestController {
    private readonly rssService;
    private readonly articleService;
    private readonly logger;
    constructor(rssService: RssService, articleService: ArticleService);
    fetchOpenAIFeed(query: FetchRssQueryDto): Promise<import("../../common/interfaces/api-response.interface").PaginatedResponse<import("./rss.service").NormalizedRssItem>> | never[];
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
    backfillVietnamese(): {
        message: string;
    };
    resetAll(): Promise<{
        deleted: {
            feedItems: number;
            crawlLogs: number;
            feedSources: number;
        };
    }>;
    ingestAll(): {
        message: string;
    };
    ingestSource(sourceId: string): {
        message: string;
    };
}
