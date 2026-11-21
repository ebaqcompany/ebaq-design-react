import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const jobs={
 "hok":["https://www.hok.com/","shot",".interactive-nav-header .logo"],
 "heatherwick-studio":["https://heatherwick.com/","svg","svg"],
 "p-and-t-group":["https://www.p-t-group.com/","img","img.header-logo__logo"],
 "perkins-and-will":["https://perkinswill.com/","text",".logo-nav-container a","#000"],
 "herzog-and-de-meuron":["https://www.herzogdemeuron.com/","text",".hdm-logo"],
 "studio-gang":["https://studiogang.com/","textmatch","Studio Gang"],
 "diller-scofidio-renfro":["https://dsrny.com/","text","a._2jKwz"],
};
const only=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",viewport:{width:1440,height:900},deviceScaleFactor:4});
for(const [s,[u,mode,sel,col]] of Object.entries(jobs)){ if(only.length&&!only.includes(s)) continue; const p=await ctx.newPage();
 try{ await p.goto(u,{waitUntil:"domcontentloaded",timeout:35000}); await p.waitForTimeout(7000);
  if(mode==='shot'){ await p.locator(sel).first().screenshot({path:`logos/${s}.png`}); console.log(s,'shot'); }
  else if(mode==='img'){ const r=await p.evaluate(async(sel)=>{const e=document.querySelector(sel);const res=await fetch(e.currentSrc||e.src);const ct=res.headers.get('content-type')||'';const buf=new Uint8Array(await res.arrayBuffer());let t='';for(const x of buf)t+=String.fromCharCode(x);return {ct,b64:btoa(t),src:e.currentSrc}},sel);
    const ext=r.ct.includes('svg')?'svg':r.ct.includes('png')?'png':r.ct.includes('webp')?'webp':'jpg'; writeFileSync(`logos/${s}.${ext}`,Buffer.from(r.b64,'base64')); console.log(s,'img',ext,r.src); }
  else if(mode==='svg'){ const txt=await p.evaluate(()=>{const e=[...document.querySelectorAll('svg')].find(x=>x.getBoundingClientRect().width>300);const bb=e.getBoundingClientRect();const c=e.cloneNode(true);[e,...e.querySelectorAll('*')].forEach((n,j)=>{const d=[c,...c.querySelectorAll('*')][j];const cs=getComputedStyle(n);if(n.tagName!=='svg'){if(cs.fill&&cs.fill!=='none')d.setAttribute('fill',cs.fill);if(cs.stroke&&cs.stroke!=='none')d.setAttribute('stroke',cs.stroke);}});if(!c.getAttribute('viewBox'))c.setAttribute('viewBox',`0 0 ${bb.width} ${bb.height}`);c.setAttribute('xmlns','http://www.w3.org/2000/svg');return c.outerHTML}); writeFileSync(`logos/${s}.svg`,txt); console.log(s,'svg'); }
  else { await p.evaluate(([mode,sel,col])=>{let e=mode==='textmatch'?[...document.querySelectorAll('a,div,span,h1')].find(x=>x.innerText?.trim()===sel&&x.getBoundingClientRect().width>0):[...document.querySelectorAll(sel)].find(x=>x.getBoundingClientRect().width>0);
    const cs=getComputedStyle(e); const o=document.createElement('div'); o.id='__ov';
    o.style.cssText='position:fixed;left:0;top:0;z-index:2147483647;background:#fff;padding:30px;display:inline-block;white-space:nowrap';
    const t=document.createElement('span'); t.textContent=e.innerText.replace(/\s*\n\s*/g,' ').replace(/I\+I/,' + ').replace(/I/g,' ').replace(/ +/g,' ').trim();
    if(sel==='a._2jKwz') t.textContent='DILLER SCOFIDIO + RENFRO';
    t.style.cssText=`font-family:${cs.fontFamily};font-weight:${cs.fontWeight};font-style:${cs.fontStyle};letter-spacing:${parseFloat(cs.letterSpacing||0)*3||0}px;font-size:${parseFloat(cs.fontSize)*3}px;color:${col||cs.color};line-height:1.2;text-transform:${cs.textTransform}`;
    o.appendChild(t); document.body.appendChild(o);},[mode,sel,col]);
    await p.waitForTimeout(500); await p.locator('#__ov').screenshot({path:`logos/${s}.png`}); console.log(s,'text'); }
 }catch(e){console.log(s,'ERR',e.message.slice(0,90))} await p.close(); }
await b.close();
