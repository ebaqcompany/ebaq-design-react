// Captures the above-the-fold homepage of each site at 1440x900 (cookie banners dismissed where possible).
import { chromium } from "playwright";
const sites=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"});
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",locale:"en-US"});
for(const s of sites){ const [slug,url]=s.split('|'); const p=await ctx.newPage();
  try{ await p.goto(url,{waitUntil:'domcontentloaded',timeout:45000}); await p.waitForTimeout(5000);
    for(const t of ['Reject All','Reject','Continue','Accept all','Accept All','Accept','I agree','Got it','Allow all','Reject all','Decline']){ const btn=p.getByRole('button',{name:t,exact:true}); if(await btn.count()){ try{await btn.first().click({timeout:1500}); await p.waitForTimeout(800);}catch{} } }
    await p.screenshot({path:`shots/${slug}.png`}); console.log(slug,'ok',await p.title());
  }catch(e){console.log(slug,'ERR',e.message.slice(0,80))}
  await p.close(); }
await b.close();
