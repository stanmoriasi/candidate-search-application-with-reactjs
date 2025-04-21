import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        changeOrigin: true,
        secure: false
      },
    },
  },
});
