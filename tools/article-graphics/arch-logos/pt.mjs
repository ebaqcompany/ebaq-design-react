import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900}});
const p=await ctx.newPage(); await p.goto("https://www.p-t-group.com/",{waitUntil:"load",timeout:60000});
await p.waitForSelector('img.header-logo__logo',{timeout:30000});
const r=await p.evaluate(async()=>{const e=document.querySelector('img.header-logo__logo');const res=await fetch(e.currentSrc||e.src);const ct=res.headers.get('content-type')||'';const buf=new Uint8Array(await res.arrayBuffer());let t='';for(const x of buf)t+=String.fromCharCode(x);return {ct,b64:btoa(t),src:e.currentSrc}});
const ext=r.ct.includes('svg')?'svg':r.ct.includes('png')?'png':'jpg'; writeFileSync(`logos/p-and-t-group.${ext}`,Buffer.from(r.b64,'base64')); console.log(ext,r.src); await b.close();
