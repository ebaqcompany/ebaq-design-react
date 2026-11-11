// Typography timing adapted from Orbio's type/trio_template.html.
const SVG_NS = 'http://www.w3.org/2000/svg';
const clamp = (n: number) => Math.min(1, Math.max(0, n));
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3*x1, bx = 3*(x2-x1)-cx, ax = 1-cx-bx, cy = 3*y1, by = 3*(y2-y1)-cy, ay = 1-cy-by;
  const X = (u: number) => ((ax*u+bx)*u+cx)*u, Y = (u: number) => ((ay*u+by)*u+cy)*u, dX = (u: number) => (3*ax*u+2*bx)*u+cx;
  return (x: number) => { if (x <= 0) return 0; if (x >= 1) return 1; let u=x;
    for (let k=0;k<8;k++) { const d=dX(u); if (Math.abs(d)<1e-6) break; u-=(X(u)-x)/d; }
    let lo=0, hi=1; for (let k=0;k<20 && Math.abs(X(u)-x)>1e-6;k++) { if (X(u)<x) lo=u; else hi=u; u=(lo+hi)/2; } return Y(u); };
}
const inout = bezier(.77,0,.175,1);

// Separate the original outlined paths into glyphs without using substitute fonts.
function splitGlyphs(svg: SVGSVGElement, path: SVGPathElement) {
  const contours = (path.getAttribute('d') || '').match(/[Mm][^Mm]*/g) || [];
  const parts = contours.map(d => { const p=document.createElementNS(SVG_NS,'path'); p.setAttribute('d',d); p.setAttribute('visibility','hidden'); svg.appendChild(p); const b=p.getBBox(); p.remove(); return {d, left:b.x, right:b.x+b.width}; }).sort((a,b)=>a.left-b.left);
  const runs: {left:number;right:number;d:string}[]=[];
  for (const part of parts) { const last=runs[runs.length-1]; if (last && part.left <= last.right + .05) { last.right=Math.max(last.right,part.right); last.d+=part.d; } else runs.push({...part}); }
  const group=document.createElementNS(SVG_NS,'g');
  const glyphs=runs.map(run => { const p=path.cloneNode(false) as SVGPathElement; p.removeAttribute('id'); p.setAttribute('d',run.d); group.appendChild(p); return p; });
  path.replaceWith(group); return {group,glyphs};
}

export function prepareNathalieMotion(svg: SVGSVGElement, palette: boolean) {
  const root=svg.querySelector(':scope > g'); if (!root) return () => {};
  if (!palette) {
    const children=Array.from(root.children);
    const samples=[children[7],children[10],children[13]].map(p=>splitGlyphs(svg,p as SVGPathElement));
    const starts=[1000,3800,5500];
    return (time: number) => { const t=time%8900; const fall=inout(clamp((t-7600)/900))*1080;
      samples.forEach((sample,i)=>{ const count=Math.max(0,Math.floor((t-starts[i])/130)+1); sample.glyphs.forEach((g,j)=>g.style.visibility=j<count?'visible':'hidden'); sample.group.setAttribute('transform',`translate(0 ${fall})`); }); };
  }
  const children=Array.from(root.children);
  const defs=svg.querySelector(':scope > defs') || svg.appendChild(document.createElementNS(SVG_NS,'defs'));
  const ranges: [number,number][]=[[1,11],[12,21],[22,31],[32,41]];
  const rows=ranges.map(([start,end],i)=>{
    const pieces=children.slice(start,end+1);
    const clip=document.createElementNS(SVG_NS,'clipPath'); clip.id=`nathalie-neutral-clip-${i}`;
    clip.setAttribute('clipPathUnits','userSpaceOnUse');
    const window=document.createElementNS(SVG_NS,'rect'); window.setAttribute('x','0'); window.setAttribute('width','1280'); clip.appendChild(window); defs.appendChild(clip);
    const band=pieces[0] as SVGElement; band.setAttribute('clip-path',`url(#${clip.id})`);
    const group=document.createElementNS(SVG_NS,'g'); root.appendChild(group); pieces.forEach(p=>group.appendChild(p));
    const names=i===0 ? [pieces[pieces.length-2],pieces[pieces.length-1]] : [pieces[pieces.length-1]];
    const details=pieces.slice(1).filter(p=>!names.includes(p));
    return {window,names,details};
  });
  const panels: [number,number][]=[[42,45],[46,56]];
  const accents=panels.map(([start,end],i)=>{
    const clip=document.createElementNS(SVG_NS,'clipPath'); clip.id=`nathalie-accent-clip-${i}`; clip.setAttribute('clipPathUnits','userSpaceOnUse');
    const window=document.createElementNS(SVG_NS,'rect'); window.setAttribute('x',String(1280+i*320)); window.setAttribute('y','0'); window.setAttribute('width','320'); window.setAttribute('height','1080'); clip.appendChild(window); defs.appendChild(clip);
    const frame=document.createElementNS(SVG_NS,'g'); frame.setAttribute('clip-path',`url(#${clip.id})`);
    const content=document.createElementNS(SVG_NS,'g'); children.slice(start,end+1).forEach(p=>content.appendChild(p)); frame.appendChild(content); root.appendChild(frame); return content;
  });
  const reveal=bezier(.22,1,.36,1);
  return (time: number) => {
    const t=Math.min(time,12000);
    rows.forEach((row,i)=>{
      const start=(3-i)*380, progress=reveal(clamp((t-start)/850));
      const bottom=(i+1)*270, height=270*progress;
      row.window.setAttribute('y',String(bottom-height)); row.window.setAttribute('height',String(height));
      const name=clamp((t-start-350)/320), detail=clamp((t-2350-i*120)/450);
      row.names.forEach(e=>(e as SVGElement).style.opacity=String(name));
      row.details.forEach(e=>(e as SVGElement).style.opacity=String(detail));
    });
    accents.forEach((panel,i)=>{
      const progress=reveal(clamp((t-3550-i*600)/1000));
      panel.setAttribute('transform',`translate(${-320*(1-progress)} 0)`);
    });
  };
}
