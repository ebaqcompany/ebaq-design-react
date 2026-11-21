import { chromium } from "playwright"; import { readFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({deviceScaleFactor:1});
for(const s of process.argv.slice(2)){
  const svg=readFileSync(`logos/${s}.svg`,'utf8');
  await p.setContent(`<html><body style="margin:0;background:#808080"><img id=i src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}" style="height:400px"></body></html>`);
  await p.waitForTimeout(500); const ok=await p.evaluate(()=>{const i=document.getElementById('i');return [i.naturalWidth,i.naturalHeight,i.getBoundingClientRect().width]}); console.log(s,ok);
  await p.locator('#i').screenshot({path:`logos/_${s}-grey.png`});
}
await b.close();
