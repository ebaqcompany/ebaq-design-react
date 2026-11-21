import { chromium } from "playwright"; import { writeFileSync } from "node:fs";
const b=await chromium.launch({channel:"chrome"}); const p=await (await b.newContext({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"})).newPage();
await p.goto("https://www.flexport.com/",{waitUntil:"load",timeout:60000}); await p.waitForTimeout(3000);
const s=await p.evaluate(()=>{const ref=document.getElementById('flexport-logo');const vb=ref.getAttribute('viewBox')||'0 0 104 24';return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><g fill="#0e0e0e">${ref.innerHTML}</g></svg>`});
writeFileSync('logos/flexport.svg',s); console.log(s.slice(0,200)); await b.close();
