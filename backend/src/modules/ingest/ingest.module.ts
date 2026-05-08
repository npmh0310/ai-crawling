import { Module } from '@nestjs/common'
import { IngestController } from './ingest.controller'
import { RssService } from './rss.service'
import { ArticleCrawlerService } from './article-crawler.service'
import { ArticleService } from './article.service'
import { TwitterCrawlerService } from './twitter-crawler.service'
import { TwitterService } from './twitter.service'
import { AiProcessorModule } from '../ai-processor/ai-processor.module'
import { PrismaModule } from '../../prisma/prisma.module'

@Module({
  imports: [AiProcessorModule, PrismaModule],
  controllers: [IngestController],
  providers: [RssService, ArticleCrawlerService, ArticleService, TwitterCrawlerService, TwitterService],
  exports: [ArticleService, TwitterService],
})
export class IngestModule {}
