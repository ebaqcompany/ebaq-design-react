// Opens a brand site, passes a typical age gate, and lists logo candidates (svg size / img natural size + src).
import { chromium } from "playwright";
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",viewport:{width:1440,height:900},locale:"en-US"});
for(const u of process.argv.slice(2)){ const p=await ctx.newPage();
 try{ await p.goto(u,{waitUntil:"domcontentloaded",timeout:40000}); await p.waitForTimeout(4000);
  for(const t of [/^yes/i,/i am (over|21|18|of legal)/i,/^enter/i,/^(i'?m|i am) 21/i,/legal drinking age/i,/^accept/i,/^continue/i,/^confirm/i]){ const el=p.getByRole('button',{name:t}).first(); if(await el.count()) { await el.click({timeout:2000}).catch(()=>{}); await p.waitForTimeout(1500);} }
  for(const t of [/^yes$/i,/^enter$/i]){ const el=p.getByText(t).first(); if(await el.count()) { await el.click({timeout:2000}).catch(()=>{}); await p.waitForTimeout(1500);} }
  await p.waitForTimeout(2500);
  const c=await p.evaluate(()=>{const o=[]; const lg=e=>/logo|brand|wordmark/i.test((e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className)+' '+(e.getAttribute('alt')||'')+' '+(e.getAttribute('src')||'')+' '+(e.getAttribute('aria-label')||'')+' '+(e.closest('a,header,[class*=logo i]')?.className||''));
   document.querySelectorAll('img,svg').forEach(e=>{const r=e.getBoundingClientRect(); if(r.width<25||r.top>400&&!lg(e)) return; if(!lg(e)&&!e.closest('header')) return;
     o.push(e.tagName==='IMG'?`IMG ${e.naturalWidth}x${e.naturalHeight} @${Math.round(r.width)}x${Math.round(r.height)} ${(e.currentSrc||e.src).slice(0,160)}`:`SVG ${Math.round(r.width)}x${Math.round(r.height)} paths=${e.querySelectorAll('path,polygon,use').length} cls=${String(e.className.baseVal||'').slice(0,40)} parent=${String(e.parentElement.className||'').slice(0,40)}`);}); return o.slice(0,8);});
  console.log('##',u); c.forEach(x=>console.log('  ',x)); }catch(e){console.log('##',u,'ERR',e.message.slice(0,70))} await p.close(); }
await b.close();
