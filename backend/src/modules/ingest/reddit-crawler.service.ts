import { BadRequestException, Injectable, Logger } from '@nestjs/common'

const SUBREDDIT_PATTERN = /^[A-Za-z0-9_]{2,30}$/

export function assertValidSubreddit(subreddit: string): void {
  if (!SUBREDDIT_PATTERN.test(subreddit)) {
    throw new BadRequestException(`Invalid subreddit name: ${subreddit}`)
  }
}

export type RedditPost = {
  id: string
  title: string
  selftext: string
  url: string
  permalink: string
  author: string
  score: number
  num_comments: number
  created_utc: number
  flair: string | null
  is_self: boolean
  over_18: boolean
  domain: string
}

@Injectable()
export class RedditCrawlerService {
  private readonly logger = new Logger(RedditCrawlerService.name)

  private get userAgent(): string {
    return process.env.REDDIT_USER_AGENT ?? 'ai-crawling/0.1 (public-json)'
  }

  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch('https://www.reddit.com/r/LocalLLaMA/top.json?t=day&limit=1', {
        headers: { 'User-Agent': this.userAgent },
      })
      return res.ok
    } catch (err) {
      this.logger.warn(`Reddit health check failed: ${(err as Error).message}`)
      return false
    }
  }

  async fetchTopPosts(
    subreddit: string,
    options: { timeframe?: 'hour' | 'day' | 'week'; limit?: number } = {},
  ): Promise<RedditPost[]> {
    assertValidSubreddit(subreddit)
    const { timeframe = 'day', limit = 50 } = options
    const url = `https://www.reddit.com/r/${subreddit}/top.json?t=${timeframe}&limit=${limit}&raw_json=1`

    const res = await fetch(url, {
      headers: { 'User-Agent': this.userAgent },
    })

    if (res.status === 429) {
      throw new Error(`Reddit rate-limited (429) for r/${subreddit}`)
    }
    if (!res.ok) {
      throw new Error(`Reddit fetch failed for r/${subreddit}: ${res.status} ${await res.text()}`)
    }

    const json = (await res.json()) as {
      data: { children: { data: Record<string, unknown> }[] }
    }

    return json.data.children
      .map((c) => c.data)
      .filter((d) => !d.stickied && !d.over_18)
      .map((d) => ({
        id: String(d.id),
        title: String(d.title ?? ''),
        selftext: String(d.selftext ?? ''),
        url: String(d.url ?? ''),
        permalink: `https://reddit.com${String(d.permalink ?? '')}`,
        author: String(d.author ?? ''),
        score: Number(d.score ?? 0),
        num_comments: Number(d.num_comments ?? 0),
        created_utc: Number(d.created_utc ?? 0),
        flair: typeof d.link_flair_text === 'string' ? d.link_flair_text : null,
        is_self: Boolean(d.is_self),
        over_18: Boolean(d.over_18),
        domain: String(d.domain ?? ''),
      }))
  }
}
