"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AiProcessorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiProcessorService = void 0;
const common_1 = require("@nestjs/common");
const generative_ai_1 = require("@google/generative-ai");
const analyze_article_prompt_1 = require("./prompts/analyze-article.prompt");
const FALLBACK = { category: 'general', takeaways: [], tags: [] };
let AiProcessorService = AiProcessorService_1 = class AiProcessorService {
    logger = new common_1.Logger(AiProcessorService_1.name);
    model = new generative_ai_1.GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY ?? '').getGenerativeModel({ model: 'gemini-1.5-flash' });
    async analyze(title, content, company) {
        try {
            const prompt = (0, analyze_article_prompt_1.buildAnalyzePrompt)(title, content, company);
            const result = await this.model.generateContent(prompt);
            const text = result.response.text().trim();
            const json = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
            const parsed = JSON.parse(json);
            return {
                category: parsed.category ?? 'general',
                takeaways: Array.isArray(parsed.takeaways) ? parsed.takeaways.slice(0, 3) : [],
                tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 5) : [],
            };
        }
        catch (err) {
            this.logger.warn(`AI analysis failed for "${title}": ${err.message}`);
            return FALLBACK;
        }
    }
};
exports.AiProcessorService = AiProcessorService;
exports.AiProcessorService = AiProcessorService = AiProcessorService_1 = __decorate([
    (0, common_1.Injectable)()
], AiProcessorService);
//# sourceMappingURL=ai-processor.service.js.map