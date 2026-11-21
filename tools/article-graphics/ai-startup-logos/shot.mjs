import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const jobs={"thinking-machines-lab":["https://thinkingmachines.ai/",'header a, nav a, a'],"cognition":["https://cognition.ai/",'a[href="/"]'],"krea":["https://www.krea.ai/about",'a[href="/"]'],"higgsfield":["https://higgsfield.ai/",'a[href="/"]'],"legora":["https://legora.com/",'a[href="./"]']};
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:6});
for(const [s,[u,sel]] of Object.entries(jobs)){ const p=await ctx.newPage();
 try{ await p.goto(u,{waitUntil:"domcontentloaded",timeout:35000}); await p.waitForTimeout(6000);
  const idx=await p.evaluate((sel)=>{const els=[...document.querySelectorAll(sel)];const i=els.findIndex(e=>{const r=e.getBoundingClientRect();return r.top<200&&r.width>=16&&(e.querySelector('svg,img')||/thinking/i.test(e.innerText))});const e=els[i];if(!e)return -1;const r=e.getBoundingClientRect();window.__bg=getComputedStyle(document.body).backgroundColor;return {i,w:r.width,h:r.height,txt:e.innerText.slice(0,40),bg:getComputedStyle(document.body).backgroundColor,col:getComputedStyle(e).color}},sel);
  console.log(s,JSON.stringify(idx)); if(idx===-1) continue;
  const el=p.locator(sel).nth(idx.i); await el.screenshot({path:`logos/_${s}.png`});
  const svg=await el.evaluate(e=>{const v=e.querySelector('svg');if(!v)return null;const bb=v.getBoundingClientRect();const c=v.cloneNode(true);[v,...v.querySelectorAll('*')].forEach((n,j)=>{const d=[c,...c.querySelectorAll('*')][j];const cs=getComputedStyle(n);if(n.tagName!=='svg'){if(cs.fill&&cs.fill!=='none')d.setAttribute('fill',cs.fill);if(cs.stroke&&cs.stroke!=='none')d.setAttribute('stroke',cs.stroke);}});if(!c.getAttribute('viewBox'))c.setAttribute('viewBox',`0 0 ${bb.width} ${bb.height}`);c.setAttribute('xmlns','http://www.w3.org/2000/svg');return c.outerHTML});
  if(svg) writeFileSync(`logos/_${s}.svg`,svg);
 }catch(e){console.log(s,'ERR',e.message.slice(0,80))} await p.close(); }
await b.close();
