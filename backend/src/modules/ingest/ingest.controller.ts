import { Controller, Get, Param, Query } from '@nestjs/common'
import { FetchRssQueryDto } from './dto/fetch-rss-query.dto'
import { RSS_SOURCES } from '../sources/rss-sources'
import { RssService } from './rss.service'
import { ArticleService } from './article.service'

@Controller('ingest')
export class IngestController {
  constructor(
    private readonly rssService: RssService,
    private readonly articleService: ArticleService,
  ) {}

  @Get('openai')
  fetchOpenAIFeed(@Query() query: FetchRssQueryDto) {
    const source = RSS_SOURCES.find((item) => item.id === 'openai')
    if (!source) return []

    return this.rssService.fetchAndParse(source, query)
  }

  @Get('run')
  ingestAll() {
    return this.articleService.ingestAll()
  }

  @Get('run/:sourceId')
  ingestSource(@Param('sourceId') sourceId: string) {
    return this.articleService.ingestSource(sourceId)
  }
}
