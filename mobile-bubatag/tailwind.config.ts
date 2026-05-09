import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./App.tsx",
    "./index.ts",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;