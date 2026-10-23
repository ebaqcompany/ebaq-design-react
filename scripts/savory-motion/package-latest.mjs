// Snapshot currently referenced Savory media and editable sources; never enumerate legacy exports.
// Run from the repository root: node scripts/savory-motion/package-latest.mjs
import ts from 'typescript';
import {readFileSync,writeFileSync,mkdirSync,copyFileSync,cpSync,readdirSync,statSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,join,relative,basename,dirname} from 'node:path';
const repo=resolve('.');
const project='/Users/ebaq/Dropbox/PROJECTS/SAVORY';
const destination=join(project,'PORTFOLIO/Latest-Case-Study');
const compiled=ts.transpileModule(readFileSync(join(repo,'src/data/caseStudies.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {caseStudies}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
const cs=caseStudies.find(c=>c.slug==='savory');
const snapshot={slug:cs.slug,client:cs.client,title:cs.title,summary:cs.summary,services:cs.services,deliverables:cs.deliverables,website:cs.website,guidelines:cs.guidelines,industryPage:cs.industryPage,preview:cs.preview,hero:cs.hero,leadGallery:cs.leadGallery,content:cs.content};
const urls=new Set();
function collect(v){if(typeof v==='string'&&v.startsWith('/case-study/savory/'))urls.add(v);else if(Array.isArray(v))v.forEach(collect);else if(v&&typeof v==='object')Object.values(v).forEach(collect);}
collect(snapshot);
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const manifest={snapshotDate:'2026-10-23 America/New_York',websiteSource:'src/data/caseStudies.ts',websiteRoute:'/work/savory',projectPackage:destination,policy:'Only current Savory references, in current order. Legacy/rejected exports and stale MP4 alternates are excluded. Originals remain untouched.',media:[],editable:[],externalEditable:[]};
for(const url of urls){
 const source=join(repo,'public',url),target=join(destination,'media',url);if(!existsSync(source))throw Error('Missing '+source);mkdirSync(dirname(target),{recursive:true});copyFileSync(source,target);
 const sourceHash=sha(source);if(sourceHash!==sha(target))throw Error('Hash mismatch '+url);
 manifest.media.push({website:url,repository:relative(repo,source),package:relative(destination,target),bytes:statSync(source).size,sha256:sourceHash});
 if(url.endsWith('.json')){const json=JSON.parse(readFileSync(source));for(const asset of json.assets||[])if(asset.p&&!asset.p.startsWith('data:'))throw Error('External Lottie asset needs packaging: '+asset.p);}
}
const previewURL='/portfolio/websites/savory-web.webp';
const previewSource=join(repo,'public',previewURL),previewTarget=join(destination,'homepage-preview',previewURL);
mkdirSync(dirname(previewTarget),{recursive:true});copyFileSync(previewSource,previewTarget);
if(sha(previewSource)!==sha(previewTarget))throw Error('Homepage preview hash mismatch');
manifest.homepageMedia=[{website:previewURL,repository:relative(repo,previewSource),package:relative(destination,previewTarget),projectOriginal:join(project,'PORTFOLIO/SAVORY web.jpg'),nativeDimensions:[1600,1200],encoding:'Lossless WebP; decoded RGB matches original JPG exactly',sha256:sha(previewSource),bytes:statSync(previewSource).size,placement:'First tile in homepage third row; first row retains approved Savory Lottie'}];
const bentoURL='/portfolio/identities/savory-bento.webp',bentoSource=join(repo,'public',bentoURL),bentoTarget=join(destination,'homepage-preview',bentoURL);
mkdirSync(dirname(bentoTarget),{recursive:true});copyFileSync(bentoSource,bentoTarget);
if(sha(bentoSource)!==sha(bentoTarget))throw Error('Homepage bento hash mismatch');
manifest.homepageMedia.push({website:bentoURL,repository:relative(repo,bentoSource),package:relative(destination,bentoTarget),projectOriginal:join(project,'PORTFOLIO/SAVORY bento.jpg'),nativeDimensions:[1667,1250],encoding:'Lossless WebP; decoded RGB matches newest original JPG exactly',sha256:sha(bentoSource),bytes:statSync(bentoSource).size,placement:'First tile in homepage second row; newest smaller-logo user design'});
const trustedURL='/client-logos/savory-wordmark.svg',trustedSource=join(repo,'public',trustedURL),trustedTarget=join(destination,'homepage-preview',trustedURL);
mkdirSync(dirname(trustedTarget),{recursive:true});copyFileSync(trustedSource,trustedTarget);
if(sha(trustedSource)!==sha(trustedTarget))throw Error('Trusted SVG hash mismatch');
manifest.homepageMedia.push({website:trustedURL,repository:relative(repo,trustedSource),package:relative(destination,trustedTarget),projectOriginal:join(project,'PORTFOLIO/SAVORY logo.svg'),nativeDimensions:[583,109],encoding:'Original monochrome SVG; byte-identical to user source',sha256:sha(trustedSource),bytes:statSync(trustedSource).size,placement:'Trusted by ambitious teams client-logo strip, immediately after Elevate; scale 72'});
for(const item of manifest.homepageMedia){const originalTarget=join(destination,'homepage-preview/originals',basename(item.projectOriginal));mkdirSync(dirname(originalTarget),{recursive:true});copyFileSync(item.projectOriginal,originalTarget);item.originalPackage=relative(destination,originalTarget);item.originalSHA256=sha(item.projectOriginal);if(sha(originalTarget)!==item.originalSHA256)throw Error('Homepage original hash mismatch');}
manifest.homepagePlacements=[{row:1,website:'/case-study/savory/hero-logo.json',package:'media/case-study/savory/hero-logo.json',background:'#B3C3D6'},...manifest.homepageMedia.filter(i=>i.website!==trustedURL).map(i=>({row:i.website===bentoURL?2:3,website:i.website,package:i.package}))].sort((a,b)=>a.row-b.row);
manifest.trustedLogoStrip={website:trustedURL,package:relative(destination,trustedTarget),scale:72,immediatelyAfter:'Elevate',medihuannaChange:'Removed existing -10px offset, moving only Medihuanna down exactly 10px'};
const editableSource=join(repo,'scripts/savory-motion'),editableTarget=join(destination,'editable/savory-motion');mkdirSync(dirname(editableTarget),{recursive:true});
cpSync(editableSource,editableTarget,{recursive:true,filter:p=>!['package-manifest.json','renders','.DS_Store'].includes(basename(p))});
function walk(p){return readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(p,e.name)):[join(p,e.name)]);}
for(const source of walk(editableSource).filter(p=>!['package-manifest.json','.DS_Store'].includes(basename(p))&&!p.includes('/renders/'))){const target=join(editableTarget,relative(editableSource,source));if(sha(source)!==sha(target))throw Error('Editable hash mismatch '+source);manifest.editable.push({repository:relative(repo,source),package:relative(destination,target),bytes:statSync(source).size,sha256:sha(source)});}
const preservedMockup=join(project,'PORTFOLIO/Approved-Mockups-Not-In-Current-Case-Study/24-laptop-website.webp');
manifest.preservedApprovedMockups=[{projectRelative:relative(destination,preservedMockup),repository:'public/case-study/savory/24-laptop-website.webp',sha256:sha(preservedMockup),status:'Approved; hidden from current case study by user request'}];
if(sha(preservedMockup)!==sha(join(repo,'public/case-study/savory/24-laptop-website.webp')))throw Error('Preserved couch mockup hash mismatch');
const psds=['03-savory-tote-NATURAL-PRINT-LIFT-EDITABLE.psd','22-savory-billboard-SKY-OFFWHITE-EDITABLE.psd','23-savory-pen-WAXRED-OFFWHITE-EDITABLE.psd','24-savory-laptop-EDITABLE.psd'];
for(const file of psds){const p=join(project,'MOCKUPS',file);if(!existsSync(p))throw Error('Missing PSD '+p);manifest.externalEditable.push({projectRelative:relative(destination,p),absolute:p,bytes:statSync(p).size,sha256:sha(p),copied:false});}
mkdirSync(destination,{recursive:true});writeFileSync(join(destination,'case-study.json'),JSON.stringify(snapshot,null,2)+'\n');
const readme=`# Latest approved Savory case-study media

Snapshot: 2026-10-23, America/New_York. Source: the current saved website checkout, /work/savory.

- media/case-study/savory/: ${manifest.media.length} current website assets, copied byte-for-byte, including the latest wall JPG, LinkedIn PNG, pen/tote/billboard WebPs, user-exported website-design JPG (original 3840×2160 true 2x, no recompression), four WebM animations, both hero Lottie JSONs, and all remaining referenced stills.
- editable/savory-motion/: editable HTML, outlined glyphs, local fonts, all four carousel post PNGs, Find Your Place source/photo inputs, renderers, and validation reports. See its README for rendering instructions. Hero JSONs in media/ are editable vector animation data. The website-design folder documents the current manually exported SAVORY Web Clean.jpg, copied byte-for-byte to media/. The superseded Figma-tool PNG/WebP are archived outside this latest package. The approved couch laptop mockup is hidden from the current case study and preserved in PORTFOLIO/Approved-Mockups-Not-In-Current-Case-Study; its PSD remains linked below.
- homepage-preview/portfolio/websites/savory-web.webp: current third-row homepage preview, kept separate from the clean 3840 × 2160 case-study image. Original input remains PORTFOLIO/SAVORY web.jpg; lossless WebP preserves all decoded pixels at 1600 × 1200. The first-row Savory logo Lottie stays in place.
- homepage-preview/portfolio/identities/savory-bento.webp: updated second-row bento with the smaller logo, copied from the newest user design at 1667 × 1250 without pixel changes. Both original user JPEG inputs are preserved under homepage-preview/originals/.
- homepage-preview/client-logos/savory-wordmark.svg: original new Savory SVG added to the trusted client strip, copied unchanged. Its original SVG is also preserved under homepage-preview/originals/. Only Medihuanna moved down 10 px, by removing its old -10 px offset.
- case-study.json: current introductory copy, sections, order, descriptions and media references, captured from src/data/caseStudies.ts. Website media URLs resolve below media/. Navigation to the next project is intentionally excluded.
- manifest.json: source paths, package paths, sizes and SHA-256 hashes; every copied final and editable file was compared to the website checkout.

## Current approved editable PSDs

These existing project files remain in MOCKUPS rather than being duplicated:

${manifest.externalEditable.map(p=>'- ['+basename(p.absolute)+']('+p.projectRelative+')').join('\n')}

The PSDs retain editable raster layers and masks, as documented by the neighboring original README files. They are not native adjustment layers or live vector text. The tote is the approved natural-print brightness lift, not the rejected flat-print treatment. The billboard is the approved Sky Blue plus Off-white version.

## Finals versus originals

Only the files under media/ are this website snapshot's final media. Older loose exports elsewhere in PORTFOLIO, rejected variants and MP4 counterparts are preserved in their original locations but excluded here. The three corrected videos are delivered as WebM with explicit BT.709 matrix/primaries, sRGB transfer and full-range tags. Existing Find Your Place WebM and all still images are copied unchanged.

Original animation projects remain in 04_Design-Work/Type-Motion-2026-10-22, Social-Motion-2026-10-22 and Motion-R3-2026-10-21. Sources needed for the packaged HTML previews are also copied here. Nothing in those original projects or existing portfolio folders was deleted or replaced.

Verified: exact Wax Red #7B0F1E in Chrome playback/screenshots for the three corrected videos; independent FFmpeg decoding differs by one red-channel level. Safari display behavior remains unverified. See the editable validation reports for measurements.
`;
writeFileSync(join(destination,'README.md'),readme);
writeFileSync(join(destination,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');writeFileSync(join(editableSource,'package-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({destination,media:manifest.media.length,homepageMedia:manifest.homepageMedia.length,editableFiles:manifest.editable.length,linkedPSDs:manifest.externalEditable.length,allHashesMatch:true}));
