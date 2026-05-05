import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { SchedulerService } from './scheduler.service'
import { IngestModule } from '../ingest/ingest.module'

@Module({
  imports: [ScheduleModule.forRoot(), IngestModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
