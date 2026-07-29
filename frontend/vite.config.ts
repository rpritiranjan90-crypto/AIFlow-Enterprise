import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@aiflow/shared-types': path.resolve(__dirname, '../packages/shared-types/index.ts'),
      '@aiflow/ui-tokens': path.resolve(__dirname, '../packages/ui-tokens/index.ts'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
