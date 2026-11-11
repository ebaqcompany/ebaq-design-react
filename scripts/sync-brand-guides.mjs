import { writeFile } from 'node:fs/promises';

// Add a published Markdown guide here to make its artwork eligible for rotation.
const guides = [
  { url: 'https://guidelines.online/savory.md', applications: ['Biz Cards', 'Social Media', 'Parallax'] },
  { url: 'https://guidelines.online/wingnut.md', applications: ['Motion Graphics', 'Pitch Deck', 'Podcast Cover'] },
  { url: 'https://guidelines.online/aero.md', applications: ['aero social', 'aero cap', 'aero billboards'] },
];
const required = (value, label) => { if (!value) throw new Error(`Missing ${label}`); return value; };
const brands = await Promise.all(guides.map(async ({ url, applications: preferred }) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not fetch ${url}: ${response.status}`);
  const md = await response.text();
  const front = required(md.match(/^---\s*\n([\s\S]*?)\n---/), 'front matter')[1];
  const name = required(front.match(/^name:\s*"([^"]+)"/m), 'brand name')[1];
  const section = (heading, next) => required(md.match(new RegExp(`## ${heading}\\n([\\s\\S]*?)\\n## ${next}`)), heading)[1];
  const colorBlock = front.match(/\ncolors:\n([\s\S]*?)(?=\ntypography:|\ncomponents:|$)/)?.[1] || '';
  const colors = [...new Set([...colorBlock.matchAll(/^  [^:]+:\s*"(#[0-9a-fA-F]{6})"/gm)].map(match => match[1].toUpperCase()))];
  const fontFaces = [...md.matchAll(/@font-face\s*\{([\s\S]*?)\}/g)].map(([, css]) => ({
    family: css.match(/font-family:\s*"([^"]+)"/)?.[1] || '',
    url: css.match(/src:\s*url\("(https:\/\/(?:storage\.googleapis\.com|firebasestorage\.googleapis\.com)\/[^"\)]+)"\)/)?.[1] || '',
    style: css.match(/font-style:\s*(normal|italic)/)?.[1] || 'normal',
  })).filter(font => font.family && font.url);
  const logos = section('Logos', 'Colors');
  const logoSets = [...logos.matchAll(/(?:^|\n)### ([^\n]+)\n([\s\S]*?)(?=\n### |$)/g)].map(([, label, body]) => ({
    label,
    variants: [...body.matchAll(/^\| [^|]+ \| [^`|]*`(#[0-9A-Fa-f]{6})` \|[^\n]*\]\((https:\/\/[^)]+)\)/gm)].map(([, background, src]) => ({ background, src })),
  })).filter(set => set.variants.length > 0);
  if (logoSets.length < 2) throw new Error(`${name}: not enough logo sets`);
  const applications = section('Applications', "Do's and Don'ts");
  const images = [...applications.matchAll(/^\- \*\*([^*]+)\*\*:\s*\[image\]\((https:\/\/[^)]+)\)/gm)].map(([, label, src]) => ({ label, src }));
  const applicationImages = preferred.map(label => required(images.find(item => item.label === label), `${name}: ${label} application`));
  return { name, source: url, colors, fontFaces, logoSets, applicationImages };
}));
await writeFile(new URL('../src/data/brandGuideAssets.json', import.meta.url), JSON.stringify(brands, null, 2) + '\n');
console.log(`Synced ${brands.length} brand guide(s).`);
