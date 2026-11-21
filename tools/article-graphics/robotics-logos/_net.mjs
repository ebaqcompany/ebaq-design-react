import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36", viewport:{width:1440,height:900} });
for (const u of ["https://www.unitree.com/","https://thehumanoid.ai/","https://www.figure.ai/news"]) {
  const p = await ctx.newPage(); const hits=new Set();
  p.on('response', r=>{const x=r.url(); if(/logo|brand|wordmark/i.test(x)&&/\.(svg|png|webp)/i.test(x)) hits.add(x)});
  try{ await p.goto(u,{waitUntil:"commit",timeout:45000}); await p.waitForTimeout(9000); await p.evaluate(()=>window.scrollTo(0,document.body.scrollHeight)); await p.waitForTimeout(3000);}catch(e){}
  console.log(u, [...hits].slice(0,8).join('\n  '));
  await p.close();
}
await b.close();
