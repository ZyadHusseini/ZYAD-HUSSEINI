import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0a0a0f",
        "bg-secondary": "#12121a",
        "accent-indigo": "#6366f1",
        "accent-purple": "#8b5cf6",
        "accent-cyan": "#06b6d4",
        "accent-emerald": "#10b981",
        "text-primary": "#ffffff",
        "text-secondary": "#94a3b8",
      },
      fontFamily: {
        // "… Variable" families come from the self-hosted @fontsource-variable
        // packages imported in main.tsx; the non-variable names are kept as a
        // fallback for anyone who already has the static fonts installed.
        sans: ["'Inter Variable'", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono Variable'", "'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      keyframes: {
        // Exactly -50% because the logo list is rendered twice: the second copy
        // arrives where the first began, so the reset is invisible.
        marquee: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
        "drift-a": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(40px, -30px, 0)" },
        },
        "drift-b": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(-50px, 40px, 0)" },
        },
        "drift-c": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(30px, 50px, 0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "drift-a": "drift-a 12s ease-in-out infinite",
        "drift-b": "drift-b 15s ease-in-out infinite",
        "drift-c": "drift-c 10s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        sweep: "sweep 9s linear infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
