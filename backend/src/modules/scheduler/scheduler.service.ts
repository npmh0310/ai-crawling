import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ArticleService } from '../ingest/article.service'
import { TwitterService } from '../ingest/twitter.service'
import { CONFIG } from '../../config'

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name)

  constructor(
    private readonly articleService: ArticleService,
    private readonly twitterService: TwitterService,
  ) {}

  @Cron(process.env.CRON_SCHEDULE ?? CONFIG.scheduler.defaultCron)
  async handleRssCron() {
    this.logger.log('RSS cron triggered — starting ingest')
    try {
      const results = await this.articleService.ingestAll()
      const totalNew = results.reduce((sum, r) => sum + r.inserted, 0)
      this.logger.log(`RSS cron finished — ${totalNew} new items across ${results.length} sources`)
    } catch (err) {
      this.logger.error(`RSS cron failed: ${(err as Error).message}`)
    }
  }

  @Cron(CONFIG.twitter.cronSchedule)
  async handleTwitterCron() {
    this.logger.log('Twitter cron triggered')
    try {
      const results = await this.twitterService.ingestAll()
      const totalNew = results.reduce((sum, r) => sum + r.inserted, 0)
      this.logger.log(`Twitter cron finished — ${totalNew} new tweets across ${results.length} accounts`)
    } catch (err) {
      this.logger.error(`Twitter cron failed: ${(err as Error).message}`)
    }
  }
}
