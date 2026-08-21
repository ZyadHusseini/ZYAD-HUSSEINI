---
title: "Renewable Energy Adoption Slowed Short-Run Growth Across 7 Countries. The Policy Answer Isn't to Stop."
platforms: [Medium, LinkedIn Article, Substack]
canonical: https://www.zyadhusseini.com/
tags: [economics, econometrics, energy policy, renewable energy, development]
author: Zyad Husseini
---

# Renewable Energy Adoption Slowed Short-Run Growth Across 7 Countries. The Policy Answer Isn't to Stop.

This is an uncomfortable result to publish, so let me state the conclusion
before the caveats, and then be very careful about what it does and does not
license.

Using World Bank World Development Indicators across seven countries from 1990
to 2023 — 238 country-year observations — I found that increases in the
renewable share of energy consumption are **consistently associated with slower
short-run GDP per capita growth**. Under two-stage least squares, a one-unit
rise in the renewable share is associated with a **1.44 percentage point
reduction** in GDP per capita growth, significant at p = 0.029.

The sign did not flip. It held across panel OLS, robust OLS after a White test
flagged heteroskedasticity, maximum likelihood estimation, fixed effects with
year dummies, Newey–West standard errors, and random effects after a Hausman
test. I instrumented renewable consumption with its own lag and checked the
instrument with Cragg–Donald and underidentification tests.

I ran that many specifications specifically because I did not like the answer.
It survived all of them.

## What the other coefficients say

Gross capital formation is positive and highly significant across every
specification. Tertiary enrolment, trade openness and population growth are not
significant anywhere.

That pattern is the interpretive key, and it is easy to miss if you only read
the headline coefficient. The variable that reliably drives growth in this panel
is **capital formation**. Energy transitions in their early phase are
capital-absorbing: they pull investment into replacing generating capacity that
already exists and already works, rather than into capacity expansion. You are
spending capital to stand still, in output terms, while buying something the
output statistics do not measure.

## What this result does not mean

I want to be blunt here, because a coefficient like this is easy to weaponise.

This is a **short-run growth** result. It is not a finding about long-run
welfare, about climate outcomes, about avoided damages, or about the cost of
inaction — none of which appear in this model, and the last of which is
precisely what makes decarbonisation worth doing. GDP per capita growth captures
none of the damage function. A transition that costs measured output today while
avoiding uncosted catastrophe later will look exactly like this in the data, and
that is a limitation of the dependent variable, not an argument against the
policy.

Seven countries over 34 years is also a modest panel. The instrument is a lag,
which handles simultaneity but not omitted time-varying confounders.

So: anyone citing this as evidence to slow decarbonisation is misreading it.

## What it does argue for

It argues for **sequencing**, which is a genuinely different claim from slowing
down.

If the short-run drag runs through capital formation, then the policy response
is to attack the drag rather than the transition:

- **Efficiency first**, because efficiency gains reduce required generating
  capacity and therefore reduce the capital bill before you spend it.
- **Grid integration ahead of capacity**, because renewable capacity stranded
  behind inadequate transmission is capital that produces nothing.
- **Workforce training in parallel**, since the transition reallocates labour
  and reallocation frictions show up as lost output.
- **Capital-formation incentives**, targeted at the one channel this panel shows
  reliably drives growth.

Do the transition. Sequence it so the capital-absorption phase is shorter and
shallower.

## On publishing results you dislike

I was writing this as an econometrics paper in the Department of Economics at
The American University in Cairo, supervised by Dr. Mina Ayad. The honest
version of the work was the one where the coefficient stayed negative through
every robustness check I could construct, and the paper said so, and then did
the harder work of asking what a negative coefficient actually implies.

The alternative — quietly selecting the specification that produced the sign I
wanted — would have been easy and undetectable. It is also the reason a lot of
published empirical work does not replicate.

---

*The full paper, the Stata do-file and the raw dataset are all published at
[zyadhusseini.com](https://www.zyadhusseini.com/) so the result can be
replicated or refuted directly.*

*I'm Zyad Husseini — data analyst and economist, MSc Data Analytics at Kedge
Business School, BA Econometrics and Quantitative Economics from The American
University in Cairo. [LinkedIn](https://www.linkedin.com/in/zyadmhr/) ·
[GitHub](https://github.com/ZyadHusseini)*
