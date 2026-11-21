// Contact sheet of every logo on a mid-grey background, to spot white/partial logos.
import { chromium } from "playwright";
import { readFileSync, readdirSync } from "node:fs";
import { boards, slug } from "./companies.mjs";
const files = readdirSync("logos-final");
const cells = boards.flatMap(b=>b.companies).map(([name],i)=>{
  const f = files.find(x=>x.startsWith(slug(name)+"."));
  if(!f) return `<div class=c><b>${i+1} ${name}</b><i>MISSING</i></div>`;
  const mime = f.endsWith("svg")?"image/svg+xml":"image/png";
  return `<div class=c><b>${i+1} ${name} (${f.split('.').pop()})</b><img src="data:${mime};base64,${readFileSync("logos-final/"+f).toString("base64")}"></div>`;
}).join("");
const b = await chromium.launch({ channel: "chrome" }); const p = await b.newPage({viewport:{width:1600,height:1200}});
await p.setContent(`<style>body{margin:0;display:grid;grid-template-columns:repeat(6,1fr);background:#fff}.c{height:130px;border:1px solid #fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font:12px sans-serif}img{max-width:220px;max-height:70px}</style>${cells}`);
await p.screenshot({path:"/private/tmp/claude-501/-Users-ebaq-Documents-github-repos-ebaq-design-react/ca97196d-006f-4e7c-a105-fa5e6cf67f73/scratchpad/tech-sheet.png",fullPage:true}); await b.close();
