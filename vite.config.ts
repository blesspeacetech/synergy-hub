import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { resolve } from "node:path";

const nitroPreset =
  process.env["NITRO_PRESET"] ||
  (process.env["VERCEL"] ? "vercel" : "node-server");

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro({
      preset: nitroPreset,
      compressPublicAssets: true,
      routeRules: {
        "/assets/**": {
          headers: { "cache-control": "public, max-age=31536000, immutable" },
        },
        "/favicon.ico": {
          headers: { "cache-control": "public, max-age=86400" },
        },
        "/favicon.svg": {
          headers: { "cache-control": "public, max-age=86400" },
        },
        "/**": {
          headers: {
            "x-frame-options": "DENY",
            "x-content-type-options": "nosniff",
            "referrer-policy": "strict-origin-when-cross-origin",
            "permissions-policy": "camera=(), microphone=(), geolocation=()",
            "x-dns-prefetch-control": "off",
          },
        },
      },
    }),
    viteReact(),
  ],
  resolve: {
    alias: {
      "@": resolve(process.cwd(), "./src").replace(/\\/g, "/"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  css: {
    transformer: "lightningcss" as const,
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
  server: {
    host: "::",
    port: 8080,
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
  },
  build: {
    target: "es2022",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
});
