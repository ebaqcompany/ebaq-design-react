# Service pages and site structure plan

Draft for review · November 7, 2026 · No implementation authorized by this document.

## Goal

Attract projects spanning brand identity, website, and motion, with a clear route into a monthly engagement. Keep logo inquiries useful while showing the broader work Arek can lead. Make services understandable to buyers and search systems; do not promise rankings, AI recommendations, or revenue.

## What exists

The local project already has service routes for brand strategy, logo design, brand design, web design, web development, and motion graphics. `ServiceDetailLayout` and service data provide a shared foundation. Logo, Brand, and Web have more developed visual treatments; Motion uses the simpler hero. The shared body still repeats a generic branding process and, on several routes, the full services grid. These are local-source findings, not verification of production or indexing.

## Page responsibilities

| Page | Main responsibility | Keep focused |
| --- | --- | --- |
| Home | Introduce the full offer and show the quality of work | Selected work, connected capabilities, weekly/monthly entry points, comparison, proof |
| Services | Help buyers choose an engagement | Four primary services, brief scope differences, links to detail pages |
| Service detail | Demonstrate this specific capability | Relevant work, deliverables, process, scope, objections |
| About | Establish trust in Arek as the person doing the work | Experience, approach, studio/process photographs, toolkit, testimonials |
| Pricing | Explain the commercial arrangement | Weekly versus monthly, inclusions, boundaries, examples, booking |
| Case studies | Prove the work across several touchpoints | Actual contribution and artifacts; results only where supported |

Keep the complete comparison on Home and Pricing. Do not add it to About by default. Keep the detailed Brand Sprint inclusions on Pricing and Brand Design; About can link to them. Replace repeated long timelines with a short summary wherever process is not the page's main question.

## Priority and positioning

1. **Brand Design:** flagship page and first completed template. A usable identity across the business, with a path into website and launch work.
2. **Web Design:** designed and built websites grounded in the brand. Include Framer, Webflow, and custom development in the scope section without making separate platform pages now.
3. **Motion Graphics:** logo animation, brand motion, website motion, and social assets demonstrated through real moving examples. Do not imply unsupported film-production capabilities.
4. **Logo Design:** retain the dedicated entry point. Explain refresh versus new mark, then show how the logo becomes a broader identity.
5. **Pitch Decks, later:** only after defining the offer and selecting enough approved slide examples to support a useful standalone page.

Retain existing Strategy and Development URLs. They can remain supporting detail pages; do not remove, redirect, or rename them as part of the template work without a separate decision. Keep Brand Design's current canonical URL and existing Identity Systems compatibility.

## One reusable service template

| Order | Shared section | Service-specific input |
| --- | --- | --- |
| 1 | Hero with one booking action | Buyer situation, service name, concise promise, strongest relevant media |
| 2 | Work and evidence | Two or three real projects, contribution captions, case-study links |
| 3 | Deliverables | Four to six meaningful groups, illustrated where useful |
| 4 | Process | Three or four steps for this service, with review points |
| 5 | Engagement and scope | Suitable engagement, dependencies, exclusions, pricing link |
| 6 | Proof | Relevant attributed testimonial |
| 7 | FAQs | Four to six genuine questions about this service |
| 8 | Related work and booking | One complementary service and a direct next step |

Use the same section order, type scale, spacing, buttons, and responsive rules. Reuse existing Relume-based components. Choose any missing component once through Relume, then reuse it. Avoid new layouts for every service.

Allow one optional proof module in the work section: logo comparison, website comparison, motion reel, or slide gallery. It replaces the corresponding proof slot rather than making the page longer. Retain strong existing visual work instead of rebuilding it for uniformity alone.

## Brand Design: first template content

- Hero direction: **Brand identity for your next chapter.** Explain the business situation: a new company or an existing identity that no longer fits.
- Evidence: select actual identity projects showing a logo, palette/type, guidelines, and applications. Candidate sources include Elevate, Fox Berman, and NextDimension; verify exact contribution and assets before selecting.
- Deliverable groups: direction and positioning; logo system; color and typography; visual language; guidelines; launch applications. Keep the agreed sprint boundaries explicit.
- Process: align on scope and direction → explore concepts → develop the identity → prepare files and rollout. Do not repeat the full general studio timeline.
- Engagement: distinguish the scoped one-week identity from broader website/motion work and monthly collaboration. Explain what additional work can cover without guaranteeing a complete website and motion package in an arbitrary month.
- FAQs: existing-logo refresh, scope and revisions, client feedback, files and licensing, rollout, website and animation extensions.
- Related service: Web Design, with a concrete bridge from identity into the website.

## Adaptation matrix

| Service | Lead evidence | Deliverables emphasis | Process distinction | Complementary service |
| --- | --- | --- | --- | --- |
| Brand | Applied identity and guidelines | Complete visual system | Direction, concepts, system, handoff | Web |
| Web | Live-site views and comparisons | Structure, design, responsive build, handover | Structure, design, build, launch | Motion |
| Motion | Playable real animations | Logo, transitions, social/web formats | Brief, storyboard/style, animation, exports | Brand |
| Logo | Before/after and sketches | Concepts, mark family, variations, usage | Audit, sketch, refine, prepare | Brand |

## Commercial consistency to resolve before rollout

The current site presents $3,000 weekly and $10,000 monthly. Some shared copy says every additional week is $3,000 and the total is fixed; Pricing describes a monthly saving. Explain when the monthly commitment applies and which arrangement a scoped multiweek project uses. Keep visible copy, FAQ answers, and structured data consistent with the agreed policy. Do not invent a new rate or silently change the offer.

Use the monthly option as a clear route for connected work. Do not turn every service page into another full pricing page.

## Search and AI discovery

- Unique service titles, descriptions, examples, scope, and questions on each page.
- Clear text accompanying media so the service is understandable without playing a video.
- Crawlable internal links from Services, relevant case studies, and related-service sections.
- Accurate canonicals, status codes, route HTML, sitemap entries, and structured data matching visible facts.
- Preserve existing URLs and existing useful content during consolidation.
- Measure relevant inquiries and engagement value alongside organic landing-page traffic and identifiable referrals. Do not equate a crawler visit or a single AI answer with attribution or reliable recommendations.

## Execution sequence

1. Inventory existing sections and assets; mark each keep, simplify, move, or remove. Preserve unrelated local changes.
2. Finalize the Brand Design outline and commercial wording, then complete that one template locally.
3. Review the actual page on desktop, tablet, and phone. Settle the component choices once.
4. Adapt Web, Motion, then Logo using the template and their own evidence.
5. Finish Services navigation and summaries alongside the new pages; align About and Pricing with their distinct roles.
6. Check rendering, links, accessibility, media behavior, metadata, route output, and pricing consistency. Leave local for review; commit and push only when explicitly requested.

Completion means a visitor can identify the service, see credible work, understand scope and the next step, and discover the broader engagement without encountering the same long content on every page.

## Research references

DesignMe's Website Design, Brand Identity, Motion Design, and Pitch Deck pages use a common family of sections with different proof and service-specific process content. Public inspection establishes their presentation, not its traffic or sales performance.

- https://www.designme.agency/services/website-design
- https://www.designme.agency/services/brand-identity
- https://www.designme.agency/services/motion-design
- https://www.designme.agency/services/pitch-deck-design
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
