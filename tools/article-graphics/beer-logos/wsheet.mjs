import { chromium } from "playwright"; import { readFileSync, readdirSync } from "node:fs";
const dir=process.argv[2], out=process.argv[3];
const cells=readdirSync(dir).filter(f=>/\.(svg|png)$/.test(f)).map(f=>`<div class=c><b>${f}</b><img src="data:${f.endsWith('svg')?'image/svg+xml':'image/png'};base64,${readFileSync(dir+'/'+f).toString('base64')}"></div>`).join('');
const b=await chromium.launch({channel:"chrome"}); const p=await b.newPage({viewport:{width:1600,height:900}});
await p.setContent(`<style>body{margin:0;display:grid;grid-template-columns:repeat(6,1fr);background:#cfcfcf}.c{height:130px;border:1px solid #fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font:12px sans-serif}img{max-width:220px;max-height:80px}</style>${cells}`);
await p.screenshot({path:out,fullPage:true}); await b.close();
