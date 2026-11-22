import { chromium } from "playwright";
const [u,sel]=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",viewport:{width:1440,height:900}});
const p=await ctx.newPage(); await p.goto(u,{waitUntil:"domcontentloaded",timeout:45000}); await p.waitForTimeout(7000);
console.log(await p.evaluate((sel)=>{const e=document.querySelector(sel); if(!e) return 'none'; const ps=[...e.querySelectorAll('*'),e].map(n=>[getComputedStyle(n,'::before').backgroundImage,getComputedStyle(n,'::before').content,getComputedStyle(n,'::after').backgroundImage].join('|')).filter(x=>x.includes('url')).slice(0,3); return e.outerHTML.slice(0,1200)+'\nPSEUDO '+ps.join('\n')},sel));
await b.close();
