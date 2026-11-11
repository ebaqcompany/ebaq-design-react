# Service collage artwork

Square 1080px exports from EBAQ DESIGN 26 in Figma, section 1044:349.

| Service | Figma frame | Original photo |
| --- | --- | --- |
| Brand Strategy | 1044:31 | User-prepared workshop cutout |
| Logo Design | 1044:270 | User-refined logo-review cutout |
| Brand Design | 1052:2 | public/images/services/arek-researching2-p-1080.jpg |
| Web Design | 1052:81 | public/images/about/process/65c3f16cfc26eeb7887a41f0_Arek_web_design.jpg |
| Web Development | 1052:160 | public/images/about/process/arek-studio-desk-setup.webp |
| Motion Graphics | 1052:239 | public/images/blog/logo-design-cost/arek-workstation.webp |

The four new images use the original photos with transparency masks from Apple Vision, manually refined to retain papers, monitors, and desk equipment. No generative image editing was used. Monochrome/contrast and halftone are editable Figma settings copied from the user's Logo Design frame; the grid remains separate editable layers.

Motion Graphics uses a real general workstation photo as an interim visual, pending user review. It is not evidence of a particular motion project.

Website exports live in public/images/services/collages/{service-slug}.png. Original photo files remain unchanged.

## Layered website version

Cards now use transparent PNG exports under `public/images/services/cutouts/`, preserving the Figma photo treatment without baking in the blue grid. All six exports contain alpha transparency. Logo, Brand Design, and Web Development cutouts are optimized 810px square exports; the other three are 1080px square. Original flat collage exports remain available for comparison.

The CSS grid reuses the homepage background: 1px white lines at 50% opacity and a shared 24px cell token. The stepped boundary uses the same 24px cells and inherits the card's normal/hover surface color. Source photo pixels and approved Figma artwork remain unchanged; temporary export copies were removed.

## Brand Guidelines card

- Source: Figma `6PdcdMTut5IM75eSXAOmDy`, frame `1056:350`.
- Three original sheets: Fox Berman `1057:440`, Elevate `1057:439`, Savory `1056:430`.
- Upright native PNG exports in `public/images/services/brand-guidelines/`; each is 560 × 1335. Temporary export copies were removed; source layers were not modified.
- `BrandGuidelinesArtwork` uses three separate image layers with identical upright geometry from the updated Figma reference. At rest only the front Savory sheet is visible. Its light background is the existing live `bg-brand-grid` primitive with a colors-only light-tone variant, using 18px cells (75% of the original 24px), with 1px blue lines at 50% opacity and a shared grid centered on both axes (half-stroke compensated so opposite edges crop evenly). All three Brand Design deliverables share this inverted grid; Logo System and Visual Identity have empty grid artwork slots pending direction. Cell spacing changes independently of container and sheet dimensions.
- Hover rotates the outer sheets by ±15° around their coincident bottom-right corners below the square crop. No position or translation changes. Reduced-motion users retain the straight stack without transitions.

## Logo Design card alternatives

- Savory default: authentic SVG exports from file `8Cx3EZlZyY47TlP27ai06g`, frame `236:342`: horizontal wordmark `289:1204`, square lockup `387:166`, symbol `289:1199`. Files live in `public/images/services/logo-design/`.
- Both Logo design review cards render together on `/services/brand-design#what-you-get`, labelled Savory option and Wingnut option, followed by Visual identity and Brand guidelines. No query toggle is required.
- Recovered responsive-demo source: `/Users/ebaq/Dropbox/PROJECTS/Wingnut/WINGNUT GUIDELINES/Wingnut Logo Package/logo-preview.html`. It switches five logo variants at 1200/900/600/400px viewport breakpoints. Its referenced SVGs and duplicate package ZIPs are zero-byte files locally, so the review alternative uses the existing authentic website assets `public/client-logos/wingnut-logo-black.svg` and `public/images/services/symbols/wingnut.svg`. No missing lettering or logo variants were reconstructed. Dropbox originals remain untouched.
- Both artwork options inherit the approved live grid. Savory panels align on hover. Wingnut narrows a browser frame on hover, switching authentic logo variants at a 240px container breakpoint; resizing the real browser also changes the available frame width. Reduced-motion disables hover resizing. A working two-variant recovery is available at `/scratchpad/wingnut-logo-preview.html`; the original five-variant demo cannot be fully restored without its missing SVG data.

## Logo application review revision

Both live options now share `LogoApplicationsArtwork`: an empty browser-tab corner with favicon, a cropped website header, and an email-signature fragment. Hover gently aligns the three fragments; reduced-motion keeps them static. Savory header uses the authentic tagline lockup exported from Figma `289:1206` (“Expert agents invested in you”). No genuine nonempty Wingnut tagline asset was found; its header instead shows the authentic stacked Wingnut Social lockup from the existing `01-logos.png` board, cropped with HTML/CSS without modifying the source image. Its signature retains the untagged horizontal SVG.

## Savory Figma correction 1061:525

The Savory card now follows the supplied mockup's single browser crop, replacing the invented three-fragment arrangement. The 316×155 crop remains at (187,138) on the 1080×1080 artwork coordinate system. A native vector window/tab supplies the explicitly requested missing rounded-tab geometry and red/yellow/green controls. Its 90×90 burgundy favicon is the unmodified export of `1061:608`. The approved live grid remains separate and unchanged. Wingnut comparison remains alongside; this Figma node specifies only Savory.

## ManyPixels designer comparison

A second Logo design card displays the selected designer illustration from Figma `1062:285`, image layer `1062:365`. `designer-azureline.png` is the original transparent 3126×3126 PNG; internal white fills remain opaque. HTML places it at x=0.5, y=20, width=1081 on the 1080 square coordinate system, independently of the approved live grid. The Savory card remains alongside, with matching copy, typography and the shared stepped boundary. No Brand Strategy changes.

## Current simplified scope

Only the six `/services` overview cards use the recovered local illustration SVGs. Source collection: `/Users/ebaq/Dropbox/PROJECTS/EBAQDESIGN/Ebaqdesign Illustrations/`, also represented in `/Users/ebaq/Dropbox/PRODUCTS/Ebaqdesign Brand Strategy Guide/`. The local filenames use “Flatline”; no separate Azureline-named collection was found. The exact selected tablet designer is present as `designer-flatline-79ef6.svg`. Mapping and provenance: `public/images/services/illustrations/sources.json`. Existing blue accents normalize to #00AFEC; original vector paths, transparency and white fills remain. All share the original 400×300 viewBox and a consistent 90% contain slot over the approved centered 18px light grid with blue lines at 50% opacity and the shared stepped edge.

Choices: map for strategy, tablet designer for logo, painter for brand identity, website monitor for web design, laptop/data dashboard for development, music/movement for motion. The last two are the closest available authentic scenes, not dedicated coding/animation artwork. No purchase or generated replacement.

All six internal service pages now share text-only What you get cards with their existing copy and typography. Temporary comparison cards and artwork blocks were removed from that section. Internal service hero photos, case studies, and Figma explorations remain unchanged.

## Current single-card review

The complete six-SVG pass is retained locally, but `/services` now shows only one illustration comparison. Brand Design's original photo and painter SVG appear first, side by side, followed by the other five original photo cards. Only `brand-design.svg` is visible on this page. Photo cards retain their blue grid and original cell size; the illustration uses the approved light centered 18px grid. The six internal What you get sections remain text-only. No rollout of the remaining five illustrations is active.

## Restored Brand Guidelines only

On `/services/brand-design`, only the Brand guidelines deliverable has artwork restored: current Figma `1057:441`, with individual transparent panel exports `1066:2` (Logo), `1066:13` (Typography), and `1066:21` (Color palette). The three PNG panels preserve exact authentic logo/type appearance and original positions; the 18px centered 50%-blue grid and stepped edge remain live, separate layers. The source Figma panels remain editable masters. Logo design and Visual identity stay text-only. The main Services photo/painter comparison is unchanged.

## Restore internal artwork after clarification

Restored the exact pre-removal artwork slots on all six service pages without a reset. Brand Design has the current Savory favicon/browser artwork, its existing empty Visual identity grid, and the newly approved component-based guidelines graphic from `1057:441`, all with the shared stepped edge. The other five pages recover their original three blue-grid “Graphic to come” slots; these did not contain completed illustrations before removal. The main `/services` photo/painter comparison is preserved. Earlier text-only notes above describe superseded temporary states.
