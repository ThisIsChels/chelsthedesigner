import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    // Turbopack's on-disk dev cache kept serving old compiled CSS after edits
    // to app/globals.css (the Tailwind loader below doesn't invalidate it),
    // even across dev server restarts. Off = every `npm run dev` compiles fresh.
    turbopackFileSystemCacheForDev: false,
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
