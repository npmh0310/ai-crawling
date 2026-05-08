import { Injectable, Logger } from '@nestjs/common'
import { CONFIG } from '../../config'

export type RawTweet = {
  id: string
  text: string
  created_at: string
  url: string
  metrics: {
    like_count: number
    retweet_count: number
    reply_count: number
  }
}

type ServiceResponse = {
  handle: string
  count: number
  tweets: RawTweet[]
}

@Injectable()
export class TwitterCrawlerService {
  private readonly logger = new Logger(TwitterCrawlerService.name)
  private readonly baseUrl = CONFIG.twitter.serviceUrl

  async fetchTweets(handle: string, sinceId?: string | null): Promise<RawTweet[]> {
    const params = new URLSearchParams({ limit: '20' })
    if (sinceId) params.set('since_id', sinceId)

    const url = `${this.baseUrl}/tweets/${handle}?${params.toString()}`

    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30_000) })
      if (!res.ok) {
        const body = await res.text()
        throw new Error(`Twitter service HTTP ${res.status}: ${body.slice(0, 200)}`)
      }
      const json = (await res.json()) as ServiceResponse
      return json.tweets ?? []
    } catch (err) {
      this.logger.error(
        `Failed to fetch tweets for @${handle}: ${(err as Error).message}`,
      )
      return []
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, {
        signal: AbortSignal.timeout(5_000),
      })
      return res.ok
    } catch {
      return false
    }
  }
}
