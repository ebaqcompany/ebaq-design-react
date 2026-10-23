import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { attribution } from '../../shared/conversion-attribution.mjs';

export const CALENDAR_URL = 'https://cal.com/ebaqdesign/15min';
export const RETENTION_MS = 90 * 86400000;
const digest = (value, secret) => createHmac('sha256', secret).update(value).digest('hex');
const equal = (left, right) => typeof left === 'string' && typeof right === 'string'
  && Buffer.byteLength(left) === Buffer.byteLength(right) && timingSafeEqual(Buffer.from(left), Buffer.from(right));

export function signClick(id, secret) {
  return `${id}.${digest(id, secret)}`;
}

export function readClickToken(token, secret) {
  if (typeof token !== 'string' || token.length > 110) return null;
  const [id, signature, extra] = token.split('.');
  return !extra && /^[0-9a-f-]{36}$/.test(id) && equal(signature, digest(id, secret)) ? id : null;
}

export async function recordClick({ params, store, secret, ip = '', now = Date.now(), test = false }) {
  if (!secret || secret.length < 32) throw new Error('Conversion signing secret is not configured');
  // Rate-limit with a rotating one-way key; never persist the IP or user agent.
  if (!await store.allow(digest(`${Math.floor(now / 86400000)}:${ip}`, secret))) return { url: CALENDAR_URL, limited: true };
  const id = randomUUID();
  const event = { id: `click:${id}`, kind: 'click', clickId: id, at: now, test, ...attribution(params) };
  await store.put(event);
  const url = new URL(CALENDAR_URL);
  url.searchParams.set('metadata[ebaq_click]', signClick(id, secret));
  return { url: url.href, clickId: id };
}

export function verifyCalSignature(raw, signature, secret) {
  if (!secret || secret.length < 32 || typeof signature !== 'string') return false;
  return equal(signature.replace(/^sha256=/, ''), digest(raw, secret));
}

export async function recordWebhook({ raw, signature, webhookSecret, signingSecret, eventTypeId, store, now = Date.now() }) {
  if (!verifyCalSignature(raw, signature, webhookSecret)) return { status: 401, error: 'Invalid signature' };
  let envelope;
  try { envelope = JSON.parse(raw.toString()); } catch { return { status: 400, error: 'Invalid JSON' }; }
  const supported = ['BOOKING_CREATED', 'BOOKING_CONFIRMED', 'BOOKING_CANCELLED', 'BOOKING_RESCHEDULED'];
  if (!supported.includes(envelope.triggerEvent)) return { status: 200, ignored: true };
  const data = envelope.payload;
  const createdAt = Date.parse(envelope.createdAt);
  if (!eventTypeId || !signingSecret || !data || String(data.eventTypeId) !== String(eventTypeId)) return { status: 200, ignored: true };
  if (!Number.isFinite(createdAt) || createdAt > now + 300000 || createdAt < now - RETENTION_MS) return { status: 400, error: 'Invalid event time' };
  if (typeof data.uid !== 'string' || !data.uid || data.uid.length > 200) return { status: 400, error: 'Missing booking identifier' };
  const cancelled = envelope.triggerEvent === 'BOOKING_CANCELLED';
  // Requested/pending bookings and paid-flow initiation are never completions.
  if (!cancelled && data.status !== 'ACCEPTED') return { status: 200, ignored: true };
  const bookingId = digest(data.uid, signingSecret);
  const previousBookingId = typeof data.rescheduleUid === 'string' ? digest(data.rescheduleUid, signingSecret) : null;
  const tokenId = readClickToken(data.metadata?.ebaq_click, signingSecret);
  const click = tokenId ? await store.get(`click:${tokenId}`) : null;
  // Only retain fields needed for the funnel; attendee details and raw webhook are discarded.
  const event = {
    id: `booking:${digest(`${data.uid}:${envelope.triggerEvent}:${envelope.createdAt}`, signingSecret)}`,
    kind: 'booking', bookingId, previousBookingId, clickId: click?.clickId || null,
    status: cancelled ? 'cancelled' : 'confirmed', at: createdAt, test: Boolean(click?.test),
  };
  const inserted = await store.put(event);
  return { status: 200, duplicate: !inserted };
}

export function summarize(events, since = Date.now() - 28 * 86400000) {
  const testEventsExcluded = events.filter(event => event.test).length;
  events = events.filter(event => !event.test);
  const clicks = new Map(events.filter(e => e.kind === 'click').map(e => [e.clickId, e]));
  const bookings = new Map();
  const replaced = new Set();
  for (const event of events.filter(e => e.kind === 'booking').sort((a, b) => a.at - b.at || Number(a.status === 'cancelled') - Number(b.status === 'cancelled'))) {
    if (event.previousBookingId) replaced.add(event.previousBookingId);
    const previous = bookings.get(event.bookingId);
    bookings.set(event.bookingId, { ...event, clickId: event.clickId || previous?.clickId || bookings.get(event.previousBookingId)?.clickId || null });
  }
  const rows = new Map();
  for (const click of clicks.values()) {
    if (click.at < since) continue;
    const key = JSON.stringify([click.source, click.landing, click.referrer, click.campaign]);
    const row = rows.get(key) || { source: click.source, landing: click.landing, referrer: click.referrer, campaign: click.campaign, clicks: 0, confirmedBookings: 0, convertedClickIds: new Set() };
    row.clicks++;
    rows.set(key, row);
  }
  let unattributedBookings = 0;
  for (const booking of bookings.values()) {
    if (replaced.has(booking.bookingId) || booking.status !== 'confirmed') continue;
    const click = clicks.get(booking.clickId);
    if (!click) { if (booking.at >= since) unattributedBookings++; continue; }
    if (click.at < since) continue;
    const row = rows.get(JSON.stringify([click.source, click.landing, click.referrer, click.campaign]));
    row.confirmedBookings++;
    row.convertedClickIds.add(click.clickId);
  }
  return {
    attribution: 'Last booking click; cohorts use click date. Confirmed means scheduled, not attended or qualified.',
    since: new Date(since).toISOString(), unattributedBookings, testEventsExcluded,
    sources: [...rows.values()].map(({ convertedClickIds, ...row }) => ({ ...row,
      clicksWithConfirmedBooking: convertedClickIds.size,
      clicksWithoutConfirmedBooking: row.clicks - convertedClickIds.size,
      clickToBookingRate: row.clicks ? convertedClickIds.size / row.clicks : 0,
    })).sort((a, b) => b.confirmedBookings - a.confirmedBookings || b.clicks - a.clicks),
  };
}

export function reportAuthorized(header, secret) {
  if (!secret || secret.length < 32 || typeof header !== 'string') return false;
  if (header.startsWith('Bearer ')) return equal(header.slice(7), secret);
  if (!header.startsWith('Basic ')) return false;
  const credentials = Buffer.from(header.slice(6), 'base64').toString();
  return equal(credentials.slice(credentials.indexOf(':') + 1), secret);
}
