export type RedditSource = {
  id: string
  subreddit: string
  name: string
  description: string
  minScore: number
  flairWhitelist?: string[]
  flairBlacklist?: string[]
}

export const REDDIT_SOURCES: RedditSource[] = [
  {
    id: 'reddit-localllama',
    subreddit: 'LocalLLaMA',
    name: 'r/LocalLLaMA',
    description: 'Open-source LLM news (Llama, Mistral, Qwen, DeepSeek)',
    minScore: 100,
    flairBlacklist: ['Funny', 'Question | Help', 'Other'],
  },
  {
    id: 'reddit-singularity',
    subreddit: 'singularity',
    name: 'r/singularity',
    description: 'AGI / frontier model news',
    minScore: 300,
    flairBlacklist: ['Discussion', 'Memes', 'Shitposting'],
  },
  {
    id: 'reddit-machinelearning',
    subreddit: 'MachineLearning',
    name: 'r/MachineLearning',
    description: 'Research papers & technical discussion',
    minScore: 50,
    flairWhitelist: ['[R]', '[N]', '[P]', '[D]'],
  },
  {
    id: 'reddit-stablediffusion',
    subreddit: 'StableDiffusion',
    name: 'r/StableDiffusion',
    description: 'Image / video generation news',
    minScore: 200,
    flairBlacklist: ['Question - Help', 'Meme', 'No Workflow'],
  },
  {
    id: 'reddit-openai',
    subreddit: 'OpenAI',
    name: 'r/OpenAI',
    description: 'OpenAI ecosystem',
    minScore: 200,
  },
  {
    id: 'reddit-claudeai',
    subreddit: 'ClaudeAI',
    name: 'r/ClaudeAI',
    description: 'Anthropic Claude ecosystem',
    minScore: 100,
  },
  {
    id: 'reddit-aiagents',
    subreddit: 'AI_Agents',
    name: 'r/AI_Agents',
    description: 'Agent frameworks & tooling',
    minScore: 50,
  },
]

export function getRedditSource(sourceId: string) {
  return REDDIT_SOURCES.find((s) => s.id === sourceId)
}
