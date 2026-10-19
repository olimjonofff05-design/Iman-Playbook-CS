import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// API_PROXY=1 bo'lsa (npm run dev:local), /api so'rovlari lokal sinov serveriga yo'naltiriladi.
export default defineConfig({
  plugins: [react()],
  server: process.env.API_PROXY
    ? { proxy: { '/api': `http://localhost:${process.env.API_PORT || 3001}` } }
    : undefined,
})
