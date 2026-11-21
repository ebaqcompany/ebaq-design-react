import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900}});
for(const [s,u,src] of [["john-deere","https://www.deere.com/","https://cdn-ux.deere.com/brand-foundations/2.0.0/logos/jd-logo.svg"],["datadog","https://www.datadoghq.com/","https://imgix.datadoghq.com/img/dd_logo_n_70x75.png"]]){
 const p=await ctx.newPage(); await p.goto(u,{waitUntil:"domcontentloaded",timeout:40000}); await p.waitForTimeout(4000);
 const r=await p.evaluate(async(src)=>{const res=await fetch(src);const t=await res.text();return t.slice(0,300)},src).catch(e=>String(e)); console.log(s,r.slice(0,200));
 const svgs=await p.evaluate(()=>[...document.querySelectorAll('svg,img')].map(e=>{const r=e.getBoundingClientRect();return {t:e.tagName,w:Math.round(r.width),h:Math.round(r.height),y:Math.round(r.top),x:Math.round(r.left),src:(e.currentSrc||'').slice(0,100),lab:(e.getAttribute('alt')||e.getAttribute('aria-label')||'').slice(0,40)}}).filter(o=>o.y<120&&o.w>40)); console.log(JSON.stringify(svgs.slice(0,5)));
 await p.close();}
await b.close();
