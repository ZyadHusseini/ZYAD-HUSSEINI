---
title: "Egyptian Logistics Runs on WhatsApp and Excel. Here's What Building Real Reporting on Top of That Actually Takes."
platforms: [LinkedIn Article, Medium, Egyptian tech publications]
canonical: https://www.zyadhusseini.com/
tags: [Egypt, logistics, business intelligence, Power BI, data analytics, MENA]
author: Zyad Husseini
---

# Egyptian Logistics Runs on WhatsApp and Excel. Here's What Building Real Reporting on Top of That Actually Takes.

Every business intelligence tutorial starts with a clean data source. A
warehouse, a schema, an API. In Egyptian logistics — and I suspect across most
of the MENA operating environment — that is not the starting position, and
pretending otherwise is why so many BI projects here die in month three.

The actual starting position is a driver confirming a delivery on WhatsApp, an
operations coordinator typing it into a spreadsheet that already has three
divergent copies, and a finance team reconciling that spreadsheet against an ERP
that nobody fully trusts. I have worked as a data analyst at Pack 'N' Move
Logistics Egypt, on business intelligence for London Cab Egypt, and on ERP
cash-flow integration at Arcorp — and this pattern was present, in some form, at
every one of them.

Here is what I have learned about building on that ground rather than
complaining about it.

## The bottleneck is definitional, not technical

The first dashboard I build is almost never the hard part. Power BI will happily
connect to a spreadsheet in ten minutes.

The hard part is that "delivered" means four different things to four different
departments. Operations means the driver marked it complete. Finance means the
invoice cleared. Customer service means the client stopped calling. The
warehouse means it left the building.

Build a dashboard before resolving that, and you ship a number that every
department can point at and say "that's wrong" — and every one of them is right,
because you picked one definition and four exist. The dashboard then dies, not
because the DAX was bad, but because it had no agreed referent.

So the sequence that works is: **agree the definition, write it down, then
build.** The written-down part matters. Verbal agreement evaporates the moment
the number says something inconvenient.

## Design for the data you have, not the data you want

A second failure mode is building the pipeline that assumes clean, timestamped,
system-generated events, and then blaming the operation for not producing them.

The operation is not going to change its behaviour because your model needs it
to. Drivers will keep using WhatsApp, because WhatsApp works on any handset, on
weak signal, in Arabic, with no training. That is a real advantage and your
architecture should absorb it rather than fight it.

Practically: build ingestion that tolerates manual entry, late arrivals,
duplicate records and inconsistent spelling of the same client name. Put the
reconciliation logic in the pipeline where it can be versioned and audited,
rather than in a coordinator's head where it cannot.

## Connect to the ERP last, and connect deliberately

At Arcorp I consolidated subsidiary data and connected a cash-flow statement to
an ERP system in Power BI. The lesson from that work was about ordering.

The ERP is the system of record for finance, and the moment you wire live
reporting to it, every discrepancy between operational reality and financial
record becomes visible at once. That is the *goal* — but it is also a political
event inside a company, and it goes far better when the operational definitions
are already settled and written down. Connect the ERP first and the resulting
argument is about your dashboard. Connect it last and the argument is about the
underlying discrepancy, which is the argument worth having.

## The bilingual problem nobody mentions

Client names, addresses and route descriptions arrive in Arabic and English, and
frequently in transliterated Arabic that has no standard spelling. The same
customer will appear four ways.

Entity resolution is therefore not an advanced feature you add later. In an
Egyptian logistics dataset it is a first-week requirement, and if you skip it
your counts are wrong in a way that is invisible until someone senior notices
the client list is longer than the client list.

## Why this is worth doing here

There is a persistent assumption that serious data work belongs to markets with
mature data infrastructure, and that operations here should wait until they have
it. I think that has it backwards. The gap between what an Egyptian logistics
operation currently knows about itself and what it *could* know is far larger
than the equivalent gap in a market where reporting is already mature — which
means the return on getting it right is larger too.

The constraint is real. It is also not a reason to wait.

---

*I'm Zyad Husseini — a data analyst and economist working between France and
Egypt. I hold a BA in Econometrics and Quantitative Economics from The American
University in Cairo and am completing an MSc in Data Analytics at Kedge Business
School, and I work across the PNM group of logistics and technology companies.
More at [zyadhusseini.com](https://www.zyadhusseini.com/) ·
[LinkedIn](https://www.linkedin.com/in/zyadmhr/)*
