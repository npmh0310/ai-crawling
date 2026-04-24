import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RssService } from './rss.service';
import { ArticleCrawlerService } from './article-crawler.service';
import { AiProcessorService } from '../ai-processor/ai-processor.service';
export type IngestResult = {
    sourceId: string;
    inserted: number;
    skipped: number;
    failed: number;
};
export declare class ArticleService implements OnModuleInit {
    private readonly prisma;
    private readonly rssService;
    private readonly crawlerService;
    private readonly aiService;
    private readonly logger;
    constructor(prisma: PrismaService, rssService: RssService, crawlerService: ArticleCrawlerService, aiService: AiProcessorService);
    onModuleInit(): Promise<void>;
    private seedFeedSources;
    private getIngestSince;
    ingestSource(sourceId: string): Promise<IngestResult>;
    ingestAll(): Promise<IngestResult[]>;
}
