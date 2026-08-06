import { motion } from "framer-motion";
import { Building2, Download, Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { researchPapers } from "../data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ResearchSection() {
  return (
    <section id="research" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div
        className="ambient animate-drift-a absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="ambient animate-drift-b absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Published Work" title="Research" />

        <div className="mt-16 space-y-10">
          {researchPapers.map((paper) => (
            <motion.article
              key={paper.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="glass overflow-hidden"
            >
              <div className="border-b border-white/10 p-8 md:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400">
                    {paper.type}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{paper.year}</span>
                </div>

                <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                  {paper.title}
                </h3>

                <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
                  <Building2 className="h-4 w-4 shrink-0 text-indigo-400" aria-hidden />
                  <span className="font-medium text-slate-300">{paper.institution}</span>
                  <span aria-hidden className="text-slate-600">·</span>
                  <span>{paper.department}</span>
                </p>
                <p className="mt-1.5 font-mono text-xs text-slate-500">
                  {paper.course} · supervised by {paper.supervisor}
                </p>

                {/* research question */}
                <div className="mt-7 flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Quote className="h-5 w-5 shrink-0 text-cyan-400" aria-hidden />
                  <p className="text-base font-medium italic leading-relaxed text-slate-200">
                    {paper.question}
                  </p>
                </div>

                <p className="mt-6 leading-relaxed text-slate-400">{paper.abstract}</p>
              </div>

              {/* headline results */}
              <div className="grid gap-px border-b border-white/10 bg-white/10 sm:grid-cols-3">
                {paper.findings.map((f) => (
                  <div key={f.label} className="bg-[#12121a] p-6 text-center">
                    <p className="gradient-text text-3xl font-extrabold">{f.value}</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{f.label}</p>
                  </div>
                ))}
              </div>

              <div className="p-8 md:p-10">
                <p className="eyebrow mb-3 !text-xs">Data</p>
                <p className="mb-7 font-mono text-sm text-slate-400">{paper.data}</p>

                <p className="eyebrow mb-3 !text-xs">Methods</p>
                <div className="mb-7 flex flex-wrap gap-2">
                  {paper.methods.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-slate-400"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <p className="eyebrow mb-3 !text-xs">What it concludes</p>
                <p className="mb-8 leading-relaxed text-slate-400">{paper.conclusion}</p>

                <p className="eyebrow mb-4 !text-xs">Paper &amp; replication materials</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {paper.assets.map((asset) => {
                    const Icon = asset.icon;
                    const isPdf = asset.href.endsWith(".pdf");
                    return (
                      <a
                        key={asset.href}
                        href={asset.href}
                        {...(isPdf
                          ? { target: "_blank", rel: "noreferrer" }
                          : { download: "" })}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-0.5 hover:border-cyan-400/50"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-cyan-300">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-white">
                            {asset.label}
                          </span>
                          <span className="block font-mono text-[11px] text-slate-500">
                            {asset.detail}
                          </span>
                        </span>
                        <Download
                          className="h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-cyan-300"
                          aria-hidden
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
