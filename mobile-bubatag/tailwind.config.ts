import type { Config } from "tailwindcss";

const config: Config = {
content: [
    "./App.tsx",
    "./index.ts",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        title: ["Fonarto", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
      colors: {             
      primary: "#06D001",
      secondary: "#90A955",
      tertiary: "#2F3E46",
    },
    },
  },
  plugins: [],
};

export default config;