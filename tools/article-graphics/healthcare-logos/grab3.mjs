import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const p=await (await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"})).newPage();
await p.goto("https://www.hopkinsmedicine.org/",{waitUntil:"domcontentloaded"}); await p.waitForTimeout(4000);
const t=await p.evaluate(async()=>{const r=await fetch('/-/media/images/hopkins-nav-logo.svg');return [r.headers.get('content-type'),await r.text()]});
console.log(t[0],t[1].slice(0,120)); if(t[1].includes('<svg')) writeFileSync('logos/johns-hopkins-medicine.svg',t[1]); await b.close();
