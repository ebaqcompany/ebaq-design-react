---
version: "1.0"
name: "Ebaq Design"
purpose: "Agent-facing design system for the Ebaq Design React site."
source_of_truth: "Use this file before creating, pasting, or modifying any UI in this codebase."
brand:
  position: "Senior freelance brand designer for startups, founders, and marketing teams."
  personality: "Direct, minimal, confident, editorial, senior, fast."
  avoid_positioning:
    - "Do not describe Ebaq as a big studio or agency team."
    - "Do not say Arek works with one client at a time."
    - "Do not make the site feel like SaaS marketing wallpaper."
assets:
  logo_on_white: "/ebaqdesign-logo-thinner.svg"
  logo_default: "/ebaqdesign-logo.svg"
  logo_bold: "/ebaqdesign-logo-bold.svg"
  logo_on_black: "/ebaqdesign-logo-big.svg"
  icon_mark_svg: "/ebaq_icon.svg"
  icon_mark_png: "/portfolio/ebaq-mark.png"
  profile_photo: "/arek-pic-pro.jpg"
  portfolio_identity_assets: "/portfolio/identities/*"
  portfolio_website_assets: "/portfolio/websites/*"
  animated_logo_assets: "/portfolio/logos/*.json"
colors:
  black: "#000000"
  white: "#FFFFFF"
  blue: "#00AFEC"
  surface: "#F5F5F5"
  surface_soft: "#F8FAFB"
  border: "rgba(0, 0, 0, 0.2)"
  border_light: "rgba(0, 0, 0, 0.1)"
  muted: "rgba(0, 0, 0, 0.5)"
  muted_strong: "rgba(0, 0, 0, 0.6)"
  white_muted: "rgba(255, 255, 255, 0.6)"
typography:
  display:
    fontFamily: "Roboto Flex"
    fontVariationSettings: "'wght' 300"
    fontWeight: "300"
    lineHeight: "1"
    letterSpacing: "-0.05em"
    mobile: "2.5rem"
    tablet: "5rem"
    desktop: "6rem"
  section_heading:
    fontFamily: "Roboto Flex"
    fontVariationSettings: "'wght' 250 or 'wght' 300"
    fontWeight: "250-300"
    lineHeight: "1"
    letterSpacing: "-0.05em"
    mobile: "3rem"
    tablet: "4.5rem"
    desktop: "6rem"
  compact_heading:
    fontFamily: "Roboto Flex"
    fontVariationSettings: "'wght' 400"
    fontWeight: "400"
    lineHeight: "1.3-1.4"
    letterSpacing: "0 to -0.02em"
    mobile: "1.125rem"
    tablet: "1.25rem"
    desktop: "1.5rem"
  body:
    fontFamily: "Open Sans"
    fontWeight: "400"
    lineHeight: "1.55-1.6"
    letterSpacing: "0"
    mobile: "1rem"
    tablet: "1.125rem"
  label:
    fontFamily: "Open Sans"
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: "0"
    size: "0.875rem to 1rem"
  button:
    fontFamily: "Open Sans"
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: "0"
radii:
  media_card: "8px"
  standard_card: "8px"
  large_panel: "16px"
  modal_panel: "24px"
  button_pill: "99px"
  avatar: "999px"
spacing:
  page_x: "5%"
  section_y_mobile: "4rem"
  section_y_tablet: "6rem"
  section_y_desktop: "7rem"
  component_gap_sm: "0.5rem"
  component_gap_md: "1rem"
  component_gap_lg: "1.5rem"
  grid_gap: "2rem to 5rem"
components:
  primary_button:
    background: "#000000"
    color: "#FFFFFF"
    border: "1px solid #000000"
    radius: "99px"
    hover_background: "#00AFEC"
    hover_border: "#00AFEC"
    hover_color: "#FFFFFF"
  secondary_button:
    background: "transparent"
    color: "#000000"
    border: "1px solid rgba(0, 0, 0, 0.2)"
    radius: "99px"
    hover_background: "#00AFEC"
    hover_border: "#00AFEC"
    hover_color: "#FFFFFF"
  text_link:
    background: "none"
    border: "none"
    color: "#000000"
    hover_color: "#00AFEC"
  pricing_card:
    background: "#FFFFFF"
    border: "1px solid rgba(0, 0, 0, 0.2)"
    radius: "8px"
  divider:
    color: "rgba(0, 0, 0, 0.2)"
    thickness: "1px"
  alternate_section:
    background: "#F5F5F5"
---

# Ebaq Design System Instructions

This file is the design contract for agents working in this repo. Read it before changing the UI. It follows the DESIGN.md convention: machine-readable tokens in YAML frontmatter, then human-readable rules and intent in Markdown. Keep both layers in sync when the system changes.

## Agent Rules

- Preserve the existing Ebaq site language: minimal, senior, direct, spacious, and editorial.
- Prefer the existing Relume component structure and Tailwind conventions already in `src/components`.
- When pasting a new Relume component, strip out default-looking styles that conflict with this file.
- Do not invent a new visual direction unless the user explicitly asks for a redesign.
- Do not add decorative gradients, glassmorphism, purple SaaS palettes, floating blobs, stock-looking illustrations, or generic AI landing-page patterns.
- Do not use bold display typography. Avoid `font-bold` and `font-extrabold` for headings, numbers, and hero text.
- Use real project assets from `/public` before introducing new media.
- Keep text written for founders and buyers. Do not write visible copy that addresses "AI agents" directly.

## Brand Direction

Ebaq Design should feel like a senior designer's working desk: clean, organized, precise, and confident. The site sells direct access to Arek, a senior freelance designer, not an agency team.

The design is mostly white, black, and Ebaq blue. Blue is an interaction/accent color, not a dominant background color. The site should look editorial and portfolio-led, with large type, clean dividers, real work samples, and simple pricing.

Use this positioning language:

- "Senior design partner for startups"
- "Senior brand designer"
- "Freelance brand designer"
- "Direct work with Arek"
- "Brand Sprint"
- "Brand + Website"

Avoid this language:

- "studio" unless the user specifically asks for it
- "agency" as the primary positioning
- "one client at a time"
- "agent-readable" or "for AI agents" in visible page copy

## Logos And Assets

Use the correct logo for the background:

- On white or light backgrounds, use `/ebaqdesign-logo-thinner.svg` in the navbar. It is the current site logo.
- For default SEO/schema references, use `/ebaqdesign-logo.svg`.
- For heavier logo treatments, use `/ebaqdesign-logo-bold.svg` only when the stronger mark is intentionally needed.
- On black backgrounds, use `/ebaqdesign-logo-big.svg`. It contains white letterforms plus the Ebaq blue accent.
- For favicon, app icons, or compact marks, use `/portfolio/ebaq-mark.png` or `/ebaq_icon.svg`.
- For the profile image, use `/arek-pic-pro.jpg`.
- For portfolio identity work, use `/portfolio/identities/*`.
- For website work, use `/portfolio/websites/*`.
- For animated logo rows, use `/portfolio/logos/*.json` with `lottie-react`.

Do not recolor SVG logos in CSS unless the user explicitly asks. Pick the correct asset variant instead.

## Color System

Core palette:

- Black: `#000000`
- White: `#FFFFFF`
- Ebaq blue: `#00AFEC`
- Light gray section: `#F5F5F5`
- Soft surface: `#F8FAFB`
- Primary divider/border: `rgba(0, 0, 0, 0.2)`
- Light divider/border: `rgba(0, 0, 0, 0.1)`
- Muted text: `rgba(0, 0, 0, 0.5)` or Tailwind `text-black/50`
- Strong muted text: `rgba(0, 0, 0, 0.6)` or Tailwind `text-black/60`

Rules:

- Use white as the main canvas.
- Use `#F5F5F5` to alternate major sections. The testimonial section, comparison section, and Layout485-style process section can use this.
- Use black for primary text, major CTAs, and high-emphasis panels.
- Use Ebaq blue for hover states, active progress lines, checkmarks, active accents, and occasional small emphasis.
- Do not make large sections blue unless the user explicitly asks.
- Do not create one-note blue or gray palettes. The page should read as white, black, gray structure, and blue accents.

## Typography

Font loading happens in `index.html`. Base body font is set in `src/index.css`.

Use two fonts only:

- Display/headings/numbers: `Roboto Flex`
- Body/labels/buttons/navigation: `Open Sans`

Never mix both fonts inside the same text element. Use one font per element.

### Display And Heading Type

Use `Roboto Flex` with light-to-regular weights:

- Hero H1: `text-[2.5rem] md:text-[5rem] lg:text-[6rem]`, `line-height: 1`, `letter-spacing: -0.05em`, `fontVariationSettings: 'wght' 300`.
- Section H2: `text-5xl md:text-7xl lg:text-8xl`, `line-height: 1`, `letter-spacing: -0.05em`, `fontVariationSettings: 'wght' 250` or `'wght' 300`.
- Compact H3/card headings: `text-lg md:text-xl lg:text-2xl`, `line-height: 1.3-1.4`, `letter-spacing: 0` to `-0.02em`, `fontVariationSettings: 'wght' 400`.
- Large process numbers such as `01`, `02`, `03`: `text-[6rem] md:text-[14rem]`, `line-height: 1`, `letter-spacing: -0.06em`, `fontVariationSettings: 'wght' 250`.

Rules:

- Do not use `font-bold` on headings or big numbers.
- Do not use negative letter spacing on labels, buttons, body copy, or small navigation text.
- Keep display copy short. Large type should not become paragraph-length.

### Body, Labels, Buttons

Use `Open Sans`:

- Body: `text-base md:text-lg`, `line-height: 1.55-1.6`, `font-weight: 400`, `letter-spacing: 0`.
- Muted body text usually uses `text-black/50` or `text-black/60`.
- Labels/eyebrows: `text-sm` to `text-base`, `font-semibold`, `letter-spacing: 0`.
- Buttons: `text-sm` to `text-base`, `font-semibold`, `letter-spacing: 0`.

Rules:

- Body text should be plain and specific.
- Labels should be useful, not decorative filler.
- Avoid all-caps unless it is metadata or a rare small label.

## Layout And Spacing

Use full-width sections with a constrained `.container`.

Standard section padding:

- `px-[5%]`
- `py-16 md:py-24 lg:py-28`

Grid and layout rules:

- Keep major sections simple: one strong idea per section.
- Avoid nested cards. Use cards for repeated work samples, pricing blocks, modal-like panels, and tools only.
- Keep comparison and table-like sections line-based, using `border-black/20`.
- Alternate white and `#F5F5F5` bands to create rhythm.
- Text should not overlap or overflow at mobile widths.
- Fixed-format UI elements should use stable dimensions, aspect ratios, or min/max constraints.

## Radius And Shape Rules

Use rounded corners consistently:

- Buttons and pills: `rounded-full` or `border-radius: 99px`.
- Profile photos and avatar images: `rounded-full`.
- Portfolio/media cards: `rounded-lg` (`8px`) unless the existing component uses another established value.
- Standard cards and pricing cards: `8px` radius.
- Larger modal/CTA panels: `16px` to `24px` only when the scale justifies it.

Do not use sharp rectangular controls. Tabs are buttons and must be rounded pills.

## Buttons, Tabs, And Links

The global button system is in `src/index.css`. Follow it rather than restyling buttons one by one.

Primary buttons:

- Black fill by default.
- White text.
- Black 1px border.
- Full pill radius.
- Hover turns fill and border Ebaq blue.
- Hover text stays white.

Secondary buttons:

- Transparent fill by default.
- Black text.
- 1px `rgba(0, 0, 0, 0.2)` border.
- Full pill radius.
- Hover turns fill and border Ebaq blue.
- Hover text becomes white.

Tabs:

- Tabs are real buttons.
- Active tab uses the primary button style.
- Inactive tab uses the secondary button style.
- Hover turns blue.
- Tabs must never have square corners.

Text links:

- Text links are anchors, not Relume buttons.
- No background, no pill, no border.
- Whole text plus chevron/icon turns Ebaq blue on hover.
- Use this for secondary navigation like `See Pricing`.

Relume mapping:

- Default Relume `Button` maps to primary.
- `variant="secondary"` maps to secondary.
- `variant="link"` should usually be replaced with a real `<a>` text link if it is visually a text link.

## Sections And Components

### Navbar

- Logo: `/ebaqdesign-logo-thinner.svg`.
- Background: white.
- CTA: primary black button.
- Keep nav quiet. Use `Open Sans`, small text, black/50 default, black hover.

### Hero

- Use large `Roboto Flex` H1 with weight 300, tight tracking, line-height 1.
- The first viewport should quickly communicate the offer and show real portfolio media.
- Do not replace the portfolio rows with decorative graphics.
- CTA logic can point to pricing or booking, but primary CTA styling remains black.

### Layout484 Brand Sprint Section

- White background.
- Keep the scroll text reveal.
- Use one strong paragraph-style heading.
- CTA should be primary unless there is a stronger primary action nearby.

### Layout485 Founder Decision Section

- Light gray background: `#F5F5F5`.
- Use the exact Relume Layout485 behavior unless the user asks for a different component.
- Keep large sticky numbers light, not bold: `Roboto Flex`, `wght 250`, `tracking -0.06em`.
- Animated progress line is Ebaq blue.
- `Book a Call` is a primary button.
- `See Pricing` is a real text link.
- Copy should address founders, not AI agents.

### Pricing

- The offers are `Brand Sprint` and `Brand + Website`.
- Brand Sprint price: `$3,000/wk`.
- Brand + Website price: show `$12,000` crossed out, then `$10,000/mo`.
- Make the discount explicit: "Save $2,000 when you commit upfront."
- Checkmarks are Ebaq blue.
- Borders/dividers use `border-black/20`, not pure black.
- Pricing cards should have rounded corners.
- The primary booking CTA is black by default and blue on hover.

### Comparison

- Use light gray background.
- Use line-based rows with `border-black/20`.
- Keep left side strong black and right side muted black/40.
- Checkmark icons are Ebaq blue.
- X icons stay muted.

### Portfolio

- Use real identity and website assets.
- Preserve aspect ratios.
- Use `rounded-lg` and overflow hidden for media tiles.
- Do not make portfolio cards feel like generic placeholders.

### About

- Profile image: `/arek-pic-pro.jpg`, rounded full.
- Do not place social icons under the profile picture unless the user asks.
- The Contra CTA uses primary button styling.
- Services use the exact service names already present:
  - Brand Strategy
  - Custom Logo Design
  - Logo Animation
  - Color Palette
  - Type System
  - Brand Guidelines
  - Figma Web Design
  - Framer/Webflow Dev.
  - Messaging
  - Pitch Decks
  - Social Media Graphics
  - Motion Graphics

### Booking Footer

- The booking section is a sticky black footer reveal.
- It uses `/ebaqdesign-logo-big.svg` as the large background logo.
- Cal.com link: `ebaqdesign/15min`.
- The footer needs sticky-footer scroll behavior. Existing CTAs may scroll to `document.documentElement.scrollHeight`; do not casually replace this with `scrollIntoView` without testing the sticky footer.
- On mobile, a direct Cal.com button is acceptable when the inline embed is unreliable.

## Icons

- Do not add icon sets unless the user asks.
- If icons are needed, prefer existing project icon patterns or `react-icons` already used in the repo.
- Checkmarks in pricing/comparison are blue.
- Do not add social icons under Arek's profile photo unless explicitly requested.

## Motion

Motion should feel functional and precise:

- Portfolio rows can animate and drag.
- Layout485 uses scroll progress.
- Blue progress lines are acceptable.
- Avoid decorative motion that does not explain work, pricing, process, or portfolio proof.
- Do not add bouncing, parallax-heavy, or overly playful motion.

## Accessibility

- Use semantic headings in order.
- Interactive elements must be keyboard accessible.
- Text links must be anchors with real `href` values.
- Buttons should be buttons when they perform actions like scrolling.
- Keep visible focus states from Relume unless they conflict with the design.
- Maintain sufficient contrast: black on white, white on black, blue as accent.

## SEO And AI Discoverability

The site is optimized for humans first, but structured for crawlers and LLMs:

- Keep schema and metadata in `index.html` accurate.
- Keep `/public/llms.txt` aligned with the visible offer.
- Use plain, extractable copy for what is sold, who it is for, what it costs, and how to book.
- Do not label sections as "agent-readable" in visible UI.
- Use clear headings, short paragraphs, and concrete service names.

## Implementation Checklist For Agents

Before finishing UI work:

- Check that all primary CTAs are black fill with white text by default.
- Check that primary and secondary buttons turn blue on hover.
- Check that tabs are rounded pills.
- Check that headings use `Roboto Flex` and are not bold.
- Check that body, labels, nav, and buttons use `Open Sans`.
- Check that large display text uses tight tracking and line-height 1.
- Check that body/label text uses normal letter spacing.
- Check that media/cards/buttons have rounded corners.
- Check that borders/dividers use `border-black/20` or lighter.
- Check that blue is used as accent, not as a dominant theme.
- Check that real Ebaq assets are used from `/public`.
- Run `npm run build` for code changes.

## Do Not Do

- Do not introduce Inter, Arial, system font stacks, or new display fonts.
- Do not use bold display type.
- Do not use square tabs or square buttons.
- Do not turn text links into pill buttons.
- Do not add social icons under the profile picture unless asked.
- Do not describe Ebaq as a big agency or studio team.
- Do not create a new footer separate from the booking footer unless asked.
- Do not remove or rewrite the sticky booking footer without testing.
- Do not stage unrelated local files, generated videos, deleted case-study assets, or loose untracked assets unless the user explicitly asks.
