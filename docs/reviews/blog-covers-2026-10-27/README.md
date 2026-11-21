# Blog cover recovery audit — October 27, 2026

## Findings

- Published index inspected in Chrome: **214 articles**, five blank cover fields: `iconic-logos`, `brand-refresh`, `minimalist-logos`, `negative-space-logo-design`, `best-cannabis-dispensary-logos`.
- Working index: **216 entries**, including existing local drafts. All **414 distinct non-SVG cover/thumbnail/social images** referenced locally exist and decode successfully. No missing referenced local cover file or corrupt image found. This is not a 414-URL live HTTP check.
- What Is Branding loads its correct 900 × 600 cover in live Chrome. No changes to that article.
- Iconic Logos has **1,682 words and 50 logo sections** in both source and live DOM; it has no inline images. The header uses the generic Ebaq SVG because the cover is empty. A second content figure attempts an empty image URL, pushing the text farther down. Its body is present, not erased.

## Recovery evidence

Refreshed remote references with `git fetch --all`. All **14 local and remote references** containing `public/content/blog/iconic-logos.json` have the identical committed file. `git log --all` shows only its addition in `dce86901` (August 17 website launch), with no subsequent article revision.

A readable archive was located at:

`/Users/ebaq/Documents/github-repos/ebaq-design-react-worktree-archive-2026-08-19/ebaqdesign-com/_reference/cms-csv/Ebaq 2020 - Blog Posts - 64cc56e9e377e022d6fca1ac.csv`

Its Iconic Logos row has a body **exactly identical** to the committed article, zero inline images, and empty Main Image (BG), Thumbnail (TH), and Open Graph (OG) fields. CMS metadata records creation November 21, 2025; update January 27, 2026; publication January 27, 2026. These are exported CMS timestamps, not independently verified deployment records or approval evidence. A copy of that row is `iconic-original-export.json`.

Both article copies in the August archive match the same incomplete state. Dropbox copies of the CSV/JSON located in this audit are zero bytes and provide no usable recovery content.

The same original CSV has blank cover fields for all five affected entries. Cannabis Dispensary Logos also has an empty body there and in current Git. Minimalist Logos has 745 words and no inline images. Brand Refresh has 815 original words and three images; Negative Space has 3,043 words and three images. No original cover was recovered for any of these five.

**Conclusion:** available evidence supports incomplete source CMS entries, not a newer full Iconic Logos article being reverted. No recoverable richer version was found in the checked branches and backups. An older or external copy could still exist outside them.

## Initial local proposals, distinguished from recovery (superseded below)

- Iconic Logos: earlier local change reuses the existing Best Logos collage as cover/card/social image. **This is a replacement proposal, not its original cover.** Body unchanged.
- Negative Space: local cover/card/social image reuses a real illustration already inside that exact article. Also a replacement proposal, not recovery of a previously assigned cover.
- BlogPostPage: only render the extra content figure when a source image exists, avoiding a broken empty-URL image. Does not alter article text.
- Three other missing original covers remain unresolved, with Brand Refresh creative direction awaiting collaborative review. No arbitrary assets assigned to them; no empty cannabis body invented.

`cover-fix-only.patch` isolates those image-field changes and the one-line renderer guard from unrelated local article drafts. Do not apply it over the current working files; those changes are already present. It is for review/separate application against HEAD. It is not a commit and does not publish anything.

## Verification

- Production build passed; 388 routes prerendered.
- Route metadata verification passed for 387 pages.
- ESLint passed for BlogPostPage.tsx; `git diff --check` passed.
- Local Chrome preview confirms Iconic Logos replacement images load at 1200px wide, with all 50 article sections present.
- Preview URL must use the trailing slash to serve generated directory HTML: http://127.0.0.1:5192/blog/iconic-logos/
- The first preview navigation without the trailing slash showed the Vite homepage fallback; that was a local server routing issue, not the verified live article behavior.

## Editable Brand Refresh text

`brand-refresh-published-editable.md` contains the current committed/published text for collaborative review. `brand-refresh-local-draft-editable.md` separately contains the earlier unpublished proposal. No new cover direction was finalized.

## Git state

Working on main, synchronized with refreshed origin/main. Existing unrelated dirty drafts preserved. No commit, push or deployment. Review artifacts and proposed changes remain local.


## Final five-cover replacement pass

User subsequently authorized suitable replacements for all five entries. All now have matching article, listing-card and social image references, with dedicated `cover-replacement.webp` assets copied byte-for-byte from existing site imagery:

| Article | Replacement |
|---|---|
| Iconic Logos | Clean black symbol grid from the existing Best Logos article; replaces the earlier text-heavy collage proposal. |
| Brand Refresh | Focal Project Managers before/after image already in the article. |
| Minimalist Logos | Real Nike running-shoe photograph with a visible swoosh, already used on the site. |
| Negative Space | Existing FedEx, Toblerone and New Bedford Whaling Museum comparison with real applications. |
| Cannabis Dispensary Logos | Existing Travel Agency storefront photograph with prominent signage. |

No raster artwork was generated or altered. These are **replacement covers, not recovered originals**. No article body or date was changed by this replacement pass. The cannabis article body remains empty; it needs a separately scoped content decision.

All five article headers and their actual searchable blog cards were inspected in Chrome: every replacement loaded with nonzero natural image width. Each article's Open Graph image points to its replacement. Production build and metadata verification passed again. Working index has zero empty cover fields. Live site remains unchanged.

Visual review: http://127.0.0.1:5192/cover-review.html (also saved as `cover-review.html` here; requires the local preview for image URLs).

The updated `cover-fix-only.patch` isolates image metadata and the renderer guard from unrelated article drafts. The five new asset files listed in `all-five-cover-manifest.json` must accompany that patch; metadata alone is not a deployable fix.

## Additional historical-folder search

The exact Dropbox `EBAQ REACT WEB` folder contains `ebaqdesign-com` and `ebaqdesign_com_new`, matching the user screenshot. Excluding dependency/cache/Git folders, the former has 3,302 files and the latter 49 files; every one currently reads as zero bytes through the local filesystem. This does not prove that no cloud history or other copy exists; it means these local copies supply no recoverable text or images.

Also checked the adjacent local `ebaqdesign_com_webflow/articles`, `studio-ebaqdesign`, the `Ebaqdesign 2023` backup, and the `ebaq-react-code.tgz` file listing. No fuller Iconic Logos article or matching original cover was found there. The tgz is a code archive and has no matching article/export entries. The readable August archive remains the strongest original source: its CMS body exactly matches current committed text and its original image fields are blank.

## User-requested empty article removal

Removed `best-cannabis-dispensary-logos` from source JSON, blog index and sitemap, and removed its unused replacement asset. The retained `cannabis-branding` article no longer links to the empty entry. Added a 301 redirect in Vercel configuration and the matching client route to `/blog/cannabis-branding`. No other article removed. The review gallery and asset manifest now contain four covers.

Build, route metadata verification and AppRoutes ESLint passed; no generated article directory remains for the removed slug. Local Chrome navigation to its old URL reached `/blog/cannabis-branding`. Vercel's HTTP 301 is configuration-only until deployment; the local Vite preview verifies the client redirect.

A scan of the remaining 215 indexed local articles found no further empty bodies (accounting for generated logo rosters) and no exact duplicate normalized text bodies. This does not rule out partial overlap or duplicated sections. Old `cover-fix-only.patch` predates this removal and is superseded; do not apply it as the final change set.
