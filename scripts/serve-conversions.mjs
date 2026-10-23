// Local-only API + built-site harness. Never exposes the SQLite file or secrets.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { bookingStart, calWebhook, conversionReport } from '../lib/conversions/http.mjs';

if (process.env.VERCEL) throw new Error('Local harness must not run on Vercel');
const root = resolve('dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const handlers = { '/start': bookingStart, '/api/booking-start': bookingStart, '/api/cal-webhook': calWebhook, '/api/conversion-report': conversionReport };
const server = createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://127.0.0.1').pathname;
  if (process.env.CONVERSION_DEBUG === '1' && ['/start', '/api/booking-start'].includes(pathname)) {
    console.log('Local booking request', { method: req.method,
      privacyOptOut: req.headers.dnt === '1' || req.headers['sec-gpc'] === '1',
      prefetch: Boolean(req.headers.purpose || req.headers['sec-purpose']),
      bot: /bot|crawler|spider|preview|headless/i.test(req.headers['user-agent'] || ''),
    });
  }
  if (handlers[pathname]) return handlers[pathname](req, res);
  let path;
  try { path = resolve(root, '.' + decodeURIComponent(pathname)); } catch { return res.writeHead(400).end(); }
  if (!path.startsWith(root + '/') && path !== root) return res.writeHead(404).end();
  try {
    if (!extname(path)) path += '/index.html';
    const data = await readFile(path);
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(await readFile(resolve(root, '404.html')));
  }
});
server.listen(Number(process.env.CONVERSION_LOCAL_PORT || 4174), '127.0.0.1', () => console.log('Local conversion harness: http://127.0.0.1:' + server.address().port));
