import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kyuto: {
          purple: {
            50:  "#FAF5FF",
            100: "#F3E8FF",
            200: "#E9D5FF",
            300: "#D8B4FE",
            400: "#C084FC",
            500: "#A855F7",
            600: "#9333EA",
            700: "#7E22CE",
            800: "#6B21A8",
            900: "#581C87",
          },
          pink: {
            50:  "#FDF2F8",
            100: "#FCE7F3",
            200: "#FBCFE8",
            300: "#F9A8D4",
            400: "#F472B6",
            500: "#EC4899",
            600: "#DB2777",
            700: "#BE185D",
            800: "#9D174D",
            900: "#831843",
          },
          pastel: {
            lavender: "#E8DAEF",
            blush:    "#FDECEF",
            cream:    "#FFF8F0",
            mint:     "#E8F5E8",
            peach:    "#FFE5D9",
          },
          dark:  "#1E1B2E",
          grey:  "#6B7280",
          light: "#F9FAFB",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body:    ["var(--font-body)", "sans-serif"],
        hand:    ["var(--font-hand)", "Georgia", "serif"],
      },
      animation: {
        "float":          "float 6s ease-in-out infinite",
        "float-delayed":  "float 6s ease-in-out 2s infinite",
        "slide-ribbon":   "slideRibbon 30s linear infinite",
        "bloom":          "bloom 0.6s ease-out",
        "sparkle":        "sparkle 1.5s ease-in-out infinite",
        "fade-up":        "fadeUp 0.6s ease-out",
        "petal-fall":     "petalFall 8s linear infinite",
        "pulse-soft":     "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        slideRibbon: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        bloom: {
          "0%":   { transform: "scale(1)", filter: "brightness(1)" },
          "50%":  { transform: "scale(1.05)", filter: "brightness(1.15)" },
          "100%": { transform: "scale(1)", filter: "brightness(1)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.4", transform: "scale(0.8)" },
          "50%":      { opacity: "1", transform: "scale(1.2)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        petalFall: {
          "0%":   { transform: "translateY(-10%) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.6)" },
          "50%":      { transform: "scale(1.05)", boxShadow: "0 0 0 12px rgba(37, 211, 102, 0)" },
        },
      },
      backgroundImage: {
        "gradient-kyuto":   "linear-gradient(135deg, #F3E8FF 0%, #FCE7F3 50%, #FDF2F8 100%)",
        "gradient-card":    "linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 100%)",
        "gradient-hero":    "linear-gradient(135deg, #E9D5FF 0%, #FBCFE8 40%, #FDF2F8 100%)",
        "gradient-section": "linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 50%, #FFFFFF 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
