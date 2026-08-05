# SEO — status and what's left

Audit date: 5 Aug 2026. Canonical host: `https://www.zyadhusseini.com/`

## Done (in the repo, deployed)

| Area | State |
|---|---|
| Canonical | `https://www.zyadhusseini.com/`; apex 308-redirects to `www`, so one URL owns the ranking |
| Title | 58 chars, covers analyst / economist / entrepreneur |
| Meta description | 152 chars, displays in full (was 289 and truncated) |
| Structured data | `Person` + `WebSite` + `ProfilePage` `@graph`, valid JSON-LD |
| `sameAs` | LinkedIn, GitHub, Linktree, Instagram |
| Social cards | OG + Twitter `summary_large_image`, 1200x630 |
| Crawl directives | `robots.txt`, `max-image-preview:large`, image sitemap |
| Headings | Exactly one `<h1>`; clean H2/H3/H4 hierarchy |
| Links | Descriptive text throughout; every external link has `rel` |
| No-JS fallback | `<noscript>` mirrors the key facts and every link |
| Fonts | Self-hosted (Inter + JetBrains Mono variable), no third-party render-blocking request |
| CWV | TTFB ~290ms, CLS 0, ~135KB transfer |

## Blocked on Zyad

### 1. The profile photo — this is the one that matters

The current photo is **139x139px**. That is too small for Google to use it
anywhere: not in image results, not in a Knowledge Panel, and it visibly
softens the social card.

Checked for a larger original and there isn't one publicly:

- LinkedIn serves an auth wall to logged-out requests.
- The Linktree "original" is byte-identical to the file already in the repo
  (6,459 bytes) — that is the source it came from.

**Needed:** a headshot at least 1000px on the short side, square-croppable.
Drop it at `public/assets/zyad-husseini.jpg` (replacing the current file),
then run `python3 scripts/make-og-image.py` to rebuild the social card.
Everything else is already wired to it.

### 2. Google Search Console — requires his login

Nothing gets indexed on its own for a domain registered today.

1. Add the property at <https://search.google.com/search-console> (pick the
   **Domain** type, verify by DNS TXT at Squarespace).
2. Submit `https://www.zyadhusseini.com/sitemap.xml`.
3. Run **URL Inspection** on the homepage and click **Request indexing**.

### 3. The old site is competing with the new one

`https://zyadmhr.atoms.world/` is still live, has no canonical, and its meta
description still claims **"Senior Data Analyst"** — which is not true and is
the kind of thing an employer may check.

It duplicates this site and splits the ranking signal for his name. It has
been removed from `sameAs` here, but the real fix is on the atoms.world side:
take it down, or point it at `https://www.zyadhusseini.com/`.

### 4. Two jobs have no employer

`mainExperience` lists "Current Company" for the Business Development
Associate and Research and Marketing Specialist roles. Real names would
strengthen the entity graph — each one is another organisation Google can
connect him to.

## Expectations

- **"Zyad Husseini"** — realistic to rank first within weeks of indexing.
  The site is the only property that owns that exact name plus a matching
  entity graph.
- **"Zyad"** alone — not winnable. It is a common given name; the results are
  dominated by far larger entities. Nothing on-site changes that.
- **A picture next to his name** — needs a Knowledge Panel, which Google
  grants to entities it is confident about. Prerequisites: a high-res photo
  (item 1), consistent name/role/photo across LinkedIn, Linktree, GitHub and
  this site, and ideally a third-party mention (university page, press, a
  company team page). Typically months, and never guaranteed.
