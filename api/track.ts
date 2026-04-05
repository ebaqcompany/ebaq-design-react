import type { VercelRequest, VercelResponse } from '@vercel/node';

// KV store via Vercel KV or fallback to in-memory (resets on cold start)
// For production: connect Vercel KV or use a simple JSON blob store
const STORE_URL = process.env.TRACK_STORE_URL; // optional external store

interface TrackEvent {
  timestamp: string;
  type: 'email_open' | 'pageview' | 'proposal_view';
  lead: string;
  ip: string;
  ua: string;
  page: string;
  city: string;
  country: string;
  referer: string;
}

// In-memory IP→lead mapping (persists within same serverless instance)
// For cross-instance persistence, we rely on Telegram alerts being real-time
const ipToLead: Record<string, { lead: string; timestamp: string }> = {};

function sendTelegram(msg: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: msg,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  }).catch(() => {});
}

// Lead name lookup (lead ID → display name)
const LEAD_NAMES: Record<string, string> = {};

function formatLeadName(leadId: string): string {
  if (LEAD_NAMES[leadId]) return LEAD_NAMES[leadId];
  // Convert slug to readable: william_polaris → William (Polaris)
  const parts = leadId.split('_');
  if (parts.length >= 2) {
    const name = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    const company = parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    return `${name} (${company})`;
  }
  return leadId;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
    || (req.headers['x-real-ip'] as string)
    || 'unknown';
  const ua = (req.headers['user-agent'] as string) || 'unknown';
  const city = (req.headers['x-vercel-ip-city'] as string) || 'unknown';
  const country = (req.headers['x-vercel-ip-country'] as string) || 'unknown';
  const referer = (req.headers['referer'] as string) || 'direct';

  const type = (req.query.t as string) || (req.query.type as string) || 'pageview';
  const lead = (req.query.l as string) || (req.query.lead as string) || '';
  const page = (req.query.p as string) || (req.query.page as string) || '/';

  const event: TrackEvent = {
    timestamp: new Date().toISOString(),
    type: type as TrackEvent['type'],
    lead,
    ip,
    ua,
    page,
    city,
    country,
    referer,
  };

  // Log everything
  console.log('TRACK', JSON.stringify(event));

  // ---- EMAIL OPEN ----
  if (type === 'email_open' && lead) {
    // Store IP → lead mapping for site visit matching
    ipToLead[ip] = { lead, timestamp: event.timestamp };

    const name = formatLeadName(lead);
    sendTelegram(
      `📧 <b>${name}</b> just opened your email!\n` +
      `🌍 ${city}, ${country}\n` +
      `🕐 ${event.timestamp.split('T')[1].split('.')[0]} UTC`
    );
  }

  // ---- SITE PAGEVIEW ----
  if (type === 'pageview') {
    let matchedLead = lead; // explicit lead param (from cookie)

    // Try IP matching if no explicit lead
    if (!matchedLead && ipToLead[ip]) {
      matchedLead = ipToLead[ip].lead;
    }

    if (matchedLead) {
      const name = formatLeadName(matchedLead);
      sendTelegram(
        `👀 <b>${name}</b> is browsing your site!\n` +
        `📄 ${page}\n` +
        `🌍 ${city}, ${country}\n` +
        `🕐 ${event.timestamp.split('T')[1].split('.')[0]} UTC`
      );
    }

    // ---- HERO SECTION ALERTS ----
    // Alert for ANY non-Brooklyn visitor on hero demo pages
    const heroPages = ['/additiontx', '/tunetx'];
    const isHeroPage = heroPages.some(p => page.startsWith(p));
    const isSelf = city.toLowerCase().includes('brooklyn') || city.toLowerCase().includes('new york');
    const isBot = ua.toLowerCase().includes('bot') || ua.toLowerCase().includes('crawler') || ua.toLowerCase().includes('spider');
    const isExit = page.includes('(exit)');

    if (isHeroPage && !isSelf && !isBot && !isExit) {
      const pageName = page.includes('additiontx') ? 'Addition Therapeutics' : 'Tune Therapeutics';
      const duration = req.query.dur ? ` (${req.query.dur}s on page)` : '';
      sendTelegram(
        `🎯 <b>Someone viewed your ${pageName} hero!</b>\n` +
        `🌍 ${city}, ${country}\n` +
        `📄 ${page}${duration}\n` +
        `🖥 ${ua.substring(0, 80)}\n` +
        `🕐 ${event.timestamp.split('T')[1].split('.')[0]} UTC`
      );
    }
  }

  // ---- PROPOSAL VIEW (legacy) ----
  if (type === 'proposal_view' || page.includes('proposal')) {
    const name = lead ? formatLeadName(lead) : 'Someone';
    sendTelegram(
      `👁 <b>${name}</b> opened a proposal!\n` +
      `📄 ${page}\n` +
      `🌍 ${city}, ${country}`
    );
  }

  // Return 1x1 transparent pixel
  const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.status(200).send(pixel);
}
