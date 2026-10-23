import { CALENDAR_URL, recordClick, recordWebhook, reportAuthorized, RETENTION_MS, summarize } from './core.mjs';
import { getStore } from './store.mjs';

export function redirect(res, url = CALENDAR_URL) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.writeHead(302, { Location: url });
  res.end();
}

export async function bookingStart(req, res, storeFactory = getStore) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.writeHead(405, { Allow: 'GET, HEAD' }).end();
  const ua = req.headers['user-agent'] || '';
  if (req.method === 'HEAD' || req.headers.dnt === '1' || req.headers['sec-gpc'] === '1'
    || req.headers.purpose === 'prefetch' || req.headers['sec-purpose']?.includes('prefetch')
    || /bot|crawler|spider|preview|headless/i.test(ua)) return redirect(res);
  try {
    const url = new URL(req.url, 'https://www.ebaqdesign.com');
    const referer = req.headers.referer;
    if (!url.searchParams.has('source') && referer) {
      const ref = new URL(referer);
      if (['www.ebaqdesign.com', 'ebaqdesign.com', '127.0.0.1', 'localhost'].includes(ref.hostname)) url.searchParams.set('source', ref.pathname);
    }
    const result = await recordClick({ params: url.searchParams, store: await storeFactory(),
      secret: process.env.CONVERSION_SIGNING_SECRET,
      test: url.searchParams.get('test') === '1' && reportAuthorized(req.headers.authorization, process.env.CONVERSION_REPORT_TOKEN),
      ip: String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0],
    });
    return redirect(res, result.url);
  } catch {
    // Measurement must never block scheduling. No request data or credentials in logs.
    console.error('Conversion click not recorded: check storage and signing configuration');
    return redirect(res);
  }
}

export async function calWebhook(req, res, storeFactory = getStore) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.writeHead(405, { Allow: 'POST' }).end();
  if (!process.env.CAL_WEBHOOK_SECRET || !process.env.CAL_EVENT_TYPE_ID || !process.env.CONVERSION_SIGNING_SECRET) return res.writeHead(503).end('Webhook is not configured');
  try {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 128 * 1024) return res.writeHead(413).end();
      chunks.push(Buffer.from(chunk));
    }
    // Verify before touching storage, and verify the exact bytes, never reserialized JSON.
    const raw = Buffer.concat(chunks);
    const { verifyCalSignature } = await import('./core.mjs');
    if (!verifyCalSignature(raw, req.headers['x-cal-signature-256'], process.env.CAL_WEBHOOK_SECRET)) return res.writeHead(401).end('Invalid signature');
    const result = await recordWebhook({ raw, signature: req.headers['x-cal-signature-256'],
      webhookSecret: process.env.CAL_WEBHOOK_SECRET, signingSecret: process.env.CONVERSION_SIGNING_SECRET,
      eventTypeId: process.env.CAL_EVENT_TYPE_ID, store: await storeFactory(),
    });
    res.writeHead(result.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } catch {
    console.error('Conversion webhook not recorded: retry required');
    res.writeHead(503).end('Please retry');
  }
}

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
export async function conversionReport(req, res, storeFactory = getStore) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'");
  if (req.method !== 'GET') return res.writeHead(405, { Allow: 'GET' }).end();
  if (!reportAuthorized(req.headers.authorization, process.env.CONVERSION_REPORT_TOKEN)) return res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Ebaq conversion report"' }).end('Authentication required');
  try {
    const params = new URL(req.url, 'https://www.ebaqdesign.com').searchParams;
    const days = Math.min(90, Math.max(1, Number(params.get('days')) || 28));
    const report = summarize(await (await storeFactory()).list(Date.now() - RETENTION_MS), Date.now() - days * 86400000);
    if (params.get('format') === 'json') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(report));
    }
    const rows = report.sources.map(row => `<tr><td>${escape(row.source)}</td><td>${escape(row.landing)}</td><td>${escape(row.referrer || 'Direct / unknown')}<br>${escape(Object.entries(row.campaign).map(([key, value]) => `${key}: ${value}`).join(', '))}</td><td>${row.clicks}</td><td>${row.confirmedBookings}</td><td>${row.clicksWithoutConfirmedBooking}</td><td>${Math.round(row.clickToBookingRate * 100)}%</td></tr>`).join('');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Booking sources | Ebaq Design</title><style>body{font:16px/1.5 system-ui;margin:40px;max-width:1400px}h1{font-size:32px}table{border-collapse:collapse;width:100%}td,th{text-align:left;padding:14px;border-bottom:1px solid #ddd}th{background:#e6f7ff}.scroll{overflow:auto}small{color:#555}</style><h1>Booking sources</h1><p>Last ${days} days, grouped by the page where the booking link was clicked.</p><div class="scroll"><table><thead><tr><th>Booking-click page</th><th>Landing page</th><th>Referral / campaign</th><th>Clicks</th><th>Confirmed bookings</th><th>No confirmed booking yet</th><th>Clicks converted</th></tr></thead><tbody>${rows || '<tr><td colspan="7">No recorded clicks in this period.</td></tr>'}</tbody></table></div><p>Unattributed confirmed bookings: ${report.unattributedBookings}</p><small>${escape(report.attribution)} “No confirmed booking yet” is not a proven abandonment count. Cancellations are excluded; reschedules replace the earlier booking. Refresh to include delayed webhook deliveries. Data retention: 90 days. No attendee names, emails, phone numbers, notes, IP addresses or raw webhook payloads are stored.</small></html>`);
  } catch { res.writeHead(503).end('Conversion report unavailable: check storage configuration'); }
}
