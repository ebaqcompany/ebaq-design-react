import { campaignLabel, publicPath, toolBookingNotes } from '../shared/conversion-attribution.mjs';

// Session-only context: no analytics cookies or cross-site visitor identity.
type Context = { at: number; landing: string; referrer: string; campaign: Record<string, string> };
const key = 'ebaq_booking_context_v1';
let context: Context | undefined;

function bookingStartParams(context: Context) {
  return new URLSearchParams({ source: publicPath(location.pathname), landing: context.landing, referrer: context.referrer, ...context.campaign });
}

export async function requestBookingToken(entry: 'contact' | 'embed') {
  if (!context) return;
  try {
    const params = bookingStartParams(context);
    params.set('entry', entry);
    const response = await fetch(`/api/booking-start?${params}`, {
      method: 'POST', signal: AbortSignal.timeout(1200),
    });
    if (!response.ok) return;
    const { token } = await response.json();
    if (typeof token === 'string') return token;
  } catch { /* Keep booking available when attribution fails. */ }
}

export function installConversionAttribution() {
  if (navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
  try {
    const stored = JSON.parse(sessionStorage.getItem(key) || 'null') as Context | null;
    if (stored && Date.now() - stored.at < 86400000) context = stored;
    else throw new Error('New session context');
  } catch {
    let referrer = '';
    try { referrer = new URL(document.referrer).origin; } catch { /* direct visit */ }
    const params = new URLSearchParams(location.search);
    context = { at: Date.now(), landing: publicPath(location.pathname), referrer,
      campaign: Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign']
        .map(name => [name, campaignLabel(params.get(name), name)])
        .filter(([, value]) => value)),
    };
    try { sessionStorage.setItem(key, JSON.stringify(context)); } catch { /* storage disabled: current-page attribution still works */ }
  }
  const decorate = (event: Event) => {
    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link || !context) return;
    const target = new URL(link.href, location.href);
    const local = target.origin === location.origin && ['/start', '/api/booking-start'].includes(target.pathname);
    const calendar = target.origin === 'https://cal.com' && target.pathname === '/ebaqdesign/15min';
    if (!local && !calendar) return;
    const params = bookingStartParams(context);
    const notes = toolBookingNotes(location.pathname, target.searchParams.get('notes'));
    // Links with other Cal.com prefills stay direct so no attendee fields enter the tracker.
    if (calendar && [...target.searchParams.keys()].some(param => param !== 'notes' || !notes)) return;
    if (notes) params.set('notes', notes);
    link.href = `/api/booking-start?${params}`;
  };
  // Normal, keyboard, modified and middle-click navigation keep their native behavior.
  for (const type of ['pointerdown', 'focusin', 'click', 'auxclick']) document.addEventListener(type, decorate, { capture: true });
}
