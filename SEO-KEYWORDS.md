# Keyword map — zyadhusseini.com

Compiled 14 Aug 2026 from live SERP checks (WebSearch). One page, one canonical
URL — every query below targets a *surface* of `https://www.zyadhusseini.com/`
(a section, an FAQ answer, a hosted research document, or `llms.txt`), never an
imaginary route. Verdicts are deliberately honest: a single-page personal site
does not rank for head terms, and pretending otherwise wastes copy.

Coverage legend: **yes** = phrase present on the right surface before this pass ·
**closed** = gap closed in this pass · **partial** = related copy exists, exact
phrasing doesn't · **no** = absent (with reason if left absent).

## A. Name and variants

| Query | Target surface | Coverage | Verdict |
|---|---|---|---|
| Zyad Husseini | title, H1, Person schema, whole page | yes | Winnable #1 for the exact spelling once Google indexes the site (still blocked on Search Console — see SEO.md). Google spell-normalises toward "Ziad", so expect mixed SERPs early. |
| Ziad Husseini | About alias line, name-spelling FAQ, `alternateName` | yes | Page-1 presence realistic; #1 is not — a Dallas ophthalmologist owns this SERP via WebMD/Healthgrades/Doximity/UTSW, plus a Coca-Cola HBC procurement director. The "Egyptian data analyst" descriptor (added this pass) sharpens entity disambiguation against them. |
| Zeyad Husseini / Ziyad Husseini | same surfaces | yes | Winnable — no strong exact-match competitor found for either spelling. |
| Zyad Mohamed Mahmoud Reda Husseini | name-spelling FAQ, noscript, llms.txt | yes | Trivially winnable; zero competition. This is the string on his academic documents, so it matters. |
| زياد حسيني (Arabic script) | — | no | **Deliberately not covered.** The fact sheet contains no verified Arabic-script form of his name, and guessing a spelling on an English-only page risks publishing a wrong name claim. Needs Zyad to confirm the script form first. |

## B. Name × role / institution / asset

| Query | Target surface | Coverage | Verdict |
|---|---|---|---|
| zyad husseini data analyst | title, H1, "Who is" FAQ | yes | Winnable — his LinkedIn already ranks #1 for name+role queries; the site joins it once indexed. |
| zyad husseini economist | title, FAQ, schema `jobTitle` | yes | Winnable, same mechanics. |
| zyad husseini kedge | education, FAQs, `alumniOf` | yes | Winnable; LinkedIn currently takes it. |
| zyad husseini AUC | "Where did he study?" FAQ | **closed** | "(AUC)" abbreviation added to the FAQ answer — previously only the full university name appeared in prose. Winnable. |
| zyad husseini portfolio | new CV/portfolio FAQ, noscript intro | **closed** | The word "portfolio" existed only inside JSON-LD/robots comments, never as visible text. Now in an FAQ answer and the noscript block. Winnable. |
| zyad husseini CV / resume | new CV/portfolio FAQ, CV section, noscript + llms.txt "CV / résumé" | **closed** | "Resume/résumé" appeared nowhere on the site despite two downloadable CVs. Winnable — this is a real recruiter query pattern. |
| zyad husseini EFG Hermes | experience section, companies slideshow, llms.txt | yes | Winnable. |
| zyad husseini thesis | research section, thesis FAQ, Thesis schema | yes | Winnable. |

## C. Role × location long-tails (honesty section)

| Query | Target surface | Coverage | Verdict |
|---|---|---|---|
| data analyst / data analyst France / data analyst Egypt | — | n/a | **Unwinnable, do not chase.** Head terms owned by Glassdoor, Bayt, LinkedIn Jobs and training sites. No copy was or should be spent on these. |
| data analyst Power BI STATA econometrics | skills grid, project cards | partial | Near-zero-volume skill-cluster query; SERP is job boards. Exact-phrase surfacing is possible but not worth distorting copy for. Left as-is. |
| MSc Data Analytics for Business Kedge (student/portfolio) | education, FAQs, llms.txt | **closed** (llms.txt now carries the exact programme name "MSc Data Analytics for Business") | Kedge's own programme pages rightly own the head term; long-tail "…student portfolio"-type variants are plausible. |
| junior data analyst France Egypt | hero, identity | partial | Realistically unwinnable (job boards); left alone. |

## D. Research-topic queries (documents as the ranking unit)

Both documents are individually indexable and in the sitemap.

| Query | Target surface | Coverage | Verdict |
|---|---|---|---|
| predicting in-game spending machine learning (thesis) | thesis DOCX + research section | yes | Head term owned by ResearchGate/MDPI/PMC academic papers. The **exact-title query** ("Predicting In-Game Spending Behaviour Using Machine Learning") is trivially winnable; that is what anyone who has seen the thesis cited will type. |
| microtransaction spending prediction | thesis FAQ (phrase "microtransaction spending" added this pass), abstract, schema keywords | **closed** | Long-shot for the bare phrase (stats aggregators rank); realistic for name/title-qualified variants. |
| renewable energy GDP growth 2SLS panel | research PDF + section + llms.txt | yes | Academic SERP (ScienceDirect, MDPI, Taylor & Francis). The PDF can surface for narrow long-tails ("renewable energy 2SLS 7 countries 1990–2023") and the exact paper title. The finding is **negative for short-run growth** — copy must never flip it. |
| renewable energy economic growth negative short run | same | yes | Same verdict; the site's framing ("sequence, don't slow, decarbonisation") matches the literature's short-run-negative strand found in the SERP. |
| distinctive-number queries (Gini 0.87 revenue top 1% 39%, ROC AUC 0.48–0.52, −1.44pp GDP) | research section, llms.txt | yes | Trivially winnable for citation-followers; already fully covered. |

## E. Venture cross-queries

| Query | Target surface | Coverage | Verdict |
|---|---|---|---|
| zyad husseini PNM | ventures section, FAQ, `affiliation` | yes | Winnable — no competing page connects the name to PNM. |
| zyad husseini Matgarak / Qemto / NAVI / Brayn / BUB AI | ventures + experience + FAQ | yes | Winnable. Head terms (bare "Matgarak") belong to the ventures' own sites — matgarak.com already owns its SERP; this site correctly targets only the name-cross. |
| founder Matgarak / NAVI founder | — | no | **Deliberately not targeted.** Founder status is not verified; all copy uses "builds / behind / involved in" phrasing. Do not add "founder" anywhere without verification. |
| NAVI student operating system | ventures card + FAQ use the exact phrase | yes | Weak SERP (unrelated school-management software; navi.geo-ed.tech itself doesn't rank for it). This page may surface, but the phrase should ultimately be won by NAVI's own site — no extra copy added here to avoid cannibalising the venture. |

## SERP-competition notes — ten most valuable queries

1. **"Zyad Husseini"** — no result for him at all today (site unindexed; GSC submission still pending per SEO.md). SERP is spell-normalised to "Ziad": Dr. Ziad Husseini MD (WebMD, Healthgrades, Doximity, utswmed.org) plus Wikipedia Husseini pages. Exact-match domain + Person graph + alias handling makes the exact spelling winnable within weeks of indexing.
2. **"Ziad Husseini"** — the ophthalmologist's medical-directory cluster is high-authority and entrenched. Target: page-1 presence via the alias line, not #1.
3. **"Zyad Husseini data analyst / Kedge"** — LinkedIn (`linkedin.com/in/zyadmhr`) ranks #1 already; Kedge's MSc programme pages fill the rest. Site slots in alongside LinkedIn once indexed. (Side-note: LinkedIn currently shows an employer, "RESET EGY", that the fact sheet doesn't list as public — nothing on-site references it, correctly.)
4. **"Zyad Husseini CV"** — before this pass the site could not match "resume/résumé" at all. Zero competition once indexed.
5. **"Zyad Husseini portfolio"** — same; the word is now visible text. Zero competition.
6. **"predicting in-game spending machine learning thesis"** — SERP: ResearchGate purchase-prediction papers, MDPI churn-prediction, PMC. Unwinnable head; exact-title and name-qualified queries winnable via the sitemap-listed DOCX.
7. **"renewable energy economic growth 2SLS / negative short run"** — SERP: Energies (MDPI), ScienceDirect, T&F, PMC panel studies. The literature itself reports short-run-negative findings, so the paper is consistent, not contrarian. PDF ranks only for narrow long-tails; that is fine — its job is to be findable when someone checks his work.
8. **"microtransaction spending prediction"** — SERP: statistics aggregators (Gitnux, SQ Magazine) citing "top 1% ≈ 50–60% of spend". His Gini 0.87 / top-1%-=39% figures are adjacent and quotable by AI assistants reading llms.txt; the FAQ now contains the phrase "microtransaction spending".
9. **"Matgarak"** — owned by matgarak.com (and its Pack N Move storefront subdomain). Correctly not contested; only the name-cross is targeted.
10. **"NAVI student operating system"** — SERP is unrelated (Navi School Management System, Serial Experiments Lain fan pages). The venture's own landing should win this; this site's existing exact-phrase mentions are sufficient secondary coverage.

## What this pass changed on-page

- `src/data/content.ts`: "Egyptian" added to the Who-is FAQ (entity disambiguation vs. the Dallas Ziad Husseini); "(AUC)" added to the study FAQ; "microtransaction spending" in the thesis FAQ; one new FAQ ("Where can I find his CV and portfolio?") covering CV / résumé / portfolio.
- `index.html` (noscript only): one portfolio/CV sentence in the intro; "CV / résumé (English)" link label. FAQ JSON-LD regenerated via `npm run sync:faq` — never hand-edited.
- `public/llms.txt`: exact programme name "MSc Data Analytics for Business"; Portfolio line; "CV / résumé (English)".

Everything else was already covered — the prior SEO pass (SEO.md) left few real gaps.
The biggest ranking lever remains off-site and unchanged: Search Console
submission, the high-res photo, and retiring the old zyadmhr.atoms.world page.
