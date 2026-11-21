# Gallery 24 selected-work review

Actual Relume Gallery24 source was retrieved through connected Relume-library MCP and saved in relume-gallery24-source.md. The implementation retains its pinned horizontal scroll composition, adapted to the existing black section, site type and project captions. Uses existing framer-motion instead of adding the equivalent motion package.

Gallery24 imports the exact Header78Defaults.row1 roster and reuses its LottieItem player (only exported, homepage behavior unchanged). All fifteen Lotties loop, lazy-load near the viewport and pause off screen; Orbio uses the same existing looping video. Full native JSON dimensions are respected using xMidYMid meet, including Elevate's 4:3 composition. Orbio's source video is 1200x900, verified with ffprobe. No forced cover crop. The horizontal travel is measured to reach the last item precisely instead of assuming three images. Reduced-motion preference uses a native horizontal-scrolling strip instead of pinned translation.

| Brand | Format | Exact homepage asset |
|---|---|---|
| Savory | lottie | /case-study/savory/hero-logo.json |
| Orbio | video | /portfolio/logos/orbio-logo.webm |
| Elevate | lottie | /portfolio/logos/ElevateLogoBGTop.json |
| NextDim | lottie | /portfolio/logos/nextdim-combined-logo-scenes-wordmark-footer-reveal.lottie.json |
| Aero | lottie | /portfolio/logos/aero-logo.json |
| Airport Executive | lottie | /portfolio/logos/airporteexecutive-logo.json |
| Brevidee | lottie | /portfolio/logos/brevidee-logo.json |
| Focal | lottie | /portfolio/logos/focal-logo.json |
| Foxberman | lottie | /portfolio/logos/foxberman-logo.json |
| Laura Ceara | lottie | /portfolio/logos/lauraceara-logo.json |
| Medihuanna | lottie | /portfolio/logos/medihuanna-logo.json |
| Periti | lottie | /portfolio/logos/periti-logo.json |
| Sweetgrass | lottie | /portfolio/logos/sweetgrass-logo.json |
| Ventur | lottie | /portfolio/logos/ventur-logo.json |
| Wingnut | lottie | /portfolio/logos/wingnut-logo.json |
| Lyntics | lottie | /portfolio/logos/lyntics-logo.json |

All 16 assets were observed loaded after traversing the complete gallery on desktop and mobile (390px), with 15 SVG renderers and the Orbio video. No console errors. All Lottie SVGs use xMidYMid meet, no document horizontal overflow, final frame reachable. Case-study links retained for 13 projects; Focal, Laura Ceara and Lyntics have no existing case-study route, so no placeholder links were invented. Lyntics remains excluded from the headline symbol rotation; this gallery includes its homepage animation per the separate all-homepage-assets instruction.

Production build (387 routes), targeted ESLint, metadata verification (386 pages), and git diff --check pass. No unrelated drafts edited. Local on main, uncommitted and unpublished.
