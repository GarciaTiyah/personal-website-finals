import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
