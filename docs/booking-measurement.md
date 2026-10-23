# Booking measurement

The existing website and Cal.com intro-call event remain the booking journey. No attendee fields change.

## What is measured

- A booking link goes through `/api/booking-start`, which stores the public source page, session landing page, referring hostname and bounded `utm_source`, `utm_medium`, `utm_campaign` labels.
- The redirect adds an opaque signed `metadata[ebaq_click]` token to the existing `https://cal.com/ebaqdesign/15min` link. It does not pass attendee details.
- Cal.com sends its original signed webhook to `/api/cal-webhook`. The receiver verifies the raw-byte HMAC, filters event type `815281`, and only treats `ACCEPTED` bookings as confirmed.
- Requests, payment initiation, browser callbacks and booking clicks are not confirmed bookings. Cancellations are excluded; reschedules replace the earlier booking. Retried deliveries do not double-count.
- `/api/conversion-report` is private: HTTP Basic authentication (any username, report token as password) or a Bearer report token. `?format=json&days=28` returns machine-readable counts. The default is a simple browser report.
- Reports use a click-date cohort and last-booking-click attribution, show unmatched direct bookings separately, and describe unconverted clicks as “no confirmed booking yet,” not proven abandonment.

## Privacy and limits

No names, email addresses, phone numbers, meeting notes, raw webhook bodies, user agents or IP addresses are stored in the application ledger. IPs are transformed into a daily HMAC only for one-minute rate-limit keys. Browser context is sessionStorage, expires after 24 hours, and excludes query strings from page paths. Do Not Track and Global Privacy Control skip click collection. No analytics cookies or new third-party scripts are added.

Records expire after 90 days. Hosting/provider access logs follow their own retention settings. The report does not establish whether a call was attended, qualified, proposed or won. Historical attribution cannot be backfilled from old anonymous clicks.

## Server configuration

Keep all values private and server-only; never use a `VITE_` prefix:

- `CONVERSION_SIGNING_SECRET`: random 32+ bytes, preserved across deployments for the 90-day attribution window.
- `CAL_WEBHOOK_SECRET`: random 32+ bytes, matching the secret in the Cal.com webhook.
- `CONVERSION_REPORT_TOKEN`: separate random 32+ bytes; authenticates the private report and test clicks.
- `CAL_EVENT_TYPE_ID=815281`: verified from the intro-call settings’ troubleshooter link.
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, or the Vercel integration's `KV_REST_API_URL`, `KV_REST_API_TOKEN`: private durable Redis storage. No in-memory or filesystem fallback on Vercel. Every key uses the isolated `ebaq:conversions:v1:` prefix, so the existing free store's ratings keys are not read or modified.

The original `/start` redirect changes from a permanent direct calendar redirect to a temporary redirect through the recording endpoint. Previously cached permanent redirects may continue bypassing measurement for some returning visitors; decorated booking links use the API directly to avoid that cache. Booking still succeeds when recording is unavailable, but is unattributed.

Configure a Cal.com webhook for Booking created, Booking canceled and Booking rescheduled, with the original/default payload and the signing secret. If Booking confirmed is available, include it as well. The receiver accepts both bare hex and `sha256=`-prefixed signatures. Verify a Cal.com Ping test after deployment; its synthetic event must not be presented as a real booking.

## Run and verify locally

Secrets are in the ignored `.env.conversions.local`; the ignored local SQLite ledger lives under `.vercel/conversions/`. Local SQLite is a development/test option, never a Vercel production store.

```sh
node --test tests/conversions.test.mjs
npm run build
node --env-file=.env.conversions.local scripts/serve-conversions.mjs
```

The local site/API is `http://127.0.0.1:4174`. The same report route works locally with the local report token. Signed fixtures test the complete click → webhook → report path, forged events, duplicate delivery, pending bookings, cancellation, reschedule, privacy, restart persistence and report authentication without creating a Cal.com booking.

For a production fixture test, request `/api/booking-start?test=1&source=/blog/logo-design-cost` with a Bearer report token, without following the redirect. This creates an explicitly tagged test click. Use its metadata token in a fixture signed with the configured webhook secret, with event type `815281`, status `ACCEPTED`, a unique synthetic UID and current `createdAt`. Test clicks and their matching fixture bookings are excluded from business counts and reported as `testEventsExcluded`. No real calendar booking is created. Never put secrets into URLs, source files, screenshots or Git.
