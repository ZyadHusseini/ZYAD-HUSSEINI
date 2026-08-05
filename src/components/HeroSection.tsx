import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Github, Link, Linkedin, Mail } from "lucide-react";
import { identity } from "../data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Animated line chart that draws itself behind the hero name, looping. */
function HeroChart() {
  const reduced = useReducedMotion();
  const line = "M0,240 L60,210 L120,222 L180,170 L240,182 L300,120 L360,138 L420,80 L480,96 L540,40 L600,52";
  const area = `${line} L600,300 L0,300 Z`;
  const points = [
    [60, 210], [180, 170], [300, 120], [420, 80], [540, 40],
  ] as const;

  return (
    <svg
      viewBox="0 0 600 300"
      className="pointer-events-none absolute right-0 top-1/2 hidden w-[55%] max-w-2xl -translate-y-1/2 opacity-25 md:block"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6366f1" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6366f1" stopOpacity="0.35" />
          <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[60, 120, 180, 240].map((yLine) => (
        <line key={yLine} x1="0" y1={yLine} x2="600" y2={yLine} stroke="#6366f1" strokeOpacity="0.12" strokeDasharray="4 8" />
      ))}
      <motion.path
        d={area}
        fill="url(#hero-area)"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 1 : [0, 1, 1, 0] }}
        transition={reduced ? { duration: 0 } : { duration: 10, times: [0, 0.35, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="url(#hero-line)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={reduced ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0], opacity: [0.4, 1, 1, 0.4] }}
        transition={reduced ? { duration: 0 } : { duration: 10, times: [0, 0.35, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      {points.map(([px, py], i) => (
        <motion.circle
          key={i}
          cx={px}
          cy={py}
          r="4"
          fill="#06b6d4"
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={reduced ? { opacity: 1 } : { opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 10, times: [0.08 + i * 0.06, 0.35, 0.85, 1], repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
    </svg>
  );
}

export default function HeroSection({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Background moves at ~50% of scroll speed; content fades out on scroll.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: started ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.7, ease: EASE },
  });

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden focus:outline-none"
    >
      {/* parallax background */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: bgY }} aria-hidden>
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
        <div className="ambient animate-drift-a absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="ambient animate-drift-b absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="ambient animate-drift-c absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-purple-600/15 blur-3xl" />
      </motion.div>

      <HeroChart />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-16"
        style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <motion.p {...reveal(0.1)} className="eyebrow mb-6">
          {identity.title}
        </motion.p>

        <motion.h1
          {...reveal(0.25)}
          className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {identity.firstName}{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {identity.lastName}
          </span>
        </motion.h1>

        <motion.p {...reveal(0.4)} className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
          {identity.heroSub}
        </motion.p>

        <motion.div {...reveal(0.55)} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-3.5 font-semibold text-white transition-shadow hover:shadow-[0_0_32px_rgba(99,102,241,0.5)]"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="glass px-8 py-3.5 font-semibold text-white transition-colors hover:border-indigo-400/50"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div {...reveal(0.7)} className="mt-12 flex items-center gap-4">
          {[
            { href: identity.linkedin, icon: Linkedin, label: "LinkedIn" },
            { href: identity.github, icon: Github, label: "GitHub" },
            { href: identity.linktree, icon: Link, label: "Linktree" },
            { href: `mailto:${identity.email}`, icon: Mail, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="glass p-3 text-slate-400 transition-all hover:-translate-y-1 hover:border-cyan-400/50 hover:text-white"
            >
              <Icon className="h-5 w-5" aria-hidden />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-slate-500 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-cyan-400"
            animate={reduced ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
