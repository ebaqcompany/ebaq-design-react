// Only public page paths and bounded campaign labels enter the conversion ledger.
export function publicPath(value) {
  if (typeof value !== 'string') return '/unknown';
  const path = value.split(/[?#]/, 1)[0].replace(/\/$/, '') || '/';
  if (path.length > 160) return '/unknown';
  return /^\/(?:blog\/[a-z0-9-]+|services\/[a-z0-9-]+|work\/[a-z0-9-]+|[a-z0-9-]+)?$/.test(path)
    && !/^\/(?:proposal|api|leads|admin|unknown)(?:\/|$)/.test(path) ? path : '/unknown';
}

export function referrerHost(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && /^[a-z0-9.-]+$/i.test(url.hostname)
      ? url.hostname.toLowerCase().slice(0, 100) : '';
  } catch { return ''; }
}

export function campaignLabel(value) {
  return typeof value === 'string' && /^[a-z][a-z0-9_-]{0,63}$/i.test(value) ? value : '';
}

export function attribution(params) {
  return {
    source: publicPath(params.get('source')),
    landing: publicPath(params.get('landing')),
    referrer: referrerHost(params.get('referrer')),
    campaign: Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign'].map(key =>
      [key, campaignLabel(params.get(key))]).filter(([, value]) => value)),
  };
}
