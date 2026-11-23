// Lists the logo files used in each Wikipedia article (infobox first), via a real browser.
import { chromium } from "playwright";
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage();
for(const t of process.argv.slice(2)){
  try{ await p.goto('https://en.wikipedia.org/wiki/'+encodeURIComponent(t.replace(/ /g,'_')),{waitUntil:'domcontentloaded'});
    const f=await p.evaluate(()=>[...document.querySelectorAll('.infobox a.mw-file-description, .infobox a.image, a.mw-file-description')].map(a=>decodeURIComponent(a.getAttribute('href')||'').replace(/^.*?File:/,'')).filter((x,i,arr)=>arr.indexOf(x)===i).slice(0,6));
    console.log(t,'=>',JSON.stringify(f)); }catch(e){console.log(t,'ERR',e.message.slice(0,60))}
  await p.waitForTimeout(800);}
await b.close();
