export type TwitterSource = {
  id: string
  handle: string
  name: string
  company: 'OpenAI' | 'Anthropic' | 'Google' | 'Meta' | 'xAI' | 'NVIDIA' | 'Independent'
  description: string
}

export const TWITTER_SOURCES: TwitterSource[] = [
  {
    id: 'twitter-sama',
    handle: 'sama',
    name: 'Sam Altman',
    company: 'OpenAI',
    description: 'CEO of OpenAI',
  },
  {
    id: 'twitter-elonmusk',
    handle: 'elonmusk',
    name: 'Elon Musk',
    company: 'xAI',
    description: 'CEO of xAI and Tesla',
  },
  {
    id: 'twitter-demishassabis',
    handle: 'demishassabis',
    name: 'Demis Hassabis',
    company: 'Google',
    description: 'CEO of Google DeepMind',
  },
  {
    id: 'twitter-ylecun',
    handle: 'ylecun',
    name: 'Yann LeCun',
    company: 'Meta',
    description: 'Chief AI Scientist at Meta',
  },
  {
    id: 'twitter-karpathy',
    handle: 'karpathy',
    name: 'Andrej Karpathy',
    company: 'Independent',
    description: 'AI researcher, ex-OpenAI/Tesla',
  },
  {
    id: 'twitter-andrewng',
    handle: 'AndrewYNg',
    name: 'Andrew Ng',
    company: 'Independent',
    description: 'AI pioneer, founder of deeplearning.ai',
  },
  {
    id: 'twitter-gdb',
    handle: 'gdb',
    name: 'Greg Brockman',
    company: 'OpenAI',
    description: 'President of OpenAI',
  },
  {
    id: 'twitter-darioamodei',
    handle: 'DarioAmodei',
    name: 'Dario Amodei',
    company: 'Anthropic',
    description: 'CEO of Anthropic',
  },
  {
    id: 'twitter-ilyasut',
    handle: 'ilyasut',
    name: 'Ilya Sutskever',
    company: 'Independent',
    description: 'Co-founder of Safe Superintelligence',
  },
]

export function getTwitterSource(sourceId: string) {
  return TWITTER_SOURCES.find((s) => s.id === sourceId)
}
