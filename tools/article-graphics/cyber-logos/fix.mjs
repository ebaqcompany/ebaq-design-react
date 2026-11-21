import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:6});
let p=await ctx.newPage(); await p.goto("https://nordsecurity.com/",{waitUntil:"load",timeout:60000}); await p.waitForTimeout(3000);
const s=await p.evaluate(()=>{const v=document.querySelector('svg[aria-label="Nord Security"]');const u=v.querySelector('use');const id=(u.getAttribute('xlink:href')||u.getAttribute('href')).slice(1);const ref=document.getElementById(id);const vb=ref.getAttribute('viewBox')||v.getAttribute('viewBox');return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><g fill="#2a2a2d">${ref.innerHTML}</g></svg>`});
writeFileSync('logos/nord-security.svg',s); console.log('nord',s.length); await p.close();
p=await ctx.newPage(); await p.goto("https://www.wiz.io/",{waitUntil:"load",timeout:60000}); await p.waitForTimeout(3000);
const el=p.locator('a[href="/"] svg').first(); console.log('wiz', await el.evaluate(e=>[e.getBoundingClientRect().width,getComputedStyle(e).color,e.outerHTML.slice(0,200)]));
await el.evaluate(e=>{e.style.background='#808080'}); await el.screenshot({path:'logos/_wiz-grey.png'}); await b.close();
