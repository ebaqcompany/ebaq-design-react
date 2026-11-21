import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900}});
let p=await ctx.newPage(); await p.goto("https://www.pix4d.com/",{waitUntil:"domcontentloaded"}); await p.waitForTimeout(5000);
const src=await p.evaluate(()=>[...document.querySelectorAll('img')].find(i=>i.src.startsWith('data:image/svg')&&i.getBoundingClientRect().top<100)?.src);
const m=src.match(/^data:([^;,]+)(;base64)?,(.*)$/); writeFileSync('logos/pix4d.svg', m[2]?Buffer.from(m[3],'base64'):decodeURIComponent(m[3])); console.log('pix4d ok'); await p.close();
for(const [s,u] of [["manna","https://www.manna.aero/"],["matternet","https://mttr.net/"]]){ p=await ctx.newPage(); await p.goto(u,{waitUntil:"domcontentloaded",timeout:40000}); await p.waitForTimeout(6000);
 const c=await p.evaluate(()=>[...document.querySelectorAll('svg,img')].map((e,i)=>{const r=e.getBoundingClientRect();return {i,t:e.tagName.toLowerCase(),w:Math.round(r.width),h:Math.round(r.height),x:Math.round(r.left),y:Math.round(r.top),src:(e.currentSrc||'').slice(0,100),a:e.closest('a')?.getAttribute('href')||''}}).filter(o=>o.y<160&&o.w>=24).slice(0,6)); console.log(s,JSON.stringify(c)); await p.close(); }
await b.close();
