import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Runs api/generate-ideas.mjs under `vite dev`, so the generators can be tried locally with AI on.
// It only mounts when ANTHROPIC_API_KEY is set in .env.local (ignored by git); in production
// Vercel serves the same file as a serverless function.
const devIdeasApi = (): Plugin => ({
  name: 'dev-ideas-api',
  apply: 'serve',
  configureServer(server) {
    const key = loadEnv('development', process.cwd(), '').ANTHROPIC_API_KEY
    if (!key) return
    process.env.ANTHROPIC_API_KEY = key
    server.middlewares.use('/api/generate-ideas', async (req, res) => {
      const chunks: Buffer[] = []
      for await (const chunk of req) chunks.push(chunk as Buffer)
      let body = {}
      try { body = JSON.parse(Buffer.concat(chunks).toString() || '{}') } catch { /* an empty body is rejected by the handler */ }
      const reply = { status(code: number) { res.statusCode = code; return reply }, json(data: unknown) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); return reply } }
      // The timestamp reloads the handler after an edit, without restarting the dev server.
      const { default: handler } = await import(/* @vite-ignore */ `${new URL('./api/generate-ideas.mjs', import.meta.url).href}?t=${Date.now()}`)
      await handler({ method: req.method, headers: req.headers, body }, reply)
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devIdeasApi()],
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
