export type RssSource = {
  id: string
  company: 'OpenAI' | 'Anthropic' | 'Google' | 'Meta' | 'xAI' | 'NVIDIA'
  name: string
  urls: string[]
}

export const RSS_SOURCES: RssSource[] = [
  {
    id: 'openai',
    company: 'OpenAI',
    name: 'OpenAI News',
    urls: [
      'https://openai.com/news/rss.xml', // Link chuẩn nhất hiện nay
    ],
  },
  {
    id: 'anthropic',
    company: 'Anthropic',
    name: 'Anthropic News',
    urls: [
      'https://www.anthropic.com/news/rss.xml' 
    ],
  },
  {
    id: 'google-deepmind',
    company: 'Google',
    name: 'Google DeepMind',
    urls: [
      'https://deepmind.google/blog/rss.xml', // Blog chính thức của DeepMind
      'https://blog.google/technology/ai/rss/' // Tin tức AI chung từ Google
    ],
  },
  {
    id: 'meta-ai',
    company: 'Meta',
    name: 'Meta AI Blog',
    urls: [
      'https://ai.meta.com/blog/rss/', // Lưu ý: Meta thỉnh thoảng chặn crawl, cần set User-Agent
    ],
  },
  {
    id: 'xai',
    company: 'xAI',
    name: 'xAI Blog',
    urls: [
      'https://x.ai/blog/rss.xml', // Hiện tại xAI đã hỗ trợ RSS chính thức cho blog
    ],
  },
  {
    id: 'nvidia-ai',
    company: 'NVIDIA',
    name: 'Nvidia AI Blog',
    urls: ['https://blogs.nvidia.com/blog/category/ai/feed/'],
  }
]

export function getRssSource(sourceId: string) {
  return RSS_SOURCES.find((source) => source.id === sourceId)
}
