import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:4});
for (const [s,u] of [["p-and-t-group","https://www.p-t-group.com/"],["patricia-urquiola","https://patriciaurquiola.com/"]]){ const p=await ctx.newPage();
 await p.goto(u,{waitUntil:"domcontentloaded",timeout:35000}); await p.waitForTimeout(7000);
 const l=await p.evaluate(()=>[...document.querySelectorAll('img,svg,a')].map((e,i)=>{const r=e.getBoundingClientRect();return {i,t:e.tagName,x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height),src:(e.currentSrc||e.getAttribute?.('href')||'').slice(0,100),txt:(e.innerText||'').slice(0,30)}}).filter(o=>o.y<130&&o.y>=0&&o.w>20&&o.x<500));
 console.log(s,JSON.stringify(l.slice(0,8)));
 await p.screenshot({path:`shots/${s}2.png`,clip:{x:0,y:0,width:700,height:150}}); await p.close();}
await b.close();
