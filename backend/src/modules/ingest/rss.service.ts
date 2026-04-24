import { Injectable, Logger } from '@nestjs/common'
import { XMLParser } from 'fast-xml-parser'
import { FetchRssQueryDto } from './dto/fetch-rss-query.dto'
import { RssSource } from '../sources/rss-sources'
import { createPaginatedResponse } from '../../common/responses/api-response.factory'
import { PaginatedResponse } from '../../common/interfaces/api-response.interface'

export type NormalizedRssItem = {
  sourceId: string
  company: RssSource['company']
  sourceName: string
  sourceUrl: string
  guid: string
  title: string
  link: string
  publishedAt: Date | null
  summary: string | null
}

@Injectable()
export class RssService {
  private readonly logger = new Logger(RssService.name)
  private readonly parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    removeNSPrefix: true,
    trimValues: true,
  })

  async fetchAndParse(
    source: RssSource,
    query: FetchRssQueryDto,
  ): Promise<PaginatedResponse<NormalizedRssItem>> {
    const results = await Promise.allSettled(
      source.urls.map((url) => this.fetchFeed(url, source)),
    )

    const allItems = results.flatMap((result) => {
      if (result.status === 'fulfilled') return result.value
      this.logger.warn(result.reason)
      return []
    })

    return this.filterByDateRangeAndLimit(allItems, query)
  }

  private async fetchFeed(
    url: string,
    source: RssSource,
  ): Promise<NormalizedRssItem[]> {
    const response = await fetch(url, {
      headers: {
        'user-agent': 'ai-crawling-bot/1.0',
        accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS from ${url}: ${response.status} ${response.statusText}`)
    }

    const xml = await response.text()
    const parsed = this.parser.parse(xml)
    const items = this.getItems(parsed)

    return items.map((item: any) => this.normalizeItem(item, source, url))
  }

  private getItems(parsed: any): any[] {
    if (Array.isArray(parsed?.rss?.channel?.item)) return parsed.rss.channel.item
    if (parsed?.rss?.channel?.item) return [parsed.rss.channel.item]
    if (Array.isArray(parsed?.feed?.entry)) return parsed.feed.entry
    if (parsed?.feed?.entry) return [parsed.feed.entry]
    return []
  }

  private normalizeItem(item: any, source: RssSource, sourceUrl: string): NormalizedRssItem {
    const title = this.getValue(item.title) ?? 'Untitled'
    const link = this.getLink(item) ?? sourceUrl
    const guid = this.getValue(item.guid) ?? this.getValue(item.id) ?? link
    const publishedAt = this.parseDate(
      this.getValue(item.pubDate) ?? this.getValue(item.published) ?? this.getValue(item.updated),
    )

    return {
      sourceId: source.id,
      company: source.company,
      sourceName: source.name,
      sourceUrl,
      guid,
      title,
      link,
      publishedAt,
      summary: this.getValue(item.description) ?? this.getValue(item.summary) ?? null,
    }
  }

  private getValue(value: any): string | null {
    if (!value) return null
    if (typeof value === 'string') return value
    if (typeof value === 'object' && '_text' in value) return value._text
    return null
  }

  private getLink(item: any): string | null {
    if (typeof item.link === 'string') return item.link
    if (Array.isArray(item.link)) {
      const first = item.link[0]
      if (typeof first === 'string') return first
      if (first?.['@_href']) return first['@_href']
      if (first?._text) return first._text
    }
    if (item.link?.['@_href']) return item.link['@_href']
    return null
  }

  private parseDate(value: string | null): Date | null {
    if (!value) return null
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
  }

  private filterByDateRangeAndLimit(
    items: NormalizedRssItem[],
    query: FetchRssQueryDto,
  ) {
    const start = query.requestReceivedStart
      ? new Date(`${query.requestReceivedStart}T00:00:00.000Z`).getTime()
      : null
    const end = query.requestReceivedEnd
      ? new Date(`${query.requestReceivedEnd}T23:59:59.999Z`).getTime()
      : null
    const page = query.page ?? 1
    const take = query.take ?? 10
    const skip = (page - 1) * take

    const filtered = items
      .filter((item) => item.publishedAt)
      .filter((item) => {
        const publishedAt = item.publishedAt?.getTime() ?? 0
        if (start !== null && publishedAt < start) return false
        if (end !== null && publishedAt > end) return false
        return true
      })
      .sort((a, b) => {
        const timeA = a.publishedAt?.getTime() ?? 0
        const timeB = b.publishedAt?.getTime() ?? 0
        return timeB - timeA
      })

    const itemCount = filtered.length

    return createPaginatedResponse(
      filtered.slice(skip, skip + take),
      page,
      take,
      itemCount,
    )
  }
}
