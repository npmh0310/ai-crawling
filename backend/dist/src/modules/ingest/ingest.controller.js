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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var IngestController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestController = void 0;
const common_1 = require("@nestjs/common");
const fetch_rss_query_dto_1 = require("./dto/fetch-rss-query.dto");
const rss_sources_1 = require("../sources/rss-sources");
const rss_service_1 = require("./rss.service");
const article_service_1 = require("./article.service");
let IngestController = IngestController_1 = class IngestController {
    rssService;
    articleService;
    logger = new common_1.Logger(IngestController_1.name);
    constructor(rssService, articleService) {
        this.rssService = rssService;
        this.articleService = articleService;
    }
    fetchOpenAIFeed(query) {
        const source = rss_sources_1.RSS_SOURCES.find((item) => item.id === 'openai');
        if (!source)
            return [];
        return this.rssService.fetchAndParse(source, query);
    }
    async previewSource(sourceId) {
        const source = rss_sources_1.RSS_SOURCES.find((s) => s.id === sourceId);
        if (!source)
            return { error: `Unknown source: ${sourceId}` };
        const { data } = await this.rssService.fetchAndParse(source, { page: 1, take: 50 });
        return {
            sourceId,
            urls: source.urls,
            count: data.length,
            items: data.map((i) => ({
                title: i.title,
                link: i.link,
                publishedAt: i.publishedAt,
                guid: i.guid,
            })),
        };
    }
    backfillVietnamese() {
        this.articleService.backfillVietnamese().catch((err) => this.logger.error(`backfill-vi failed: ${err.message}`));
        return { message: 'Backfill started — check server logs for progress' };
    }
    resetAll() {
        return this.articleService.resetAll();
    }
    ingestAll() {
        this.articleService.ingestAll().catch((err) => this.logger.error(`ingestAll failed: ${err.message}`));
        return { message: 'Ingest started — check server logs for progress' };
    }
    ingestSource(sourceId) {
        this.articleService.ingestSource(sourceId).catch((err) => this.logger.error(`ingestSource(${sourceId}) failed: ${err.message}`));
        return { message: `Ingest started for ${sourceId} — check server logs for progress` };
    }
};
exports.IngestController = IngestController;
__decorate([
    (0, common_1.Get)('openai'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fetch_rss_query_dto_1.FetchRssQueryDto]),
    __metadata("design:returntype", void 0)
], IngestController.prototype, "fetchOpenAIFeed", null);
__decorate([
    (0, common_1.Get)('preview/:sourceId'),
    __param(0, (0, common_1.Param)('sourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IngestController.prototype, "previewSource", null);
__decorate([
    (0, common_1.Get)('backfill-vi'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IngestController.prototype, "backfillVietnamese", null);
__decorate([
    (0, common_1.Delete)('reset'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IngestController.prototype, "resetAll", null);
__decorate([
    (0, common_1.Get)('run'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IngestController.prototype, "ingestAll", null);
__decorate([
    (0, common_1.Get)('run/:sourceId'),
    __param(0, (0, common_1.Param)('sourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IngestController.prototype, "ingestSource", null);
exports.IngestController = IngestController = IngestController_1 = __decorate([
    (0, common_1.Controller)('ingest'),
    __metadata("design:paramtypes", [rss_service_1.RssService,
        article_service_1.ArticleService])
], IngestController);
//# sourceMappingURL=ingest.controller.js.map