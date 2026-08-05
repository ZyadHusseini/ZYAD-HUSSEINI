# Zyad Husseini — Portfolio v2

Single-page portfolio for Zyad Husseini (data analyst & economist). Dark, futuristic,
data-visualization aesthetic — rebuilt from scratch on the v1 DNA with lucide icons,
real animated data viz, mobile navigation, case-study modals, and a ⌘K command palette.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v3 (+ tailwindcss-animate)
- Framer Motion
- lucide-react (no emoji icons anywhere)
- Fonts: Inter + JetBrains Mono (Google Fonts)

All content lives in `src/data/content.ts` — components are presentational.
CV PDFs are served from `public/assets/`.

## Run

```bash
npm install
npm run dev      # dev server on http://localhost:3040
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build
```

(pnpm works identically: `pnpm install`, `pnpm dev`, `pnpm build`.)

## Notable behaviors

- Intro animation (~3s) plays once per browser session, has a Skip button, and is
  skipped entirely under `prefers-reduced-motion`.
- Custom cursor is desktop-only (`hover: hover` + `pointer: fine`); touch devices keep
  the native cursor and the site is fully usable.
- ⌘K / Ctrl+K opens the command palette (jump to sections, download CV, copy email,
  open LinkedIn/GitHub).
- Contact form validates and opens the visitor's mail app via `mailto:` — no backend.
- Footer year is computed at runtime.
