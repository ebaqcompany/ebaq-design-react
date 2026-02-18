import { useEffect } from 'react';

const TRACK_ENDPOINT = '/api/track';

/**
 * Invisible visitor tracking.
 * - On first visit from an email pixel click, the IP is already mapped server-side.
 * - This script fires a pageview on every route change so we can match IPs.
 * - If a lead cookie exists (set by email pixel redirect), we send it explicitly.
 */
export function useTracking() {
  useEffect(() => {
    const page = window.location.pathname + window.location.search;

    // Check for lead cookie (set if they came from a tracked email link)
    const leadMatch = document.cookie.match(/(?:^|;\s*)ebaq_lead=([^;]*)/);
    const lead = leadMatch ? decodeURIComponent(leadMatch[1]) : '';

    // Fire tracking pixel (non-blocking)
    const img = new Image();
    img.src = `${TRACK_ENDPOINT}?t=pageview&p=${encodeURIComponent(page)}${lead ? `&l=${encodeURIComponent(lead)}` : ''}&_=${Date.now()}`;

    // Also track time on page
    const start = Date.now();
    const handleUnload = () => {
      const seconds = Math.round((Date.now() - start) / 1000);
      if (seconds > 3 && navigator.sendBeacon) {
        navigator.sendBeacon(
          `${TRACK_ENDPOINT}?t=pageview&p=${encodeURIComponent(page + ' (exit)')}&l=${encodeURIComponent(lead)}&dur=${seconds}`
        );
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [typeof window !== 'undefined' ? window.location.pathname : '']);
}
