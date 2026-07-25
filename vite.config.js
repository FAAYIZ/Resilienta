import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Custom zero-dependency Vite plugin to strip console.log and debugger statements 
 * from javascript/jsx files during production builds.
 */
function removeConsolePlugin() {
  return {
    name: 'remove-console-plugin',
    apply: 'build', // Run only during the production build phase
    transform(code, id) {
      // Target only source files inside src/
      if (id.includes('/src/') && /\.(js|jsx)$/.test(id)) {
        return {
          code: code
            .replace(/console\.log\([\s\S]*?\);?/g, '')
            .replace(/debugger;?/g, ''),
          map: null
        };
      }
      return null;
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    removeConsolePlugin()
  ],
  build: {
    rollupOptions: {
      output: {
        // Group all node_modules dependencies into a single vendor chunk
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
  },
});
