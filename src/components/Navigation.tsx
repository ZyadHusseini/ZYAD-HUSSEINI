import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { identity, navLinks } from "../data/content";

export default function Navigation({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openPalette = () => window.dispatchEvent(new CustomEvent("zh-open-palette"));

  return (
    <>
      {/* scroll progress bar */}
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-[60] transition-colors duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        >
          <a
            href="/"
            aria-label="Zyad Husseini — back to top"
            className="text-xl font-extrabold tracking-tight gradient-text"
          >
            {identity.monogram}
          </a>

          {/* desktop links */}
          {/*
            Full nav appears at lg, not md. Nine links need ~750px; at the md
            breakpoint (768px) that collided with the logo and the Hire Me
            button and pushed the document into horizontal scroll. Tablets get
            the same overlay menu as phones, which was already built.
          */}
          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`group relative py-2 text-sm font-medium transition-colors ${
                    active === link.id ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gradient-to-r from-indigo-400 to-cyan-400 transition-transform duration-300 ${
                      active === link.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openPalette}
              className="hidden items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 font-mono text-xs text-slate-400 transition-colors hover:border-white/25 hover:text-white lg:flex"
              aria-label="Open command palette"
            >
              <Command className="h-3 w-3" aria-hidden />K
            </button>
            <a
              href="#contact"
              className="hidden rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_24px_rgba(99,102,241,0.45)] lg:inline-block"
            >
              Hire Me
            </a>
            <button
              type="button"
              className="glass p-2 text-white lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[75] flex flex-col bg-[#0a0a0f]/95 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="text-xl font-extrabold gradient-text">{identity.monogram}</span>
              <button
                type="button"
                className="glass p-2 text-white"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="py-3 text-4xl font-bold text-white/90 transition-colors hover:gradient-text"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + navLinks.length * 0.07, duration: 0.4 }}
                className="mt-6 w-fit rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-3 text-lg font-semibold text-white"
              >
                Hire Me
              </motion.a>
            </nav>
            <p className="px-8 pb-10 font-mono text-xs text-slate-500">
              {identity.location} · {identity.email}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
