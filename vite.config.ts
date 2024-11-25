import { defineConfig } from 'vite';
import { crx, defineManifest } from '@crxjs/vite-plugin';
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Chrome拡張機能の練習',
  version: '1.0.0',
  description: 'Zenn投稿するChrome拡張機能のサンプルです。',
  action: {
    default_popup: 'index.html',
  },
});

export default defineConfig({
  plugins: [crx({ manifest }), vue()],
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
