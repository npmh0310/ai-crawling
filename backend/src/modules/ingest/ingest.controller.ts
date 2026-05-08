import { Controller, Delete, Get, Logger, Param, Query } from '@nestjs/common'
import { FetchRssQueryDto } from './dto/fetch-rss-query.dto'
import { RSS_SOURCES } from '../sources/rss-sources'
import { RssService } from './rss.service'
import { ArticleService } from './article.service'
import { TwitterService } from './twitter.service'

@Controller('ingest')
export class IngestController {
  private readonly logger = new Logger(IngestController.name)

  constructor(
    private readonly rssService: RssService,
    private readonly articleService: ArticleService,
    private readonly twitterService: TwitterService,
  ) {}

  @Get('openai')
  fetchOpenAIFeed(@Query() query: FetchRssQueryDto) {
    const source = RSS_SOURCES.find((item) => item.id === 'openai')
    if (!source) return []

    return this.rssService.fetchAndParse(source, query)
  }

  @Get('preview/:sourceId')
  async previewSource(@Param('sourceId') sourceId: string) {
    const source = RSS_SOURCES.find((s) => s.id === sourceId)
    if (!source) return { error: `Unknown source: ${sourceId}` }

    const { data } = await this.rssService.fetchAndParse(source, { page: 1, take: 50 })
    return {
      sourceId,
      urls: source.urls,
      count: data.length,
      items: data.map((i) => ({
        title: i.title,
        link: i.link,
        publishedAt: i.publishedAt,
        guid: i.guid,
      })),
    }
  }

  @Get('backfill-vi')
  backfillVietnamese() {
    this.articleService.backfillVietnamese().catch((err) =>
      this.logger.error(`backfill-vi failed: ${err.message}`),
    )
    return { message: 'Backfill started — check server logs for progress' }
  }

  @Delete('reset')
  resetAll() {
    return this.articleService.resetAll()
  }

  @Get('run')
  ingestAll() {
    this.articleService.ingestAll().catch((err) =>
      this.logger.error(`ingestAll failed: ${err.message}`),
    )
    return { message: 'Ingest started — check server logs for progress' }
  }

  @Get('run/:sourceId')
  ingestSource(@Param('sourceId') sourceId: string) {
    this.articleService.ingestSource(sourceId).catch((err) =>
      this.logger.error(`ingestSource(${sourceId}) failed: ${err.message}`),
    )
    return { message: `Ingest started for ${sourceId} — check server logs for progress` }
  }

  @Get('twitter/run')
  ingestAllTwitter() {
    this.twitterService.ingestAll().catch((err) =>
      this.logger.error(`Twitter ingestAll failed: ${err.message}`),
    )
    return { message: 'Twitter ingest started' }
  }

  @Get('twitter/run/:handle')
  ingestTwitterAccount(@Param('handle') handle: string) {
    const sourceId = `twitter-${handle.toLowerCase()}`
    this.twitterService.ingestAccount(sourceId).catch((err) =>
      this.logger.error(`Twitter ingestAccount(@${handle}) failed: ${err.message}`),
    )
    return { message: `Twitter ingest started for @${handle}` }
  }

  @Get('twitter/preview/:handle')
  previewTwitterAccount(@Param('handle') handle: string) {
    return this.twitterService.previewAccount(handle)
  }
}
