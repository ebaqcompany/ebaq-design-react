# Rotating inline symbols

Exact artwork reused from the current site's authorized case-study client SVGs. Symbols were isolated using their existing geometry and a symbol-only viewBox, then rendered white. No paths were invented. Original sources remain unchanged.

| Symbol | Intact source | Export |
|---|---|---|
| Elevate | Original white SVG: https://guidelines.online/elevate-ab/logos/mark-white.svg | public/images/services/symbols/elevate.svg |
| Airport Executive | public/client-logos/airport-executive-logo.svg | public/images/services/symbols/airport-executive.svg |
| Lyntics | public/client-logos/lyntics-logo-black.svg | public/images/services/symbols/lyntics.svg |
| Wingnut | public/client-logos/wingnut-logo-black.svg | public/images/services/symbols/wingnut.svg |
| Periti | public/client-logos/periti-logo-black.svg | public/images/services/symbols/periti.svg |

Dropbox white-mark package files for Airport Executive, Ventur, Lyntics, Wingnut, AMI and Elevate were found under /Users/ebaq/Dropbox/PROJECTS but were all zero-byte files. The intact existing site SVGs above were used instead. All five resulting white symbols were visually inspected together on black and confirmed symbol-only. Savory excluded.

The first Header104 inline image is now a square black button at 1em with 0.15em internal padding. Five white symbols are preloaded and switch every 500ms with no fade or shape change. Click or keyboard activation toggles pause; aria-pressed exposes state. Reduced motion prevents starting the interval; no live announcement of frame changes. The second sketching photo is unchanged.

Production build, targeted lint, metadata verification and whitespace checks passed. Local only, no commit/push/publication.

## Original guidelines assets

Added Next Dimension from https://guidelines.online/next-dim/logos/nextdim-mark-white.svg, linked by https://guidelines.online/next-dim.md. Original 162x162 white symbol-only SVG downloaded without alteration; visually verified. Elevate now also uses the original downloaded white symbol from https://guidelines.online/elevate-ab/logos/mark-white.svg, linked by https://guidelines.online/elevate-ab.md. No extraction/recoloring required for those two assets. Both markdown pages distinguish full logos, wordmarks and marks and provide direct SVG links. Read each guide's actual links rather than guessing asset filenames. Other projects are not yet verified through this route.

Rotation now includes six symbols, still 500ms per frame, with pause and reduced-motion behavior unchanged. Second inline photo unchanged.

## Complete homepage showcase audit

The actual Guidelines.online homepage showcase contains 12 brands: Savory, Spark, Orbio, Elevate AB, Next Dimension, Aero, Ventur, Wingnut, Fox Berman, Medihuanna, Airport Executive, Brevidee. Both carousel rows were inventoried from the live page and all twelve /slug.md documents were read.

Included source SVGs:

| Brand | Guide | Original asset |
|---|---|---|
| Savory | /savory.md | /savory/logos/savory-favicon-inverted.svg |
| Spark | /spark.md | /spark/logos/spark-mark-inverted.svg |
| Orbio | /orbio.md | /orbio/logos/orbio-mark-white.svg |
| Elevate AB | /elevate-ab.md | /elevate-ab/logos/mark-white.svg |
| Next Dimension | /next-dim.md | /next-dim/logos/nextdim-mark-white.svg |
| Aero | /aero.md | /aero/logos/aero-mark-white.svg |
| Ventur | /ventur.md | /ventur/logos/mark-white.svg |
| Wingnut | /wingnut.md | /wingnut/logos/logo-mark-inverted.svg |
| Fox Berman | /foxberman.md | /foxberman/logos/monogram-white.svg |
| Medihuanna | /medihuanna.md | /medihuanna/logos/secondary-logo.svg |
| Airport Executive | /ae.md | /ae/logos/secondary-logo.svg |

All paths above are on https://guidelines.online. Original source files for the nine newly fetched/replaced marks are saved under original-guidelines-symbols/. Source geometry and viewBoxes are preserved. Solid shape fills were normalized to white where originals were black, cream, or colored; no geometry was invented. The live Wingnut guide's V-shaped mark replaces the older site's right-facing mark in this rotation.

Exception: Brevidee provides Logo, Logo Stacked, Logo Slogan and Logo Stacked Slogan, all wordmark lockups. No standalone symbol SVG is supplied, so none was substituted or extracted speculatively.

The user explicitly authorized Savory for this local preview. This does not authorize publication. The previous Lyntics and Periti symbols are retained, giving 13 symbols total: 11 valid showcase marks + 2 prior marks. Interval remains 500ms, pause/resume and reduced-motion behavior unchanged.

User follow-up: Lyntics removed from the active rotation. Final total is 12 marks: all 11 valid showcase marks plus Periti. The unused Lyntics asset remains untouched.

User sizing follow-up: Elevate and Periti use a centered 0.8 scale relative to their previous rendered image boxes; all other marks and the enclosing square are unchanged.
