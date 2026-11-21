import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:6});
let p;

p=await ctx.newPage(); await p.goto("https://www.jobyaviation.com/",{waitUntil:"domcontentloaded"}); await p.waitForTimeout(5000);
// wrap both header svgs (mark + wordmark) into one combined svg using their positions
const svg=await p.evaluate(()=>{const vs=[...document.querySelectorAll('a[href="/"] svg')].filter(v=>{const r=v.getBoundingClientRect();return r.top<80&&r.left>600&&r.left<800});const x0=Math.min(...vs.map(v=>v.getBoundingClientRect().left)),y0=Math.min(...vs.map(v=>v.getBoundingClientRect().top));const x1=Math.max(...vs.map(v=>v.getBoundingClientRect().right)),y1=Math.max(...vs.map(v=>v.getBoundingClientRect().bottom));
 const parts=vs.map(v=>{const r=v.getBoundingClientRect();const c=v.cloneNode(true);[v,...v.querySelectorAll('*')].forEach((n,j)=>{const d=[c,...c.querySelectorAll('*')][j];const cs=getComputedStyle(n);if(n.tagName!=='svg'){if(cs.fill&&cs.fill!=='none')d.setAttribute('fill',cs.fill);if(cs.stroke&&cs.stroke!=='none')d.setAttribute('stroke',cs.stroke);}});c.setAttribute('x',r.left-x0);c.setAttribute('y',r.top-y0);c.setAttribute('width',r.width);c.setAttribute('height',r.height);return c.outerHTML});
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${x1-x0} ${y1-y0}" width="${x1-x0}" height="${y1-y0}">${parts.join('')}</svg>`});
writeFileSync('logos/joby-aviation.svg',svg); console.log(svg.slice(0,200)); await b.close();
