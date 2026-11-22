import { chromium } from "playwright"; import { readFileSync } from "node:fs";
const s=process.argv[2]; const svg=readFileSync(`logos-final/${s}.svg`,'utf8');
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({deviceScaleFactor:1});
await p.setContent(`<html><body style="margin:0;background:transparent"><div id="w" style="display:inline-block;width:1600px">${svg.replace(/<svg/,'<svg style="width:1600px;height:auto;display:block"')}</div></body></html>`);
await p.locator('#w').screenshot({path:`logos-final/${s}.png`,omitBackground:true}); await b.close();
