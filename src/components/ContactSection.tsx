import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Copy,
  Github,
  Instagram,
  Link,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { identity } from "../data/content";
import { useToast } from "./Toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Field {
  id: "name" | "email" | "message";
  label: string;
  type: "text" | "email" | "textarea";
}

const FIELDS: Field[] = [
  { id: "name", label: "Your Name", type: "text" },
  { id: "email", label: "Your Email", type: "email" },
  { id: "message", label: "Your Message", type: "textarea" },
];

function FloatingField({
  field,
  value,
  error,
  onChange,
}: {
  field: Field;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;
  const shared =
    "peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pb-3 pt-6 text-sm text-white outline-none transition-colors focus:border-indigo-400/60";

  return (
    <div>
      <div className="relative">
        {field.type === "textarea" ? (
          <textarea
            id={field.id}
            rows={5}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${shared} resize-none`}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.id}-error` : undefined}
          />
        ) : (
          <input
            id={field.id}
            type={field.type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={shared}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.id}-error` : undefined}
          />
        )}
        <label
          htmlFor={field.id}
          className={`pointer-events-none absolute left-4 transition-all duration-200 ${
            raised ? "top-1.5 text-[11px] text-cyan-400" : "top-4 text-sm text-slate-500"
          }`}
        >
          {field.label}
        </label>
        {/* gradient underline sweep on focus */}
        <span
          aria-hidden
          className={`absolute bottom-0 left-3 right-3 h-0.5 origin-left rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 transition-transform duration-300 ${
            focused ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </div>
      {error && (
        <p id={`${field.id}-error`} className="mt-1.5 text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactSection() {
  const toast = useToast();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field["id"], string>>>({});

  const copyEmail = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast("Email copied to clipboard");
    } catch {
      toast("Couldn't copy — email is shown above");
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = "Please tell me your name.";
    if (!values.email.trim()) next.email = "Please add your email.";
    else if (!EMAIL_RE.test(values.email)) next.email = "That email doesn't look right.";
    if (!values.message.trim()) next.message = "A short message helps me reply well.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = encodeURIComponent(`Portfolio contact — ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
  };

  const infoCards = [
    {
      icon: Mail,
      label: "Email",
      value: identity.email,
      accent: "text-indigo-400",
      copy: true,
    },
    {
      icon: Building2,
      label: "Business email",
      value: identity.businessEmail,
      accent: "text-cyan-400",
      copyValue: identity.businessEmail,
      copy: true,
    },
    {
      icon: Phone,
      label: "Phone",
      value: identity.phones.join("  ·  "),
      accent: "text-cyan-400",
    },
    { icon: MapPin, label: "Location", value: identity.location, accent: "text-purple-400" },
    { icon: Briefcase, label: "Open to", value: identity.openTo, accent: "text-emerald-400" },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-bg-secondary py-24 md:py-32">
      <div className="ambient animate-drift-a absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Get In Touch" title="Let's Work Together" />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* left — info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {infoCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="glass flex items-center gap-4 p-5 transition-all hover:translate-x-1.5 hover:border-white/25"
                >
                  <Icon className={`h-5 w-5 shrink-0 ${card.accent}`} aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-slate-500">{card.label}</p>
                    <p className="truncate text-sm font-medium text-white">{card.value}</p>
                  </div>
                  {card.copy && (
                    <button
                      type="button"
                      onClick={() => copyEmail(card.value)}
                      className="glass shrink-0 p-2.5 text-slate-400 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                      aria-label="Copy email address"
                    >
                      <Copy className="h-4 w-4" aria-hidden />
                    </button>
                  )}
                </div>
              );
            })}

            <div className="flex gap-4 pt-4">
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:border-cyan-400/50"
              >
                <Linkedin className="h-4 w-4 text-cyan-400" aria-hidden />
                LinkedIn
              </a>
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                className="glass flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:border-indigo-400/50"
              >
                <Github className="h-4 w-4 text-indigo-400" aria-hidden />
                GitHub
              </a>
              <a
                href={identity.linktree}
                target="_blank"
                rel="noreferrer"
                className="glass flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:border-emerald-400/50"
              >
                <Link className="h-4 w-4 text-emerald-400" aria-hidden />
                Linktree
              </a>
              <a
                href={identity.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label={`Message Zyad on WhatsApp at ${identity.whatsappDisplay}`}
                className="glass flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:border-emerald-400/50"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden />
                WhatsApp
              </a>
              <a
                href={identity.instagram}
                target="_blank"
                rel="noreferrer"
                className="glass flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:border-rose-400/50"
              >
                <Instagram className="h-4 w-4 text-rose-400" aria-hidden />
                Instagram
              </a>
            </div>
          </motion.div>

          {/* right — form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={submit}
            noValidate
            className="space-y-5"
          >
            {FIELDS.map((field) => (
              <FloatingField
                key={field.id}
                field={field}
                value={values[field.id]}
                error={errors[field.id]}
                onChange={(v) => setValues((prev) => ({ ...prev, [field.id]: v }))}
              />
            ))}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-3.5 font-semibold text-white transition-shadow hover:shadow-[0_0_32px_rgba(99,102,241,0.5)]"
            >
              <Send className="h-4 w-4" aria-hidden />
              Send Message
            </button>
            <p className="text-center text-xs text-slate-500">
              Submitting opens your email app with the message pre-filled — nothing is sent to a
              server.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
