import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ChevronDown,
  Download,
  FileText,
  Globe,
  GraduationCap,
  Languages,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { credentials, education, identity, languages } from "../data/content";

const TABS = [
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "credentials", label: "Certifications & Achievements", icon: Award },
  { id: "languages", label: "Languages", icon: Globe },
] as const;

type TabId = (typeof TABS)[number]["id"];

function DownloadCV() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: Event) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-3.5 font-semibold text-white transition-shadow hover:shadow-[0_0_32px_rgba(99,102,241,0.5)]"
      >
        <Download className="h-4 w-4" aria-hidden />
        Download Full CV
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            role="menu"
            className="glass absolute left-1/2 top-full z-20 mt-3 w-56 -translate-x-1/2 overflow-hidden bg-[#12121a]/95 p-1.5"
          >
            {[
              { label: "English Version", href: identity.cvEnglish },
              { label: "French Version", href: identity.cvFrench },
            ].map((item) => (
              <a
                key={item.label}
                role="menuitem"
                href={item.href}
                download
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <FileText className="h-4 w-4 text-cyan-400" aria-hidden />
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CVHighlights() {
  const [tab, setTab] = useState<TabId>("education");

  return (
    <section id="cv" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      {/* sweeping horizontal lines */}
      <div aria-hidden>
        {[18, 45, 72].map((top, i) => (
          <div
            key={top}
            className="ambient animate-sweep absolute h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"
            style={{ top: `${top}%`, animationDelay: `${i * 2.6}s` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Curriculum Vitae" title="My Qualifications" />

        {/* tabs */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="CV categories"
        >
          {TABS.map((t) => {
            const Icon = t.icon;
            const selected = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(t.id)}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  selected ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="cv-tab-pill"
                    className="absolute inset-0 rounded-full border border-indigo-400/40 bg-gradient-to-r from-indigo-500/25 to-cyan-500/25"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    aria-hidden
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" aria-hidden />
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* tab content */}
        <div className="mt-12 min-h-[22rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === "education" && (
                <div className="grid gap-5 md:grid-cols-3">
                  {education.map((item) => (
                    <div
                      key={item.degree}
                      className="glass flex flex-col p-6 transition-all hover:-translate-y-1 hover:border-indigo-400/40"
                    >
                      <GraduationCap className="mb-4 h-7 w-7 text-indigo-400" aria-hidden />
                      <h3 className="text-lg font-bold text-white">{item.degree}</h3>
                      <p className="text-sm text-slate-400">
                        {item.school} · {item.place}
                      </p>
                      <p className="mb-4 mt-1.5 font-mono text-xs text-cyan-400">{item.year}</p>
                      <div className="mt-auto flex flex-wrap gap-2">
                        {item.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-slate-400"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === "credentials" && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {credentials.map((item) => {
                    const Icon = item.icon;
                    const gold = item.kind === "achievement";
                    return (
                      <div
                        key={item.title}
                        className={`glass p-6 transition-all hover:-translate-y-1 ${
                          gold ? "hover:border-amber-400/40" : "hover:border-cyan-400/40"
                        }`}
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <Icon
                            className={`h-6 w-6 ${gold ? "text-amber-400" : "text-cyan-400"}`}
                            aria-hidden
                          />
                          <span
                            className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                              gold
                                ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                                : "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                            }`}
                          >
                            {gold ? "Achievement" : "Certification"}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold leading-snug text-white">{item.title}</h3>
                        <p className="mt-1.5 text-sm text-slate-400">{item.issuer}</p>
                        <p className="mt-2 font-mono text-xs text-slate-500">{item.year}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {tab === "languages" && (
                <div className="grid gap-5 md:grid-cols-3">
                  {languages.map((lang) => (
                    <div
                      key={lang.name}
                      className="glass flex items-center justify-between p-6 transition-all hover:-translate-y-1 hover:border-emerald-400/40"
                    >
                      <div className="flex items-center gap-3">
                        <Languages className="h-6 w-6 text-cyan-400" aria-hidden />
                        <div>
                          <h3 className="font-bold text-white">{lang.name}</h3>
                          <p className="text-sm text-slate-400">{lang.level}</p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${
                          lang.badge === "Native"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-blue-500/30 bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {lang.badge}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-14 text-center">
          <DownloadCV />
        </div>
      </div>
    </section>
  );
}
