"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ArticleCrawlerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleCrawlerService = void 0;
const common_1 = require("@nestjs/common");
const article_extractor_1 = require("@extractus/article-extractor");
let ArticleCrawlerService = ArticleCrawlerService_1 = class ArticleCrawlerService {
    logger = new common_1.Logger(ArticleCrawlerService_1.name);
    async fetchArticleContent(url) {
        try {
            const article = await (0, article_extractor_1.extract)(url, {}, {
                headers: {
                    'user-agent': 'Mozilla/5.0 (compatible; ai-crawling-bot/1.0)',
                    accept: 'text/html,application/xhtml+xml',
                },
            });
            if (!article?.content)
                return null;
            const plainText = this.stripHtml(article.content);
            if (plainText.length < 100)
                return null;
            return {
                title: article.title ?? '',
                content: plainText.slice(0, 4000),
                url,
            };
        }
        catch (err) {
            this.logger.warn(`Failed to fetch article: ${url} — ${err.message}`);
            return null;
        }
    }
    stripHtml(html) {
        return html
            .replace(/<[^>]+>/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/\s{2,}/g, ' ')
            .trim();
    }
};
exports.ArticleCrawlerService = ArticleCrawlerService;
exports.ArticleCrawlerService = ArticleCrawlerService = ArticleCrawlerService_1 = __decorate([
    (0, common_1.Injectable)()
], ArticleCrawlerService);
//# sourceMappingURL=article-crawler.service.js.map