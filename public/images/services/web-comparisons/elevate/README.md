# Elevate website comparison

Source: https://www.figma.com/design/fHgSBh8hMrNdljacW2ecBO/ELEVATE?node-id=387-2455

- Before frame: 387:2997 (`image 4518`), authored width 1600.
- After frame: 387:2489 (`image 4517`), authored width 1600.
- `*-original.png`: unmodified underlying uploaded source images.
- `*-frame.png`: unmodified node exports, including the existing Figma image-fill framing. Export service caps the longer edge at 4096.
- `*-hero.svg`: self-contained, deterministic 1600 × 1000 viewports embedding each frame export. Normalize frame width to 1600, retain intrinsic proportions, align at (0, 0), clip at height 1000. No independent content zoom, element alignment, or stretching. Originals remain untouched.

All future website comparisons use the same viewport in `src/data/websiteComparisons.ts`. Display scales uniformly at 16:10. No Figma document changes were made.

## Resolution audit and edge cleanup

Fresh Figma 2× exports are retained as `before-frame-2x.png` (3200 × 12013) and `after-frame-2x.png` (3200 × 18725). These are direct Figma exports, but the embedded native raster sources are only 1974 × 4096 and 700 × 4096, verified with Figma Image.getSizeAsync. The larger exports interpolate those sources; they do not add true native detail. Production SVGs continue to use the original frame exports rather than inflate download size with interpolated pixels. A genuinely sharper result requires higher-resolution original screenshots or editable website frames.

The gray top edge is baked into both raster sources, not a Figma stroke. Derived SVGs exclude the same 3 logical source pixels at the top of each 1600-wide frame. Width, height, scale and 16:10 viewport remain identical, and no navigation is clipped. Originals are unchanged. Before/After labels are outside the screenshot; no outer border or corner radius is applied.
