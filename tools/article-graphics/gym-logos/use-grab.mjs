// Resolves a header logo drawn with <svg><use href="#symbol"> (inline or external sprite) into a standalone black SVG,
// or fetches an <img> logo from inside the page (bypasses CDN hotlink blocks).
import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const jobs={messika:["https://www.messika.com/","use","messika-logo-2025"]};
const only=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",viewport:{width:1440,height:900},locale:"en-US"});
for(const [s,[u,kind,key]] of Object.entries(jobs)){ if(only.length&&!only.includes(s)) continue;
 const p=await ctx.newPage(); try{ await p.goto(u,{waitUntil:"domcontentloaded",timeout:40000}); await p.waitForTimeout(7000);
 if(kind==='img'){ const r=await p.evaluate(async(sel)=>{const e=document.querySelector(sel);const res=await fetch(e.currentSrc||e.src);return {ct:res.headers.get('content-type'),t:await res.text()}},key); writeFileSync(`logos/${s}.svg`,r.t); console.log(s,r.ct,r.t.length); }
 else { const svg=await p.evaluate(async(key)=>{
   const use=[...document.querySelectorAll('use')].find(x=>(x.getAttribute('href')||x.getAttribute('xlink:href')||'').includes(key.replace('#','')));
   const href=use.getAttribute('href')||use.getAttribute('xlink:href'); const [file,id]=href.split('#');
   let sym; if(!file) sym=document.getElementById(id); else { const t=await (await fetch(file)).text(); sym=new DOMParser().parseFromString(t,'image/svg+xml').getElementById(id); }
   const vb=sym.getAttribute('viewBox')||use.closest('svg').getAttribute('viewBox');
   return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="#0e0e0e">${sym.innerHTML}</svg>`; },key);
   writeFileSync(`logos/${s}.svg`,svg); console.log(s,'svg',svg.length); }
 }catch(e){console.log(s,'ERR',e.message.slice(0,100))} await p.close(); }
await b.close();
