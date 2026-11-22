// Saves the n-th header SVG (by index among header/nav svgs with >=k paths) or a data: img, with computed fills.
import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const [u,slug,minPaths]=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto(u,{waitUntil:"domcontentloaded"}); await p.waitForTimeout(5000);
for(const t of [/^yes/i,/21/,/^enter/i]){const el=p.getByRole('button',{name:t}).first(); if(await el.count()) await el.click({timeout:2000}).catch(()=>{});} await p.waitForTimeout(2500);
const r=await p.evaluate((mp)=>{ for(const el of document.querySelectorAll('svg')){ if(el.querySelectorAll('path,polygon').length<mp) continue; const c=el.cloneNode(true); const s=[el,...el.querySelectorAll('*')],d=[c,...c.querySelectorAll('*')]; s.forEach((n,i)=>{const cs=getComputedStyle(n); if(n.tagName!=='svg'){ if(cs.fill&&cs.fill!=='none') d[i].setAttribute('fill',cs.fill); }}); const bb=el.getBoundingClientRect(); if(!c.getAttribute('viewBox')) c.setAttribute('viewBox',`0 0 ${bb.width} ${bb.height}`); c.setAttribute('xmlns','http://www.w3.org/2000/svg'); return c.outerHTML;} 
 const im=[...document.querySelectorAll('img')].find(i=>i.src.startsWith('data:image/png')&&i.naturalWidth>200); return im?im.src:null; },Number(minPaths||20));
if(r?.startsWith('data:')) { writeFileSync(`logos-new/${slug}.png`,Buffer.from(r.split(',')[1],'base64')); console.log('png',slug);} else if(r){ writeFileSync(`logos-new/${slug}.svg`,r); console.log('svg',slug);} else console.log('none',slug);
await b.close();
