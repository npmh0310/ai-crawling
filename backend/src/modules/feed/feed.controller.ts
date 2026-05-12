import { Controller, Get, HttpCode, Param, Patch, Query } from '@nestjs/common'
import { FeedService } from './feed.service'
import { FeedQueryDto, LangParam, SearchQueryDto } from './dto/feed-query.dto'

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  getFeeds(@Query() query: FeedQueryDto) {
    return this.feedService.getFeeds(query)
  }

  @Get('crawl-stats')
  getCrawlStats() {
    return this.feedService.getCrawlStats()
  }

  @Get('search')
  searchFeeds(@Query() query: SearchQueryDto) {
    return this.feedService.searchFeeds(query)
  }

  @Patch('read-all')
  @HttpCode(200)
  markAllAsRead() {
    return this.feedService.markAllAsRead()
  }

  @Get(':id')
  getFeedById(@Param('id') id: string, @Query('lang') lang?: LangParam) {
    return this.feedService.getFeedById(id, lang)
  }

  @Patch(':id/read')
  @HttpCode(200)
  markAsRead(@Param('id') id: string) {
    return this.feedService.markAsRead(id)
  }
}
