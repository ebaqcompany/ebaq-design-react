import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    entries: ['index.html'],
  },
  // Only applies to the prerender build (vite build --ssr): bundle every dependency so
  // CommonJS packages like react-helmet-async load in Node without interop errors.
  ssr: { noExternal: true },
})
