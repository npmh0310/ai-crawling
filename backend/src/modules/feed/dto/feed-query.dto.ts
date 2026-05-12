import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'
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
  Independent = 'Independent',
  Reddit = 'Reddit',
}

export enum SourceTypeFilter {
  news = 'news',
  social = 'social',
}

export class FeedQueryDto {
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsEnum(CompanyFilter, { each: true })
  company?: CompanyFilter[]

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
