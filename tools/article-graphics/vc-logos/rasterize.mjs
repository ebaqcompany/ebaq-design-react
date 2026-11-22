// Rasterizes an SVG at large size on a transparent background and trims it to the visible ink.
import { chromium } from "playwright"; import { readFileSync } from "node:fs";
const [inp,out]=process.argv.slice(2); const svg=readFileSync(inp,'utf8');
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({viewport:{width:2400,height:1200}});
await p.setContent(`<html><body style="margin:0;background:transparent"><img id=i style="width:2400px" src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}"></body></html>`);
await p.waitForTimeout(300); await p.locator('#i').screenshot({path:out,omitBackground:true}); await b.close();
