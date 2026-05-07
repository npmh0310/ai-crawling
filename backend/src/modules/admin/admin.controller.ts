import { Controller, Get, HttpCode, Param, Patch, Query } from '@nestjs/common'
import { AdminService } from './admin.service'
import { CrawlLogQueryDto } from './dto/crawl-log-query.dto'

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('sources')
  getSources() {
    return this.adminService.getSources()
  }

  @Patch('sources/:id/toggle')
  @HttpCode(200)
  toggleSource(@Param('id') id: string) {
    return this.adminService.toggleSource(id)
  }

  @Get('crawl-logs')
  getCrawlLogs(@Query() query: CrawlLogQueryDto) {
    return this.adminService.getCrawlLogs(query)
  }

  @Get('stats')
  getStats() {
    return this.adminService.getStats()
  }
}
