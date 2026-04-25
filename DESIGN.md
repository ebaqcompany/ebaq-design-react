---
version: "alpha"
name: "Ebaq Design"
description: "A flat, senior-led brand and web design system for Ebaq Design: white space, black type, precise layouts, Ebaq blue accents, and portfolio-led proof."
colors:
  primary: "#000000"
  secondary: "#666666"
  tertiary: "#00AFEC"
  neutral: "#FFFFFF"
  surface: "#F5F5F5"
  surface-soft: "#F8FAFB"
  border: "#DADADA"
  muted: "#666666"
  success: "#20C66A"
  on-primary: "#FFFFFF"
  on-tertiary: "#000000"
  on-neutral: "#000000"
typography:
  display-xl:
    fontFamily: "Roboto Flex"
    fontSize: "6rem"
    fontWeight: "300"
    lineHeight: "1"
    letterSpacing: "-0.05em"
    fontVariation: "'wght' 300"
  display-md:
    fontFamily: "Roboto Flex"
    fontSize: "5rem"
    fontWeight: "300"
    lineHeight: "1"
    letterSpacing: "-0.05em"
    fontVariation: "'wght' 300"
  heading-md:
    fontFamily: "Roboto Flex"
    fontSize: "2.5rem"
    fontWeight: "400"
    lineHeight: "1.05"
    letterSpacing: "-0.04em"
    fontVariation: "'wght' 400"
  body-lg:
    fontFamily: "Open Sans"
    fontSize: "1.125rem"
    fontWeight: "400"
    lineHeight: "1.55"
    letterSpacing: "0px"
  body-md:
    fontFamily: "Open Sans"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.55"
    letterSpacing: "0px"
  label:
    fontFamily: "Open Sans"
    fontSize: "0.875rem"
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: "0px"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section-y: "112px"
  page-x: "5%"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    border: "1px solid {colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
    border: "1px solid {colors.tertiary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.on-neutral}"
    border: "1px solid rgba(0, 0, 0, 0.2)"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-secondary-hover:
    backgroundColor: "{colors.tertiary}"
    border: "1px solid {colors.tertiary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  portfolio-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "0"
  pricing-card:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.lg}"
    padding: "32px"
  kanban-card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "16px"
  chat-surface:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
  board-column:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: "16px"
  status-shipped:
    backgroundColor: "{colors.success}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "6px 10px"
  divider:
    backgroundColor: "{colors.border}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "1px"
  metadata:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0"
  blue-pill:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
---

## Overview

Ebaq Design should feel like a senior designer's working desk: direct, calm, organized, and visually sharp. The system is intentionally flat and minimal, using strong typography, whitespace, portfolio imagery, and small blue interaction moments rather than decorative effects.

The brand promise is senior-led speed without agency drag. Interfaces and videos should make it clear that clients work directly with Arek, move through a focused weekly queue, and see tangible progress quickly.

Core reusable assets:

- Logo: `/public/ebaqdesign-logo.svg`
- Mark: `/public/portfolio/ebaq-mark.png` or `/public/ebaq_icon.svg`
- Profile image: `/public/arek-pic-pro.jpg`
- Portfolio identity tiles: `/public/portfolio/identities/*`
- Portfolio website media: `/public/portfolio/websites/*`

## Colors

The palette is white, black, and precise Ebaq blue. Use gray only to separate surfaces or lower visual priority.

- **Primary (#000000):** headlines, pricing panels, high-emphasis buttons, final CTA backgrounds.
- **Tertiary (#00AFEC):** Ebaq interaction color, cursor accents, active states, links, small proof highlights, and motion emphasis.
- **Neutral (#FFFFFF):** the dominant canvas for website and video frames.
- **Surface (#F5F5F5):** alternate section bands, kanban columns, subtle UI panels.
- **Surface Soft (#F8FAFB):** pale gradient starts, chat backgrounds, storyboard/video transitions.
- **Success (#20C66A):** completion states only, especially shipped cards and checkmarks.

Avoid large full-screen blue fills except for short transition beats. The site should mostly read as white, black, and editorial.

## Typography

Use **Roboto Flex** for display and headings. Keep the weight light-to-regular, with tight tracking and strong scale. Use **Open Sans** for descriptions, labels, metadata, buttons, and body copy.

Display type should be large, confident, and minimal: short phrases such as "One senior designer.", "$3,000 / week", and "Build your brand this week." Body text should explain the offer plainly without marketing clutter.

Do not use negative letter spacing on small UI labels. Keep body and label letter spacing at `0`.

## Layout & Spacing

Layouts are full-width sections with constrained inner content. Favor generous vertical spacing, simple one-column hero messaging, and wide media rows. The default page gutter is `5%`.

For motion-video frames, use the same flat composition:

- white or black full-bleed canvas
- one dominant message per scene
- UI mockups built from rounded rectangles, not skeuomorphic app chrome
- portfolio proof cards arranged in clean rows or stacks
- cursor movement as a storytelling device

Avoid nested cards. Use cards for repeated work examples, pricing panels, kanban cards, and modal-like UI only.

## Elevation & Depth

Depth should be quiet. Use soft shadows only when UI objects need separation from a pale background. Portfolio media can have subtle shadow and scale, but the baseline style is flat and crisp.

Prefer:

- `0 8px 24px rgba(0, 0, 0, 0.08)` for light UI cards
- `0 16px 48px rgba(0, 0, 0, 0.16)` for floating video/storyboard objects
- no shadow on text

## Shapes

Cards use `8px` radius by default. Large pricing or CTA panels can use `24px`. Buttons use a full pill radius. Circular imagery is reserved for Arek's profile photo, brand marks, avatars, and cursor/comment pins.

## Components

Primary buttons are black pills with white text and a black 1px border. On hover, they turn Ebaq blue with a blue border and white text. Secondary buttons are transparent pills with black text and a subtle 1px black/20 border. On hover, they also turn Ebaq blue with white text. Real text links stay as anchors, not Relume buttons, and only the text plus icon should change to blue on hover.

When adding new Relume components, do not keep default button behavior if it conflicts with this system. Default Relume buttons map to primary. `variant="secondary"` maps to secondary. Tab triggers are buttons too: inactive tabs use the secondary pill style, active tabs use the primary pill style, and hover turns them Ebaq blue.

Portfolio cards should preserve the original asset aspect ratios and feel like work samples, not decorative placeholders. Kanban boards use four clear columns: Backlog, In Progress, Review, and Shipped. Use blue cursors and small blue status tags to show work moving.

Pricing should stay simple and legible:

- `$3,000 / week` for focused weekly work
- `$10,000 / month` for bigger committed projects
- monthly offer can be framed as the discounted commitment option

## Do's and Don'ts

Do:

- Use real Ebaq assets from `/public` whenever available.
- Keep scenes flat, direct, and consistent with the current website.
- Make Arek's solo senior-designer positioning explicit.
- Use Ebaq blue sparingly for motion, active states, and CTAs.
- Show process through a board, cursor, comments, and shipped states.

Don't:

- Do not copy Kree8 branding, neon-green identity, characters, or exact scene layouts.
- Do not use heavy gradients, purple-blue SaaS palettes, glassmorphism everywhere, or 3D decoration.
- Do not make the experience feel like a large agency team.
- Do not overfill frames with copy; one message per scene.
- Do not invent third-party logos or use Trello branding for the work board.
