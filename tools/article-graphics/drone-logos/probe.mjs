import { chromium } from "playwright";
const sites={"yuneec":"https://www.yuneec.com/","joby-aviation":"https://www.jobyaviation.com/","helsing":"https://helsing.ai/","skydio":"https://www.skydio.com/"};
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900}});
for(const [s,u] of Object.entries(sites)){ const p=await ctx.newPage();
 try{ await p.goto(u,{waitUntil:"domcontentloaded",timeout:35000}); await p.waitForTimeout(6000);
  const c=await p.evaluate(()=>({title:document.title, els:[...document.querySelectorAll('svg,img,canvas')].map((e,i)=>{const r=e.getBoundingClientRect();return {i,t:e.tagName.toLowerCase(),w:Math.round(r.width),h:Math.round(r.height),x:Math.round(r.left),y:Math.round(r.top),src:(e.currentSrc||'').slice(0,80),a:(e.closest('a')?.getAttribute('href')||'')}}).filter(o=>o.y<160&&o.w>=10).slice(0,8), txt:(document.querySelector('header, nav')?.innerText||'').slice(0,80)}));
  console.log(s,JSON.stringify(c)); }catch(e){console.log(s,'ERR',e.message.slice(0,60))} await p.close(); }
await b.close();
