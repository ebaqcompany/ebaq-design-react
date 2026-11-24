// Searches Wikimedia Commons file names in a real browser.
import { chromium } from "playwright";
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage();
for(const q of process.argv.slice(2)){
  await p.goto('https://commons.wikimedia.org/w/index.php?search='+encodeURIComponent(q)+'&title=Special:MediaSearch&type=image',{waitUntil:'domcontentloaded'}).catch(()=>{});
  await p.goto('https://commons.wikimedia.org/w/index.php?search='+encodeURIComponent(q)+'&ns6=1&fulltext=1',{waitUntil:'domcontentloaded'});
  const r=await p.evaluate(()=>[...document.querySelectorAll('.mw-search-result-heading a')].map(a=>a.textContent).slice(0,12));
  console.log(q,'=>',JSON.stringify(r)); await p.waitForTimeout(800);}
await b.close();
