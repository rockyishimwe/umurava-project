import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        accent: "#3B82F6",
        "accent-hover": "#2563EB",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        bg: "#F8FAFC",
        card: "#FFFFFF",
        border: "#E2E8F0",
        "text-primary": "#0F172A",
        "text-muted": "#64748B",
      },
      borderRadius: {
        card: "8px",
        input: "6px",
        badge: "20px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(15 23 42 / 0.06)",
        modal: "0 10px 20px -10px rgb(15 23 42 / 0.2)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;

