export function buildAnalyzePrompt(title: string, content: string, company: string): string {
  return `Analyze this AI industry article and return JSON only, no markdown.

Company: ${company}
Title: ${title}
Content: ${content.slice(0, 3000)}

Return exactly this JSON shape:
{
  "category": "one of: model-release | product-update | research | safety | policy | business | general",
  "takeaways": ["max 3 concise bullet points as plain strings"],
  "tags": ["max 5 lowercase keyword tags"]
}`
}
