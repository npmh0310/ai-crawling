import {
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedQueryDto } from './dto/feed-query.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  getFeeds(@Query() query: FeedQueryDto) {
    return this.feedService.getFeeds(query);
  }

  @Get(':id')
  getFeedById(@Param('id') id: string) {
    return this.feedService.getFeedById(id);
  }

  @Patch(':id/read')
  @HttpCode(200)
  markAsRead(@Param('id') id: string) {
    return this.feedService.markAsRead(id);
  }
}
