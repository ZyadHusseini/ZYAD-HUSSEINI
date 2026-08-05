import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projectFilters, projects, type Project } from "../data/content";

type FilterId = (typeof projectFilters)[number]["id"];

/** Glass card with a gentle 3D tilt toward the cursor. */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const reduced = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 10);
  };
  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const Icon = project.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6 }}
        className="glass group block h-full w-full p-6 text-left transition-colors hover:border-indigo-400/50 hover:shadow-[0_0_32px_rgba(99,102,241,0.18)]"
        aria-haspopup="dialog"
        aria-label={`Open case study: ${project.title}`}
      >
        <div className="mb-5 flex items-start justify-between">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${project.gradient} text-white shadow-lg`}
          >
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-slate-400">
            {project.year}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-cyan-300">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-slate-400 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-slate-400"
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.button>
    </motion.div>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[85] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass max-h-[85vh] w-full max-w-2xl overflow-y-auto bg-[#12121a]/90 p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${project.gradient} text-white`}>
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="font-mono text-xs text-slate-500">
                {project.year} · {project.category}
              </p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="glass shrink-0 p-2 text-slate-400 transition-colors hover:text-white"
            aria-label="Close case study"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {(
          [
            ["The Problem", project.caseStudy.problem],
            ["What I Did", project.caseStudy.approach],
            ["Outcome", project.caseStudy.outcome],
          ] as const
        ).map(([heading, body], i) => (
          <div key={heading} className={i === 0 ? "" : "mt-6"}>
            <p className="eyebrow mb-2 !text-xs">{heading}</p>
            <p className="text-sm leading-relaxed text-slate-300">{body}</p>
          </div>
        ))}

        <div className="mt-6">
          <p className="eyebrow mb-3 !text-xs">Tools</p>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 font-mono text-xs text-cyan-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const visible = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="projects" className="relative scroll-mt-20 bg-bg-secondary py-24 md:py-32">
      <div className="ambient animate-drift-c absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="My Work" title="Featured Projects" />

        {/* filter pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3" role="group" aria-label="Filter projects">
          {projectFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                filter === f.id
                  ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                  : "glass text-slate-400 hover:border-white/25 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={() => setOpenProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {openProject && (
          <CaseStudyModal project={openProject} onClose={() => setOpenProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
