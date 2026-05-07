import { CONFIG } from '../../../config'

export function buildAnalyzePrompt(title: string, content: string, company: string): string {
  return `Analyze this AI industry article and return JSON only, no markdown.

Company: ${company}
Title: ${title}
Content: ${content.slice(0, CONFIG.ai.promptContentLength)}

Return exactly this JSON shape:
{
  "category": "one of: model-release | product-update | research | safety | policy | business | general",
  "title_vi": "Vietnamese translation of the title",
  "body_vi": "Vietnamese summary of the article in under 150 words",
  "takeaways_en": ["max ${CONFIG.ai.maxTakeaways} concise bullet points in English"],
  "takeaways_vi": ["max ${CONFIG.ai.maxTakeaways} concise bullet points in Vietnamese"],
  "tags": ["max ${CONFIG.ai.maxTags} lowercase keyword tags"]
}`
}
