import { chromium } from "playwright";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:6});
for(const [u,find,out] of [["https://www.harvey.ai/",'Harvey',"logos/harvey.png"],["https://thinkingmachines.ai/",'THINKING',"logos/thinking-machines-lab.png"]]){
 const p=await ctx.newPage(); await p.goto(u,{waitUntil:"load",timeout:60000}); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(4000);
 const ok=await p.evaluate((find)=>{const a=[...document.querySelectorAll('a')].find(e=>e.innerText.includes(find)&&e.getBoundingClientRect().top<120);if(!a)return null;
   const d=document.createElement('div');d.id='__logo';const cs=getComputedStyle(a.firstElementChild||a);
   d.style.cssText=`position:fixed;left:40px;top:300px;z-index:2147483647;background:#fff;color:#0e0e0e;padding:8px 10px;font-family:${cs.fontFamily};font-size:${cs.fontSize};font-weight:${cs.fontWeight};letter-spacing:${cs.letterSpacing};line-height:1.2;white-space:nowrap;opacity:1;transform:none`;
   d.textContent=a.innerText.trim(); document.body.appendChild(d); return [d.textContent,cs.fontFamily,cs.fontSize];},find);
 console.log(out,JSON.stringify(ok)); if(ok){await p.waitForTimeout(300); await p.locator('#__logo').screenshot({path:out});} await p.close(); }
await b.close();
