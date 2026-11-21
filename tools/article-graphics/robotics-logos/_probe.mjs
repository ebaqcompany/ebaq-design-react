import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36", viewport:{width:1440,height:900} });
for (const [k,u] of [["figure","https://www.figure.ai/"],["unitree","https://www.unitree.com/"],["humanoid","https://thehumanoid.ai/"],["deep-robotics","https://www.deeprobotics.cn/en/"]]) {
  const p = await ctx.newPage();
  try { await p.goto(u,{waitUntil:"commit",timeout:45000}); await p.waitForTimeout(9000);
    const r = await p.evaluate(()=>{const els=[...document.querySelectorAll('svg,img')].filter(e=>{const r=e.getBoundingClientRect();return r.top>=-5&&r.top<200&&r.width>=40&&r.width<500&&r.height>=8&&r.left<600});
      return els.slice(0,4).map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,src:e.currentSrc||e.src||'',w:Math.round(r.width),h:Math.round(r.height),x:Math.round(r.left),y:Math.round(r.top)}})});
    console.log(k,p.url(),JSON.stringify(r));
    const html = await p.evaluate(()=>{const e=[...document.querySelectorAll('svg')].find(e=>{const r=e.getBoundingClientRect();return r.top>=-5&&r.top<200&&r.width>=40&&r.width<500&&r.left<600});if(!e)return null;const c=e.cloneNode(true);[e,...e.querySelectorAll('*')].forEach((n,i)=>{const d=[c,...c.querySelectorAll('*')][i];const cs=getComputedStyle(n);if(n.tagName.toLowerCase()!=='svg'){if(cs.fill&&cs.fill!=='none')d.setAttribute('fill',cs.fill);if(cs.stroke&&cs.stroke!=='none')d.setAttribute('stroke',cs.stroke);}});const r=e.getBoundingClientRect();if(!c.getAttribute('viewBox'))c.setAttribute('viewBox','0 0 '+r.width+' '+r.height);c.setAttribute('xmlns','http://www.w3.org/2000/svg');return c.outerHTML});
    if (html) { writeFileSync(`logos/_probe-${k}.svg`, html); }
  } catch(e){ console.log(k,"ERR",e.message.slice(0,80)); }
  await p.close();
}
await b.close();
