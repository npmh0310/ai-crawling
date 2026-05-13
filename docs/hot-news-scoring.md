# Hot News Scoring

## 1. Mục đích

Feed hiện tại sort theo `publishedAt DESC` — không phân biệt tin "đáng đọc ngay" (Claude 4.7 launch) với tin nhiễu ("@sama: had coffee"). Hot scoring chấm điểm 0-100 cho mỗi `FeedItem` để đẩy 5 tin nóng nhất lên strip "Hot Now" đầu trang chủ.

**Nguyên tắc:**
- Không migration DB — compute on-the-fly mỗi request
- Pure heuristic, rule-based — không LLM, deterministic, debug được
- Dùng signal đã có sẵn trong `FeedItem` (publishedAt, sourceType, handle, category, takeaways, title)

---

## 2. Công thức

```
score = recency(40) + authority(20) + keywords(20) + category(10) + depth(10)
max   = 100
hot   ⇔ score >= 60
```

### Signal 1 — Recency (max 40)

Decay step function theo `now - publishedAt`:

| Khoảng | Điểm | Lý do |
|---|---|---|
| < 1h | 40 | Tin breaking, mở app là phải thấy |
| < 6h | 32 | Vẫn rất mới |
| < 24h | 22 | Tin trong ngày |
| < 3d | 10 | Cũ nhưng còn relevant |
| < 7d | 4 | Lùi xa, chỉ qualified khi signal khác mạnh |
| ≥ 7d | 0 | Loại |

> Dùng step function thay vì exponential cho dễ debug. Sau này muốn smooth thì đổi sang `40 * exp(-hours / 24)`.

### Signal 2 — Source authority (max 20)

| Loại | Điểm |
|---|---|
| `sourceType=news` (RSS chính chủ blog) | 20 |
| `sourceType=social` + handle ∈ FOUNDER_HANDLES | 18 |
| `sourceType=social` + company ∈ MAJOR_LABS | 10 |
| `company=Independent` | 8 |
| `company=Reddit` | 6 |
| Fallback | 5 |

**FOUNDER_HANDLES** (lowercased, không có `@`):
```
sama, elonmusk, dario_amodei, sundarpichai, satyanadella,
yann_lecun, demishassabis, gdb, ilyasut, karpathy
```

**MAJOR_LABS:** OpenAI, Anthropic, Google, Meta, NVIDIA, xAI, Mistral

> Thêm handle CEO mới → edit constant ở `hot-score.util.ts`, không phải migration.

### Signal 3 — Keyword salience (max 20)

Match `title` (lowercased) cho danh sách signal words, mỗi unique match → 4đ, cap 20.

**HOT_KEYWORDS:**
```
release, launch, launches, launched, launching,
introducing, introduces, introduced,
announcing, announces, announced,
ga, generally available, available now,
open source, open-source, open sourced,
funding, raised, raises, acquires, acquired, acquisition,
partnership, partners with,
new model, breakthrough, beats, benchmark, sota, state of the art
```

> Match WHOLE-WORD-ISH (regex `\b`) để tránh false positive (vd "released" match "release" → OK; nhưng "preacquisition" không match "acquisition").

### Signal 4 — Category bonus (max 10)

Match `category` (lowercased substring):

| Pattern | Điểm |
|---|---|
| `model release` / `product launch` / `funding` / `acquisition` / `breakthrough` | 10 |
| `research` / `paper` / `update` / `feature` | 6 |
| `opinion` / `discussion` / `general` / empty | 0 |

> AI processor đang dùng category free-text. Nếu BE rút ra category lạ → fallback 0 (an toàn).

### Signal 5 — Content depth (max 10)

| `takeaways.length` | Điểm |
|---|---|
| 3 | 10 |
| 2 | 6 |
| 1 | 3 |
| 0 (AI skip hoặc fail extract) | 0 |

> Proxy cho "AI thấy có gì để rút ra" — nếu Gemini không extract được takeaway nào, item đó thường là chatter/short post.

---

## 3. Worked examples

### Ví dụ 1 — Hot critical (80đ)
```
title:       "Anthropic introduces Claude 4.7 with 1M context window"
sourceType:  news
company:     Anthropic
publishedAt: 2h ago
category:    "model release"
takeaways:   [3 items]
```
- Recency: 32 (<6h)
- Authority: 20 (news official)
- Keywords: 8 ("introduces" hit, no others)
- Category: 10 ("model release")
- Depth: 10 (3 takeaways)
- **Total: 80** → 🔥 hot

### Ví dụ 2 — Founder tweet hot (66đ)
```
title:       "we just open sourced our reasoning eval suite"
sourceType:  social
handle:      sama
publishedAt: 30min ago
category:    "update"
takeaways:   [2 items]
```
- Recency: 40 (<1h)
- Authority: 18 (founder handle)
- Keywords: 4 ("open sourced")
- Category: 6 (update)
- Depth: 6 (2 takeaways)
- **Total: 74** → 🔥 hot

### Ví dụ 3 — Reddit discussion không hot (41đ)
```
title:       "thoughts on AGI by 2030"
sourceType:  social
company:     Reddit
publishedAt: 5h ago
category:    "discussion"
takeaways:   [1 item]
```
- Recency: 32 (<6h)
- Authority: 6 (Reddit)
- Keywords: 0
- Category: 0 (discussion)
- Depth: 3 (1 takeaway)
- **Total: 41** → skip

### Ví dụ 4 — Tin cũ nhưng signal mạnh không qualified (37đ)
```
title:       "OpenAI releases o5 model"
sourceType:  news
publishedAt: 8 ngày trước
category:    "model release"
takeaways:   [3 items]
```
- Recency: 0 (≥ 7d)
- Authority: 20
- Keywords: 4 ("releases")
- Category: 10
- Depth: 10
- **Total: 44** → skip (recency 0 đánh chìm)

> Cố ý không show tin 8 ngày — vì user đã đọc rồi hoặc đã thấy nhiều lần. Strip "Hot Now" focus ngày nay.

---

## 4. Threshold & selection

- **Pool:** 200 items mới nhất trong 7 ngày (`publishedAt >= now - 7d`, order desc, limit 200)
- **Filter:** `score >= 60`
- **Sort:** score DESC
- **Take:** top 5
- **Edge case:** nếu < 5 qualified → trả ít hơn 5. Nếu 0 → strip ẩn hoàn toàn ở FE.

> Pool 200 đủ rộng cho ~7 ngày dữ liệu hiện tại (~30-50 items/ngày). Tăng pool nếu DB scale.

---

## 5. Architecture

```
GET /feed/hot?lang=vi&limit=5
       │
       ▼
FeedController.getHot()
       │
       ▼
FeedService.getHotItems(lang, limit)
   ├─ Prisma: items 7d, 200 cap
   ├─ map(item → computeHotScore(item))
   ├─ filter(score >= 60)
   ├─ sort desc + take limit
   └─ toFeedResponse(lang)
       │
       ▼
Response: ApiResponse<FeedItem[]>
   (kèm field `score` cho debug, optional)
```

**Pure function:** `computeHotScore` trong [backend/src/modules/feed/hot-score.util.ts](backend/src/modules/feed/hot-score.util.ts) (TODO):
```ts
export function computeHotScore(
  item: HotScoreInput,
  now: Date = new Date(),
): HotScoreBreakdown {
  const recency  = recencyScore(item.publishedAt, now)   // 0-40
  const authority = authorityScore(item)                 // 0-20
  const keywords = keywordScore(item.title)              // 0-20
  const category = categoryScore(item.category)          // 0-10
  const depth    = depthScore(item.takeaways)            // 0-10
  const total = recency + authority + keywords + category + depth
  return { total, recency, authority, keywords, category, depth }
}
```

**FE:** `HotNowStrip` component, `useQuery(feedQueryKeys.hot(locale))`, `staleTime: 60_000` (1 phút refresh). Render dưới `IntelligenceHeader` chỉ ở trang chủ (`!lockFilters`). Dedup id khỏi list chính.

---

## 6. Tuning guide

**Strip lúc nào cũng trống / luôn full 5?**
- Trống → giảm threshold xuống 50, hoặc tăng cap pool lên 500
- Full nhưng đôi khi noise lọt vào → tăng threshold lên 70, hoặc tăng weight `keywords`

**Tin cũ vẫn lọt vào?**
- Tăng Recency weight (vd 50/15/15/10/10), giảm signal khác
- Hoặc thêm hard floor: `if hoursOld > 48 then score *= 0.7`

**CEO tweet chiếm hết slot?**
- Giảm authority cho social-founder từ 18 → 14
- Hoặc thêm diversity rule: max 2 items từ cùng company trong top 5

> Đổi constant trong `hot-score.util.ts` rồi rebuild BE — không cần migration.

---

## 7. Not in v1 (future)

- **LLM re-rank** — sau heuristic, lấy top 20 đẩy Gemini hỏi "cái nào quan trọng nhất". Tốn quota.
- **Engagement signal** — twitter-service capture likes/retweets, RSS đếm comments. Tín hiệu mạnh nhưng cần extend pipeline.
- **Cross-source clustering** — 5 nguồn đưa cùng tin = signal mạnh. Cần text embeddings.
- **User personalization** — học hành vi click/đọc của user để tune weight. Cần auth & user model.
- **Hot score lưu DB** — khi DB > 10k items thì compute on-the-fly chậm, migration thêm cột `base_score` (stored) + recency tính query-time.

---

## 8. Verification checklist

- [ ] Item < 1h từ Anthropic Blog với "Claude" trong title → score ≥ 70
- [ ] Item từ Sam Altman tweet < 1h với "open source" → score ≥ 65
- [ ] Item Reddit discussion 5h → score < 50
- [ ] Item 8 ngày → score < 50 (recency floor)
- [ ] BE compute thời gian < 50ms cho pool 200 items
- [ ] FE strip ẩn khi response trả mảng rỗng
- [ ] Items trong strip KHÔNG lặp lại trong feed chính bên dưới
- [ ] Strip KHÔNG hiện ở `/flash-alerts` và `/research`
