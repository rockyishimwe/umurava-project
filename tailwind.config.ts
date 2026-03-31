import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        accent: "#10B981",
        "accent-hover": "#059669",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        bg: "#F8FAFC",
        card: "#FFFFFF",
        border: "#E2E8F0",
        "text-primary": "#0F172A",
        "text-muted": "#64748B",
        sidebar: {
          DEFAULT: "#FFFFFF",
          accent: "#F1F5F9",
          border: "#E2E8F0",
          text: "#0F172A",
          "text-muted": "#64748B",
        },
      },
      borderRadius: {
        card: "12px",
        input: "8px",
        badge: "20px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        modal: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        dropdown: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "Monaco", "Consolas", "monospace"],
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

