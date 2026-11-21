# Reused /work component — current selected-work section

User replaced Gallery24 with the same existing Portfolio16 component used by /work, then explicitly selected light mode and requested removal of intervening sections before How it works.

Inspected WorkPage.tsx, Portfolio16.tsx, RotatingProjectPreview.tsx and the rendered /work page. Both pages now consume the same workProjects data mapping (same 13 existing case studies and original gallery assets). Reused alternating rows, captions, case-study links, static last-frame Lottie previews and hover image rotation. No nested WorkPage shell or duplicate navbar/footer.

Portfolio16 has an optional embedded mode for section h2/project h3/description h4; /work keeps its original h1/h2/h3 defaults and existing default cover fitting. The logo embed opts into contain for images and xMidYMid meet for Lotties, showing complete original artwork in the existing preview frames. No new gallery design or copied page chrome. Light white background and black text match /work.

Logo page now renders hero, Layout6 overview with exact portrait, selected work, How it works, testimonials, FAQs and CTA/footer. Refinement section and service slider are omitted from the logo-page render only; their source and other pages remain intact. Gallery24 no longer renders on the logo page.

Desktop preview: alternating 600px/600px columns, white background, 13 projects, contain images and meet SVG fitting. Mobile at 390px: single 351px column, no horizontal overflow, case links readable. One main and one h1. /work verified to retain its 13 projects, Selected work h1 and default cover styling.

Production build (387 routes), targeted lint, metadata (386 pages) and whitespace checks pass. main equals origin/main at HEAD; dirty changes remain local, uncommitted and unpublished.
