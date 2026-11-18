const $ = id => document.getElementById(id)
const cover = $('cover'), ctx = cover.getContext('2d')
const image = src => new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(new Error(`Could not load ${src}`));i.src=src})
const mark = await image('./studio-mark.png')
await Promise.all([document.fonts.load('600 66px "Roboto Condensed"'),document.fonts.load('400 30px "Roboto Mono"')])
let posts=[]
try { const response=await fetch('/content/blog/index.json'); if(!response.ok)throw Error('Article index unavailable'); posts=await response.json(); for(const p of posts){const o=document.createElement('option');o.value=p.slug;o.textContent=p.title;$('post').append(o)} } catch(e){$('status').textContent='Article list unavailable; you can still enter a title and category.'}
function wrap(text,maxWidth){
 const lines=[]
 for(const paragraph of text.split('\n')) {let line=''; for(const word of paragraph.trim().split(/\s+/).filter(Boolean)){const next=line?line+' '+word:word;if(ctx.measureText(next).width>maxWidth && line){lines.push(line);line=word}else line=next}lines.push(line)}
 return lines
}
function render(){
 const title=$('title').value.trim(), cat=$('category').value.trim().toUpperCase(), width=Number($('width').value)
 $('widthValue').textContent=String(width)
 ctx.clearRect(0,0,900,600);ctx.fillStyle='#00afec';ctx.fillRect(0,0,900,600)
 // The larger grid repeats every 48px, with line centers equally inset at opposing edges.
 ctx.fillStyle='rgba(255,255,255,0.5)'
 for(let x=17;x<900;x+=48)ctx.fillRect(x,0,2,600)
 for(let y=11;y<600;y+=48)ctx.fillRect(0,y,900,2)
 ctx.drawImage(mark,422,158,56,56)
 ctx.textAlign='center';ctx.textBaseline='top';ctx.fillStyle='#000';ctx.font='600 66px "Roboto Condensed"';if('letterSpacing' in ctx)ctx.letterSpacing='-1.98px'
 const lines=wrap(title,width); const tooWide=lines.some(line=>ctx.measureText(line).width>width)
 const titleY=248, lineHeight=59.4;lines.forEach((line,i)=>ctx.fillText(line,450,titleY+i*lineHeight))
 const categoryY=titleY+lines.length*lineHeight+28.2
 if('letterSpacing' in ctx)ctx.letterSpacing='0.75px';ctx.font='400 30px "Roboto Mono"';if(cat)ctx.fillText(cat,450,categoryY)
 const categoryTooWide=ctx.measureText(cat).width>800
 // 16:9 centered crop excludes 46.875px at each vertical edge.
 const bottom=cat?categoryY+30:titleY+(lines.length-1)*lineHeight+66
 const exceeds=bottom>553.125
 const invalid=!title||tooWide||categoryTooWide||exceeds
 $('status').className='status'+(invalid?' error':'')
 $('status').textContent=!title?'Enter a title.':tooWide?'A word is wider than the title frame. Widen the frame or shorten the word.':categoryTooWide?'The category is too wide. Shorten it.':exceeds?'Content extends beyond the 16:9 card safe area. Widen the title frame or shorten the text.':'Ready to export.'
 $('download').disabled=invalid; $('cardTitle').textContent=title.replace(/\n/g,' ');$('cardCat').textContent=cat
 for(const id of ['thumb','card']){const c=$(id),t=c.getContext('2d');t.clearRect(0,0,c.width,c.height);t.drawImage(cover,0,46.875,900,506.25,0,0,900,506)}
 cover.dataset.lines=String(lines.length);cover.dataset.categoryY=String(categoryY);cover.dataset.bottom=String(bottom)
}
$('post').addEventListener('change',e=>{const p=posts.find(x=>x.slug===e.target.value);if(p){$('title').value=p.coverTitle||p.title;$('category').value=p.category||''}render()})
$('title').addEventListener('input',render);$('category').addEventListener('input',render);$('width').addEventListener('input',render)
$('download').addEventListener('click',()=>cover.toBlob(blob=>{if(!blob){$('status').textContent='WebP export is not supported in this browser.';return}const a=document.createElement('a');const url=URL.createObjectURL(blob);a.href=url;a.download=($('post').value||'blog-cover')+'-cover.webp';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000)},'image/webp',.9))
render()
