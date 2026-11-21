import { chromium } from "playwright";
const sites={"hok":["https://www.hok.com/",150,95],"heatherwick-studio":["https://heatherwick.com/",700,40],"snarkitecture":["https://www.snarkitecture.com/",720,450]};
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900}});
for(const [s,[u,x,y]] of Object.entries(sites)){ const p=await ctx.newPage();
 try{ await p.goto(u,{waitUntil:"domcontentloaded",timeout:35000}); await p.waitForTimeout(7000);
  const c=await p.evaluate(([x,y])=>{const e=document.elementsFromPoint(x,y).slice(0,4);return e.map(n=>n.tagName+' '+(n.getAttribute('class')||'')+' bg='+getComputedStyle(n).backgroundImage.slice(0,100)+' :: '+n.outerHTML.slice(0,300))},[x,y]);
  const svgs=await p.evaluate(()=>[...document.querySelectorAll('svg,img')].map(e=>{const r=e.getBoundingClientRect();return e.tagName+' '+Math.round(r.left)+','+Math.round(r.top)+' '+Math.round(r.width)+'x'+Math.round(r.height)+' '+(e.getAttribute('class')||'')+' '+(e.currentSrc||'').slice(0,90)}).slice(0,10));
  console.log(s,JSON.stringify(c,null,1),svgs); }catch(e){console.log(s,'ERR',e.message.slice(0,60))} await p.close(); }
await b.close();
