// Renders the "price vs delivery time" scatter chart for /blog/brand-identity-cost at 1920x1080.
// Run from this folder: node chart.mjs
import { chromium } from "playwright";
const P = [ // [label, weeks, price, dx, dy, highlight, anchor]
  ["Ebaq Brand Sprint", 1, 3000, 26, -20, true],
  ["Gabriela Yanez", 6, 2560, 22, 30],
  ["Dalibor Pajic, startup", 4, 2900, -22, 38, false, "end"],
  ["Dalibor Pajic, system", 6, 4150, 22, 0],
  ["Humberto Carrero", 4, 5000, 22, -6],
  ["Sophie O'Connor, visual", 4, 8000, -22, -18, false, "end"],
  ["Humberto Carrero, + packaging", 6, 8000, 22, 26],
  ["Sophie O'Connor, full", 6, 10000, 22, -18],
  ["Glyn Launchpad", 5, 10000, -22, -18, false, "end"],
  ["Glyn Anchor", 14, 25000, -22, -18, false, "end"],
  ["Primary", 2, 60000, 22, 10],
];
const W = 1920, H = 1080, L = 210, R = 1780, T = 180, B = 920;
const x = (w) => L + (w / 16) * (R - L);
const y0 = Math.log10(800), y1 = Math.log10(100000);
const y = (v) => B - ((Math.log10(v) - y0) / (y1 - y0)) * (B - T);
let g = "";
for (const v of [1000, 3000, 10000, 30000, 100000]) {
  g += `<line x1="${L}" x2="${R}" y1="${y(v)}" y2="${y(v)}" stroke="#e6e6e6" stroke-width="2"/>`;
  g += `<text x="${L - 24}" y="${y(v) + 10}" text-anchor="end" class="ax">$${v >= 1000 ? v / 1000 + "k" : v}</text>`;
}
for (let w = 0; w <= 16; w += 2) {
  g += `<line y1="${T}" y2="${B}" x1="${x(w)}" x2="${x(w)}" stroke="#f0f0f0" stroke-width="2"/>`;
  g += `<text x="${x(w)}" y="${B + 48}" text-anchor="middle" class="ax">${w}</text>`;
}
for (const [lab, w, v, dx, dy, hi, anchor] of P) {
  const cx = x(w), cy = y(v);
  g += `<circle cx="${cx}" cy="${cy}" r="${hi ? 18 : 13}" fill="${hi ? "#00afec" : "#0e0e0e"}"/>`;
  g += `<text x="${cx + dx}" y="${cy + dy}" text-anchor="${anchor || "start"}" class="${hi ? "lbh" : "lb"}">${lab} · $${v.toLocaleString("en-US")}</text>`;
}
const html = `<html><head><link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet"><style>body{margin:0}text{font-family:'Roboto Condensed',sans-serif}.ax{font-size:30px;fill:#555}.lb{font-size:28px;fill:#0e0e0e}.lbh{font-size:30px;fill:#00afec;font-weight:700}.t{font-size:56px;font-weight:700;fill:#0e0e0e}.s{font-size:30px;fill:#555}</style></head><body>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#fff"/>
<text x="${L}" y="92" class="t">Brand identity: price vs. delivery time</text>
<text x="${L}" y="140" class="s">11 published packages, prices checked November 23, 2026 (price on a log scale)</text>
${g}<line x1="${L}" x2="${R}" y1="${B}" y2="${B}" stroke="#0e0e0e" stroke-width="3"/>
<text x="${(L + R) / 2}" y="${B + 105}" text-anchor="middle" class="s">Weeks to deliver</text></svg></body></html>`;
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: W, height: H } });
await p.setContent(html, { waitUntil: "networkidle" });
await p.waitForTimeout(500);
await p.screenshot({ path: "cost-vs-timeline.png" });
await b.close();
console.log("ok");
