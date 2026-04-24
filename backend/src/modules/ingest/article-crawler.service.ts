import { Injectable, Logger } from '@nestjs/common'
import { extract } from '@extractus/article-extractor'
import { CONFIG } from '../../config'

export type ArticleContent = {
  title: string
  content: string
  url: string
}

@Injectable()
export class ArticleCrawlerService {
  private readonly logger = new Logger(ArticleCrawlerService.name)

  async fetchArticleContent(url: string): Promise<ArticleContent | null> {
    try {
      const article = await extract(url, {}, {
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; ai-crawling-bot/1.0)',
          accept: 'text/html,application/xhtml+xml',
        },
      })

      if (!article?.content) return null

      const plainText = this.stripHtml(article.content)
      if (plainText.length < CONFIG.crawler.minContentLength) return null

      return {
        title: article.title ?? '',
        content: plainText.slice(0, CONFIG.crawler.maxContentLength),
        url,
      }
    } catch (err) {
      this.logger.warn(`Failed to fetch article: ${url} — ${(err as Error).message}`)
      return null
    }
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s{2,}/g, ' ')
      .trim()
  }
}
