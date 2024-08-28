import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true, // Needed for virtual hosts
        secure: false,      // Set to true if using HTTPS
      },
    },
  },
  plugins: [react(), macrosPlugin()],
});
