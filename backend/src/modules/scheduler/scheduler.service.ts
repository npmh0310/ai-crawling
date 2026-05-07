import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ArticleService } from '../ingest/article.service'
import { CONFIG } from '../../config'

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name)

  constructor(private readonly articleService: ArticleService) {}

  @Cron(process.env.CRON_SCHEDULE ?? CONFIG.scheduler.defaultCron)
  async handleCron() {
    this.logger.log('Cron triggered — starting ingest')
    try {
      const results = await this.articleService.ingestAll()
      const totalNew = results.reduce((sum, r) => sum + r.inserted, 0)
      this.logger.log(`Cron finished — ${totalNew} new items across ${results.length} sources`)
    } catch (err) {
      this.logger.error(`Cron failed: ${(err as Error).message}`)
    }
  }
}
