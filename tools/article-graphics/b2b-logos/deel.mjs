import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const p=await (await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900}})).newPage();
await p.goto("https://www.deel.com/",{waitUntil:"domcontentloaded",timeout:40000}); await p.waitForTimeout(5000);
const r=await p.evaluate(async()=>{const i=document.querySelector('header a[href="/"] img');const res=await fetch(i.currentSrc||i.src);const ct=res.headers.get('content-type');const buf=new Uint8Array(await res.arrayBuffer());let s='';for(const x of buf)s+=String.fromCharCode(x);return {ct,b64:btoa(s),src:i.src.slice(0,200)}});
console.log(r.ct,r.src); const ext=r.ct.includes('svg')?'svg':r.ct.includes('png')?'png':r.ct.includes('webp')?'webp':'bin'; writeFileSync('logos/deel.'+ext,Buffer.from(r.b64,'base64')); await b.close();
