import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHmac } from 'node:crypto';
import { createServer } from 'node:http';
import { createSqliteStore } from '../lib/conversions/store.mjs';
import { recordClick, recordWebhook, summarize, readClickToken, reportAuthorized, CALENDAR_URL } from '../lib/conversions/core.mjs';
import { attribution } from '../shared/conversion-attribution.mjs';
import { bookingStart, calWebhook, conversionReport } from '../lib/conversions/http.mjs';

const secret = 'local-test-signing-secret-0000000000000000';
const webhookSecret = 'local-test-webhook-secret-0000000000000000';
const reportToken = 'local-test-report-secret-00000000000000000';
const eventTypeId = '12345';
const sign = raw => createHmac('sha256', webhookSecret).update(raw).digest('hex');
const fixture = (token, overrides = {}, triggerEvent = 'BOOKING_CREATED') => Buffer.from(JSON.stringify({
  triggerEvent, createdAt: new Date().toISOString(), payload: { uid: 'fixture-booking-not-real', eventTypeId: 12345,
    status: 'ACCEPTED', metadata: { ebaq_click: token }, attendees: [{ name: 'Do not store', email: 'private@example.test', phone: '+15555555555' }],
    responses: { notes: 'Do not store notes' }, ...overrides,
  },
}));

test('durable click → authentic confirmation, retries, privacy, restart and cancellation', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'ebaq-conversion-test-'));
  let store = await createSqliteStore(join(dir, 'events.sqlite'));
  try {
    const click = await recordClick({ params: new URLSearchParams({ source: '/blog/logo-design-cost?email=private@example.test', landing: '/blog/style-guides', referrer: 'https://google.com/search?q=private', utm_source: 'linkedin', utm_campaign: 'savory_launch', email: 'private@example.test' }), store, secret, ip: '203.0.113.1' });
    const token = new URL(click.url).searchParams.get('metadata[ebaq_click]');
    assert.equal(readClickToken(token, secret), click.clickId);
    assert.equal(readClickToken(token + 'tampered', secret), null);
    const raw = fixture(token);
    const call = (raw, signature = sign(raw)) => recordWebhook({ raw, signature, webhookSecret, signingSecret: secret, eventTypeId, store });
    assert.equal((await call(raw, '0'.repeat(64))).status, 401);
    assert.equal((await call(raw, 'é'.repeat(64))).status, 401);
    assert.equal((await call(Buffer.concat([raw, Buffer.from(' ')]), sign(raw))).status, 401);
    assert.equal((await call(raw)).duplicate, false);
    assert.equal((await call(raw)).duplicate, true);
    assert.equal((await call(fixture(token, { uid: 'requested', status: 'PENDING', requiresConfirmation: true }))).ignored, true);
    assert.equal((await call(fixture(token, { uid: 'wrong-event', eventTypeId: 999 }))).ignored, true);
    let events = await store.list(0);
    assert.equal(events.length, 2);
    const stored = JSON.stringify(events);
    for (const privateValue of ['private@example.test', 'Do not store', '+15555555555', '203.0.113.1', '/search?q=']) assert.ok(!stored.includes(privateValue));
    store.close(); store = await createSqliteStore(join(dir, 'events.sqlite'));
    const report = summarize(await store.list(0));
    assert.equal(report.sources[0].confirmedBookings, 1);
    assert.equal(report.sources[0].clickToBookingRate, 1);
    assert.equal(report.sources[0].source, '/blog/logo-design-cost');
    assert.equal(report.sources[0].referrer, 'google.com');
    await new Promise(resolve => setTimeout(resolve, 2));
    await call(fixture(token, {}, 'BOOKING_CANCELLED'));
    assert.equal(summarize(await store.list(0)).sources[0].confirmedBookings, 0);
  } finally { store.close(); rmSync(dir, { recursive: true, force: true }); }
});

test('reschedules replace the original booking and out-of-order delivery does not double count', () => {
  const now = Date.now();
  const click = { id: 'click:a', clickId: 'a', kind: 'click', source: '/blog/style-guides', landing: '/', campaign: {}, referrer: '', at: now - 100 };
  const a = { kind: 'booking', bookingId: 'old', clickId: 'a', status: 'confirmed', at: now - 50 };
  const b = { kind: 'booking', bookingId: 'new', previousBookingId: 'old', clickId: null, status: 'confirmed', at: now };
  assert.equal(summarize([b, click, a]).sources[0].confirmedBookings, 1);
  assert.equal(summarize([b, click, a]).unattributedBookings, 0);
  const cancelled = { ...b, status: 'cancelled' };
  assert.equal(summarize([b, click, a, cancelled]).sources[0].confirmedBookings, 0);
});

test('metadata sanitization, rate limits and report authentication', async () => {
  assert.equal(attribution(new URLSearchParams({ source: '/proposal/client', referrer: 'javascript:alert(1)', utm_campaign: 'private@example.test' })).source, '/unknown');
  assert.deepEqual(attribution(new URLSearchParams({ utm_campaign: 'private@example.test' })).campaign, {});
  assert.equal(reportAuthorized('Bearer ' + reportToken, reportToken), true);
  assert.equal(reportAuthorized('Basic ' + Buffer.from('arek:' + reportToken).toString('base64'), reportToken), true);
  assert.equal(reportAuthorized('Bearer wrong', reportToken), false);
  let writes = 0;
  const result = await recordClick({ params: new URLSearchParams(), secret, store: { allow: async () => false, put: async () => writes++ } });
  assert.equal(result.url, CALENDAR_URL); assert.equal(writes, 0);
});

test('signed production fixtures stay separate from real conversion totals', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'ebaq-conversion-fixture-'));
  const store = await createSqliteStore(join(dir, 'events.sqlite'));
  try {
    const click = await recordClick({ params: new URLSearchParams({ source: '/blog/logo-design-cost' }), store, secret, test: true });
    const raw = fixture(new URL(click.url).searchParams.get('metadata[ebaq_click]'));
    await recordWebhook({ raw, signature: sign(raw), webhookSecret, signingSecret: secret, eventTypeId, store });
    const report = summarize(await store.list(0));
    assert.equal(report.testEventsExcluded, 2);
    assert.deepEqual(report.sources, []);
    assert.equal(report.unattributedBookings, 0);
  } finally { store.close(); rmSync(dir, { recursive: true, force: true }); }
});

test('HTTP redirect, opt-out, forged webhook rejection and protected report', async () => {
  Object.assign(process.env, { CONVERSION_SIGNING_SECRET: secret, CAL_WEBHOOK_SECRET: webhookSecret, CAL_EVENT_TYPE_ID: eventTypeId, CONVERSION_REPORT_TOKEN: reportToken });
  const dir = mkdtempSync(join(tmpdir(), 'ebaq-conversion-http-'));
  const store = await createSqliteStore(join(dir, 'events.sqlite'));
  const server = createServer((req, res) => {
    const path = new URL(req.url, 'http://localhost').pathname;
    const handler = path === '/api/cal-webhook' ? calWebhook : path === '/api/conversion-report' ? conversionReport : bookingStart;
    handler(req, res, async () => store);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  try {
    let response = await fetch(base + '/start?source=/blog/style-guides', { redirect: 'manual' });
    assert.equal(response.status, 302);
    const token = new URL(response.headers.get('location')).searchParams.get('metadata[ebaq_click]');
    assert.ok(token);
    response = await fetch(base + '/start', { headers: { DNT: '1' }, redirect: 'manual' });
    assert.equal(response.headers.get('location'), CALENDAR_URL);
    response = await fetch(base + '/api/cal-webhook', { method: 'POST', body: fixture(token), headers: { 'x-cal-signature-256': 'forged' } });
    assert.equal(response.status, 401);
    const raw = fixture(token);
    response = await fetch(base + '/api/cal-webhook', { method: 'POST', body: raw, headers: { 'x-cal-signature-256': 'sha256=' + sign(raw), 'Content-Type': 'application/json' } });
    assert.equal(response.status, 200);
    response = await fetch(base + '/api/conversion-report'); assert.equal(response.status, 401);
    response = await fetch(base + '/api/conversion-report?format=json', { headers: { Authorization: 'Bearer ' + reportToken } });
    assert.equal((await response.json()).sources[0].confirmedBookings, 1);
    response = await fetch(base + '/api/conversion-report', { headers: { Authorization: 'Bearer ' + reportToken } });
    assert.match(await response.text(), /Booking sources/);
  } finally { await new Promise(resolve => server.close(resolve)); store.close(); rmSync(dir, { recursive: true, force: true }); }
});
