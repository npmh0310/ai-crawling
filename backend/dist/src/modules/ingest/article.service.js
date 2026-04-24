"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ArticleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const rss_service_1 = require("./rss.service");
const article_crawler_service_1 = require("./article-crawler.service");
const ai_processor_service_1 = require("../ai-processor/ai-processor.service");
const rss_sources_1 = require("../sources/rss-sources");
let ArticleService = ArticleService_1 = class ArticleService {
    prisma;
    rssService;
    crawlerService;
    aiService;
    logger = new common_1.Logger(ArticleService_1.name);
    constructor(prisma, rssService, crawlerService, aiService) {
        this.prisma = prisma;
        this.rssService = rssService;
        this.crawlerService = crawlerService;
        this.aiService = aiService;
    }
    async onModuleInit() {
        await this.seedFeedSources();
    }
    async seedFeedSources() {
        for (const source of rss_sources_1.RSS_SOURCES) {
            await this.prisma.feedSource.upsert({
                where: { id: source.id },
                update: {},
                create: {
                    id: source.id,
                    company: source.company,
                    name: source.name,
                    rssUrl: source.urls[0],
                },
            });
        }
        this.logger.log(`Feed sources seeded (${rss_sources_1.RSS_SOURCES.length})`);
    }
    async getIngestSince(sourceId) {
        const latest = await this.prisma.feedItem.findFirst({
            where: { sourceId },
            orderBy: { publishedAt: 'desc' },
            select: { publishedAt: true },
        });
        if (latest)
            return latest.publishedAt;
        const since = new Date();
        since.setDate(since.getDate() - 7);
        return since;
    }
    async ingestSource(sourceId) {
        const rssSource = (0, rss_sources_1.getRssSource)(sourceId);
        if (!rssSource)
            throw new Error(`Unknown source: ${sourceId}`);
        let inserted = 0;
        let skipped = 0;
        let failed = 0;
        const since = await this.getIngestSince(sourceId);
        const sinceStr = since.toISOString().split('T')[0];
        this.logger.log(`[${sourceId}] fetching since ${sinceStr}`);
        const { data: items } = await this.rssService.fetchAndParse(rssSource, {
            take: 50,
            page: 1,
            requestReceivedStart: sinceStr,
        });
        const guids = items.map((i) => i.guid);
        const existing = await this.prisma.feedItem.findMany({
            where: { guid: { in: guids } },
            select: { guid: true },
        });
        const existingSet = new Set(existing.map((e) => e.guid));
        const newItems = items.filter((i) => !existingSet.has(i.guid));
        this.logger.log(`[${sourceId}] ${items.length} fetched, ${newItems.length} new`);
        for (const item of newItems) {
            try {
                const articleContent = await this.crawlerService.fetchArticleContent(item.link);
                const content = articleContent?.content ?? item.summary ?? item.title;
                const aiResult = await this.aiService.analyze(item.title, content, item.company);
                await this.prisma.feedItem.create({
                    data: {
                        sourceId,
                        company: item.company,
                        sourceType: 'news',
                        category: aiResult.category,
                        title: item.title,
                        body: content,
                        takeaways: aiResult.takeaways,
                        tags: aiResult.tags,
                        originalUrl: item.link,
                        publishedAt: item.publishedAt ?? new Date(),
                        guid: item.guid,
                    },
                });
                inserted++;
            }
            catch (err) {
                this.logger.warn(`Failed to ingest item "${item.title}": ${err.message}`);
                failed++;
            }
        }
        skipped = items.length - newItems.length;
        return { sourceId, inserted, skipped, failed };
    }
    async ingestAll() {
        const results = await Promise.allSettled(rss_sources_1.RSS_SOURCES.map((s) => this.ingestSource(s.id)));
        return results.map((r, i) => {
            if (r.status === 'fulfilled')
                return r.value;
            this.logger.error(`Source ${rss_sources_1.RSS_SOURCES[i].id} failed: ${r.reason}`);
            return { sourceId: rss_sources_1.RSS_SOURCES[i].id, inserted: 0, skipped: 0, failed: 1 };
        });
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = ArticleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        rss_service_1.RssService,
        article_crawler_service_1.ArticleCrawlerService,
        ai_processor_service_1.AiProcessorService])
], ArticleService);
//# sourceMappingURL=article.service.js.map