import { chromium } from "playwright";
const b=await chromium.launch({channel:"chrome"}); const p=await (await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:8})).newPage();
await p.goto("https://www.q.bio/",{waitUntil:"load",timeout:60000}); await p.waitForTimeout(3000);
await p.evaluate(()=>{const a=document.querySelector('a.q-brand');a.style.background='#000';a.style.padding='4px';});
await p.locator('a.q-brand').first().screenshot({path:'logos/_qbio-black.png'}); await b.close();
