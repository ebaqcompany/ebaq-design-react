// Rasterizes every logos-final SVG to a 1200px-wide transparent PNG (for compositing onto the hero).
import { chromium } from "playwright"; import { readFileSync, readdirSync, copyFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({viewport:{width:1200,height:1200}});
for(const f of readdirSync('logos-final')){ const s=f.replace(/\.\w+$/,'');
  if(f.endsWith('.png')){copyFileSync('logos-final/'+f,`logos-png/${s}.png`);continue;}
  const svg=readFileSync('logos-final/'+f,'utf8');
  await p.setContent(`<html><body style="margin:0;background:transparent"><img id=i style="width:1200px" src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}"></body></html>`);
  await p.waitForTimeout(150); await p.locator('#i').screenshot({path:`logos-png/${s}.png`,omitBackground:true}); }
await b.close(); console.log('ok');
