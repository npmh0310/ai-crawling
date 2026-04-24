import { Type } from 'class-transformer'
import { IsDateString, IsInt, IsOptional, Max, Min } from 'class-validator'

export class FetchRssQueryDto {
  @IsOptional()
  @IsDateString()
  requestReceivedStart?: string

  @IsOptional()
  @IsDateString()
  requestReceivedEnd?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  take?: number = 10
}
