# Research Distribution Pack

Getting your two papers into the academic index systems. This is the single
highest-leverage thing left for name search: **Google Scholar, ORCID and RePEc
are trusted entity sources**, and an author record in them does far more for
"Zyad Husseini" in Google than any number of blog posts.

Every one of these needs an account, which I can't create for you — but all the
metadata is written out below, ready to paste. Budget ~45 minutes for the lot.

**Do them in this order.** ORCID first, because the others let you link it.

---

## 1. ORCID — 5 minutes ⭐ start here

https://orcid.org/register

A permanent researcher ID. Free, universally recognised, and Google treats it as
an authority record for a person's academic identity.

- **Name:** Zyad Husseini
- **Also known as:** Ziad Husseini · Zeyad Husseini · Ziyad Husseini · Zyad Mohamed Mahmoud Reda Husseini
- **Country:** Egypt
- **Websites:** https://www.zyadhusseini.com · https://www.linkedin.com/in/zyadmhr/ · https://github.com/ZyadHusseini
- **Employment:** PNM Agency — Chief Executive Officer
- **Education:** Kedge Business School (MSc Data Analytics for Business, 2025–2027); The American University in Cairo (BA Econometrics & Quantitative Economics, 2021–2025)
- **Keywords:** econometrics; machine learning; data analytics; energy economics; consumer behaviour

Then **add your ORCID iD to the portfolio site** and send it to me — I'll wire it
into the Person schema as a `sameAs`, which is exactly the kind of link Google
uses to merge entity records.

---

## 2. Zenodo — 10 minutes ⭐ highest impact

https://zenodo.org (sign in with your GitHub or ORCID — no new password)

Zenodo mints a **DOI** for each upload and is harvested by OpenAIRE and Google
Scholar. A DOI is what turns "a PDF on a personal site" into a citable object.

### Upload 1 — the econometrics paper

- **Title:** The Impact of Renewable Energy Adoption on Economic Growth
- **Authors:** Husseini, Zyad (The American University in Cairo) — link your ORCID
- **Type:** Publication → Working paper
- **Publication date:** 2025
- **Description:**
  > Panel analysis of the relationship between renewable energy consumption and
  > economic growth across seven countries, 1990–2023 (238 country-year
  > observations, World Bank World Development Indicators). Estimated by panel
  > OLS, robust OLS following a White test, maximum likelihood, fixed effects
  > with year dummies, Newey–West standard errors, random effects following a
  > Hausman test, and two-stage least squares instrumenting renewable
  > consumption with its own lag (validated by Cragg–Donald and
  > underidentification tests). Renewable energy consumption is consistently
  > associated with slower short-run growth: under 2SLS, a one-unit rise in the
  > renewable share is associated with a 1.44 percentage point reduction in GDP
  > per capita growth (p = 0.029). Gross capital formation is positive and
  > highly significant; tertiary enrolment, trade openness and population growth
  > are not significant in any specification. The result is interpreted as an
  > argument for sequencing the energy transition — efficiency, grid
  > integration, workforce training and capital-formation incentives — rather
  > than for slowing decarbonisation, and is bounded to short-run measured
  > output rather than welfare or avoided climate damages.
- **Keywords:** renewable energy; economic growth; panel data; two-stage least squares; energy transition; econometrics; development economics
- **Licence:** Creative Commons Attribution 4.0
- **Files:** the PDF, plus `renewable-energy-growth-stata.do` and `renewable-energy-growth-dataset.xlsx` — uploading replication files with the paper is unusual and reflects well on you
- **Related identifier:** "is identical to" → https://www.zyadhusseini.com/research/Zyad-Husseini-Renewable-Energy-Economic-Growth.pdf

### Upload 2 — the MSc thesis

- **Title:** Predicting In-Game Spending Behaviour Using Machine Learning
- **Authors:** Husseini, Zyad (Kedge Business School)
- **Type:** Publication → Thesis · **Supervisor:** Zhang, Tianyuan
- **Awarding university:** Kedge Business School · **Date:** 2026
- **Description:**
  > Investigates which player behaviours and engagement patterns predict in-game
  > spending, using five public datasets covering more than 50,000 players and
  > 52,000 games across mobile, Steam and Roblox catalogues. An interpretable
  > logistic regression baseline and a thirteen-model classification benchmark —
  > with cross-validation and class-imbalance handling — all performed at chance
  > (ROC AUC 0.48–0.52), and no feature passed conventional significance tests.
  > A control condition applying the identical pipeline to two genuine
  > game-level catalogues reached 0.95 ROC AUC and recovered the freemium signal
  > from game descriptions alone via natural language processing, establishing
  > that the null result reflects the data rather than the pipeline. Structural
  > inequality predicted by theory was nonetheless clear: a revenue Gini
  > coefficient of 0.87, with the top 1% of payers generating 39% of revenue,
  > and a playtime Gini of 0.83. Concludes that credible prediction of
  > individual spending requires real player-level telemetry, with implications
  > for the auditability and ethics of behaviour-based monetisation.
- **Keywords:** machine learning; in-game spending; freemium monetisation; consumer behaviour; null results; Gini coefficient; natural language processing; game analytics
- **Licence:** Creative Commons Attribution 4.0

**Send me both DOIs when they're minted** — I'll add them to the `Thesis` and
`ScholarlyArticle` schema nodes already on your site and to `llms.txt`.

---

## 3. Google Scholar profile — 10 minutes

https://scholar.google.com/citations (you're already signed in on Chrome Profile 1)

Once Zenodo has indexed the DOIs, create the profile and add both papers. Set it
**public** and add a verified `@aucegypt.edu` email — verified profiles show a
photo, and a Scholar profile with your photo is a direct answer to "I want my
picture to come up."

- **Name:** Zyad Husseini
- **Affiliation:** MSc Data Analytics, Kedge Business School
- **Areas:** econometrics, machine learning, energy economics, consumer behaviour
- **Homepage:** https://www.zyadhusseini.com

---

## 4. SSRN — 15 minutes (economics visibility)

https://www.ssrn.com

The standard preprint venue for economics and the one economists actually
browse. Submit the renewable energy paper to **Energy Economics eJournal** and
**Development Economics: Macro eJournal**. Reuse the Zenodo abstract verbatim.

Review takes a few days. The resulting page ranks well and carries your name and
affiliation.

---

## 5. RePEc / IDEAS — 15 minutes (⭐ underrated for economists)

https://authors.repec.org

RePEc is *the* economics bibliographic database, it feeds Google Scholar, and an
IDEAS author profile is a strong, durable entity signal that almost no
early-career economist bothers to claim. Register as an author, then link the
SSRN and Zenodo versions of the renewable energy paper.

---

## 6. ResearchGate & Academia.edu — 10 minutes

https://www.researchgate.net · https://www.academia.edu

High domain authority, both rank for author names, both show your photo. Upload
both papers with the same metadata. Fill the profile out properly — skills,
education, the same name variants.

---

## 7. OSF — optional, 10 minutes

https://osf.io

Best home for the **replication materials** as a project in their own right
(do-file, dataset, codebook). Registered replication packages get cited and
looked at, and it demonstrates the same thing the thesis control condition does:
that you publish work others can check.

---

## Checklist

- [ ] ORCID created → send me the iD
- [ ] Zenodo: paper uploaded, DOI minted
- [ ] Zenodo: thesis uploaded, DOI minted
- [ ] Send me both DOIs → I wire them into the site's schema
- [ ] Google Scholar profile public, photo set, both papers added
- [ ] SSRN submission accepted
- [ ] RePEc/IDEAS author profile claimed
- [ ] ResearchGate + Academia.edu profiles complete
- [ ] OSF replication project (optional)
