import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/frontend/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        institucional: {
          azul: "#1a3a6c",
          "azul-claro": "#2563eb",
          "azul-oscuro": "#0f2449",
          dorado: "#c9a227",
          "dorado-claro": "#e8c547",
          celeste: "#38bdf8",
          gris: "#f1f5f9",
          "gris-medio": "#64748b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
