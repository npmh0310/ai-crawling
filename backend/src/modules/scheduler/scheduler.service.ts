import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { PrismaService } from '../../prisma/prisma.service'
import { ArticleService } from '../ingest/article.service'

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly articleService: ArticleService,
  ) {}

  @Cron(process.env.CRON_SCHEDULE ?? '0 6,12,18,0 * * *')
  async handleCron() {
    this.logger.log('Cron triggered — starting ingest')

    const log = await this.prisma.crawlLog.create({
      data: {
        sourceId: 'openai',
        status: 'partial',
        startedAt: new Date(),
      },
    })

    try {
      const results = await this.articleService.ingestAll()
      const totalNew = results.reduce((sum, r) => sum + r.inserted, 0)

      await this.prisma.crawlLog.update({
        where: { id: log.id },
        data: {
          status: 'success',
          itemsNew: totalNew,
          finishedAt: new Date(),
        },
      })

      this.logger.log(`Cron finished — ${totalNew} new items inserted`)
    } catch (err) {
      await this.prisma.crawlLog.update({
        where: { id: log.id },
        data: {
          status: 'failed',
          errorMsg: (err as Error).message,
          finishedAt: new Date(),
        },
      })
      this.logger.error(`Cron failed: ${(err as Error).message}`)
    }
  }
}
