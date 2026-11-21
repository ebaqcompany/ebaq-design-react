import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const p=await (await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"})).newPage();
await p.goto("https://legora.com/",{waitUntil:"load",timeout:60000}); await p.waitForTimeout(4000);
const s=await p.evaluate(()=>{const v=document.querySelector('a[href="./"] svg');const u=v.querySelector('use');const ref=document.querySelector(u.getAttribute('href'));const c=v.cloneNode(true);const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.innerHTML=ref.innerHTML;g.setAttribute('fill','#0e0e0e');c.replaceChild(g,c.querySelector('use'));c.removeAttribute('style');c.setAttribute('width','89');c.setAttribute('height','17');c.removeAttribute('preserveAspectRatio');return c.outerHTML});
writeFileSync('logos/legora.svg',s); console.log(s.slice(0,200)); await b.close();
