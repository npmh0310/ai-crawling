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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ArticleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const p_limit_1 = __importDefault(require("p-limit"));
const prisma_service_1 = require("../../prisma/prisma.service");
const rss_service_1 = require("./rss.service");
const article_crawler_service_1 = require("./article-crawler.service");
const ai_processor_service_1 = require("../ai-processor/ai-processor.service");
const rss_sources_1 = require("../sources/rss-sources");
const config_1 = require("../../config");
const rate_limiter_util_1 = require("../../common/utils/rate-limiter.util");
const retry_util_1 = require("../../common/utils/retry.util");
let ArticleService = ArticleService_1 = class ArticleService {
    prisma;
    rssService;
    crawlerService;
    aiService;
    logger = new common_1.Logger(ArticleService_1.name);
    crawlLimit = (0, p_limit_1.default)(config_1.CONFIG.crawler.concurrency);
    rateLimiter = new rate_limiter_util_1.RateLimiter(config_1.CONFIG.ai.rateLimit.maxRequestsPerMinute, config_1.CONFIG.ai.rateLimit.maxRequestsPerMinute / 60000);
    constructor(prisma, rssService, crawlerService, aiService) {
        this.prisma = prisma;
        this.rssService = rssService;
        this.crawlerService = crawlerService;
        this.aiService = aiService;
    }
    async onModuleInit() {
        try {
            await this.seedFeedSources();
        }
        catch (err) {
            this.logger.error('Failed to seed feed sources — DB may be unavailable', err);
        }
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
        if (latest) {
            const cronFloor = new Date(Date.now() - config_1.CONFIG.ingest.cronLookbackHours * 60 * 60 * 1000);
            return latest.publishedAt > cronFloor ? latest.publishedAt : cronFloor;
        }
        const since = new Date();
        since.setDate(since.getDate() - config_1.CONFIG.ingest.firstRunLookbackDays);
        return since;
    }
    async ingestSource(sourceId) {
        const rssSource = (0, rss_sources_1.getRssSource)(sourceId);
        if (!rssSource)
            throw new Error(`Unknown source: ${sourceId}`);
        const log = await this.prisma.crawlLog.create({
            data: { sourceId, status: 'partial', startedAt: new Date() },
        });
        let inserted = 0;
        let skipped = 0;
        let failed = 0;
        try {
            const since = await this.getIngestSince(sourceId);
            const sinceStr = since.toISOString().split('T')[0];
            this.logger.log(`[${sourceId}] fetching since ${sinceStr}`);
            const { data: items } = await this.rssService.fetchAndParse(rssSource, {
                take: config_1.CONFIG.ingest.maxItemsPerFetch,
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
            skipped = items.length - newItems.length;
            this.logger.log(`[${sourceId}] ${items.length} fetched, ${newItems.length} new`);
            const crawled = await Promise.all(newItems.map((item) => this.crawlLimit(async () => {
                const articleContent = await this.crawlerService.fetchArticleContent(item.link);
                return {
                    item,
                    content: articleContent?.content ?? item.summary ?? item.title,
                };
            })));
            for (const { item, content } of crawled) {
                try {
                    await this.rateLimiter.acquire();
                    const aiResult = await (0, retry_util_1.withRetry)(() => this.aiService.analyze(item.title, content, item.company), {
                        maxAttempts: config_1.CONFIG.ai.retry.maxAttempts,
                        baseDelayMs: config_1.CONFIG.ai.retry.baseDelayMs,
                        maxDelayMs: config_1.CONFIG.ai.retry.maxDelayMs,
                        shouldRetry: (e) => !e.message.includes('400'),
                    });
                    await this.prisma.feedItem.upsert({
                        where: { guid: item.guid },
                        update: {},
                        create: {
                            sourceId,
                            company: item.company,
                            sourceType: 'news',
                            category: aiResult.category,
                            title: item.title,
                            titleVi: aiResult.titleVi || null,
                            body: content,
                            bodyVi: aiResult.bodyVi || null,
                            takeaways: aiResult.takeaways,
                            takeawaysVi: aiResult.takeawaysVi,
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
            const status = inserted === 0 && failed > 0 ? 'failed' : failed > 0 ? 'partial' : 'success';
            await this.prisma.crawlLog.updateMany({
                where: { id: log.id },
                data: { status, itemsFound: items.length, itemsNew: inserted, finishedAt: new Date() },
            });
            return { sourceId, inserted, skipped, failed };
        }
        catch (err) {
            await this.prisma.crawlLog.updateMany({
                where: { id: log.id },
                data: { status: 'failed', errorMsg: err.message, finishedAt: new Date() },
            });
            throw err;
        }
    }
    async backfillVietnamese() {
        const items = await this.prisma.feedItem.findMany({
            where: {
                OR: [
                    { takeawaysVi: { equals: [] } },
                    { titleVi: null },
                ],
            },
            select: { id: true, title: true, body: true, company: true },
        });
        this.logger.log(`[backfill-vi] ${items.length} items need Vietnamese`);
        let updated = 0;
        let failed = 0;
        for (const item of items) {
            try {
                await this.rateLimiter.acquire();
                const aiResult = await (0, retry_util_1.withRetry)(() => this.aiService.analyze(item.title, item.body ?? item.title, item.company), {
                    maxAttempts: config_1.CONFIG.ai.retry.maxAttempts,
                    baseDelayMs: config_1.CONFIG.ai.retry.baseDelayMs,
                    maxDelayMs: config_1.CONFIG.ai.retry.maxDelayMs,
                    shouldRetry: (e) => !e.message.includes('400'),
                });
                if (aiResult.takeawaysVi.length > 0 || aiResult.titleVi) {
                    await this.prisma.feedItem.update({
                        where: { id: item.id },
                        data: {
                            takeawaysVi: aiResult.takeawaysVi,
                            titleVi: aiResult.titleVi || null,
                            bodyVi: aiResult.bodyVi || null,
                        },
                    });
                    updated++;
                }
            }
            catch (err) {
                this.logger.warn(`[backfill-vi] Failed "${item.title}": ${err.message}`);
                failed++;
            }
        }
        this.logger.log(`[backfill-vi] done: ${updated} updated, ${failed} failed`);
        return { updated, failed };
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
    async resetAll() {
        const [feedItems, crawlLogs] = await Promise.all([
            this.prisma.feedItem.deleteMany(),
            this.prisma.crawlLog.deleteMany(),
        ]);
        const feedSources = await this.prisma.feedSource.deleteMany();
        this.logger.log(`Reset: ${feedItems.count} items, ${crawlLogs.count} logs, ${feedSources.count} sources deleted`);
        await this.seedFeedSources();
        return {
            deleted: {
                feedItems: feedItems.count,
                crawlLogs: crawlLogs.count,
                feedSources: feedSources.count,
            },
        };
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