import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@lottiefiles') || id.includes('lottie-react') || id.includes('lottie-web')) {
              return 'lottie';
            }

            if (/[/\\]node_modules[/\\](react|react-dom|react-router-dom)([/\\]|$)/.test(id)) {
              return 'react';
            }

            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }

            return 'vendor';
          }
        },
      },
    },
  },
})
