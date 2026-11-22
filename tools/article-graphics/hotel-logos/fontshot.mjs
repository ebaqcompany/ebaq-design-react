// Screenshots a logo drawn with an icon font / pseudo-element, recoloured black on transparent, at 6x.
import { chromium } from "playwright";
const jobs={"the-ritz-carlton":["https://www.ritzcarlton.com/",".brand-logo-trc"],"four-seasons":["https://www.fourseasons.com/",".TabbedHero-logo"]};
const only=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:6});
for(const [s,[u,sel]] of Object.entries(jobs)){ if(only.length&&!only.includes(s)) continue;
 const p=await ctx.newPage(); await p.goto(u,{waitUntil:"domcontentloaded",timeout:45000}); await p.waitForTimeout(7000);
 await p.addStyleTag({content:`${sel},${sel} *,${sel}::before,${sel}::after{color:#0e0e0e!important;background-color:transparent!important;fill:#0e0e0e!important}`});
 await p.evaluate((sel)=>{const e=document.querySelector(sel); e.style.position='fixed'; e.style.left='40px'; e.style.top='40px'; e.style.zIndex=2147483647; document.body.style.background='transparent'; [...document.body.children].forEach(c=>{ if(!c.contains(e)) c.style.visibility='hidden'}); },sel);
 await p.waitForTimeout(500);
 await p.locator(sel).first().screenshot({path:`logos/${s}.png`,omitBackground:true}); console.log(s,'ok'); await p.close(); }
await b.close();
