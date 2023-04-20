import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
