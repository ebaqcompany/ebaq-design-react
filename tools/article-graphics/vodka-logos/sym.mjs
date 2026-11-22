// Resolves <use href="#id"> logos into standalone SVGs, and lists header svgs on a page.
import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('https://www.nikka.com/eng/',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(5000);
const s=await p.evaluate(()=>{const sy=document.querySelector('#logo_emblem'); if(!sy) return null; const vb=sy.getAttribute('viewBox')||'0 0 150 111.5'; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><g fill="#0e0e0e">${sy.innerHTML}</g></svg>`;});
if(s){writeFileSync('logos/nikka.svg',s);console.log('nikka ok',s.length)} else console.log('nikka none');
await p.goto('https://balconesdistilling.com/',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(5000);
const l=await p.evaluate(()=>[...document.querySelectorAll('header svg, header img, a[href="/"] svg, a[href="/"] img')].map((e,i)=>{const r=e.getBoundingClientRect();return `${i} ${e.tagName} ${Math.round(r.width)}x${Math.round(r.height)} @${Math.round(r.top)} ${e.getAttribute('aria-label')||e.getAttribute('alt')||''} ${(e.src||'').slice(0,90)} ${e.querySelectorAll?e.querySelectorAll('path').length:''}`}));
console.log(l.join('\n')); await b.close();
