"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAnalyzePrompt = buildAnalyzePrompt;
const config_1 = require("../../../config");
function buildAnalyzePrompt(title, content, company) {
    return `Analyze this AI industry article and return JSON only, no markdown.

Company: ${company}
Title: ${title}
Content: ${content.slice(0, config_1.CONFIG.ai.promptContentLength)}

Return exactly this JSON shape:
{
  "category": "one of: model-release | product-update | research | safety | policy | business | general",
  "takeaways": ["max ${config_1.CONFIG.ai.maxTakeaways} concise bullet points as plain strings"],
  "tags": ["max ${config_1.CONFIG.ai.maxTags} lowercase keyword tags"]
}`;
}
//# sourceMappingURL=analyze-article.prompt.js.map