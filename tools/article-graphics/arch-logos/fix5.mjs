import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:4});
async function open(u){const p=await ctx.newPage(); await p.goto(u,{waitUntil:"domcontentloaded",timeout:45000}); await p.waitForTimeout(7000); return p;}
// Stantec: in-page fetch of the logo img
try{ const p=await open("https://www.stantec.com/");
 const r=await p.evaluate(async()=>{const e=document.querySelector('img[alt*="logo" i]');const t=await (await fetch(e.currentSrc||e.src)).text();return t}); writeFileSync('logos/stantec.svg',r); console.log('stantec',r.slice(0,60)); await p.close(); }catch(e){console.log('stantec ERR',e.message.slice(0,80))}
// Hassell: inline referenced symbol
try{ const p=await open("https://www.hassellstudio.com/");
 const r=await p.evaluate(()=>{const s=document.querySelector('#Hassell-logo-text');const vb=s.getAttribute('viewBox')||'0 0 100 29';const c=s.cloneNode(true);c.querySelectorAll('*').forEach(n=>{});return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><g fill="#0e0e0e">${s.innerHTML}</g></svg>`}); writeFileSync('logos/hassell.svg',r); console.log('hassell',r.length); await p.close(); }catch(e){console.log('hassell ERR',e.message.slice(0,80))}
// SWA + GP+B: list header candidates
for (const [s,u] of [["swa-group","https://www.swagroup.com/"],["gustafson-porter-bowman","https://www.gp-b.com/"]]){ try{ const p=await open(u);
 const l=await p.evaluate(()=>[...document.querySelectorAll('img,svg')].map((e,i)=>{const r=e.getBoundingClientRect();return {i,t:e.tagName,x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height),cls:(e.getAttribute('class')||'').slice(0,40),src:(e.currentSrc||e.querySelector?.('use')?.getAttribute('href')||e.querySelector?.('use')?.getAttribute('xlink:href')||'').slice(0,90)}}).filter(o=>o.y<200&&o.w>15));
 console.log(s,JSON.stringify(l.slice(0,8))); await p.screenshot({path:`shots/${s}.png`,clip:{x:0,y:0,width:1440,height:200}}); await p.close(); }catch(e){console.log(s,'ERR',e.message.slice(0,80))} }
await b.close();
