import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const chunkGroups: Record<string, string[]> = {
  react: ['react', 'react-dom', 'react-hot-toast'],
  icons: ['lucide-react'],
  tailwind: ['tailwindcss', '@tailwindcss'],
  state: ['zustand', 'immer'],
  query: ['@tanstack/react-query'],
  utils: ['clsx', 'tailwind-merge'],
  crypto: ['file-saver', 'jszip', 'node-forge'],
  syntax: ['prism-react-renderer', 'react-code-block'],
};

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    sourcemap: false,
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          for (const [chunkName, deps] of Object.entries(chunkGroups)) {
            if (deps.some(dep => id.includes(`/node_modules/${dep}/`))) {
              return chunkName;
            }
          }

          return 'vendor';
        },
      },
    },
  },
});
