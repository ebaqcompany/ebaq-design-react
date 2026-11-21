import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900}});
for (const [s,u,sel] of [["swa-group","https://www.swagroup.com/","img.translogo"],["gustafson-porter-bowman","https://www.gp-b.com/","header img"]]){ const p=await ctx.newPage(); await p.goto(u,{waitUntil:"domcontentloaded",timeout:45000}); await p.waitForTimeout(6000);
 const src=await p.evaluate((sel)=>{const e=document.querySelector(sel);return e.currentSrc||e.src},sel); console.log(s,src); await p.close();}
await b.close();
