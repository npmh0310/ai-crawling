import { Controller, Delete, Get, Param, Query } from '@nestjs/common'
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

  @Delete('reset')
  resetAll() {
    return this.articleService.resetAll()
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
