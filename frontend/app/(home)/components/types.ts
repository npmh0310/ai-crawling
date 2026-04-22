export type SourceType = "all" | "news" | "social"
export type Company = "OpenAI" | "Anthropic" | "Google" | "Meta" | "Mistral" | "NVIDIA"

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
}

export const COMPANIES: Company[] = ["OpenAI", "Anthropic", "Google", "Meta", "Mistral", "NVIDIA"]

export const FEED_ITEMS: FeedItem[] = [
  {
    id: "1",
    company: "OpenAI",
    sourceType: "news",
    category: "model",
    timeAgo: "2H AGO",
    title: "GPT-4o mini now supports fine-tuning with multimodal inputs",
    body: "Developers can now train vision-capable models on custom datasets for visual reasoning tasks.",
  },
  {
    id: "2",
    company: "Anthropic",
    sourceType: "social",
    category: "model",
    timeAgo: "45M AGO",
    title: "Claude 3.5 Sonnet Artifacts update",
    quote: "Just pushed a massive update to how Sonnet handles SVG rendering in Artifacts. Seeing 2x speed for complex animations.",
    handle: "@amodei_research",
    takeaways: [
      "Direct impact on production latency by up to 24%.",
      "Requires latest SDK version (v4.12+) for integration.",
      "Open-weights availability is still pending confirmation.",
    ],
    tags: ["ProductionAI", "Optimized", "DevTools"],
  },
  {
    id: "3",
    company: "Anthropic",
    sourceType: "news",
    category: "research",
    timeAgo: "4H AGO",
    title: "New research paper on mechanical interpretability in Claude 3.5 Sonnet",
    body: "Anthropic engineers identify high-level features responsible for coding and logical reasoning paths.",
    takeaways: [
      "Identifies 12 circuit-level features linked to logical reasoning.",
      "Published alongside reproducible benchmarks for the community.",
    ],
    tags: ["Interpretability", "Research", "Safety"],
  },
  {
    id: "4",
    company: "OpenAI",
    sourceType: "social",
    category: "api",
    timeAgo: "1H AGO",
    title: "Future of Search",
    quote: "search is going to look very different in a few months. we are shipping some prototypes soon.",
    handle: "@sama",
    tags: ["Search", "OpenAI", "Product"],
  },
  {
    id: "5",
    company: "Google",
    sourceType: "news",
    category: "api",
    timeAgo: "5H AGO",
    title: "Gemini 1.5 Pro context window expanded to 2M tokens for all developers",
    body: "The long-context model is now generally available to all developers via the Gemini API.",
    takeaways: [
      "2M token window now available on free and paid tiers.",
      "Pricing unchanged from 1M token tier for the first 90 days.",
    ],
    tags: ["Gemini", "LongContext", "API"],
  }, {
    id: "6",
    company: "Google",
    sourceType: "news",
    category: "api",
    timeAgo: "5H AGO",
    title: "Gemini 1.5 Pro context window expanded to 2M tokens for all developers",
    body: "The long-context model is now generally available to all developers via the Gemini API.",
  }, {
    id: "7",
    company: "Google",
    sourceType: "news",
    category: "api",
    timeAgo: "5H AGO",
    title: "Gemini 1.5 Pro context window expanded to 2M tokens for all developers",
    body: "The long-context model is now generally available to all developers via the Gemini API.",
  }, {
    id: "8",
    company: "Google",
    sourceType: "news",
    category: "api",
    timeAgo: "5H AGO",
    title: "Gemini 1.5 Pro context window expanded to 2M tokens for all developers",
    body: "The long-context model is now generally available to all developers via the Gemini API.",
  }, {
    id: "9",
    company: "Google",
    sourceType: "news",
    category: "api",
    timeAgo: "5H AGO",
    title: "Gemini 1.5 Pro context window expanded to 2M tokens for all developers",
    body: "The long-context model is now generally available to all developers via the Gemini API.",
  },
]
