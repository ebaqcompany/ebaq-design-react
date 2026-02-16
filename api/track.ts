import type { VercelRequest, VercelResponse } from '@vercel/node';
import { promises as fs } from 'fs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const data = {
    timestamp: new Date().toISOString(),
    page: req.query.page || 'unknown',
    ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
    ua: req.headers['user-agent'] || 'unknown',
    referer: req.headers['referer'] || 'direct',
    country: req.headers['x-vercel-ip-country'] || 'unknown',
    city: req.headers['x-vercel-ip-city'] || 'unknown',
  };

  // Log to Vercel's stdout (visible in Vercel dashboard → Logs)
  console.log('PROPOSAL_VIEW', JSON.stringify(data));

  // Send Telegram notification (best-effort, don't block response)
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (botToken && chatId) {
    const msg = `👁 Proposal opened!\n📄 ${data.page}\n🌍 ${data.city}, ${data.country}\n🕐 ${data.timestamp}\n📱 ${data.ua.substring(0, 80)}`;
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: msg }),
    }).catch(() => {});
  }

  // Return 1x1 transparent pixel
  const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.status(200).send(pixel);
}
