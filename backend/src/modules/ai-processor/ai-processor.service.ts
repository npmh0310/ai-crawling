import { Injectable, Logger } from '@nestjs/common'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildAnalyzePrompt } from './prompts/analyze-article.prompt'
import { CONFIG } from '../../config'
import { sanitizeString, sanitizeStringArray } from '../../common/utils/content-quality.util'

export type AiAnalysisResult = {
  category: string
  titleVi: string
  bodyVi: string
  takeaways: string[]
  takeawaysVi: string[]
  tags: string[]
}

const FALLBACK: AiAnalysisResult = { category: 'general', titleVi: '', bodyVi: '', takeaways: [], takeawaysVi: [], tags: [] }

type RawAnalysis = {
  category?: string
  title_vi?: string
  body_vi?: string
  takeaways_en?: string[]
  takeaways_vi?: string[]
  tags?: string[]
}

function extractJsonObject(text: string): string | null {
  const start = text.indexOf('{')
  if (start === -1) return null
  let depth = 0
  let inString = false
  let escape = false
  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (escape) { escape = false; continue }
    if (ch === '\\' && inString) { escape = true; continue }
    if (ch === '"') { inString = !inString; continue }
    if (inString) continue
    if (ch === '{') depth++
    else if (ch === '}') { depth--; if (depth === 0) return text.slice(start, i + 1) }
  }
  return null
}

@Injectable()
export class AiProcessorService {
  private readonly logger = new Logger(AiProcessorService.name)
  private readonly model = new GoogleGenerativeAI(
    process.env.GOOGLE_AI_API_KEY ?? '',
  ).getGenerativeModel(
    {
      model: process.env.AI_MODEL ?? CONFIG.ai.defaultModel,
      generationConfig: { responseMimeType: 'application/json' },
    },
    { timeout: 120000 },
  )

  async analyze(title: string, content: string, company: string): Promise<AiAnalysisResult> {
    const prompt = buildAnalyzePrompt(title, content, company)
    return this.runAnalysis(prompt, title)
  }

  private async runAnalysis(prompt: string, label: string): Promise<AiAnalysisResult> {
    try {
      const result = await this.model.generateContent(prompt)
      const text = result.response.text().trim()

      const stripped = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim()
      const jsonStr = extractJsonObject(stripped)
      if (!jsonStr) throw new Error(`No JSON object in response: ${stripped.slice(0, 100)}`)
      const parsed = JSON.parse(jsonStr) as RawAnalysis

      const isPromptEcho = (arr: unknown): boolean =>
        Array.isArray(arr) && arr.some((s: unknown) => typeof s === 'string' && (s.includes('max') && s.includes('bullet points')))

      const category = parsed.category && !parsed.category.includes('one of:')
        ? parsed.category
        : 'general'

      if (isPromptEcho(parsed.takeaways_en) || isPromptEcho(parsed.takeaways_vi)) {
        this.logger.warn(`AI returned prompt template verbatim for "${label}" — using fallback`)
        return FALLBACK
      }

      const titleVi = sanitizeString(parsed.title_vi)
      const bodyVi = sanitizeString(parsed.body_vi, CONFIG.ai.maxBodyChars)
      const takeaways = sanitizeStringArray(parsed.takeaways_en, CONFIG.ai.maxTakeaways)
      const takeawaysVi = sanitizeStringArray(parsed.takeaways_vi, CONFIG.ai.maxTakeaways)
      const tags = sanitizeStringArray(parsed.tags, CONFIG.ai.maxTags)

      const mostlyEmpty =
        !bodyVi && takeaways.length === 0 && takeawaysVi.length === 0 && tags.length === 0
      if (mostlyEmpty) {
        this.logger.warn(`AI returned mostly junk for "${label}" — using fallback`)
        return FALLBACK
      }

      return { category, titleVi, bodyVi, takeaways, takeawaysVi, tags }
    } catch (err) {
      this.logger.warn(`AI analysis failed for "${label}": ${(err as Error).message}`)
      return FALLBACK
    }
  }
}
