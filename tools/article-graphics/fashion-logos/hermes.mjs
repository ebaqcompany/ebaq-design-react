import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",viewport:{width:1440,height:900}});
const p=await ctx.newPage(); await p.goto("https://www.hermes.com/us/en/",{waitUntil:"domcontentloaded"}); await p.waitForTimeout(7000);
const r=await p.evaluate(()=>[...document.querySelectorAll('symbol')].filter(s=>/hermes|logo/i.test(s.id)).map(s=>({id:s.id,vb:s.getAttribute('viewBox'),len:s.innerHTML.length,html:s.innerHTML})));
for(const s of r){ console.log(s.id,s.vb,s.len); writeFileSync(`logos-commons/_${s.id}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${s.vb}" fill="#0e0e0e">${s.html}</svg>`); }
await b.close();
