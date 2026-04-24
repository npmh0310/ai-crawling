import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { SchedulerService } from './scheduler.service'
import { IngestModule } from '../ingest/ingest.module'
import { PrismaModule } from '../../prisma/prisma.module'

@Module({
  imports: [ScheduleModule.forRoot(), IngestModule, PrismaModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
