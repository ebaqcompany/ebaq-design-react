import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:6});
let p=await ctx.newPage(); await p.goto("https://mammoth.bio/",{waitUntil:"load",timeout:60000}); await p.waitForTimeout(3000);
const s=await p.evaluate(()=>{const v=document.querySelector('svg.svg-logo, svg[class*=logo]');const u=v.querySelector('use');const ref=document.querySelector(u.getAttribute('xlink:href')||u.getAttribute('href'));const vb=ref.getAttribute('viewBox')||v.getAttribute('viewBox');return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><g fill="#0e0e0e">${ref.innerHTML}</g></svg>`});
writeFileSync('logos/mammoth-biosciences.svg',s); console.log('mammoth',s.length); await p.close();
p=await ctx.newPage(); await p.goto("https://www.q.bio/",{waitUntil:"load",timeout:60000}); await p.waitForTimeout(3000);
const html=await p.evaluate(()=>{const a=document.querySelector('a.q-brand');const cs=getComputedStyle(a);const t=[...a.querySelectorAll('*')].map(n=>[n.tagName,getComputedStyle(n).fontFamily,getComputedStyle(n).fontSize,getComputedStyle(n).fontWeight,n.childNodes.length&&n.childNodes[0].nodeType===3?n.textContent.trim():''].join('|'));return {html:a.outerHTML,t}});
console.log(JSON.stringify(html).slice(0,1500)); await b.close();
