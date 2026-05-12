export const JUNK_TITLE_VALUES = ['...', '…', '....', '.....', '']

const TITLE_MIN_LENGTH = 5
const FIELD_MIN_LENGTH = 3
const JUNK_PATTERN = /^[.\s…•\-*#]+$/

export function isJunkValue(value: string): boolean {
  const trimmed = value.trim()
  if (trimmed.length < FIELD_MIN_LENGTH) return true
  if (JUNK_PATTERN.test(trimmed)) return true
  if (trimmed === 'string') return true
  return false
}

export function isUsableTitle(title: string | null | undefined): boolean {
  if (!title) return false
  const trimmed = title.trim()
  if (trimmed.length < TITLE_MIN_LENGTH) return false
  if (JUNK_TITLE_VALUES.includes(trimmed)) return false
  if (JUNK_PATTERN.test(trimmed)) return false
  return true
}

export function sanitizeString(value: unknown, maxLen?: number): string {
  if (typeof value !== 'string') return ''
  if (isJunkValue(value)) return ''
  return maxLen ? value.slice(0, maxLen) : value
}

export function sanitizeStringArray(value: unknown, maxItems: number): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((v): v is string => typeof v === 'string' && !isJunkValue(v))
    .slice(0, maxItems)
}
