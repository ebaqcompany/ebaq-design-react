import { chromium } from "playwright";
const b=await chromium.launch({channel:"chrome"}); const p=await (await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",deviceScaleFactor:6,viewport:{width:1440,height:900}})).newPage();
await p.goto("https://www.hopkinsmedicine.org/",{waitUntil:"domcontentloaded"}); await p.waitForTimeout(4000);
const el=p.locator('img[src*="hopkins-nav-logo.svg"]').first(); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
await el.evaluate(e=>{e.style.background='#00ff00'}); await el.screenshot({path:'logos/_jh-green.png'}); await b.close();
