import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36", viewport:{width:1440,height:900} });
const ser = `(e)=>{const c=e.cloneNode(true);[e,...e.querySelectorAll('*')].forEach((n,i)=>{const d=[c,...c.querySelectorAll('*')][i];const cs=getComputedStyle(n);if(n.tagName.toLowerCase()!=='svg'){if(cs.fill&&cs.fill!=='none')d.setAttribute('fill',cs.fill);if(cs.stroke&&cs.stroke!=='none')d.setAttribute('stroke',cs.stroke);}});const r=e.getBoundingClientRect();if(!c.getAttribute('viewBox'))c.setAttribute('viewBox','0 0 '+r.width+' '+r.height);c.setAttribute('xmlns','http://www.w3.org/2000/svg');return c.outerHTML}`;
for (const [k,u] of [["figure","https://www.figure.ai/"],["humanoid","https://thehumanoid.ai/"]]) {
  const p = await ctx.newPage(); await p.goto(u,{waitUntil:"commit",timeout:45000}); await p.waitForTimeout(8000);
  await p.evaluate(()=>window.scrollTo(0,document.body.scrollHeight)); await p.waitForTimeout(3000);
  const list = await p.evaluate(()=>[...document.querySelectorAll('svg')].map((e,i)=>{const r=e.getBoundingClientRect();return {i,w:Math.round(r.width),h:Math.round(r.height),cls:(e.getAttribute('class')||'').slice(0,40),label:(e.closest('a,footer')?.tagName||'')}}).filter(x=>x.w>=100&&x.h>=15&&x.w/x.h>2.5));
  console.log(k, JSON.stringify(list).slice(0,600));
  for (const x of list.slice(0,3)) writeFileSync(`logos/_cand-${k}-${x.i}.svg`, await p.evaluate(`(${ser})(document.querySelectorAll('svg')[${x.i}])`));
  await p.close();
}
const p = await ctx.newPage(); await p.goto("https://www.unitree.com/",{waitUntil:"commit",timeout:45000}); await p.waitForTimeout(8000);
console.log('unitree bg', await p.evaluate(()=>{const a=document.querySelector('a.logo');return a?getComputedStyle(a).backgroundImage+' | '+getComputedStyle(a,'::before').backgroundImage+' | '+getComputedStyle(a,'::after').content:null}));
await b.close();
