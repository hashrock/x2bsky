import { defineConfig } from 'vite';
import { crx, defineManifest } from '@crxjs/vite-plugin';

// https://vite.dev/config/

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Chrome拡張機能の練習',
  version: '1.0.0',
  description: 'Zenn投稿するChrome拡張機能のサンプルです。',
  action: {
    default_popup: 'index.html',
  },
  content_scripts: [
    {
      matches: ['https://x.com/*'],
      js: ['src/content.ts'],
    },
  ],
});

export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    outDir: 'dist',
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
