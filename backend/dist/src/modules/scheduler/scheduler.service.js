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
var SchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const article_service_1 = require("../ingest/article.service");
const config_1 = require("../../config");
let SchedulerService = SchedulerService_1 = class SchedulerService {
    articleService;
    logger = new common_1.Logger(SchedulerService_1.name);
    constructor(articleService) {
        this.articleService = articleService;
    }
    async handleCron() {
        this.logger.log('Cron triggered — starting ingest');
        try {
            const results = await this.articleService.ingestAll();
            const totalNew = results.reduce((sum, r) => sum + r.inserted, 0);
            this.logger.log(`Cron finished — ${totalNew} new items across ${results.length} sources`);
        }
        catch (err) {
            this.logger.error(`Cron failed: ${err.message}`);
        }
    }
};
exports.SchedulerService = SchedulerService;
__decorate([
    (0, schedule_1.Cron)(process.env.CRON_SCHEDULE ?? config_1.CONFIG.scheduler.defaultCron),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "handleCron", null);
exports.SchedulerService = SchedulerService = SchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], SchedulerService);
//# sourceMappingURL=scheduler.service.js.map