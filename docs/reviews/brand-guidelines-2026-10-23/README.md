# Brand guidelines article expansion

Local preview only. Prepared October 23, 2026.

Preview: [the article](http://127.0.0.1:5173/blog/brand-guidelines), [client work section](http://127.0.0.1:5173/blog/brand-guidelines#my-client-guidelines).

## What changed

- Expanded the existing `/blog/brand-guidelines` article from 2,113 to 5,538 words using the published article as the completeness baseline.
- Retained all 19 original examples and their 19 image sources, with clearer current-versus-archived context where the original destination changed.
- Added seven official-source examples: GitHub, NASA, Slack, Mailchimp, Mozilla, Microsoft and Reddit.
- Added five examples of Arek's client work, with public project-specific social previews linking to the exact guidelines portal.
- Added a scope comparison, buyer lessons, a commissioning checklist, PDF-versus-portal discussion, FAQs and a service/booking CTA.
- Updated the article and its existing blog-index entry to October 23, 2026, preserving other local index changes.

## Verified client portals

| Client | Public guidelines | Existing case study |
|---|---|---|
| Orbio | https://guidelines.online/orbio | /work/orbio |
| Next Dimension | https://guidelines.online/next-dim | /work/next-dimension |
| Savory | https://guidelines.online/savory | /work/savory |
| Fox Berman | https://guidelines.online/foxberman | /work/fox-berman |
| Elevate AB | https://guidelines.online/elevate-ab | /work/elevate |

Public portal metadata, visible portal contents, existing case-study source and project-specific OG previews were checked. No private asset URLs, share tokens, credentials or client quotations were copied into the article.

The landscape-PDF delivery history, PDFs getting lost in email, and creating guidelines.online for client handoff are the user's supplied first-person experience. The article does not present that experience as a measured industry-wide finding, or claim PDFs are obsolete.

**Publication review: Savory remains an unfinished/unlaunched client project.** The latest request expressly includes it in this local article draft. Confirm launch/privacy before publishing; public URL accessibility alone is not publication approval. No Savory campaign has been posted or scheduled by this work.

## Visual provenance

The article has 31 body images. Twelve were added, with responsive local WebP exports, intrinsic dimensions, descriptive alt text, captions and clickable destination links.

- All five client images are their destination's actual `og:image`; they visibly show the correct project name and logos.
- NASA, Slack and Mailchimp use actual destination OG images. Their captions identify these as brand previews, not screenshots of a complete manual.
- GitHub's OG metadata incorrectly points to localhost. Its visible official hero artwork is used instead.
- Mozilla provides no usable OG image; a screenshot of its public brand portal is used instead.
- Reddit provides no OG image; its official guideline resource-card illustration is used instead.
- Microsoft's usable OG could not be retrieved; its official page's Microsoft logo artwork is used instead.

Exact destination and source image URLs are recorded in `visual-sources.json`. Images were inspected visually before use. Existing source images were retained, not regenerated.

## Primary research

| Resource | Verified scope and reason for inclusion |
|---|---|
| https://brand.github.com/ | Brand identity, accessibility, foundations, graphic elements, applications and motion; distinguishes brand toolkit from linked Primer systems. |
| https://www.nasa.gov/nasa-brand-center/brand-guidelines/ | Insignia, logotype, supporting identifiers, typography and usage restrictions. |
| https://slack.com/media-kit | Official logo and product-screen resources; media kit distinguished from full Brand Center. The kit's outbound Brand Center link returned 404, so it is not presented as a verified working destination. |
| https://mailchimp.com/about/brand-assets/ | Official visual brand resources. |
| https://styleguide.mailchimp.com/voice-and-tone/ | Separate verbal guide; stable voice and context-dependent tone. |
| https://brand.mozilla.com/ | Public portal inspected in browser: Start Here, Voice & Message, Visual Elements and separate libraries. |
| https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks | Third-party usage and permission guidance, explicitly not a full internal creative manual. |
| https://redditinc.com/brand | Logo, Snoo, Reddit Sans and links to specialized official resource collections. |

## Repairs and historical context

- Dropbox: replaced the expired Design Standards domain with https://brand.dropbox.com/ and distinguished the earlier screenshot/structure from the current portal.
- Walmart: replaced the unavailable old Lingo address with https://brandcenter.walmart.com/; documented the new portal's actual sections.
- ActiveCampaign: replaced a newsroom redirect with https://www.activecampaign.com/brand; distinguished the old logo-page image from current broader guidelines.
- Instagram, Spotify, TikTok and YouTube: updated to current official resource destinations.
- LG: removed the unofficial PDF mirror; linked https://www.lg.com/global/our-identity/ and labeled the earlier image/context.
- Starbucks: the former Creative Expression host failed certificate verification. No bypass was used; the earlier example is labeled and the link now goes to the official https://about.starbucks.com/multimedia/ asset resource.
- Audi: the old Brand Appearance URL returned 404. The earlier example remains labeled; the current official media resource at https://www.audi.com/en/photos is linked without claiming it is the same full guide.
- Zendesk and Keap: old public guideline links are unavailable; retained the substantive examples and screenshots as archives without dead download links.
- Freepik: its old design URL now redirects to https://www.magnific.com/press. The earlier Freepik example remains explicitly historical; the current resource is labeled accurately.
- Duolingo was researched but excluded: the former design entry point redirects to a blog hub, and its current `/guidelines` page is community policy rather than brand guidelines.

## Validation

- Article JSON parsed; existing blog index parsed; only the intended index row changed relative to the pre-task snapshot.
- Original 19 image sources retained; all 31 article image files exist locally.
- All explicit section links resolve to unique IDs.
- 38 local route/image checks passed, including the article, all body images and case-study/service destinations.
- 39 distinct external links checked: no 404 responses remain. Five automated 403 responses were corroborated by official primary-source web results/content rather than treated as dead pages.
- Desktop at 1280px and mobile at 390px inspected; no page-wide horizontal overflow. The comparison table scrolls within its container.
- Clicked Next Dimension's preview and verified it opened https://guidelines.online/next-dim.
- Production build and route prerendering passed; generated HTML includes the refreshed title and all five portal links.

See `validation.json`, `desktop-preview.png` and `mobile-preview.png` for compact evidence.

Nothing was committed, pushed, deployed or published. The saved `main` checkout contains the local changes alongside unrelated pre-existing work.
