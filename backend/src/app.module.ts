import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { FeedModule } from './modules/feed/feed.module';
import { IngestModule } from './modules/ingest/ingest.module';
import { AiProcessorModule } from './modules/ai-processor/ai-processor.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    FeedModule,
    IngestModule,
    AiProcessorModule,
    SchedulerModule,
    AdminModule,
  ],
})
export class AppModule {}
