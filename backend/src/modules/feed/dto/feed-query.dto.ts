import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum CompanyFilter {
  OpenAI = 'OpenAI',
  Anthropic = 'Anthropic',
  Google = 'Google',
  Meta = 'Meta',
  Mistral = 'Mistral',
  NVIDIA = 'NVIDIA',
  xAI = 'xAI',
}

export enum SourceTypeFilter {
  news = 'news',
  social = 'social',
}

export class FeedQueryDto {
  @IsOptional()
  @IsEnum(CompanyFilter)
  company?: CompanyFilter;

  @IsOptional()
  @IsEnum(SourceTypeFilter)
  sourceType?: SourceTypeFilter;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  take?: number = 10;
}
