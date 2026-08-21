# Reusable prompt — improve the SEO of zyadhusseini.com

Paste everything below the line into a fresh session. It is self-contained:
it carries the repo layout, the invariants that must not break, the facts that
must not be invented, and an honest statement of what is actually left to do.

---

## Task

Improve the SEO of the personal portfolio at:

`/Users/electro/Desktop/STUFF/EXTRA/Unique Portfolio Website copy/portfolio-v2`

Live at `https://www.zyadhusseini.com/` (canonical host; apex 308-redirects to `www`).
Vite + React 19 + TypeScript single-page site, deployed on Vercel from `main`.
Subject: **Zyad Husseini** — data analyst, economist and entrepreneur. The site's
job is to get him hired and to own his name in search.

## Start by measuring, not editing

Before changing anything, establish the current state and report it:

1. Is the site indexed? Check Bing (`https://www.bing.com/search?q=site%3Azyadhusseini.com&format=rss`).
   Google blocks scraping — do not claim a Google index status you cannot observe;
   ask the user what Search Console's **Pages** report says instead.
2. Fetch the live homepage, `sitemap.xml`, `robots.txt` and `llms.txt`. Confirm
   they serve 200, parse, and match the repo.
3. Diff the crawl surfaces against the rendered app. **The most common real defect
   on this site is content that exists only in React and never reached the static
   surfaces.** For every section, check it appears in: the `<noscript>` fallback,
   `llms.txt`, the FAQ data, and (if it has media) the sitemap.

Only then decide what to change. If measurement shows nothing meaningful is
missing, **say so and stop** rather than manufacturing work — see "Diminishing
returns" below.

## Hard invariants — breaking these is worse than doing nothing

**Generated blocks.** Never hand-edit between these markers; they are rewritten
on every build from `src/data/content.ts`:
- `<!-- FAQ-SCHEMA:START … END -->` in `index.html` → `scripts/sync-faq-schema.mjs`
- `<!-- VIDEO-SCHEMA:START … END -->` in `index.html` → `scripts/sync-video-schema.mjs`
- `<!-- VIDEO-SITEMAP:START … END -->` in `public/sitemap.xml` → same script
Edit the source data and re-run the generator.

**The alias guard.** `scripts/check-altnames.mjs` fails the build if any
`alternateName` in the Person JSON-LD is not also visible page text. This is not
bureaucracy: marking up invisible content violates Google's structured data
guidelines and risks a manual action that strips the rich-result eligibility the
aliases exist to earn. If you add an alias, add visible copy for it too.

**The build is the test.** `npm run build` runs: faq sync → video sync → sitemap
lastmod sync → alias check → `tsc --noEmit` → `vite build` → IndexNow ping
(skipped locally). It must pass end to end before you commit.

**Do not touch:** the canonical host; any file under `public/research/`,
`public/assets/`, `public/esports/` (live URLs, already submitted); the IndexNow
key file; other repos or websites (the PNM sites are explicitly off-limits).

## Facts — the only permitted source of claims

Invent nothing. If a detail is not here, either omit it or ask.

- **Name:** Zyad Husseini. Also written Ziad / Zeyad / Ziyad Husseini. Academic
  name: Zyad Mohamed Mahmoud Reda Husseini. Egyptian, works between France and Egypt.
  English and Arabic native, French professional.
- **Education:** MSc Data Analytics for Business, Kedge Business School (expected
  2027). BA Economics, The American University in Cairo (AUC), 2025, minors in
  Business Administration and Computer Science, Dean's List. IB at MASE, 2020.
- **Current roles:** Brayn Solutions (AI product development); Media Trade
  (investment analyst); BUB AI (AI automation). Plus a Business Development
  Associate role and a Research and Marketing Specialist role whose **employers
  are not public — never invent a name for them**.
- **Past:** EFG Hermes (data analytics intern, Power BI dashboards); AR CORP
  (ERP-connected cash-flow statement in Power BI); Pack N Move (2019–2025,
  accountant → marketeer → BI intern).
- **Research:** MSc thesis *"Predicting In-Game Spending Behaviour Using Machine
  Learning: An Economic and Behavioural Analysis"* (Dr. Tianyuan Zhang; 13
  classifiers at chance, ROC AUC 0.48–0.52 on public data; revenue Gini 0.87;
  0.95 AUC on genuine game-level data). Econometrics paper *"The Impact of
  Renewable Energy Adoption on Economic Growth"* (AUC, ECON 408101, Dr. Mina
  Ayad; 7 countries 1990–2023; renewable share +1 unit → GDP/capita growth
  **−1.44pp**, p = 0.029, 2SLS). **The renewable finding is NEGATIVE for
  short-run growth — never state it the other way round.**
- **L'Oréal hackathon:** FIVE-PERSON TEAM. Longformer 0.688 micro-F1 at 113.8 g
  CO₂ vs a light pipeline at 0.638 for 0.05 g (~2,000× less). Presented at
  L'Oréal HQ, Paris.
- **Other team projects:** Nasdaq 100 analysis (3 people), Elevate marketing plan
  (6 people). **Never present team work as solo.**
- **Esports:** competes in Tekken as **ELECTRO_SMG**, mains Victor, Tekken
  Egyptian League on the Tekken World Tour MEA 2026 circuit. 7th at a Tekken Dojo
  event, qualifying for the next one. Formerly a professional basketball player
  (El Haras El Gomhory, 2018–2024).
- **Ventures — involvement is verified, founder status is NOT.** PNM Agency,
  PNM Group, NAVI, Matgarak, Qemto. Use "builds" / "works on", **never
  "founded"** (PNM Group is the Pack N Move holding company where he was an
  accountant in 2019 — likely family business).
- He is **not "Senior"** anything, and holds no certification the record does not
  show (CMA Part One was *taken*, not necessarily passed).

## Rules of engagement

- **Google's spam policies are a hard boundary.** No keyword stuffing, no hidden
  text, no doorway pages, no fabricated reviews, no click manipulation, no bot
  traffic. Copy must read as something a recruiter would enjoy reading.
- **Vary FAQ phrasing.** Twelve answers all opening "Zyad Husseini is…" is the
  exact pattern Google calls keyword stuffing. Preserve the existing variety.
- **Single page.** New content lives in existing surfaces — `content.ts` section
  copy, FAQ entries, the `<noscript>` block, `llms.txt`, meta/JSON-LD. There is
  no router; do not invent routes.
- **Be honest about what is unwinnable.** Head terms ("data analyst", research
  topic heads) belong to job boards and ResearchGate. Say so; do not spend copy
  chasing them. The winnable set is the exact name, its spelling variants, and
  name × qualifier long-tails.
- Verify with real measurements, not assumptions. State what you actually
  observed. If a check is unreliable (viewport emulation cannot reproduce mobile
  autoplay policy; `body{overflow-x:hidden}` makes naive overflow checks pass
  trivially; the aliases live inside the JSON-LD so a substring search over
  `index.html` proves nothing) — say so rather than reporting a false pass.
- Commit with a message explaining *why*, not just what. Do not push without a
  passing build.

## Diminishing returns — read this before inventing work

On-page and technical SEO on this site have had four thorough passes and are
essentially complete: valid Person / Thesis / ScholarlyArticle / FAQPage /
VideoObject markup, alias handling with a build-time guard, self-hosted fonts,
image + video sitemaps, AI-crawler allowances in `robots.txt`, `llms.txt`, a
`<noscript>` mirror, clean headings, no horizontal overflow, CLS 0.

The constraint is **no longer the site**. It is that a young domain with few
inbound links takes time, and the remaining levers need the owner's logins:

1. **Search Console → URL Inspection → Request indexing** on the homepage. The
   single biggest unclaimed lever; sitemap submission alone is much slower.
2. **The Linktree "Portfolio" link still points at the old `zyadmhr.atoms.world`
   site**, which is indexed and still calls him a "Senior Data Analyst" — it
   competes for his name and states something false.
3. **LinkedIn website field** → `https://www.zyadhusseini.com`.
4. **A real headshot.** `public/assets/zyad-husseini.jpg` is 139×139 — too small
   for Google Images, a Knowledge Panel, or the social card. No larger copy
   exists publicly; only he can supply one.
5. **Upload the Tekken clips to YouTube** and send the links to embed —
   YouTube is the second-largest search engine and reaches the Egyptian FGC in a
   way self-hosted files cannot.

If your audit finds nothing beyond these, **the correct output is a short report
saying so.** Do not pad it with cosmetic edits.

## Deliverable

A report containing: (a) what you measured and the actual values, (b) issues
found with severity, (c) files changed and why, (d) issues deliberately not
fixed with reasons, (e) build verification output, (f) anything that needs the
owner rather than the agent.
