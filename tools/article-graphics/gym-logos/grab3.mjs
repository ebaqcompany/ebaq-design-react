// Grabs a logo from a container selector: inline <svg> (resolving <use>), <img> (fetched in-page, data: URLs ok) or CSS background-image.
import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const jobs={
 "anytime-fitness":["https://www.anytimefitness.com/","img.logo-af"],
 "holmes-place":["https://www.holmesplace.com/",".c-header__logo"],
 "chuze-fitness":["https://chuzefitness.com/","img.logo"],
 "ufc-gym":["https://www.ufcgym.com/","img[alt=ufc-gym-logo]"],
};
const only=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",viewport:{width:1440,height:900},locale:"en-US"});
for(const [s,[u,sel]] of Object.entries(jobs)){ if(only.length&&!only.includes(s)) continue;
 const p=await ctx.newPage(); try{ await p.goto(u,{waitUntil:"domcontentloaded",timeout:45000}); await p.waitForTimeout(7000);
 const r=await p.evaluate(async(sel)=>{
  const root=document.querySelector(sel); if(!root) return {err:'nosel'};
  const toB64=async(url)=>{const res=await fetch(url);const ct=res.headers.get('content-type')||'';const buf=new Uint8Array(await res.arrayBuffer());let s='';for(const x of buf)s+=String.fromCharCode(x);return {ct,b64:btoa(s)}};
  const svg=root.tagName.toLowerCase()==='svg'?root:root.querySelector('svg');
  if(svg){ const c=svg.cloneNode(true); for(const u of c.querySelectorAll('use')){const h=(u.getAttribute('href')||u.getAttribute('xlink:href')||'');const [f,id]=h.split('#');let sym=null; if(!f) sym=document.getElementById(id); else {const t=await (await fetch(f)).text(); sym=new DOMParser().parseFromString(t,'image/svg+xml').getElementById(id);} if(sym){const g=document.createElementNS('http://www.w3.org/2000/svg','g'); g.innerHTML=sym.innerHTML; if(sym.getAttribute('viewBox')&&!c.getAttribute('viewBox')) c.setAttribute('viewBox',sym.getAttribute('viewBox')); u.replaceWith(g);} }
    const all=[svg,...svg.querySelectorAll('*')],dst=[c,...c.querySelectorAll('*')]; all.forEach((n,i)=>{const cs=getComputedStyle(n);const d=dst[i]; if(d&&d.setAttribute&&n.tagName!=='svg'){if(cs.fill&&cs.fill!=='none')d.setAttribute('fill',cs.fill);}});
    const bb=svg.getBoundingClientRect(); if(!c.getAttribute('viewBox')) c.setAttribute('viewBox',`0 0 ${bb.width} ${bb.height}`); c.setAttribute('xmlns','http://www.w3.org/2000/svg'); return {kind:'svg',t:c.outerHTML}; }
  const img=root.tagName==='IMG'?root:root.querySelector('img'); if(img) return {kind:'img',...await toB64(img.currentSrc||img.src),src:(img.currentSrc||img.src).slice(0,100)};
  for(const e of [root,...root.querySelectorAll('*')]){const bg=getComputedStyle(e).backgroundImage; const m=bg&&bg.match(/url\("?(.*?)"?\)/); if(m) return {kind:'img',...await toB64(m[1]),src:m[1].slice(0,100)}; const mk=getComputedStyle(e).maskImage||getComputedStyle(e).webkitMaskImage; const m2=mk&&mk.match(/url\("?(.*?)"?\)/); if(m2) return {kind:'img',...await toB64(m2[1]),src:'mask '+m2[1].slice(0,100)};}
  return {err:'nothing'}; },sel);
 if(r.err){console.log(s,r.err);} else if(r.kind==='svg'){writeFileSync(`logos/${s}.svg`,r.t);console.log(s,'svg',r.t.length);} else {const ext=r.ct.includes('svg')?'svg':r.ct.includes('png')?'png':r.ct.includes('webp')?'webp':'bin'; writeFileSync(`logos/${s}.${ext}`,Buffer.from(r.b64,'base64')); console.log(s,'img',ext,r.src);}
 }catch(e){console.log(s,'ERR',e.message.slice(0,90))} await p.close(); }
await b.close();
