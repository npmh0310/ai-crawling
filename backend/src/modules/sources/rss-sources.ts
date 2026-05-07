export type RssSource = {
  id: string
  company: 'OpenAI' | 'Anthropic' | 'Google' | 'Meta' | 'xAI' | 'NVIDIA'
  name: string
  urls: string[]
}

function rsshub(path: string): string {
  const base = (process.env.RSSHUB_BASE_URL ?? 'https://rsshub.app').replace(/\/$/, '')
  return `${base}${path}`
}

export const RSS_SOURCES: RssSource[] = [
  {
    id: 'openai',
    company: 'OpenAI',
    name: 'OpenAI News',
    urls: [rsshub('/openai/news')],
  },
  {
    id: 'anthropic',
    company: 'Anthropic',
    name: 'Anthropic News',
    urls: [rsshub('/anthropic/news')],
  },
  {
    id: 'google-deepmind',
    company: 'Google',
    name: 'Google DeepMind',
    urls: [rsshub('/deepmind/blog')],
  },
  {
    id: 'meta-ai',
    company: 'Meta',
    name: 'Meta AI Blog',
    urls: [rsshub('/meta/ai/blog')],
  },
  {
    id: 'nvidia-ai',
    company: 'NVIDIA',
    name: 'NVIDIA Blog',
    urls: ['https://feeds.feedburner.com/nvidiablog'],
  },
]

export function getRssSource(sourceId: string) {
  return RSS_SOURCES.find((source) => source.id === sourceId)
}
