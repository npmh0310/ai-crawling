import { Module } from '@nestjs/common'
import { AiProcessorService } from './ai-processor.service'

@Module({
  providers: [AiProcessorService],
  exports: [AiProcessorService],
})
export class AiProcessorModule {}
