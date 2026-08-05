import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { mainExperience, previousExperience, type JobType } from "../data/content";

const TYPE_BADGE: Record<JobType, string> = {
  "Full-time": "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  "Part-time": "border-blue-500/30 bg-blue-500/10 text-blue-400",
  Internship: "border-purple-500/30 bg-purple-500/10 text-purple-400",
};

export default function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div className="ambient animate-drift-a absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Career Journey" title="Work Experience" />

        {/* timeline */}
        <div ref={timelineRef} className="relative mt-20">
          {/* track + self-drawing gradient line */}
          <div className="absolute bottom-0 left-4 top-0 w-px bg-white/5 md:left-1/2 md:-translate-x-1/2" aria-hidden />
          <motion.div
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-indigo-500 via-cyan-400 to-purple-500 md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: lineScale }}
            aria-hidden
          />

          <ol className="space-y-10">
            {mainExperience.map((job, i) => {
              const left = i % 2 === 0;
              return (
                <li key={`${job.role}-${job.company}`} className="group relative">
                  {/* timeline dot */}
                  <span
                    className="absolute left-4 top-7 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-bg-primary bg-gradient-to-br from-indigo-400 to-cyan-400 transition-transform group-hover:scale-150 group-hover:animate-pulse-dot md:left-1/2"
                    aria-hidden
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`glass ml-12 p-6 transition-all hover:border-indigo-400/40 hover:shadow-[0_0_28px_rgba(99,102,241,0.15)] md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      left ? "" : "md:ml-auto"
                    }`}
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className={`rounded-full border px-3 py-0.5 text-xs font-medium ${TYPE_BADGE[job.type]}`}>
                        {job.type}
                      </span>
                      <span className="font-mono text-xs text-slate-500">{job.period}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{job.role}</h3>
                    <p className="mb-2 font-medium text-indigo-400">{job.company}</p>
                    <p className="mb-4 text-sm leading-relaxed text-slate-400">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* previous experience */}
        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 mt-24 text-center text-xl font-bold text-white"
        >
          Previous <span className="gradient-text">Experience</span>
        </motion.h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {previousExperience.map((job, i) => {
            const Icon = job.icon;
            return (
              <motion.div
                key={`${job.role}-${job.period}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass p-5 transition-all hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <Icon className="mb-3 h-6 w-6 text-cyan-400" aria-hidden />
                <h4 className="text-sm font-bold text-white">{job.role}</h4>
                <p className="text-sm text-indigo-400">{job.company}</p>
                <p className="mt-2 font-mono text-[11px] text-slate-500">
                  {job.period} · {job.type}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
