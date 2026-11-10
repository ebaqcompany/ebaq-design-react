// Re-render the approved SVG sources in one fixed coordinate space. Clients only
// decode image frames; they never run SVG geometry/path CSS animations.
import { chromium } from 'playwright';
import { readFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const sources = [
  ['logo-design', 'logo-design-shape-picker-candidate', 6],
  ['brand-design', 'brand-design-color-picker-candidate', 4],
  ['web-design', 'web-design-animated', 4.2],
  ['web-development', 'web-development-code-resize-candidate', 6],
  ['motion-graphics', 'motion-graphics-animated', 3.8],
];
const fps = 30;
const output = 'public/images/services/animations';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  args: ['--no-sandbox'],
});
try {
  for (const [slug, source, seconds] of sources) {
    const frames = await mkdtemp(join(tmpdir(), `service-${slug}-`));
    const page = await browser.newPage({ viewport: { width: 720, height: 480 }, deviceScaleFactor: 1 });
    try {
      const svg = await readFile(`public/images/services/geometric-candidates/${source}.svg`, 'utf8');
      await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:720px;height:480px}</style>${svg}`);
      await page.evaluate(() => {
        window.animations = document.getAnimations();
        for (const animation of window.animations) animation.pause();
      });
      // Verify that the authoritative motion source actually morphs before export.
      if (slug === 'motion-graphics') {
        const shapes = [];
        for (const time of [600, 1500, 2500]) {
          shapes.push(await page.evaluate(time => {
            window.animations.forEach(animation => { animation.currentTime = time; });
            return getComputedStyle(document.querySelector('.bouncing-shape')).d;
          }, time));
        }
        if (new Set(shapes).size !== 3) throw new Error('Motion source did not produce triangle, square and star');
      }
      for (let frame = 0; frame < Math.round(seconds * fps); frame++) {
        await page.evaluate(time => {
          window.animations.forEach(animation => { animation.currentTime = time; });
        }, frame * 1000 / fps);
        await page.screenshot({ path: join(frames, `${String(frame).padStart(4, '0')}.png`), omitBackground: true });
      }
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', join(frames, '%04d.png'), '-c:v', 'libwebp_anim', '-quality', '85', '-loop', '0', '-an', `${output}/${slug}.webp`]);
      // Pick a clear representative frame, including the star for motion graphics.
      const posterFrame = Math.round((slug === 'motion-graphics' ? 2.5 : 1.5) * fps);
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', join(frames, `${String(posterFrame).padStart(4, '0')}.png`), '-c:v', 'libwebp', '-quality', '90', `${output}/${slug}-still.webp`]);
      console.log(`Rendered ${slug}: ${seconds}s, ${fps}fps, 720×480, transparent`);
    } finally {
      await page.close();
      await rm(frames, { recursive: true, force: true });
    }
  }
} finally {
  await browser.close();
}
