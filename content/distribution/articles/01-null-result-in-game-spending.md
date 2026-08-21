---
title: "I Built 13 Models to Predict Who Spends Money in Games. All 13 Failed — and That Was the Finding."
platforms: [Medium, LinkedIn Article, Dev.to, Hashnode]
canonical: https://www.zyadhusseini.com/
tags: [machine learning, data science, game analytics, research, econometrics]
author: Zyad Husseini
---

# I Built 13 Models to Predict Who Spends Money in Games. All 13 Failed — and That Was the Finding.

My MSc thesis at Kedge Business School set out to answer a question the mobile
games industry treats as settled: which player behaviours predict who will spend
money? Session length, retention, level progression, demographics — the whole
engagement stack is supposed to tell you who the payers are.

I assembled five public datasets covering more than 50,000 players and 52,000
games across mobile, Steam and Roblox catalogues. I built an interpretable
logistic regression as a baseline, then benchmarked thirteen classifiers against
it — random forests, gradient boosting, the usual suspects — with proper
cross-validation and class-imbalance handling, because payers are a small
minority of any player base.

Every single one landed at chance. ROC AUC between 0.48 and 0.52. Not one
feature cleared conventional significance.

## The temptation at that point is to torture the data

There is a well-worn path out of a result like this. You resample until
something sticks. You engineer thirty new features and report the one that
survives. You quietly switch metrics until a number looks respectable. You find
a subgroup where p dips under 0.05 and write the paper about the subgroup.

I want to be honest that this was tempting, because a thesis that says "nothing
predicted anything" reads like a thesis that failed. But a null result you
massage into a finding is not a finding. It is a fabrication with error bars.

So instead I asked the more useful question: **is the signal genuinely absent
from the world, or absent from my data?**

## Building a control to tell those two things apart

That distinction is the whole ballgame, and it is testable. If my pipeline is
broken, it will fail on data where the signal is known to exist. If my pipeline
is sound, it will succeed there and fail only where the data is thin.

So I ran the identical pipeline against two genuine game-level catalogues —
real data, not synthetic. It reached **0.95 ROC AUC**. Using natural language
processing on the store descriptions alone, it recovered the freemium
monetisation signal without being told which games were free-to-play.

Same code. Same methods. Same person writing it. Wildly different result.

That is what turns "my models failed" into a claim you can actually defend: the
pipeline works. The player-level datasets are the problem.

## What the data did show

Here is the part that makes the null result interesting rather than merely
disappointing. The *structure* of spending was crystal clear even though the
*prediction* of it was impossible:

- A revenue Gini coefficient of **0.87**
- The top **1% of payers generating 39% of revenue**
- A playtime Gini of **0.83**

These are the whale dynamics the industry describes, and they are present and
stark. Economic theory predicted this concentration and the data delivered it.
What the data would not deliver was any way to identify *which individual*
becomes a whale from behavioural features alone.

Concentration is visible at the population level. Individual prediction is not.
Those are different claims, and public data supports exactly one of them.

## Why this matters beyond my thesis

The practical implication is unglamorous and, I think, important: credible
prediction of individual spending requires real player-level telemetry. The
public and synthetic datasets that circulate on Kaggle and in academic
replication packages do not carry that signal, and any paper claiming to predict
individual monetisation from them deserves a control condition before you
believe it.

There is an ethical implication too, and it cuts in a direction I did not
expect. Behaviour-based monetisation — dynamic pricing, targeted offers timed to
a player's vulnerability — depends on exactly the individual-level
predictability I could not find in public data. Studios with real telemetry may
well have it. Researchers auditing those practices from the outside largely do
not. That asymmetry is worth naming: the people best positioned to scrutinise
behavioural monetisation have the least access to the data required to do it.

## The thing I actually learned

I came in wanting to build a model that worked. I left having built a control
condition that proved my model's failure was informative rather than
incompetent.

That is a less satisfying sentence to write than "my classifier hit 0.95." It is
a considerably more useful one to have earned.

---

*The full thesis — Predicting In-Game Spending Behaviour Using Machine Learning,
supervised by Dr. Tianyuan Zhang at Kedge Business School — is available at
[zyadhusseini.com](https://www.zyadhusseini.com/), along with the proposal and
my earlier econometrics work on renewable energy and economic growth.*

*I'm Zyad Husseini — a data analyst and economist working between France and
Egypt. MSc Data Analytics at Kedge Business School, BA Econometrics and
Quantitative Economics from The American University in Cairo. You can find me on
[LinkedIn](https://www.linkedin.com/in/zyadmhr/) and
[GitHub](https://github.com/ZyadHusseini).*
