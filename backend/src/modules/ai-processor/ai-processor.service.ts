import { Injectable, Logger } from '@nestjs/common'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildAnalyzePrompt } from './prompts/analyze-article.prompt'

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
  ).getGenerativeModel({ model: 'gemini-1.5-flash' })

  async analyze(title: string, content: string, company: string): Promise<AiAnalysisResult> {
    try {
      const prompt = buildAnalyzePrompt(title, content, company)

      const result = await this.model.generateContent(prompt)
      const text = result.response.text().trim()
      const json = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim()
      const parsed = JSON.parse(json) as AiAnalysisResult

      return {
        category: parsed.category ?? 'general',
        takeaways: Array.isArray(parsed.takeaways) ? parsed.takeaways.slice(0, 3) : [],
        tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 5) : [],
      }
    } catch (err) {
      this.logger.warn(`AI analysis failed for "${title}": ${(err as Error).message}`)
      return FALLBACK
    }
  }
}
