"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestModule = void 0;
const common_1 = require("@nestjs/common");
const ingest_controller_1 = require("./ingest.controller");
const rss_service_1 = require("./rss.service");
const article_crawler_service_1 = require("./article-crawler.service");
const article_service_1 = require("./article.service");
const ai_processor_module_1 = require("../ai-processor/ai-processor.module");
const prisma_module_1 = require("../../prisma/prisma.module");
let IngestModule = class IngestModule {
};
exports.IngestModule = IngestModule;
exports.IngestModule = IngestModule = __decorate([
    (0, common_1.Module)({
        imports: [ai_processor_module_1.AiProcessorModule, prisma_module_1.PrismaModule],
        controllers: [ingest_controller_1.IngestController],
        providers: [rss_service_1.RssService, article_crawler_service_1.ArticleCrawlerService, article_service_1.ArticleService],
        exports: [article_service_1.ArticleService],
    })
], IngestModule);
//# sourceMappingURL=ingest.module.js.map