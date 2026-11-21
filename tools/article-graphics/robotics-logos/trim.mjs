// Tightens every SVG viewBox in logos-final/ to its visible (non-transparent) pixels.
import { chromium } from "playwright";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const b = await chromium.launch({ channel: "chrome" }); const p = await b.newPage();
for (const f of readdirSync("logos-final").filter(f=>f.endsWith(".svg"))) {
  const src = readFileSync("logos-final/"+f,"utf8");
  await p.setContent(`<body style="margin:0;background:transparent">${src.replace(/<\?xml[^>]*\?>/,'')}</body>`);
  const vb = await p.evaluate(async()=>{
    const svg=document.querySelector('svg'); let v=svg.viewBox.baseVal; if(!v||!v.width){const r=svg.getBBox();v={x:r.x,y:r.y,width:r.width,height:r.height};}
    const W=1600,H=Math.round(W*v.height/v.width); svg.setAttribute('width',W); svg.setAttribute('height',H);
    const xml=new XMLSerializer().serializeToString(svg); const img=new Image(); img.src='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(xml)));
    await img.decode(); const c=document.createElement('canvas'); c.width=W;c.height=H; const g=c.getContext('2d'); g.drawImage(img,0,0);
    const d=g.getImageData(0,0,W,H).data; let x0=W,y0=H,x1=0,y1=0;
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(d[(y*W+x)*4+3]>8){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}}
    const s=v.width/W; return [v.x+x0*s, v.y+y0*s, (x1-x0+1)*s, (y1-y0+1)*s];
  });
  let out = src.replace(/(<svg[^>]*?)\s(width|height)="[^"]*"/g,'$1').replace(/(<svg[^>]*?)\s(width|height)="[^"]*"/g,'$1');
  out = /viewBox="/.test(out.match(/<svg[^>]*>/)[0]) ? out.replace(/(<svg[^>]*?)viewBox="[^"]*"/, `$1viewBox="${vb.map(n=>n.toFixed(2)).join(' ')}"`) : out.replace('<svg', `<svg viewBox="${vb.map(n=>n.toFixed(2)).join(' ')}"`);
  writeFileSync("logos-final/"+f, out); console.log(f, vb.map(n=>Math.round(n)).join(' '));
}
await b.close();
