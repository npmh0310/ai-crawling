import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'
import { Transform, Type } from 'class-transformer'

export enum LangParam {
  en = 'en',
  vi = 'vi',
}

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
  company?: CompanyFilter

  @IsOptional()
  @IsEnum(SourceTypeFilter)
  sourceType?: SourceTypeFilter

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  unreadOnly?: boolean

  @IsOptional()
  @IsEnum(LangParam)
  lang?: LangParam

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

export class SearchQueryDto {
  @IsString()
  q: string

  @IsOptional()
  @IsEnum(LangParam)
  lang?: LangParam

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
