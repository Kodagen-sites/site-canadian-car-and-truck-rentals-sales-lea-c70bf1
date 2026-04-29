import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: "#0e1218",
        steel: "#1a2330",
        ash: "#2a3340",
        fog: "#5a6470",
        ivory: "#f4f5f7",
        amber: {
          DEFAULT: "#ffaa40",
          glow: "#ff8b00",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.25rem, 7vw, 6.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      letterSpacing: {
        "eyebrow": "0.18em",
        "label": "0.12em",
      },
      backgroundImage: {
        "brushed-metal": "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.06) 100%)",
        "amber-beam": "radial-gradient(ellipse at 50% 100%, rgba(255,170,64,0.18) 0%, transparent 60%)",
      },
      animation: {
        "beam-rays": "beam-rays 9s ease-in-out infinite",
      },
      keyframes: {
        "beam-rays": {
          "0%, 100%": { opacity: "0.65", transform: "translateX(-2%)" },
          "50%": { opacity: "1", transform: "translateX(2%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
