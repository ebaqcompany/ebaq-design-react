// Lists small header svg/img elements (logos under 50px wide are missed by fetch-logos).
import { chromium } from "playwright";
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({viewport:{width:1440,height:900},userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0 Safari/537.36"});
await p.goto(process.argv[2],{waitUntil:"domcontentloaded",timeout:45000}); await p.waitForTimeout(7000);
console.log(JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('header svg, header img, a[href="/"] svg, a[href="/"] img, [class*=logo i]')].map(e=>{const r=e.getBoundingClientRect();return [e.tagName,(e.getAttribute('class')||'').slice(0,40),(e.getAttribute('aria-label')||e.getAttribute('alt')||'').slice(0,20),Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)]}).filter(x=>x[4]<200&&x[5]>15).slice(0,10))));
await b.close();
