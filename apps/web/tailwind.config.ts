import type { Config } from "tailwindcss";
import baseConfig from "@repo/tailwind-config/tailwind.config";

const config: Config = {
  // Extend the base config from the shared tailwind-config package
  ...baseConfig,
  content: [
    // Include this app's content
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    // Include UI package content paths to scan for classes
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
