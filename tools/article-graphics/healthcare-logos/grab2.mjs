import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const jobs={"johns-hopkins-medicine":["https://www.hopkinsmedicine.org/","hopkins"],"nyu-langone-health":["https://nyulangone.org/","langone"],"gsk":["https://www.gsk.com/en-us/","gsk"],"zocdoc":["https://www.zocdoc.com/","zocdoc"]};
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900}});
for(const [s,[u,kw]] of Object.entries(jobs)){ const p=await ctx.newPage();
 try{ await p.goto(u,{waitUntil:"domcontentloaded",timeout:30000}); await p.waitForTimeout(5000);
  const list=await p.evaluate((kw)=>[...document.querySelectorAll('svg,img')].map((e,i)=>{const r=e.getBoundingClientRect();const lab=[e.getAttribute('alt'),e.getAttribute('aria-label'),e.querySelector?.('title')?.textContent,e.closest('a')?.getAttribute('aria-label'),e.closest('a')?.getAttribute('title'),e.getAttribute('class'),e.closest('[class*=logo i]')?'LOGOCLS':''].join(' ').toLowerCase();
    return {i,t:e.tagName,w:Math.round(r.width),h:Math.round(r.height),y:Math.round(r.top+scrollY),lab:lab.slice(0,80),src:e.tagName==='IMG'?e.src:''}}).filter(o=>o.w>=40&&(o.lab.includes(kw)||o.lab.includes('logo')||o.src.toLowerCase().includes('logo'))),kw);
  console.log(s, JSON.stringify(list.map(o=>({...o,src:o.src.slice(0,90)})).slice(0,8)));
  const pick=list.find(o=>o.t==='IMG'&&!o.src.includes('white'))||list.find(o=>o.t.toLowerCase()==='svg')||list[0];
  if(!pick) {console.log(s,'NONE'); continue;}
  if(pick.t==='IMG'){
    if(pick.src.startsWith('data:')){ const full=await p.evaluate(i=>document.querySelectorAll('svg,img')[i].src,pick.i); const m=full.match(/^data:([^;,]+)(;base64)?,(.*)$/); writeFileSync(`logos/${s}.svg`, m[2]?Buffer.from(m[3],'base64'):decodeURIComponent(m[3])); console.log(s,'-> data svg'); }
    else { const res=await ctx.request.get(pick.src,{headers:{referer:u}}); const ct=res.headers()['content-type']||''; writeFileSync(`logos/${s}.${ct.includes('svg')?'svg':ct.includes('png')?'png':'bin'}`, await res.body()); console.log(s,'->',ct,pick.src.slice(0,90)); }
  } else { const txt=await p.evaluate(i=>{const e=document.querySelectorAll('svg,img')[i];const bb=e.getBoundingClientRect();const c=e.cloneNode(true);[e,...e.querySelectorAll('*')].forEach((n,j)=>{const d=[c,...c.querySelectorAll('*')][j];const cs=getComputedStyle(n);if(n.tagName!=='svg'&&cs.fill&&cs.fill!=='none')d.setAttribute('fill',cs.fill)});if(!c.getAttribute('viewBox'))c.setAttribute('viewBox',`0 0 ${bb.width} ${bb.height}`);c.setAttribute('xmlns','http://www.w3.org/2000/svg');return c.outerHTML},pick.i); writeFileSync(`logos/${s}.svg`,txt); console.log(s,'-> inline svg'); }
 }catch(e){console.log(s,'ERR',e.message.slice(0,80))} await p.close(); }
await b.close();
