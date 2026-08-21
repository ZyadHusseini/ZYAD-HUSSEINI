# Ready-to-Post Pack

Short-form posts for the platforms you already have sessions on. Each links back
to a page on **your** domain, which is the point — the post is the distribution,
the ranking asset stays on zyadhusseini.com.

Post these roughly a week apart. Five in five days reads as a campaign; five over
five weeks reads as a person who writes.

---

## LinkedIn post 1 — the null result *(post first; it's the strongest)*

> Thirteen machine learning models. Every one of them failed. That was the
> finding.
>
> My MSc thesis asked which player behaviours predict who spends money in games.
> Five public datasets, 50,000+ players, 52,000 games. I built a logistic
> regression baseline and benchmarked thirteen classifiers against it.
>
> All of them landed at chance. ROC AUC between 0.48 and 0.52. Not one feature
> cleared significance.
>
> There's a well-worn path out of a result like that. Resample until something
> sticks. Engineer thirty features and report the survivor. Find the subgroup
> where p dips under 0.05 and write the paper about the subgroup.
>
> I want to be honest that it was tempting. A thesis saying "nothing predicted
> anything" reads like a thesis that failed.
>
> So I asked a better question instead: is the signal missing from the world, or
> missing from my data?
>
> That's testable. I ran the identical pipeline on two genuine game-level
> catalogues. It hit 0.95 ROC AUC — and recovered the freemium signal from store
> descriptions alone, using NLP, without being told which games were free.
>
> Same code. Same methods. Wildly different result.
>
> That's what turns "my models failed" into a claim you can defend. The pipeline
> works. The public player-level data is the problem.
>
> And the structure was there all along: revenue Gini of 0.87, top 1% of payers
> generating 39% of revenue. Population-level concentration, crystal clear.
> Individual-level prediction, impossible.
>
> Which has an uncomfortable implication. Behaviour-based monetisation depends
> on exactly the individual predictability I couldn't find in public data.
> Studios with real telemetry may well have it. Researchers auditing them from
> outside don't. The people best placed to scrutinise the practice have the
> least access to the data required.
>
> Full thesis and the write-up:
> https://www.zyadhusseini.com/writing/null-result-in-game-spending/
>
> #DataScience #MachineLearning #Research #GameAnalytics

---

## LinkedIn post 2 — publishing a result you dislike

> I published an econometrics result I didn't like, and I'd do it again.
>
> Seven countries, 1990–2023, 238 country-year observations from the World Bank.
> The question: does renewable energy adoption drive economic growth?
>
> The answer the data gave: it's associated with *slower* short-run growth.
> Under 2SLS, a one-unit rise in the renewable share is associated with a 1.44
> percentage point reduction in GDP per capita growth. p = 0.029.
>
> I ran panel OLS, robust OLS after a White test, MLE, fixed effects with year
> dummies, Newey–West, random effects after a Hausman test, and instrumented
> with a lag validated by Cragg–Donald.
>
> I ran that many specifications specifically because I didn't like the answer.
> It survived all of them.
>
> Here's the part that matters, and the part that gets misquoted: this is a
> SHORT-RUN GROWTH result. It says nothing about welfare, climate outcomes, or
> avoided damages — none of which are in the model, and the last of which is the
> entire reason decarbonisation is worth doing. Anyone citing this to argue for
> slowing down is misreading it.
>
> What it does argue for is sequencing. Gross capital formation was positive and
> highly significant in every specification. If the drag runs through capital
> absorption, you attack the drag: efficiency first, grid integration ahead of
> capacity, workforce training in parallel, capital-formation incentives.
>
> Do the transition. Sequence it so the expensive phase is shorter.
>
> Paper, Stata do-file and raw dataset are all public, so you can replicate it
> or refute it: https://www.zyadhusseini.com/writing/renewable-energy-growth/
>
> #Economics #Econometrics #EnergyTransition #OpenScience

---

## LinkedIn post 3 — the L'Oréal carbon result

> We got 93% of the accuracy for 1/2,000th of the carbon. That ratio is the
> whole finding.
>
> The L'Oréal hackathon scored three things, not one: F1, CO₂ emissions, and
> model size. That single change to the objective function changed every
> decision we made.
>
> Fine-tuned Longformer → 0.688 micro-F1, 113.8g CO₂, 3.5 hours on a T4.
> TF-IDF + LightGBM → 0.638 micro-F1, 0.05g CO₂, minutes on CPU.
>
> The last 7% of F1 cost three orders of magnitude more emissions than the first
> 93%.
>
> The insight that got us there was splitting the labels. Some skin conditions
> were stated outright in the product copy — that's extraction, not prediction.
> Others had to be inferred. Training one model on both means it does neither
> cleanly. So: two models, and the cheap one scored 0.77 on the stated labels.
>
> Which tells you how to actually deploy it. Run the light pipeline across the
> whole catalogue; reserve the transformer for the rows where inference is
> genuinely required. You buy the transformer's advantage only where it exists.
>
> We presented at L'Oréal HQ in Paris. The question that landed hardest wasn't
> about the modelling — it was what 113.8g vs 0.05g means multiplied by every
> retraining cycle, every market, every year.
>
> Add cost to your objective function before you start. Teams that measure only
> quality optimise only quality, then discover the bill.
>
> https://www.zyadhusseini.com/writing/loreal-carbon-tradeoff/
>
> #MachineLearning #GreenAI #Sustainability #NLP

---

## LinkedIn post 4 — Egypt / logistics

> Every BI tutorial starts with a clean data source. Egyptian logistics does
> not, and pretending otherwise is why so many of these projects die in month
> three.
>
> The real starting point: a driver confirming delivery on WhatsApp. A
> coordinator retyping it into a spreadsheet that already has three divergent
> copies. Finance reconciling that against an ERP nobody fully trusts.
>
> Four things I've learned building on that ground rather than complaining about
> it:
>
> 1. The bottleneck is definitional, not technical. "Delivered" means four
> different things to four departments. Build before you resolve that and you
> ship a number every department can call wrong — and they're all right.
>
> 2. Design for the data you have. Drivers will keep using WhatsApp, because it
> works on any handset, on weak signal, in Arabic, with no training. That's an
> advantage. Absorb it instead of fighting it.
>
> 3. Connect the ERP last. The moment you wire live reporting to it, every gap
> between operational reality and financial record becomes visible at once.
> That's the goal — but it goes far better once definitions are already settled
> and written down.
>
> 4. Bilingual entity resolution is a week-one requirement. The same client
> appears four ways across Arabic, English and transliteration. Skip it and your
> counts are wrong invisibly.
>
> There's a persistent assumption that serious data work belongs to markets with
> mature infrastructure and that operations here should wait. I think that's
> backwards. The gap between what an Egyptian operation currently knows about
> itself and what it could know is bigger — so the return on getting it right is
> bigger too.
>
> https://www.zyadhusseini.com/writing/egypt-logistics-data/
>
> #Egypt #Logistics #BusinessIntelligence #PowerBI #MENA

---

## LinkedIn post 5 — Tekken / competition

> Six years of professional basketball, twelve years of FIFA and Call of Duty,
> and now Tekken. I've been curious what actually transfers.
>
> Reading an opponent transfers completely. In basketball you learn to read hips
> rather than the ball, because hips commit and the ball lies. In Tekken you
> learn what someone reaches for at low health. Same skill: building a live
> model of one human from few observations, faster than they build one of you.
>
> Composure in decided moments transfers. Basketball is decided in possessions,
> Tekken in single frames. The physiological response is identical and thinking
> through it is trainable.
>
> Labbing does not transfer, and I underestimated it badly. Punishing correctly
> isn't intuition, it's memorisation — knowing a move is -14 and that Victor has
> a 14-frame punish. There's no basketball equivalent of two hours in practice
> mode for one move in one matchup. You cannot substitute reads for it. I lost a
> lot of sets before accepting that.
>
> It's the part I recognise from econometrics, honestly: grinding specifications
> until something is understood rather than approximately felt.
>
> Competing as ELECTRO_SMG in the Tekken Egyptian League, Tekken World Tour MEA.
> 7th at a Dojo event, qualified for the next one.
>
> The Egyptian scene's problem isn't talent — it's that almost none of it gets
> recorded. A bracket nobody films may as well not have happened. So I've
> started publishing mine.
>
> https://www.zyadhusseini.com/writing/tekken-egypt-esports/
>
> #Esports #Tekken #Egypt #TekkenWorldTour

---

## Medium / Dev.to / Hashnode

Publish the **full essays** from `content/distribution/articles/` there rather
than the short posts.

⚠️ **Set the canonical URL** on every one to the matching
`https://www.zyadhusseini.com/writing/<slug>/`. Medium calls it "Advanced
settings → Customize canonical link"; Dev.to and Hashnode both have a canonical
field. Without it you're competing against your own domain and Medium usually
wins — which is the opposite of what you want.

---

## Reddit — be careful here

Self-promotional posts about yourself get removed and can get you banned, and
that's the spam pattern I'd avoid anyway. If you post at all:

- **r/gamedev / r/datascience** — the null-result piece, framed as a methods
  discussion, not "look at my thesis"
- **r/Tekken** — match footage and scene discussion, no links to your portfolio
- **r/Egypt** — only if it's genuinely useful to that audience

Contribute for a while before you ever link anything. One good comment history
is worth more than five removed posts.
