import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  args: ['--no-sandbox'],
});
try {
  for (const width of [320, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${process.env.TEST_URL || 'http://localhost:5173'}/services`);
    await page.locator('[data-service="motion-graphics"]').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll('#services-geometric-comparison picture img')]
      .every(image => image.complete && image.naturalWidth === 1440));
    assert.equal(await page.locator('#services-geometric-comparison [data-service]').count(), 6);
    assert.equal(await page.locator('#services-geometric-comparison picture img').count(), 5);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Page overflows horizontally');
    for (const image of await page.locator('#services-geometric-comparison picture img').all()) {
      const box = await image.boundingBox();
      assert(box && Math.abs(box.width / box.height - 1.5) < 0.01, 'Animation canvas must remain 3:2');
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => [...document.querySelectorAll('#services-geometric-comparison picture img')]
      .every(image => image.currentSrc.endsWith('-still.webp') && image.complete));
    assert.deepEqual(errors, [], 'Page should have no runtime errors');
    console.log(`${width}px: cards, image decoding, aspect ratios, overflow and reduced motion passed`);
    await page.close();
  }
} finally {
  await browser.close();
}
