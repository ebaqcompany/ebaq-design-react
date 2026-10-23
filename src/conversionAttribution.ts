// Session-only context: no analytics cookies or cross-site visitor identity.
type Context = { at: number; landing: string; referrer: string; campaign: Record<string, string> };
const key = 'ebaq_booking_context_v1';
const safePath = (value: string) => {
  const path = value.split(/[?#]/, 1)[0].replace(/\/$/, '') || '/';
  return path.length <= 160 && /^\/(?:blog\/[a-z0-9-]+|services\/[a-z0-9-]+|work\/[a-z0-9-]+|[a-z0-9-]+)?$/.test(path)
    && !/^\/(?:proposal|api|leads|admin|unknown)(?:\/|$)/.test(path) ? path : '/unknown';
};

export function installConversionAttribution() {
  if (navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
  let context: Context;
  try {
    const stored = JSON.parse(sessionStorage.getItem(key) || 'null') as Context | null;
    if (stored && Date.now() - stored.at < 86400000) context = stored;
    else throw new Error('New session context');
  } catch {
    let referrer = '';
    try { referrer = new URL(document.referrer).origin; } catch { /* direct visit */ }
    const params = new URLSearchParams(location.search);
    context = { at: Date.now(), landing: safePath(location.pathname), referrer,
      campaign: Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign']
        .map(name => [name, params.get(name) || ''])
        .filter(([, value]) => /^[a-z][a-z0-9_-]{0,63}$/i.test(value))),
    };
    try { sessionStorage.setItem(key, JSON.stringify(context)); } catch { /* storage disabled: current-page attribution still works */ }
  }
  const decorate = (event: Event) => {
    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    const target = new URL(link.href, location.href);
    const local = target.origin === location.origin && ['/start', '/api/booking-start'].includes(target.pathname);
    const calendar = target.origin === 'https://cal.com' && target.pathname === '/ebaqdesign/15min';
    if (!local && !calendar) return;
    const params = new URLSearchParams({ source: safePath(location.pathname), landing: safePath(context.landing), referrer: context.referrer, ...context.campaign });
    link.href = `/api/booking-start?${params}`;
  };
  // Normal, keyboard, modified and middle-click navigation keep their native behavior.
  for (const type of ['pointerdown', 'focusin', 'click', 'auxclick']) document.addEventListener(type, decorate, { capture: true });
}
