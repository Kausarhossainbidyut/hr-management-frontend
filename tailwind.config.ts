import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1F3864",
          light: "#2E5C8A",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        muted: "#64748B",
        background: "#F1F5F9",
        surface: "#FFFFFF",
      },
      borderRadius: {
        lg: "0.6rem",
        md: "0.45rem",
        sm: "0.3rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
