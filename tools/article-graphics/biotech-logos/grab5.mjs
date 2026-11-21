import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:6});
async function inpage(u,src,out){const p=await ctx.newPage();await p.goto(u,{waitUntil:"domcontentloaded",timeout:40000});await p.waitForTimeout(4000);
 const r=await p.evaluate(async(src)=>{const res=await fetch(src);const ct=res.headers.get('content-type')||'';const buf=new Uint8Array(await res.arrayBuffer());let s='';for(const x of buf)s+=String.fromCharCode(x);return {ct,b64:btoa(s)}},src);
 const ext=r.ct.includes('svg')?'svg':r.ct.includes('png')?'png':r.ct.includes('webp')?'webp':'bin'; writeFileSync(out+'.'+ext,Buffer.from(r.b64,'base64')); console.log(out,r.ct); await p.close();}
try{await inpage("https://beamtx.com/","https://beamtx.com/wp-content/themes/Beam/img/logo.svg","logos/beam-therapeutics");}catch(e){console.log('beam',e.message.slice(0,80))}
try{const p=await ctx.newPage();await p.goto("https://www.chaidiscovery.com/",{waitUntil:"domcontentloaded"});await p.waitForTimeout(4000);
 const srcs=await p.evaluate(()=>[...document.querySelectorAll('a[href="./"] img')].map(i=>i.currentSrc||i.src)); console.log(srcs); await p.close();
 for(const [i,s] of srcs.entries()) await inpage("https://www.chaidiscovery.com/",s,`logos/_chai-${i}`);}catch(e){console.log('chai',e.message.slice(0,80))}
try{const p=await ctx.newPage();await p.goto("https://www.q.bio/",{waitUntil:"load",timeout:60000});await p.waitForTimeout(5000);
 const info=await p.evaluate(()=>{const a=[...document.querySelectorAll('a,div,span')].find(e=>e.innerText&&e.innerText.trim()==='QBio'&&e.getBoundingClientRect().top<120);if(!a)return null;a.setAttribute('data-q','1');const r=a.getBoundingClientRect();return [a.tagName,a.outerHTML.slice(0,300),r.width,r.height,getComputedStyle(a).color]}); console.log(JSON.stringify(info));
 if(info){await p.locator('[data-q]').first().screenshot({path:'logos/_qbio.png'});} await p.close();}catch(e){console.log('qbio',e.message.slice(0,80))}
await b.close();
