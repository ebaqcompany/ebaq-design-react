// Screenshots each studio's pricing/offer section at 1440x900 (scrolls the matching text into view).
import { chromium } from "playwright";
const S=[
 ["designownow","https://www.designownow.com/","requests at a time"],
 ["awesomic","https://www.awesomic.com/pricing","$1,799"],
 ["makeover-studio","https://makeover.studio/","$6,000 per month"],
 ["paisana-house","https://house.paisana.studio/","2.350"],
 ["eoo-studio","https://contra.com/s/OZRYNsv2-design-subscription","STARTING AT"],
 ["kargul","https://kargul.studio/","trial week"],
 ["gr8r-studio","https://gr8rstudio.com/","Monthly retainers start at"],
 ["glyn","https://www.glyn.studio/","$10,000"],
 ["baked","https://www.baked.design/",null],
 ["halaska","https://halaska.com/",null],
];
const only=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"}); const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36"});
for(const [slug,url,txt] of S){ if(only.length&&!only.includes(slug)) continue; const p=await ctx.newPage();
  try{ await p.goto(url,{waitUntil:"domcontentloaded",timeout:45000}); await p.waitForTimeout(5000);
    for(const t of [/accept/i,/agree/i,/got it/i,/allow all/i]){const el=p.getByRole('button',{name:t}).first(); if(await el.count()){await el.click({timeout:1500}).catch(()=>{}); await p.waitForTimeout(800);}}
    if(txt){ const ok=await p.evaluate((txt)=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT); let n; while(n=w.nextNode()){ if(n.textContent.includes(txt)){ const el=n.parentElement; el.scrollIntoView({block:"center"}); return true;} } return false;},txt); if(!ok) console.log('text not found',slug); await p.waitForTimeout(2500); }
    await p.screenshot({path:`tools/article-graphics/design-subscriptions/shots/${slug}.png`}); console.log('ok',slug);
  }catch(e){console.log('ERR',slug,e.message.slice(0,80))} await p.close(); }
await b.close();
