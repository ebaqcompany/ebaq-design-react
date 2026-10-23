# Savory case-study motion sources

Editable sources for `public/case-study/savory/17-type-specimen.webm` `18-colors.webm`, and `19-social-carousel.webm`; also includes the original Find Your Place source.

- `specimen.html`: original composition, glyphs, easing, stagger, timing and AaBbCc motion retained. Title glyphs and all metadata lines now translate bottom-to-top through fixed masks, with upward masked exits.
- `colors-columns.html`: byte-identical to the approved palette HTML; no layout or motion changes.
- `specimen/glyphs.js` and `fonts/`: original outlined glyphs and local font dependencies.
- `render.mjs`: deterministic PNG capture using Chrome, then direct VP9 WebM export. Requires Node 22+, Chrome and FFmpeg; no Node package dependencies. Produces WebM only.
- `homepage-preview/`: provenance and validation of the separate 1600 × 1200 website preview from `SAVORY web.jpg`, used as the first tile in homepage row 3.
- `website-design/`: provenance and validation for the user-exported `SAVORY Web Clean.jpg`, served as the original 3840 × 2160 JPEG (true 2x) without resizing or recompression, directly before the stamp. The laptop-on-couch mockup is preserved but hidden from the current case study.
- `carousel/index.html` and `carousel/posts/`: byte-identical approved carousel source and all four PNG inputs; use the shared `render.mjs`.
- `find-your-place/`: original Motion R3 HTML, font, photo inputs and historical Python renderer, preserved for editability. Its existing 10 s website WebM is copied unchanged; it was not re-exported in this update. Its historical renderer requires Python Playwright and emits MP4 plus WebM.
- `package-latest.mjs`: reads current Savory references, copies finals and editable files to the project portfolio package, verifies SHA-256 equality, and records links to the approved PSDs without duplicating them.
- `carousel-validation.json`: carousel source, decoded-color, stream metadata and live case-study playback checks.
- `validation.json`: current browser, motion, decoded-color, stream metadata and site-playback results.

Original files came from `/Users/ebaq/Dropbox/PROJECTS/SAVORY/04_Design-Work/Type-Motion-2026-10-22/`. These repository copies are the updated editable masters. The original Dropbox files are preserved.

Motion references: Orbio `tools/type_motion/runtime.js`, `tools/type_motion/m4_ruled/template.html` and `web/palette`; Next Dimension `ASSETS/generated/generate-nextdim-text-only-outlined-lottie.mjs`. Preserve the existing deterministic `window.seek(ms)` contract rather than migrating the composition framework during this edit.

## Render

From the repository root, serve the source files in one terminal:

```sh
python3 -m http.server 5191 --bind 127.0.0.1
```

Then render:

```sh
WORKERS=3 node scripts/savory-motion/render.mjs 'http://127.0.0.1:5191/scripts/savory-motion/specimen.html?render' 1920 1080 60 1 public/case-study/savory/17-type-specimen.webm
WORKERS=3 node scripts/savory-motion/render.mjs 'http://127.0.0.1:5191/scripts/savory-motion/colors-columns.html?render' 1920 1080 60 1 public/case-study/savory/18-colors.webm
```

`WEBM_CRF` defaults to 16. `KEEP_FRAMES=1` retains the captured PNG sequence for inspection. Normal source URLs autoplay; `#t=1000` holds a frame, and `specimen.html#still` shows the settled composition.

Carousel export command (same root server):

```sh
WORKERS=1 node scripts/savory-motion/render.mjs 'http://127.0.0.1:5191/scripts/savory-motion/carousel/index.html?render' 1920 1080 60 1 public/case-study/savory/19-social-carousel.webm
```

Create or refresh the project snapshot with `node scripts/savory-motion/package-latest.mjs`. The destination is `/Users/ebaq/Dropbox/PROJECTS/SAVORY/PORTFOLIO/Latest-Case-Study/`; current finals are under `media/case-study/savory/`, sources under `editable/savory-motion/`, and `manifest.json` records hashes and PSD references. Older originals and rejected exports stay in their existing locations.

## Color findings

The original HTML and carousel post PNG already specified Wax Red `#7B0F1E` (123, 15, 30). The delivered WebMs had limited-range YUV with unknown color matrix, transfer and primaries. FFmpeg decoded their flat red to (122, 15, 31), and this Chrome version did too; the user's brighter/orange appearance was not reproduced in this player. Untagged export was a confirmed portability defect, rather than an incorrect source hex.

The corrected chain captures sRGB PNGs, explicitly converts RGB to full-range BT.709 YUV, and sets matrix, BT.709 primaries, sRGB transfer and full range both on frames and encoder metadata. Setting encoder options alone did not preserve all tags with this FFmpeg/VP9 chain; `setparams` is also necessary. This preserves the source transfer curve without a camera-gamma conversion.

Final Chrome 155 canvas samples and browser screenshots both measure **(123, 15, 30)** for Wax Red in the palette, typography, and social carousel videos. Independent FFmpeg RGB decode measures **(122, 15, 30)**, a one-level conversion rounding difference. Other palette channels remain within two levels, expected for 8-bit YUV video. Outputs retain VP9 Profile 0 / yuv420p, 1920×1080, 60 fps, with original 8.1 s and 13.3 s durations.

Both final WebMs were verified playing through the actual local `/work/savory` route. AaBbCc transforms match the original at nine sampled times, all supporting text uses Y-only movement through hidden-overflow masks, and the full production build passes. Safari display behavior is unverified.

Case-study order, introductory copy, three sections and approved image assets were not edited. The release is prepared from saved-checkout `main`. The user authorized commit, push and publication on 2026-10-23; local and remote histories have been merged while preserving unrelated local edits. Savory is published under the display name Savory, and Spark is excluded from the public collection. See the final release report for commit and live-deployment evidence.
