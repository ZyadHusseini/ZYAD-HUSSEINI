import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { ventures, venturesIntro } from "../data/content";

export default function VenturesSection() {
  return (
    <section id="ventures" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div className="ambient animate-drift-b absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" aria-hidden />
      <div className="ambient animate-drift-c absolute bottom-0 left-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="What I'm Building" title="Ventures & Startups" />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-slate-400"
        >
          {venturesIntro}
        </motion.p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ventures.map((venture, i) => {
            const Icon = venture.icon;
            return (
              <motion.div
                key={venture.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="glass group relative flex flex-col p-6 transition-colors hover:border-indigo-400/50 hover:shadow-[0_0_32px_rgba(99,102,241,0.18)]"
              >
                <div className="mb-5 flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${venture.gradient} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300"
                    aria-hidden
                  />
                </div>
                <div className="mb-1.5 flex items-center gap-2.5">
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-cyan-300">
                    {/* Stretched link: the whole card is clickable, but the social
                        icons below sit above it so they stay separately clickable. */}
                    <a
                      href={venture.url}
                      target="_blank"
                      rel="noreferrer"
                      className="after:absolute after:inset-0 after:content-['']"
                      aria-label={`${venture.name} — ${venture.category} (opens in a new tab)`}
                    >
                      {venture.name}
                    </a>
                  </h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                    {venture.category}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-400">{venture.description}</p>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-indigo-400 transition-colors group-hover:text-cyan-300">
                    {venture.displayUrl}
                  </span>
                  {venture.socials && (
                    <span className="relative z-10 flex items-center gap-1.5">
                      {venture.socials.map((social) => {
                        const SocialIcon = social.icon;
                        return (
                          <a
                            key={social.url}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={social.label}
                            className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                          >
                            <SocialIcon className="h-3.5 w-3.5" aria-hidden />
                          </a>
                        );
                      })}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
