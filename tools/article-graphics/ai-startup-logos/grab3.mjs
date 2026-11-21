import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:6});
async function inpage(u,src,out){const p=await ctx.newPage();await p.goto(u,{waitUntil:"domcontentloaded",timeout:35000});await p.waitForTimeout(5000);
 const r=await p.evaluate(async(src)=>{const res=await fetch(src);const ct=res.headers.get('content-type')||'';const buf=new Uint8Array(await res.arrayBuffer());let s='';for(const x of buf)s+=String.fromCharCode(x);return {ct,b64:btoa(s)}},src); writeFileSync(out,Buffer.from(r.b64,'base64')); console.log(out,r.ct); await p.close();}
async function shot(u,sel,out){const p=await ctx.newPage();await p.goto(u,{waitUntil:"domcontentloaded",timeout:35000});await p.waitForTimeout(6000);
 const el=p.locator(sel).first(); console.log(out, await el.evaluate(e=>{const r=e.getBoundingClientRect();return [r.width,r.height,getComputedStyle(document.body).backgroundColor, e.outerHTML.slice(0,200)]}));
 await el.screenshot({path:out,omitBackground:true}); await p.close();}
try{await inpage("https://about.ideogram.ai/","https://ideogram.ai/_astro/new-logo.wmOvXw7A.svg","logos/ideogram.svg");}catch(e){console.log('ideo',e.message.slice(0,80))}
try{await inpage("https://www.hippocraticai.com/","https://hippocraticai.com/wp-content/uploads/2025/09/logo-5.png","logos/hippocratic-ai.png");}catch(e){console.log('hip',e.message.slice(0,80))}
try{await shot("https://fireworks.ai/",'a[aria-label*="Fireworks" i]',"logos/_fireworks-ai.png");}catch(e){console.log('fw',e.message.slice(0,80))}
try{await shot("https://www.harvey.ai/",'header a[href="/"], nav a[href="/"], a[href="/"]',"logos/_harvey.png");}catch(e){console.log('hv',e.message.slice(0,80))}
await b.close();
