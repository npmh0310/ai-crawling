// Hot news scoring — see docs/hot-news-scoring.md for formula rationale.

export type HotScoreInput = {
  publishedAt: Date
  sourceType: string
  company: string
  handle: string | null
  category: string
  title: string
  takeaways: string[]
}

export type HotScoreBreakdown = {
  total: number
  recency: number
  authority: number
  keywords: number
  category: number
  depth: number
}

export const HOT_THRESHOLD = 60

// CEO/founder/exec handles whose tweets carry extra signal weight.
const FOUNDER_HANDLES = new Set([
  'sama', 'elonmusk', 'dario_amodei', 'sundarpichai', 'satyanadella',
  'yann_lecun', 'demishassabis', 'gdb', 'ilyasut', 'karpathy',
])

const MAJOR_LABS = new Set(['OpenAI', 'Anthropic', 'Google', 'Meta', 'NVIDIA', 'xAI', 'Mistral'])

const HOT_KEYWORDS = [
  'release', 'launch', 'launches', 'launched', 'launching',
  'introducing', 'introduces', 'introduced',
  'announcing', 'announces', 'announced',
  'ga', 'generally available', 'available now',
  'open source', 'open-source', 'open sourced',
  'funding', 'raised', 'raises', 'acquires', 'acquired', 'acquisition',
  'partnership', 'partners with',
  'new model', 'breakthrough', 'beats', 'benchmark', 'sota', 'state of the art',
]

const CATEGORY_TIER_HIGH = ['model release', 'product launch', 'funding', 'acquisition', 'breakthrough']
const CATEGORY_TIER_MID = ['research', 'paper', 'update', 'feature']

function recencyScore(publishedAt: Date, now: Date): number {
  const hours = (now.getTime() - publishedAt.getTime()) / 3_600_000
  if (hours < 1) return 40
  if (hours < 6) return 32
  if (hours < 24) return 22
  if (hours < 72) return 10
  if (hours < 168) return 4
  return 0
}

function authorityScore(input: HotScoreInput): number {
  if (input.sourceType === 'news') return 20

  const handleNormalized = (input.handle ?? '').toLowerCase().replace(/^@/, '').trim()
  if (handleNormalized && FOUNDER_HANDLES.has(handleNormalized)) return 18

  if (MAJOR_LABS.has(input.company)) return 10
  if (input.company === 'Independent') return 8
  if (input.company === 'Reddit') return 6
  return 5
}

function keywordScore(title: string): number {
  const lower = title.toLowerCase()
  const matched = new Set<string>()

  for (const kw of HOT_KEYWORDS) {
    if (matched.has(kw)) continue
    // word-ish boundary: ensure kw isn't embedded inside a longer alphanumeric token
    const idx = lower.indexOf(kw)
    if (idx === -1) continue
    const before = idx === 0 ? '' : lower[idx - 1]
    const after = lower[idx + kw.length] ?? ''
    if (/[a-z0-9]/.test(before)) continue
    if (/[a-z0-9]/.test(after)) continue
    matched.add(kw)
  }

  return Math.min(20, matched.size * 4)
}

function categoryScore(category: string): number {
  const lower = (category ?? '').toLowerCase()
  if (!lower) return 0
  for (const k of CATEGORY_TIER_HIGH) if (lower.includes(k)) return 10
  for (const k of CATEGORY_TIER_MID) if (lower.includes(k)) return 6
  return 0
}

function depthScore(takeaways: string[]): number {
  const n = takeaways?.length ?? 0
  if (n >= 3) return 10
  if (n === 2) return 6
  if (n === 1) return 3
  return 0
}

export function computeHotScore(input: HotScoreInput, now: Date = new Date()): HotScoreBreakdown {
  const recency = recencyScore(input.publishedAt, now)
  const authority = authorityScore(input)
  const keywords = keywordScore(input.title ?? '')
  const category = categoryScore(input.category)
  const depth = depthScore(input.takeaways ?? [])
  return {
    total: recency + authority + keywords + category + depth,
    recency,
    authority,
    keywords,
    category,
    depth,
  }
}
