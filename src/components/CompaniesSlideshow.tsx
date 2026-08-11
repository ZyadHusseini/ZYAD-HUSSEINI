import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { companies } from "../data/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE_MS = 6000;

/**
 * Deliberately monochrome. Every other section on this site leans on the
 * indigo-to-cyan gradient; this one holds a single accent and lets the company
 * names carry the weight, so the roster reads as a record rather than a
 * decorated panel.
 */
export default function CompaniesSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);

  const total = companies.length;
  const go = useCallback((next: number) => setIndex(((next % total) + total) % total), [total]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Timers keep firing in a background tab while rAF is throttled, so the
  // index would run ahead of what is actually rendered. Track visibility and
  // treat a hidden tab as paused.
  const [hidden, setHidden] = useState(
    () => typeof document !== "undefined" && document.hidden
  );
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Auto-advance. Suspended while paused, while the visitor is interacting,
  // while the tab is hidden, and entirely under prefers-reduced-motion.
  useEffect(() => {
    if (paused || reduced || hidden) return;
    const t = setTimeout(next, SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduced, hidden, next]);

  // Arrow keys work whenever the carousel has focus within it.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const company = companies[index];

  return (
    <section id="companies" className="relative scroll-mt-20 overflow-hidden bg-bg-secondary py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Where I've Worked" title="Companies" />

        <div
          ref={regionRef}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="glass mt-14 overflow-hidden"
          role="group"
          aria-roledescription="carousel"
          aria-label="Companies Zyad has worked with"
        >
          {/* progress rail */}
          <div className="h-0.5 w-full bg-white/5" aria-hidden>
            <motion.div
              key={`${index}-${paused}-${hidden}-${String(reduced)}`}
              className="h-full bg-indigo-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: paused || reduced || hidden ? 0 : 1 }}
              style={{ transformOrigin: "left" }}
              transition={{
                duration: paused || reduced || hidden ? 0 : SLIDE_MS / 1000,
                ease: "linear",
              }}
            />
          </div>

          <div className="relative min-h-[26rem] p-8 md:min-h-[24rem] md:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -16 }}
                transition={{ duration: 0.45, ease: EASE }}
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-indigo-400/40 px-3 py-0.5 text-xs font-medium text-indigo-300">
                    {company.relation}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{company.period}</span>
                </div>

                <h3 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                  {company.url ? (
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-baseline gap-3 transition-colors hover:text-indigo-300"
                    >
                      {company.name}
                      <ArrowUpRight
                        className="h-6 w-6 shrink-0 self-center text-slate-600 transition-colors group-hover:text-indigo-300"
                        aria-hidden
                      />
                    </a>
                  ) : (
                    company.name
                  )}
                </h3>

                <p className="mt-3 text-lg font-medium text-slate-300">{company.role}</p>
                <p className="mt-5 max-w-2xl leading-relaxed text-slate-400">{company.summary}</p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {company.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate-400"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* counter */}
            <p className="pointer-events-none absolute right-8 top-8 font-mono text-xs text-slate-600 md:right-14 md:top-14">
              <span className="text-indigo-300">{String(index + 1).padStart(2, "0")}</span>
              {" / "}
              {String(total).padStart(2, "0")}
            </p>
          </div>

          {/* controls */}
          <div className="flex items-center justify-between gap-4 border-t border-white/10 px-8 py-5 md:px-14">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous company"
                className="rounded-full border border-white/10 p-2.5 text-slate-400 transition-colors hover:border-indigo-400/50 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next company"
                className="rounded-full border border-white/10 p-2.5 text-slate-400 transition-colors hover:border-indigo-400/50 hover:text-white"
              >
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              {!reduced && (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
                  className="ml-1 rounded-full border border-white/10 p-2.5 text-slate-400 transition-colors hover:border-indigo-400/50 hover:text-white"
                >
                  {paused ? (
                    <Play className="h-4 w-4" aria-hidden />
                  ) : (
                    <Pause className="h-4 w-4" aria-hidden />
                  )}
                </button>
              )}
            </div>

            {/* dots — each is a real button so the whole set is keyboard reachable */}
            <div className="flex flex-wrap items-center justify-end gap-2">
              {companies.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show ${c.name}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-7 bg-indigo-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Full roster in plain text: the carousel shows one company at a time,
            so without this a crawler or screen-reader user only ever sees one. */}
        <p className="sr-only">
          Companies Zyad Husseini has worked with and founded:{" "}
          {companies.map((c) => `${c.name} (${c.relation}, ${c.period})`).join("; ")}.
        </p>
      </div>
    </section>
  );
}
