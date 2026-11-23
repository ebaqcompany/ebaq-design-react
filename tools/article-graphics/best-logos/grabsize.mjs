// Saves the first inline <svg> (computed fills inlined) or <img> whose rendered size matches WxH (±3px) as logos/<slug>.
// Usage: node grabsize.mjs <url> <slug> <width> <height>
import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const [u, slug, W, H] = process.argv.slice(2); const w = +W, h = +H;
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0 Safari/537.36" });
await p.goto(u, { waitUntil: "domcontentloaded", timeout: 45000 }); await p.waitForTimeout(6000);
const r = await p.evaluate(async ([w, h]) => {
  const near = (el) => { const r = el.getBoundingClientRect(); return Math.abs(r.width - w) <= 3 && Math.abs(r.height - h) <= 3; };
  for (const el of document.querySelectorAll("svg, img")) {
    if (!near(el)) continue;
    if (el.tagName.toLowerCase() === "svg") {
      const c = el.cloneNode(true); const src = [el, ...el.querySelectorAll("*")], dst = [c, ...c.querySelectorAll("*")];
      src.forEach((n, i) => { const cs = getComputedStyle(n), d = dst[i]; if (n.tagName !== "svg") { if (cs.fill && cs.fill !== "none") d.setAttribute("fill", cs.fill); if (cs.stroke && cs.stroke !== "none") d.setAttribute("stroke", cs.stroke); } });
      const rr = el.getBoundingClientRect(); if (!c.getAttribute("viewBox")) c.setAttribute("viewBox", `0 0 ${rr.width} ${rr.height}`); c.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      return { kind: "svg", data: c.outerHTML };
    }
    return { kind: "img", data: el.currentSrc || el.src };
  }
  return null;
}, [w, h]);
if (!r) console.log("none", slug);
else if (r.kind === "svg") { writeFileSync(`logos/${slug}.svg`, r.data); console.log("svg", slug); }
else if (r.data.startsWith("data:image/svg+xml;base64,")) { writeFileSync(`logos/${slug}.svg`, Buffer.from(r.data.split(",")[1], "base64")); console.log("datasvg", slug); }
else if (r.data.startsWith("data:image/svg+xml,")) { writeFileSync(`logos/${slug}.svg`, decodeURIComponent(r.data.slice("data:image/svg+xml,".length))); console.log("datasvg", slug); }
else { const res = await p.request.get(r.data); const ct = res.headers()["content-type"] || ""; const ext = ct.includes("svg") ? "svg" : ct.includes("png") ? "png" : ct.includes("webp") ? "webp" : "img"; writeFileSync(`logos/${slug}.${ext}`, await res.body()); console.log("img", slug, ext, r.data.slice(0, 80)); }
await b.close();
