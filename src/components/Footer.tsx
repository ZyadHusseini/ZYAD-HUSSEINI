import { ArrowUp, Github, Link, Linkedin, Mail } from "lucide-react";
import { identity } from "../data/content";

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
