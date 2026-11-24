// Renders candidate files side by side on a contact sheet.
import { chromium } from "playwright"; import { readFileSync } from "node:fs";
const files=process.argv.slice(3), out=process.argv[2];
const html=`<body style="margin:0;display:flex;flex-wrap:wrap;background:#fff">${files.map(f=>`<div style="width:300px;height:230px;border:1px solid #ddd;display:flex;flex-direction:column;align-items:center;justify-content:center;font:12px sans-serif"><img style="max-width:270px;max-height:180px" src="data:${f.endsWith('svg')?'image/svg+xml':'image/png'};base64,${readFileSync(f).toString('base64')}"><span>${f.split('/').pop()}</span></div>`).join('')}</body>`;
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({viewport:{width:1500,height:800}}); await p.setContent(html); await p.waitForTimeout(500); await p.screenshot({path:out,fullPage:true}); await b.close();
