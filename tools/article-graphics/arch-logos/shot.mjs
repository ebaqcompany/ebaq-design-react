import { chromium } from "playwright";
const sites={"hok":"https://www.hok.com/","perkins-and-will":"https://perkinswill.com/","herzog-and-de-meuron":"https://www.herzogdemeuron.com/","heatherwick-studio":"https://heatherwick.com/","p-and-t-group":"https://www.p-t-group.com/","studio-gang":"https://studiogang.com/","diller-scofidio-renfro":"https://dsrny.com/","morphosis":"https://www.morphosis.com/","neri-and-hu":"https://www.neriandhu.com/","snarkitecture":"https://www.snarkitecture.com/","studio-mumbai":"https://www.studiomumbai.com/"};
const only=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:2});
for(const [s,u] of Object.entries(sites)){ if(only.length&&!only.includes(s)) continue; const p=await ctx.newPage();
 try{ await p.goto(u,{waitUntil:"domcontentloaded",timeout:35000}); await p.waitForTimeout(7000);
  await p.screenshot({path:`shots/${s}.png`,clip:{x:0,y:0,width:1440,height:220}});
  const c=await p.evaluate(()=>[...document.querySelectorAll('header a, nav a, a[href="/"], [class*=logo i]')].slice(0,6).map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,cls:(e.className?.baseVal??e.className??'').toString().slice(0,40),txt:e.innerText?.slice(0,40),w:Math.round(r.width),h:Math.round(r.height),x:Math.round(r.left),y:Math.round(r.top),bg:getComputedStyle(e).backgroundImage.slice(0,90),font:getComputedStyle(e).fontFamily.slice(0,40)}}));
  console.log(s,JSON.stringify(c)); }catch(e){console.log(s,'ERR',e.message.slice(0,60))} await p.close(); }
await b.close();
