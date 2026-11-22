// Lists logo-like header elements on a brand homepage (for sites the generic fetcher misses).
import { chromium } from "playwright";
const [u]=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",viewport:{width:1440,height:900},locale:"en-US"});
const p=await ctx.newPage(); await p.goto(u,{waitUntil:"domcontentloaded",timeout:40000}); await p.waitForTimeout(7000);
console.log(await p.title());
console.log(JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('svg,img,[class*=logo i]')].map(e=>{const r=e.getBoundingClientRect();return {t:e.tagName,c:(e.getAttribute('class')||'').slice(0,50),a:(e.getAttribute('aria-label')||e.getAttribute('alt')||'').slice(0,40),w:Math.round(r.width),h:Math.round(r.height),y:Math.round(r.top),use:e.querySelector?.('use')?.getAttribute('xlink:href')||e.querySelector?.('use')?.getAttribute('href')||''}}).filter(o=>o.w>40&&o.h>8&&o.y<200&&o.y>=0).slice(0,8))));
await b.close();
