import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces — deep space navy, not pure black, so glass panels have something to sit on
        void: {
          950: "#06060C",
          900: "#0A0A16",
          800: "#101022",
          700: "#181832",
        },
        // Signature duo: violet (primary AI/action color) + cyan (data/rating color)
        nova: {
          400: "#B27CFF",
          500: "#9747FF",
          600: "#7C2FE0",
          700: "#5F1FB3",
        },
        circuit: {
          400: "#5EEBFF",
          500: "#22D3EE",
          600: "#0FA8C4",
        },
        // Match-percentage / highlight accent, used sparingly
        flare: {
          400: "#FF5FA8",
          500: "#F2318C",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "grid-scan":
          "linear-gradient(rgba(151, 71, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(151, 71, 255, 0.08) 1px, transparent 1px)",
        "nova-glow":
          "radial-gradient(circle at 50% 0%, rgba(151, 71, 255, 0.35), transparent 60%)",
      },
      backgroundSize: {
        "grid-cell": "48px 48px",
      },
      keyframes: {
        "scan-sweep": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "border-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "scan-sweep": "scan-sweep 6s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "border-flow": "border-flow 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
