// Rasterizes every SVG in logos/ to cand/<slug>.png (2400px wide, transparent) in one browser.
import { chromium } from "playwright"; import { readFileSync, readdirSync, mkdirSync, copyFileSync } from "node:fs";
mkdirSync('cand',{recursive:true});
const only=process.argv.slice(2);
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({viewport:{width:2400,height:1400}});
for(const f of readdirSync('logos')){ const s=f.replace(/\.\w+$/,''); if(only.length&&!only.includes(s)) continue;
  if(!f.endsWith('.svg')){ copyFileSync('logos/'+f,'cand/'+s+'.png'); continue; }
  const svg=readFileSync('logos/'+f,'utf8');
  await p.setContent(`<html><body style="margin:0;background:transparent"><img id=i style="width:2400px" src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}"></body></html>`);
  await p.waitForTimeout(150); await p.locator('#i').screenshot({path:'cand/'+s+'.png',omitBackground:true}); }
await b.close();
