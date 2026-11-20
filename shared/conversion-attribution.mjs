// Only public page paths and bounded campaign labels enter the conversion ledger.
export function publicPath(value) {
  if (typeof value !== 'string') return '/unknown';
  const path = value.split(/[?#]/, 1)[0].replace(/\/$/, '') || '/';
  if (path.length > 160) return '/unknown';
  return /^\/(?:(?:blog|services|work|tools|compare)\/[a-z0-9-]+|[a-z0-9-]+)?$/.test(path)
    && !/^\/(?:proposal|api|leads|admin|unknown)(?:\/|$)/.test(path) ? path : '/unknown';
}

export function referrerHost(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && /^[a-z0-9.-]+$/i.test(url.hostname)
      ? url.hostname.toLowerCase().slice(0, 100) : '';
  } catch { return ''; }
}

export function campaignLabel(value, key) {
  if (typeof value !== 'string' || value.length > 64) return '';
  if (/^[a-z][a-z0-9_-]*$/i.test(value)) return value;
  return key === 'utm_source' && /^[a-z][a-z0-9-]*(?:\.[a-z0-9-]+)*\.[a-z]{2,}$/i.test(value) ? value : '';
}

export function attribution(params) {
  return {
    source: publicPath(params.get('source')),
    landing: publicPath(params.get('landing')),
    referrer: referrerHost(params.get('referrer')),
    campaign: Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign'].map(key =>
      [key, campaignLabel(params.get(key), key)]).filter(([, value]) => value)),
  };
}

const toolNotePrefixes = {
  '/tools/branding-cost-calculator': 'Cost calculator estimate. ',
  '/tools/logo-design-cost-calculator': 'Logo cost calculator. ',
  '/tools/website-cost-calculator': 'Website cost calculator estimate. ',
  '/tools/brand-grader': 'Brand grader: ',
  '/tools/brand-archetype-quiz': 'Brand archetype quiz: ',
};

export function toolBookingNotes(source, notes) {
  const prefix = toolNotePrefixes[publicPath(source)];
  return prefix && typeof notes === 'string' && notes.length <= 500 && notes.startsWith(prefix) ? notes : '';
}
