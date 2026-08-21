import { ArrowUp, Github, Instagram, Link, Linkedin, Mail, MessageCircle } from "lucide-react";
import { identity } from "../data/content";

/** Mirrors the pages emitted by scripts/build-writing.mjs. */
const writingLinks = [
  { href: "/writing/null-result-in-game-spending/", label: "Predicting in-game spending" },
  { href: "/writing/renewable-energy-growth/", label: "Renewable energy & growth" },
  { href: "/writing/loreal-carbon-tradeoff/", label: "Green AI at L'Oréal" },
  { href: "/writing/egypt-logistics-data/", label: "Egyptian logistics data" },
  { href: "/writing/tekken-egypt-esports/", label: "Tekken in Egypt" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-bg-primary">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12">
        <span className="glass flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to opportunities
        </span>

        <div className="flex items-center gap-4">
          {[
            { href: identity.linkedin, icon: Linkedin, label: "LinkedIn" },
            { href: identity.github, icon: Github, label: "GitHub" },
            { href: identity.linktree, icon: Link, label: "Linktree" },
            { href: identity.instagram, icon: Instagram, label: "Instagram" },
            { href: identity.whatsapp, icon: MessageCircle, label: "WhatsApp" },
            { href: `mailto:${identity.email}`, icon: Mail, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="glass p-2.5 text-slate-400 transition-all hover:-translate-y-0.5 hover:text-white"
            >
              <Icon className="h-4 w-4" aria-hidden />
            </a>
          ))}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="glass p-2.5 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-300"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {/* Real anchors to the static /writing/ pages. They live outside the
            React app, so this footer and the noscript block in index.html are
            the only internal links Google has to reach them — without one they
            are orphans that the sitemap alone would not get crawled properly. */}
        <nav aria-label="Essays" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <a href="/writing/" className="text-slate-400 transition-colors hover:text-white">
            Writing
          </a>
          {writingLinks.map((w) => (
            <a
              key={w.href}
              href={w.href}
              className="text-slate-500 transition-colors hover:text-white"
            >
              {w.label}
            </a>
          ))}
        </nav>

        <div className="text-center">
          <p className="text-sm text-slate-400">
            © {year} <span className="font-medium text-white">{identity.name}</span>
          </p>
          <p className="mt-1 font-mono text-xs text-slate-600">
            Built with React, Framer Motion &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
