# Brand Strategy portfolio, local first pass

Three rows reuse `ServicePortfolioRows` / `Header78.DraggableRow` and its existing scroll, drag, touch and reduced-motion behavior. The approved hero, other services and redirects are unchanged.

## Sources

- Workshop videos: Brand Strategy Guide product's existing Wistia references in `src/data/shopProducts.ts`: in-person `b1vgsx7v50`, remote `4k3u5z7j7k`. Downloaded existing 1280×720 MP4 deliveries and encoded silent WebM alternatives for the shared lazy video component. Durations: 9.32s and 19.93s. These are muted looping previews, not full workshop recordings.
- Workshop photograph: existing `/services/arek-brand-strategy.jpg`.
- Medihuanna completed worksheets: downloaded original folder `/Users/ebaq/Dropbox/PROJECTS/Medihuanna/Strategy/original worksheets pngs/big/`, files `Medihuanna-brand-strategy-worksheets-1.jpg` (purpose), `-4.jpg` (audience), `-7.jpg` (personality). Originals are 3300×2550; exported as 1800×1391 PNGs, retaining the completed handwriting.
- Medihuanna mood boards: original `/Users/ebaq/Dropbox/PROJECTS/Medihuanna/Strategy/Medihuanna-brand-strategy-brief.pdf`, pages 19–21, rendered directly with Poppler at 1800 pixels wide to PNG. These are three proposed visual directions for one client, not three separate clients or finished identities. Reference image credits on each slide are preserved.

## Asset review and limitations

Selected workshop frames and worksheet/mood-board images were visually inspected. No passwords, contact details, financial figures or private communications were found in the selected assets. Client strategy text and workshop participants are visible, as in the existing public shop/blog examples.

All six slide images are now 1800 pixels wide. Low-resolution thumbnail exports were removed. Original aspect ratios are retained with `object-contain`; workshop videos use 16:9 tiles and static posters for reduced-motion settings.

Dropbox's Finder “Make available offline” action successfully hydrated the strategy brief, worksheets PDF and original worksheet export folder. The worksheet PDF has malformed form font appearances and renders some completed fields blank in Poppler, so the high-resolution completed image exports were used instead. Searches of Dropbox and common Documents/Downloads/Desktop locations did not locate Parity Digital or Lentix files.

Verification: production build passed; desktop (1440) and mobile (390) browser checks found all images loaded, no page errors and no horizontal document overflow. Workshop videos played locally; desktop dragging moved the row. Reviewed rendered screenshots for image quality. Physical Safari/iOS was not tested.

All changes remain local for review. No deployment, commit, push or redirect changes.
