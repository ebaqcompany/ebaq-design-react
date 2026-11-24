// Resolves an inline <svg><use href="#id"> logo into a standalone SVG by copying the referenced <symbol>.
// Usage: node symbol.mjs <url> <symbolId> <slug>
import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const [u, id, slug] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0 Safari/537.36" });
await p.goto(u, { waitUntil: "domcontentloaded", timeout: 45000 }); await p.waitForTimeout(5000);
const svg = await p.evaluate((id) => {
  const s = document.getElementById(id); if (!s) return null;
  const c = s.cloneNode(true); const src = [s, ...s.querySelectorAll("*")], dst = [c, ...c.querySelectorAll("*")];
  src.forEach((n, i) => { const cs = getComputedStyle(n); if (n !== s && cs.fill && cs.fill !== "none") dst[i].setAttribute("fill", cs.fill); });
  const vb = s.getAttribute("viewBox") || "0 0 160 85";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${c.innerHTML}</svg>`;
}, id);
if (svg) { writeFileSync(`logos/${slug}.svg`, svg); console.log("ok", slug, svg.length); } else console.log("missing", id);
await b.close();
