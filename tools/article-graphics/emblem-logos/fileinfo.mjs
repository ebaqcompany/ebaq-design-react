// For each Commons file: prints author/license from the file page and saves a 1600px thumbnail to cand/.
import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage();
for(const [i,n] of process.argv.slice(2).entries()){
  try{ await p.goto('https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(n.replace(/ /g,'_')),{waitUntil:'domcontentloaded'});
    const info=await p.evaluate(()=>({lic:[...document.querySelectorAll('.licensetpl_short, .rlicense-desc, .licensetpl .licensetpl_short')].map(e=>e.textContent.trim()).slice(0,2).join(' | '),author:(document.querySelector('#fileinfotpl_aut')?.nextElementSibling?.textContent||'').trim().slice(0,80),size:(document.querySelector('.fileInfo')?.textContent||'').slice(0,60)}));
    console.log(i,n,JSON.stringify(info));
    const r=await p.goto('https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(n.replace(/ /g,'_'))+'?width=1600'); writeFileSync(`cand/photo-${i}.jpg`,await r.body());
  }catch(e){console.log(i,n,'ERR',e.message.slice(0,60))}
  await p.waitForTimeout(1200);}
await b.close();
