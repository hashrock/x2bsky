import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";

// https://vite.dev/config/

const manifest = defineManifest({
  manifest_version: 3,
  name: "x2bsky",
  version: "1.0.0",
  description: "add bluesky cross post button to x.com",
  action: {
    default_popup: "index.html",
  },
  content_scripts: [
    {
      matches: ["https://x.com/*"],
      js: ["src/content.ts"],
    },
  ],
  permissions: ["storage"],
  icons: {
    "128": "icon.png",
  },
});

export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
