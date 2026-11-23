// Prints the first links/brand elements near the top of a page, to find a logo that isn't an svg/img.
import { chromium } from "playwright";
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({viewport:{width:1440,height:900},userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0 Safari/537.36"});
await p.goto(process.argv[2],{waitUntil:"domcontentloaded",timeout:45000}); await p.waitForTimeout(7000);
console.log(JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('a,[class*=brand i],[class*=logo i]')].map(e=>{const r=e.getBoundingClientRect();return [e.tagName,(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className||'').toString().slice(0,50),Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height),e.innerHTML.slice(0,120)]}).filter(x=>x[3]<150&&x[3]>=0&&x[4]>20).slice(0,12))));
await b.close();
