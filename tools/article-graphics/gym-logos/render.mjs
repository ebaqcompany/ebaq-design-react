import { chromium } from "playwright"; import { readFileSync } from "node:fs";
const files=process.argv.slice(3); const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({viewport:{width:1200,height:300*files.length}});
await p.setContent(files.map(f=>`<div style="height:280px;border:1px solid #ccc;display:flex;align-items:center;justify-content:center"><img style="max-height:250px;max-width:1100px" src="data:image/svg+xml;base64,${readFileSync(f).toString('base64')}"></div>`).join(''));
await p.screenshot({path:process.argv[2]}); await b.close();
