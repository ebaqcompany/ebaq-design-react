// Grabs the header logo from each company's homepage: inline <svg> (colors resolved) or the <img> source.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const out = (f) => join(dirname(fileURLToPath(import.meta.url)), "logos", f);
import { boards, slug } from "./companies.mjs";
const only = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
const ctx = await browser.newContext({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36", viewport: { width: 1440, height: 900 } });
for (const [name, url] of boards.flatMap((b) => b.companies)) {
  if (only.length && !only.includes(slug(name))) continue;
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(3500);
    const found = await page.evaluate(() => {
      const sels = ['header a[href="/"] svg','header a[href^="/"][aria-label] svg','a[href="/"] svg','[class*="logo" i] svg','svg[class*="logo" i]','header svg','header a[href="/"] img','a[href="/"] img','img[alt*="logo" i]','img[src*="logo" i]','[class*="logo" i] img','header img'];
      const big = (el) => { const r = el.getBoundingClientRect(); return r.width >= 30 && r.height >= 8 && r.top < 260; };
      for (const s of sels) {
        for (const el of document.querySelectorAll(s)) {
          if (!big(el)) continue;
          if (el.tagName.toLowerCase() === "svg") {
            const c = el.cloneNode(true);
            const src = [el, ...el.querySelectorAll("*")], dst = [c, ...c.querySelectorAll("*")];
            src.forEach((n, i) => { const cs = getComputedStyle(n); const d = dst[i];
              if (d.setAttribute && n.tagName !== "svg") { if (cs.fill && cs.fill !== "none") d.setAttribute("fill", cs.fill); if (cs.stroke && cs.stroke !== "none") d.setAttribute("stroke", cs.stroke); } });
            const r = el.getBoundingClientRect();
            if (!c.getAttribute("viewBox")) c.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
            c.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            return { kind: "svg", data: c.outerHTML, sel: s, w: r.width, h: r.height };
          }
          return { kind: "img", data: el.currentSrc || el.src, sel: s };
        }
      }
      return null;
    });
    if (!found) { console.log("NONE", name); continue; }
    if (found.kind === "svg") { writeFileSync(out(`${slug(name)}.svg`), found.data); console.log("SVG ", name, found.sel, Math.round(found.w)+"x"+Math.round(found.h)); }
    else {
      const res = await ctx.request.get(found.data); const buf = await res.body();
      const ext = (res.headers()["content-type"] || "").includes("svg") || found.data.endsWith(".svg") ? "svg" : (res.headers()["content-type"]||"").split("/")[1]?.split(";")[0] || "png";
      writeFileSync(out(`${slug(name)}.${ext}`), buf); console.log("IMG ", name, found.sel, ext, found.data.slice(0, 90));
    }
  } catch (e) { console.log("ERR ", name, e.message.slice(0, 80)); }
  await page.close();
}
await browser.close();
