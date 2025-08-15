import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: __dirname, // Set the root to the current directory (client/)
  publicDir: 'public', // Ensure public assets are served from client/public
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
