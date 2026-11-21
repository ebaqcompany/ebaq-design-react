// Renders the "logo explained" plates for /blog/best-nhl-logos:
// the team logo centered on white with four hand-written annotations
// (Caveat Bold, brand blue #00AFEC), matching the plates from the original article.
// Usage: node tools/article-graphics/nhl-logos/render.mjs [ABBR ...]
import { chromium } from "playwright";
import { readFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { teams } from "./teams.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "../../../public/images/blog/best-nhl-logos");
const tmpDir = join(here, "out");
mkdirSync(tmpDir, { recursive: true });

const only = process.argv.slice(2);
const list = only.length ? teams.filter((t) => only.includes(t.abbr)) : teams;

// Canvas 1920x1080. Logo box is centered: x 700–1220, y 280–800.
// Each annotation has a label position and a hand-drawn stroke pointing at the logo.
const page = (team) => {
  const svg = readFileSync(join(here, "logos", `${team.abbr}.svg`), "utf8");
  const [top, left, right, bottom] = team.labels;
  return `<!doctype html><html><head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=block">
<style>
  html,body{margin:0;width:1920px;height:1080px;background:#fff;overflow:hidden}
  .logo{position:absolute;left:680px;top:270px;width:560px;height:540px}.logo svg{position:static;width:100%;height:100%}
  .note-label{position:absolute;font-family:Caveat,cursive;font-weight:700;font-size:72px;color:#00afec;line-height:1;white-space:nowrap}
  svg.notes{position:absolute;inset:0}
  .notes path{fill:none;stroke:#00afec;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}
</style></head><body>
<div class="logo">${svg}</div>
<svg class="notes" width="1920" height="1080" viewBox="0 0 1920 1080">
  <!-- top: curly bracket above the logo -->
  <path d="M792 262 C790 238 798 226 822 226 L938 228 C952 228 958 220 960 206 C962 220 970 228 984 228 L1100 226 C1122 226 1130 238 1128 262"/>
  <!-- left: curved arrow into the logo -->
  <path d="M470 470 C560 470 610 500 668 548"/>
  <path d="M640 520 L670 550 L630 562"/>
  <!-- right: tall brace beside the logo -->
  <path d="M1262 330 C1300 332 1306 356 1304 400 L1302 500 C1302 530 1310 540 1336 542 C1310 546 1300 556 1300 590 L1298 700 C1296 742 1290 760 1254 764"/>
  <!-- bottom: line from the label up into the logo -->
  <path d="M760 880 C830 846 900 800 960 744"/>
</svg>
<div class="note-label" style="left:960px;top:120px;transform:translateX(-50%) rotate(-1.5deg)">${top}</div>
<div class="note-label" style="right:${1920 - 450}px;top:385px;transform:rotate(2deg);text-align:right">${left}</div>
<div class="note-label" style="left:1370px;top:500px;transform:rotate(-2deg)">${right}</div>
<div class="note-label" style="right:${1920 - 760}px;top:880px;transform:rotate(1.5deg);text-align:right">${bottom}</div>
</body></html>`;
};

const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
const tab = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
for (const team of list) {
  await tab.setContent(page(team), { waitUntil: "networkidle" });
  await tab.evaluate(() => document.fonts.ready);
  // Crop each logo's viewBox to its drawn shapes so every logo fills the same box.
  await tab.evaluate(() => {
    const el = document.querySelector(".logo svg");
    const b = el.getBBox();
    el.setAttribute("viewBox", `${b.x} ${b.y} ${b.width} ${b.height}`);
    el.removeAttribute("width"); el.removeAttribute("height");
    el.setAttribute("preserveAspectRatio", "xMidYMid meet");
  });
  const png = join(tmpDir, `${team.file}.png`);
  await tab.screenshot({ path: png });
  execFileSync("cwebp", ["-quiet", "-q", "85", "-resize", "960", "540", png, "-o", join(outDir, `${team.file}-logo-explained.webp`)]);
  console.log("rendered", team.file);
}
await browser.close();
