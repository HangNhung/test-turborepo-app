import type { Config } from "tailwindcss";
import baseConfig from "@repo/tailwind-config/tailwind.config";

const config: Config = {
  ...baseConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
