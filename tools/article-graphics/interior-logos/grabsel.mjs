// Saves the first element matching a CSS selector (inline svg with computed fills, or an <img> fetched in-page) as logos/<slug>.
import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const [u,slug,sel]=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({viewport:{width:1440,height:900},userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0 Safari/537.36"});
await p.goto(u,{waitUntil:"domcontentloaded",timeout:45000}); await p.waitForTimeout(6000);
const r=await p.evaluate(async(sel)=>{const el=document.querySelector(sel); if(!el) return null;
 if(el.tagName.toLowerCase()==='svg'){const c=el.cloneNode(true); const s=[el,...el.querySelectorAll('*')],d=[c,...c.querySelectorAll('*')]; s.forEach((n,i)=>{const cs=getComputedStyle(n); if(n.tagName!=='svg'&&cs.fill&&cs.fill!=='none') d[i].setAttribute('fill',cs.fill);}); const bb=el.getBoundingClientRect(); if(!c.getAttribute('viewBox')) c.setAttribute('viewBox',`0 0 ${bb.width} ${bb.height}`); c.setAttribute('xmlns','http://www.w3.org/2000/svg'); return {svg:c.outerHTML};}
 const src=el.currentSrc||el.src; const res=await fetch(src); const buf=new Uint8Array(await res.arrayBuffer()); let s=''; for(const x of buf) s+=String.fromCharCode(x); return {b64:btoa(s),ct:res.headers.get('content-type')||''};},sel);
if(!r) console.log('none',slug); else if(r.svg){writeFileSync(`logos/${slug}.svg`,r.svg);console.log('svg',slug);} else {const ext=r.ct.includes('svg')?'svg':r.ct.includes('webp')?'webp':r.ct.includes('jpeg')?'jpg':'png'; writeFileSync(`logos/${slug}.${ext}`,Buffer.from(r.b64,'base64')); console.log(ext,slug);}
await b.close();
