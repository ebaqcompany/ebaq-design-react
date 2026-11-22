// Downloads Wikipedia/Commons files through Special:FilePath with a real browser (avoids API rate limits).
import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage();
for(const a of process.argv.slice(2)){ const [name,slug]=a.split('|');
  try{ const r=await p.goto('https://en.wikipedia.org/wiki/Special:FilePath/'+encodeURIComponent(name)); const ct=r.headers()['content-type']||''; const ext=ct.includes('svg')?'svg':ct.includes('png')?'png':ct.includes('jpeg')?'jpg':'bin';
    writeFileSync(`logos/${slug}.${ext}`,await r.body()); console.log(slug,r.status(),ext); }catch(e){console.log(slug,'ERR',e.message.slice(0,80))}
  await p.waitForTimeout(1500); }
await b.close();
