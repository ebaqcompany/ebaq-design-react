import { chromium } from "playwright";
const sites={"johns-hopkins-medicine":"https://www.hopkinsmedicine.org/","gsk":"https://www.gsk.com/en-gb/","blue-cross-blue-shield":"https://www.bcbs.com/","nyu-langone-health":"https://nyulangone.org/","novo-nordisk":"https://www.novonordisk.com/","zocdoc":"https://www.zocdoc.com/"};
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900}});
for(const [s,u] of Object.entries(sites)){ const p=await ctx.newPage();
 try{ await p.goto(u,{waitUntil:"domcontentloaded",timeout:30000}); await p.waitForTimeout(4000);
  const c=await p.evaluate(()=>[...document.querySelectorAll('svg,img')].map(e=>{const r=e.getBoundingClientRect();return {t:e.tagName,w:Math.round(r.width),h:Math.round(r.height),y:Math.round(r.top),x:Math.round(r.left),a:(e.getAttribute('aria-label')||e.getAttribute('alt')||e.closest('a')?.getAttribute('aria-label')||e.closest('a')?.getAttribute('href')||'').slice(0,40),src:(e.currentSrc||'').slice(0,110)}}).filter(o=>o.y<200&&o.w>=40&&o.h>=12).slice(0,6));
  console.log(s,JSON.stringify(c)); }catch(e){console.log(s,'ERR',e.message.slice(0,60))} await p.close(); }
await b.close();
