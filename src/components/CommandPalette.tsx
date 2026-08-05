import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Copy,
  Download,
  FileText,
  FolderKanban,
  Github,
  Link,
  Linkedin,
  Mail,
  Rocket,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { identity } from "../data/content";
import { useToast } from "./Toast";

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  run: () => void;
}

export default function CommandPalette() {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const jump = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    return [
      { id: "about", label: "Jump to About", hint: "section", icon: User, run: jump("about") },
      { id: "experience", label: "Jump to Experience", hint: "section", icon: Briefcase, run: jump("experience") },
      { id: "projects", label: "Jump to Projects", hint: "section", icon: FolderKanban, run: jump("projects") },
      { id: "ventures", label: "Jump to Ventures", hint: "section", icon: Rocket, run: jump("ventures") },
      { id: "cv", label: "Jump to CV", hint: "section", icon: FileText, run: jump("cv") },
      { id: "contact", label: "Jump to Contact", hint: "section", icon: Mail, run: jump("contact") },
      {
        id: "cv-en",
        label: "Download CV — English",
        hint: "pdf",
        icon: Download,
        run: () => window.open(identity.cvEnglish, "_blank"),
      },
      {
        id: "cv-fr",
        label: "Download CV — French",
        hint: "pdf",
        icon: Download,
        run: () => window.open(identity.cvFrench, "_blank"),
      },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: identity.email,
        icon: Copy,
        run: () => {
          navigator.clipboard
            .writeText(identity.email)
            .then(() => toast("Email copied to clipboard"))
            .catch(() => toast("Couldn't copy email"));
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "linkedin.com/in/zyadmhr",
        icon: Linkedin,
        run: () => window.open(identity.linkedin, "_blank"),
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "github.com/ZyadHusseini",
        icon: Github,
        run: () => window.open(identity.github, "_blank"),
      },
      {
        id: "linktree",
        label: "Open Linktree",
        hint: "linktr.ee/zyadmhrhusseini",
        icon: Link,
        run: () => window.open(identity.linktree, "_blank"),
      },
    ];
  }, [toast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("zh-open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("zh-open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  const runCommand = (cmd: Command) => {
    setOpen(false);
    cmd.run();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && filtered[selected]) {
      runCommand(filtered[selected]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[88] flex items-start justify-center bg-black/50 px-4 pt-[18vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-lg overflow-hidden bg-[#12121a]/95 font-mono"
          >
            {/* terminal header */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" aria-hidden />
              <span className="ml-2 text-xs text-slate-500">zyad@portfolio ~ %</span>
            </div>

            <div className="flex items-center gap-2 border-b border-white/10 px-4">
              <span className="text-cyan-400" aria-hidden>
                &gt;
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="type a command…"
                className="w-full bg-transparent py-3.5 text-sm text-white placeholder-slate-600 outline-none"
                aria-label="Search commands"
              />
            </div>

            <ul className="max-h-72 overflow-y-auto p-2" role="listbox" aria-label="Commands">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-xs text-slate-500">
                  no matching command
                </li>
              )}
              {filtered.map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <li key={cmd.id} role="option" aria-selected={i === selected}>
                    <button
                      type="button"
                      onClick={() => runCommand(cmd)}
                      onMouseEnter={() => setSelected(i)}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
                        i === selected ? "bg-white/10 text-white" : "text-slate-400"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 shrink-0 ${i === selected ? "text-cyan-400" : "text-slate-500"}`}
                        aria-hidden
                      />
                      <span className="flex-1">{cmd.label}</span>
                      <span className="truncate text-[10px] text-slate-600">{cmd.hint}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2.5 text-[10px] text-slate-600">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
