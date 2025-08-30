/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",       // kalau masih ada file di luar src
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#2563eb", fg: "#ffffff", hover: "#1d4ed8", subtle: "#eff6ff" },
        card: { DEFAULT: "#ffffff", fg: "#0f172a" },
        muted: { DEFAULT: "#f8fafc", fg: "#64748b" },
        border: "#e2e8f0",
      },
      boxShadow: { soft: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)" },
      borderRadius: { xl: "0.75rem", "2xl": "1rem" },
    },
  },
  plugins: [],
};
