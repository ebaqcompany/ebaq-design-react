# Services animation exports

The five approved SVG animations remain editable sources in
`public/images/services/geometric-candidates/`. Brand strategy already uses a
fixed-canvas Lottie and stays unchanged.

The Services grid displays transparent animated WebP exports at 720×480, 30fps.
Each export preserves the original SVG's `meet` fit inside the 3:2 card. All paths,
window dimensions, cursor movements and shape morphs are rendered ahead of time
in Chromium. The phone decodes finished image frames, so CSS SVG geometry support
cannot break the development window or leave the motion shape as a triangle.
The separate CSS blue grid stays visible through the transparent image pixels.

Animated WebP is supported in current Safari/iOS, Chrome and Firefox. Static WebP
posters are selected with `prefers-reduced-motion`. The original strategy Lottie
also observes that preference. There is no video autoplay requirement.

## Regenerate after editing source artwork

Install project dependencies and FFmpeg, then install Playwright Chromium:

```sh
npm ci
npx playwright install chromium
node scripts/service-animations/render.mjs
```

If Chromium is already installed, set `CHROMIUM_PATH` to its executable, e.g.:

```sh
CHROMIUM_PATH=/usr/bin/chromium node scripts/service-animations/render.mjs
```

Commit the generated animated and still WebP files with the source change.
Exporting is a developer operation, not part of the Vercel build. The renderer
checks three distinct motion paths before exporting triangle → square → star.

## Verify

With the development server running:

```sh
node scripts/service-animations/verify.mjs
```

Set `CHROMIUM_PATH` as above when using a system browser, and `TEST_URL` to test
another local or preview origin. This checks phone/tablet/desktop widths, decoded
images, aspect ratios, horizontal overflow, runtime errors and static poster
selection for reduced motion.

Validation for this change: production build and targeted ESLint passed; browser
checks passed in Chromium at 320, 390, 768 and 1440px. Decoded output frames were
visually inspected for triangle, square and star. WebKit was downloaded but could
not launch because this executor lacks its GTK/Graphene/other native libraries;
this is not a claim of testing on a physical iPhone.
