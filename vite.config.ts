import path from 'node:path';
import process from 'node:process';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const chunkGroups: Record<string, string[]> = {
    forge: ['node-forge'],
    icons: ['lucide-react'],
    syntax: ['react-code-block', 'prism-react-renderer'],
  };

  return {
    base: env.VITE_SUBPATH_PREFIX || '/',
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    build: {
      target: 'esnext',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;

            for (const [chunkName, deps] of Object.entries(chunkGroups)) {
              if (deps.some(dep => id.includes(`node_modules${path.sep}${dep}${path.sep}`))) {
                return chunkName;
              }
            }

            return 'vendor';
          },
        },
      },
    },
  };
});
