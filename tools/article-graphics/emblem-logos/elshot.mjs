// Screenshots one element at 4x on a white page (for icon-font or CSS logos). Usage: node elshot.mjs <url> <selector> <slug>
import { chromium } from "playwright";
const [u,sel,slug]=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:4});
await p.goto(u,{waitUntil:"domcontentloaded",timeout:45000}); await p.waitForTimeout(7000);
await p.evaluate((sel)=>{const keep=new Set(); let k=document.querySelector(sel); while(k){keep.add(k); k=k.parentElement;} for(const e of document.querySelectorAll('body *')){ if(keep.has(e)) continue; const cs=getComputedStyle(e); if((cs.position==='fixed'||cs.position==='sticky')&&!e.contains(document.querySelector(sel))) e.style.display='none'; } document.documentElement.style.filter='none'; document.body.style.filter='none';},sel);
await p.evaluate((sel)=>{const el=document.querySelector(sel); let n=el; while(n){ if(n.style) n.style.background='#fff'; n=n.parentElement; }},sel);
await p.locator(sel).first().screenshot({path:`logos/${slug}.png`}); console.log('ok',slug); await b.close();
