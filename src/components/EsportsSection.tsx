import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Play, Swords, Trophy } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { esports, type EsportsClip } from "../data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Click-to-load video card.
 *
 * Until the visitor presses play there is no <video> element at all — only the
 * poster image. Three clips at ~13MB combined would otherwise dwarf the rest of
 * the page, which currently ships around 136KB, and browsers will happily start
 * fetching video metadata (or more) on their own. The poster carries real
 * width/height so nothing shifts when it loads.
 */
function ClipCard({ clip }: { clip: EsportsClip }) {
  const [playing, setPlaying] = useState(false);
  const portrait = clip.height > clip.width;

  return (
    <figure className="glass overflow-hidden">
      <div
        className="relative bg-black"
        style={{ aspectRatio: `${clip.width} / ${clip.height}` }}
      >
        {playing ? (
          <video
            src={clip.src}
            poster={clip.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="h-full w-full object-contain"
          >
            Your browser does not support the video tag.{" "}
            <a href={clip.src}>Download the clip</a> instead.
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${clip.title}`}
            className="group absolute inset-0 h-full w-full"
          >
            <img
              src={clip.poster}
              alt={clip.title}
              width={clip.width}
              height={clip.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 h-6 w-6 text-white" aria-hidden />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-5">
        <p className="text-sm font-semibold leading-snug text-white">{clip.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{clip.description}</p>
        <p className="mt-3 font-mono text-[11px] text-slate-500">
          {portrait ? "Handheld · " : "Broadcast · "}
          {Math.floor(clip.seconds / 60)}:{String(clip.seconds % 60).padStart(2, "0")}
        </p>
      </figcaption>
    </figure>
  );
}

export default function EsportsSection() {
  const [featured, ...rest] = esports.clips;

  const facts = [
    { icon: Gamepad2, label: "Tag", value: esports.tag },
    { icon: Swords, label: "Main", value: esports.character },
    { icon: Trophy, label: "Result", value: esports.placement },
  ];

  return (
    <section id="esports" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div
        className="ambient animate-drift-a absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Outside The Data" title="Esports" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mt-8 max-w-3xl text-center"
        >
          <p className="leading-relaxed text-slate-400">{esports.summary}</p>
          <p className="mt-4 leading-relaxed text-slate-500">{esports.throughline}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {facts.map((f) => {
              const Icon = f.icon;
              return (
                <span
                  key={f.label}
                  className="glass flex items-center gap-2.5 px-4 py-2 text-sm"
                >
                  <Icon className="h-4 w-4 text-purple-400" aria-hidden />
                  <span className="text-slate-500">{f.label}</span>
                  <span className="font-medium text-white">{f.value}</span>
                </span>
              );
            })}
          </div>

          <p className="mt-6 font-mono text-xs text-slate-500">
            {esports.circuit} · {esports.league}
          </p>
        </motion.div>

        {/* Broadcast clip leads: it carries the commentary, the circuit branding
            and both players' tags, so it is the one that reads as competition
            rather than as a phone recording. */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mx-auto mt-14 max-w-3xl"
        >
          <ClipCard clip={featured} />
        </motion.div>

        <div className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-2">
          {rest.map((clip, i) => (
            <motion.div
              key={clip.src}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: EASE }}
            >
              <ClipCard clip={clip} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
