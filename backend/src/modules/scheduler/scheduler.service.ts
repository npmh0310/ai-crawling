import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ArticleService } from '../ingest/article.service'
import { TwitterService } from '../ingest/twitter.service'
import { RedditService } from '../ingest/reddit.service'
import { CONFIG } from '../../config'

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name)
  private isRunning = false

  constructor(
    private readonly articleService: ArticleService,
    private readonly twitterService: TwitterService,
    private readonly redditService: RedditService,
  ) {}

  @Cron(process.env.CRON_SCHEDULE ?? CONFIG.scheduler.defaultCron)
  async handleIngestCron() {
    if (this.isRunning) {
      this.logger.warn('Previous ingest still running — skipping this tick')
      return
    }
    this.isRunning = true
    const startedAt = Date.now()
    this.logger.log('=== Ingest pipeline started ===')

    await this.runStep('RSS', async () => {
      const results = await this.articleService.ingestAll()
      return results.reduce((sum, r) => sum + r.inserted, 0)
    })

    await this.runStep('Twitter', async () => {
      const results = await this.twitterService.ingestAll()
      return results.reduce((sum, r) => sum + r.inserted, 0)
    })

    await this.runStep('Reddit', async () => {
      const results = await this.redditService.ingestAll()
      return results.reduce((sum, r) => sum + r.inserted, 0)
    })

    await this.runStep('Backfill-Vi', async () => {
      const { updated } = await this.articleService.backfillVietnamese()
      return updated
    })

    const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1)
    this.logger.log(`=== Ingest pipeline finished in ${elapsed}s ===`)
    this.isRunning = false
  }

  private async runStep(name: string, fn: () => Promise<number>) {
    this.logger.log(`[${name}] starting`)
    const t0 = Date.now()
    try {
      const count = await fn()
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
      this.logger.log(`[${name}] done — ${count} new items in ${elapsed}s`)
    } catch (err) {
      this.logger.error(`[${name}] failed: ${(err as Error).message}`)
    }
  }
}
