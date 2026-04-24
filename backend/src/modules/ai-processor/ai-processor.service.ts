import { Injectable, Logger } from '@nestjs/common'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildAnalyzePrompt } from './prompts/analyze-article.prompt'
import { CONFIG } from '../../config'

export type AiAnalysisResult = {
  category: string
  takeaways: string[]
  tags: string[]
}

const FALLBACK: AiAnalysisResult = { category: 'general', takeaways: [], tags: [] }

@Injectable()
export class AiProcessorService {
  private readonly logger = new Logger(AiProcessorService.name)
  private readonly model = new GoogleGenerativeAI(
    process.env.GOOGLE_AI_API_KEY ?? '',
  ).getGenerativeModel({
    model: process.env.AI_MODEL ?? CONFIG.ai.defaultModel,
    generationConfig: { responseMimeType: 'application/json' },
  })

  async analyze(title: string, content: string, company: string): Promise<AiAnalysisResult> {
    try {
      const prompt = buildAnalyzePrompt(title, content, company)

      const result = await this.model.generateContent(prompt)
      const text = result.response.text().trim()

      // Strip markdown fences if present, then find the JSON object
      const stripped = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim()
      const start = stripped.indexOf('{')
      const end = stripped.lastIndexOf('}')
      if (start === -1 || end === -1) throw new Error(`No JSON object in response: ${stripped.slice(0, 100)}`)
      const parsed = JSON.parse(stripped.slice(start, end + 1)) as AiAnalysisResult

      return {
        category: parsed.category ?? 'general',
        takeaways: Array.isArray(parsed.takeaways) ? parsed.takeaways.slice(0, CONFIG.ai.maxTakeaways) : [],
        tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, CONFIG.ai.maxTags) : [],
      }
    } catch (err) {
      this.logger.warn(`AI analysis failed for "${title}": ${(err as Error).message}`)
      return FALLBACK
    }
  }
}
