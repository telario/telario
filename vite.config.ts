import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          icons: ['./src/render/icons/fontawesome-free.json'],
          react: ['react', 'react-dom', 'react-dom/server'],
          sqlite: ['sql.js'],
          sketch: ['roughjs'],
        },
      },
    },
  },
  test: { include: ['tests/**/*.test.ts'] },
});
