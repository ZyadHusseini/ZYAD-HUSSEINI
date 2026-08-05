import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { MapPin, Target } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { aboutParagraphs, skills, stats, type Accent, type TextSegment } from "../data/content";

const ACCENT_CLASS: Record<Accent, string> = {
  indigo: "text-indigo-400",
  cyan: "text-cyan-400",
  purple: "text-purple-400",
  emerald: "text-emerald-400",
};

function Paragraph({ segments }: { segments: TextSegment[] }) {
  return (
    <p className="leading-relaxed text-slate-400">
      {segments.map((seg, i) =>
        seg.accent ? (
          <span key={i} className={`font-medium ${ACCENT_CLASS[seg.accent]}`}>
            {seg.text}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </p>
  );
}

/** Number that counts up from 0 when it enters the viewport. */
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="gradient-text text-4xl font-extrabold">
      {display}
      {suffix}
    </span>
  );
}

/** Radar-style "skill constellation" — the 8 skills rendered as a dataset. */
function SkillConstellation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const cx = 140;
  const cy = 140;
  const maxR = 96;
  const pointFor = (i: number, r: number) => {
    const angle = ((i / skills.length) * 360 - 90) * (Math.PI / 180);
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  };
  const dataPoints = skills.map((s, i) => pointFor(i, (s.level / 100) * maxR));
  const polygon = dataPoints.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <svg ref={ref} viewBox="0 0 280 280" className="mx-auto w-full max-w-[280px]" role="img" aria-label="Skill levels radar chart">
      {/* rings + spokes */}
      {[0.33, 0.66, 1].map((f) => (
        <polygon
          key={f}
          points={skills.map((_, i) => pointFor(i, maxR * f).join(",")).join(" ")}
          fill="none"
          stroke="#6366f1"
          strokeOpacity="0.15"
        />
      ))}
      {skills.map((_, i) => {
        const [x, y] = pointFor(i, maxR);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#6366f1" strokeOpacity="0.12" />;
      })}

      {/* data polygon */}
      <motion.polygon
        points={polygon}
        fill="rgba(6,182,212,0.12)"
        stroke="url(#constellation-stroke)"
        strokeWidth="2"
        initial={reduced ? undefined : { scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "140px 140px" }}
      />
      <defs>
        <linearGradient id="constellation-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6366f1" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* vertex dots + labels */}
      {skills.map((s, i) => {
        const [dx, dy] = dataPoints[i];
        const [lx, ly] = pointFor(i, maxR + 22);
        return (
          <g key={s.name}>
            <motion.circle
              cx={dx}
              cy={dy}
              r="3.5"
              fill="#06b6d4"
              initial={reduced ? undefined : { opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.07, duration: 0.35 }}
              style={{ transformOrigin: `${dx}px ${dy}px` }}
            />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-400 font-mono"
              fontSize="9"
            >
              {s.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-20 bg-bg-secondary py-24 md:py-32">
      <div className="ambient animate-drift-b absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Get To Know Me" title="About Me" />

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* left — story + stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {aboutParagraphs.map((segments, i) => (
              <Paragraph key={i} segments={segments} />
            ))}

            <div className="grid grid-cols-2 gap-4 pt-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass p-5 text-center transition-colors hover:border-indigo-400/40"
                >
                  <CountUp value={stat.value} suffix={stat.suffix} />
                  <p className="mt-1.5 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* right — skills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="mb-6 text-xl font-bold text-white">
              Technical <span className="gradient-text">Skills</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="glass group flex items-center gap-3 p-4 transition-colors hover:border-white/25"
                  >
                    <motion.span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${skill.gradient} bg-opacity-20 text-white opacity-80 transition-opacity group-hover:opacity-100`}
                      whileHover={{ rotate: [0, -12, 10, -6, 0], transition: { duration: 0.5 } }}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </motion.span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{skill.name}</span>
                      <span className="block font-mono text-[11px] text-slate-500">{skill.category}</span>
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="glass mt-6 p-6">
              <p className="eyebrow mb-4 !text-xs">Skill Constellation</p>
              <SkillConstellation />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="glass flex items-center gap-3 p-4 transition-colors hover:border-cyan-400/40">
                <MapPin className="h-5 w-5 shrink-0 text-cyan-400" aria-hidden />
                <span className="text-sm">
                  <span className="block font-semibold text-white">Based in</span>
                  <span className="text-slate-400">France / Egypt</span>
                </span>
              </div>
              <div className="glass flex items-center gap-3 p-4 transition-colors hover:border-indigo-400/40">
                <Target className="h-5 w-5 shrink-0 text-indigo-400" aria-hidden />
                <span className="text-sm">
                  <span className="block font-semibold text-white">Focus</span>
                  <span className="text-slate-400">Data & Economics</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
