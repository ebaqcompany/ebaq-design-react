# Branding package refresh: local review

## Plan and completed changes

Preserve the published article baseline (1,782 words) and useful section structure while making deliverables concrete for small businesses and startups. Updated article is approximately 1,920 words. Retained discovery, logo, messaging, palette, typography, supporting assets, guide, seven process stages, pricing, offer and conclusion; added practical applications and FAQ. Paragraphs are deliberately short.

Current offer follows direct user instruction: $3,000 for about one week / five working days. Core identity and one-page online guide; scoped refinements. Website, decks, stationery, illustration, photography production and motion need explicit scope. No $6,000 or $24,000 legacy pricing remains. Article and grid date: September 10, 2026.

## Research

- https://www.pujoldesign.com/pricing — checked September 10: $1,500 starter kit; $3,000 full identity; differing inclusions reflected in article.
- https://madebyevoke.com/lp/brand-identity-package — checked September 10 through web tool: starting $500, 10–14 business days, listed deliverables. Direct scripted HTTP fetch returned 403, but web source rendered complete pricing and inclusion text.
- Live Fox Berman and Elevate case studies verified in browser, alongside repository assets.
- Internal logo-design-cost, branding-process and logo-redesign links return HTTP 200. Scope comparison does not assume freelancer/studio quality from labels.

## Figma

File: https://www.figma.com/design/6PdcdMTut5IM75eSXAOmDy/EBAQ-DESIGN-26?node-id=841-2

All 17 original imported references retained, clearly named REFERENCE. No duplicate original import.

New editable frames:
- 845:2 — core versus additional scope
- 845:91 — one-week workflow and price
- 845:189 — practical file handoff
- 845:287 — guide depth comparison
- 848:2 — 20 individually editable white vector logos on black

Grid, Roboto Condensed/Caveat type, sticky notes and genuine Ebaqdesign signature follow existing Logo Design Cost article template. Exported PNGs used in article; source artwork remains editable. Palette and social examples use the actual MP4 assets with controls and posters, not flattened Figma animation claims.

## Vector logo source audit

Original SVG geometry retained. White/inverse logo packages preferred; existing portfolio SVG fills converted to white without tracing or rebuilding. Sukoon source background removed and Rentsway artboard whitespace trimmed by reparenting the original vector groups. Optical sizes balanced after screenshot inspection.

Included sources:
- Fox Berman: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/FOX BERMAN/FOXBERMAN LOGO PACKAGE/Logo Primary/White/Web/foxberman-logo-primary-white-rgb.svg`
- Elevate: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/ELEVATE AB/LOGOS/elevate logo package/Wordmark/White/Web/wordmark-white-1920w.svg`
- Brevidee: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/Brevidee/Brevidee Logo Package/Logo/White/Web/brevidee-logo-white-rgb.svg`
- Wingnut: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/Wingnut/Wingnut Logo Package 2/Logo Horizontal/White/Web/wingnut-logo-horizontal-white-rgb.svg`
- Ventur: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/Ventur/LOGO/Logo/White/Web/ventur-logo-white-rgb.svg`
- Airport Executive: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/Airport Executive/Guidelines/AE_logo_white.svg`
- Laura Ceara: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/Laura Ceara/LOGO FILES/Logo/White/Web/laura-ceara-logo-white-rgb.svg`
- Lyntics: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/Lyntics/Lyntics_Logo_Package/02_Logo/01_Digital/03_White/Lyntics_Logo_RGB_White.svg`
- SweetGrass: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/Sweetgrass/Sweetgrass_Logo_Package/02_Logo/01_Digital/03_White/Sweetgrass_Logo_White_RGB.svg`
- AMI: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/AMI/AMI Logo Files/02_Logo/01_Digital/02_Inverse/AMI-logo-inverse-rgb.svg`
- SNM Group: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/SNM Group/SNM Logo Package/Logo/White/Web/snm-group-logo-white-rgb.svg`
- Sukoon: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/Sukoon/Sukoon Logo Artwork/White/sukoon logo white.svg`
- Figr: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/FIGR/Brand Assets/figr_wordmark_white.svg`
- NextDimension: `/Users/ebaq/Documents/github-repos/ebaq-design-react/public/client-logos/nextdim-wordmark.svg`
- Aero: `/Users/ebaq/Documents/github-repos/ebaq-design-react/public/client-logos/aero-health-logo.svg`
- Medihuanna: `/Users/ebaq/Documents/github-repos/ebaq-design-react/public/client-logos/medihuanna-wordmark-black.svg`
- Periti: `/Users/ebaq/Documents/github-repos/ebaq-design-react/public/client-logos/periti-logo-black.svg`
- Brand Makers: `/Users/ebaq/Documents/github-repos/ebaq-design-react/public/client-logos/brand-makers-logo-black.svg`
- The Crowd’s Line: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/TCL/new logo/thecrowdsline logo.svg`
- Rentsway: `/Users/ebaq/Library/CloudStorage/Dropbox/PROJECTS/Rentsway/rentsway braind identity/logo/bw/white bg/renstway-logo-bw-white.svg`

Skipped: Cawley Foundation SVG contained non-path content; no guessed type or raster tracing used. Older raster-only collection entries without a usable SVG located in the bounded project/portfolio search were omitted (including Lataj, Pro Basket, Modern Money, HTCA, Quibids, Flush, GoldenMedia, Earth2, Curly, Getsolar, Dasolar, Forward Progress, Carwao, Justsend and others). This is a selected 20-project collection with newer work, not a claim that all old projects or more total logos were recovered. Illustrator conversion was not needed for the included sources.

## Review and verification

- Production build passed; existing bundle-size/Browserslist/Lottie warnings only.
- Route metadata verification passed for 423 pages.
- Article local asset paths exist; internal links verified.
- Source of truth is main in /Users/ebaq/Documents/github-repos/ebaq-design-react; main matched origin/main at start.
- Local preview: http://127.0.0.1:5183/blog/branding-package with Sanity disabled to show local JSON.
- No commit, push, CMS publication or deployment performed. Unrelated pre-existing local edits preserved.

Final browser QA: revised logo collection verified in article, desktop palette video playback confirmed (readyState 4, currentTime advancing), guide graphic and short paragraphs checked at 390px mobile width with document width also 390px (no horizontal overflow). Temporary viewport reset. Final build, metadata verifier and git diff --check passed after image dimension attributes were added to reserve layout space. Figma audit confirms 20 logo groups with vector paths and zero image fills; all 17 original references remain.
