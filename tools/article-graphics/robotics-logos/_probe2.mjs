import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36", viewport:{width:1440,height:900} });
for (const [k,u] of [["figure","https://www.figure.ai/"],["unitree","https://www.unitree.com/"],["humanoid","https://thehumanoid.ai/"]]) {
  const p = await ctx.newPage();
  try { await p.goto(u,{waitUntil:"commit",timeout:45000}); await p.waitForTimeout(9000);
    await p.screenshot({path:`/private/tmp/claude-501/-Users-ebaq-Documents-github-repos-ebaq-design-react/ca97196d-006f-4e7c-a105-fa5e6cf67f73/scratchpad/top-${k}.png`,clip:{x:0,y:0,width:1440,height:160}});
    const info = await p.evaluate(()=>{const a=[...document.querySelectorAll('a')].filter(a=>{const r=a.getBoundingClientRect();return r.top<150&&r.left<400&&r.width>20}).slice(0,3);return a.map(x=>x.outerHTML.slice(0,300))});
    console.log(k, JSON.stringify(info).slice(0,700));
  } catch(e){ console.log(k,"ERR",e.message.slice(0,80)); }
  await p.close();
}
await b.close();
