import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    entries: ['index.html'],
  },
  build: {
    // Small font subsets would otherwise be inlined into the render-blocking stylesheet as base64,
    // even though a page only ever needs the Latin files.
    assetsInlineLimit: (file) => (/\.(woff2?|ttf)$/.test(file) ? false : undefined),
  },
  // Only applies to the prerender build (vite build --ssr): bundle every dependency so
  // CommonJS packages like react-helmet-async load in Node without interop errors.
  ssr: { noExternal: true },
})
