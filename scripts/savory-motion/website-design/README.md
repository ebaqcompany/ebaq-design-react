# Current website design still

The user manually exported and supplied the current source:

- `/Users/ebaq/Dropbox/PROJECTS/SAVORY/PORTFOLIO/SAVORY Web Clean.jpg`
- Modified: 2026-10-23 07:19:06 America/New_York
- Actual native dimensions: **3840 × 2160**, RGB JPEG, 2,191,058 bytes (true 2x).
- Website final: `public/case-study/savory/25-website-design.jpg`.

The website final is a byte-for-byte copy of the supplied JPEG. There is no downsampling, recompression, new sharpening, crop, or color conversion. The standalone still is directly before the stamp. The couch laptop mockup is hidden from the current case study; its WebP is preserved in the codebase and in `PORTFOLIO/Approved-Mockups-Not-In-Current-Case-Study/`, and its PSD remains in `MOCKUPS/`. The approved carousel is unchanged.

The newest user export is a true 2x image: 3840 × 2160, compared with the 1920 × 1080 Figma frame. `371-3626-2x-reference.png` is a fresh tool export using `defaultScale: 2`, retained only as a composition reference. The user JPEG matches its content bounds and composition; mean absolute RGB channel differences are below 0.85, consistent with JPEG compression. The website serves the user JPEG, not this reference. The earlier 1920-pixel user export is archived outside the latest package.

The earlier Figma-tool export is superseded and archived outside the latest package at `/Users/ebaq/Dropbox/PROJECTS/SAVORY/PORTFOLIO/Archived-Website-Design-Figma-Tool-Export-2026-10-23/`. It is no longer referenced or served by the case study.

To replace the website asset again, copy the newest approved source directly to the `.jpg` website path, verify SHA-256 equality and natural dimensions in the browser, then refresh the package using `node scripts/savory-motion/package-latest.mjs` from the repository root.
