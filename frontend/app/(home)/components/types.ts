export type SourceType = "all" | "news" | "social"
export type Company = "OpenAI" | "Anthropic" | "Google" | "Meta" | "Mistral" | "NVIDIA" | "xAI"

export type FeedItem = {
  id: string
  company: Company
  sourceType: "news" | "social"
  category: string
  timeAgo: string
  title: string
  body?: string
  quote?: string
  handle?: string
  takeaways?: string[]
  tags?: string[]
  originalUrl?: string
  isRead: boolean
}

export const COMPANIES: Company[] = ["OpenAI", "Anthropic", "Google", "Meta", "Mistral", "NVIDIA", "xAI"]
