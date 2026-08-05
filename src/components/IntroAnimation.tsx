import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { identity } from "../data/content";
import { markIntroPlayed } from "../lib/introFlag";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION_MS = 3000;

const chips = ["MSc Data Analytics", "5+ Companies", "3 Languages"];

function Letters({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-block" style={{ perspective: 600 }}>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block bg-gradient-to-br from-white via-indigo-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ y: 120, rotateX: -90, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{ delay: delay + i * 0.08, duration: 0.6, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function Typewriter({ text, delay }: { text: string; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = setTimeout(() => {
      const tick = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(tick);
            return c;
          }
          return c + 1;
        });
      }, 28);
    }, delay * 1000);
    return () => clearTimeout(start);
  }, [text, delay]);

  return (
    <p className="mt-6 font-mono text-sm tracking-[0.35em] text-accent-cyan md:text-base">
      {text.slice(0, count)}
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-accent-cyan"
      />
    </p>
  );
}

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const orbitDots = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        angle: (i / 12) * 360,
        color: i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#6366f1" : "#8b5cf6",
      })),
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: `${(i * 137.5) % 100}%`,
        top: `${(i * 61.8) % 100}%`,
        delay: (i % 6) * 0.4,
        size: 2 + (i % 3) * 2,
      })),
    []
  );

  const finish = () => setLeaving(true);

  useEffect(() => {
    const t = setTimeout(finish, DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        markIntroPlayed();
        onComplete();
      }}
    >
      {!leaving && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-bg-primary"
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          aria-label="Intro animation"
        >
          <div className="grid-bg absolute inset-0" aria-hidden />

          {/* floating particles */}
          <div aria-hidden>
            {particles.map((p, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400"
                style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
                animate={{ y: [0, -24, 0], opacity: [0.15, 0.5, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* central orb + rings + orbiting dots */}
          <div className="absolute flex items-center justify-center" aria-hidden>
            <motion.div
              className="absolute h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/40 to-cyan-500/40 blur-2xl"
              animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            {[220, 320, 420].map((size, i) => (
              <motion.div
                key={size}
                className="absolute rounded-full border border-indigo-500/20"
                style={{ width: size, height: size }}
                animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.12, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
              />
            ))}
            <motion.div
              className="absolute h-[360px] w-[360px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            >
              {orbitDots.map((d, i) => (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: d.color,
                    transform: `rotate(${d.angle}deg) translateX(180px)`,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* name + tagline + chips */}
          <div className="relative z-10 px-6 text-center">
            {/* Deliberately not an <h1>: the hero owns the page's single H1, and
                a duplicate here would split the heading signal for crawlers. */}
            <p className="text-6xl font-extrabold leading-tight tracking-tight md:text-8xl">
              <Letters word="ZYAD" delay={0.15} />
              <br className="md:hidden" />
              <span className="hidden md:inline">&nbsp;</span>
              <Letters word="HUSSEINI" delay={0.5} />
            </p>
            <Typewriter text="DATA ANALYST & ECONOMIST" delay={1.3} />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {chips.map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 2 + i * 0.12, type: "spring", stiffness: 260, damping: 18 }}
                  className="glass px-4 py-1.5 font-mono text-xs text-slate-300"
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </div>

          {/* corner tags */}
          <span className="absolute left-6 top-6 font-mono text-xs text-slate-500">v3.0</span>
          <span className="absolute right-6 top-6 font-mono text-xs text-slate-500">FRANCE / EGYPT</span>

          {/* skip */}
          <motion.button
            type="button"
            onClick={finish}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-6 right-6 font-mono text-xs text-slate-400 transition-colors hover:text-white"
          >
            Skip →
          </motion.button>

          {/* loading bar */}
          <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/5" aria-hidden>
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: DURATION_MS / 1000 - 0.2, ease: "easeInOut" }}
            />
          </div>

          <span className="sr-only">{identity.name} — {identity.title}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
