# Law Firm Logos Article Rewrite Framework

Status: draft framework only. Do not publish until the repaired Figma board, final roster, and page WebP exports are reconciled.

## Editorial promise

Answer the searcher’s question immediately: a strong law-firm logo is credible, distinctive, legible, and flexible across the real places a client encounters the firm. The article should read as Arek’s design review, not as a directory or a claim that every logo is objectively “best.”

## Required source gates

- `[FINAL_ROSTER_SOURCE]` must be replaced only with the coordinator-approved 01–100 roster from the repaired `LAW FIRM LOGOS` board.
- `[FINAL_ROSTER_SHA]` should record the reconciliation snapshot used for writing.
- `[PAGE_WEBP_EXPORTS]` must be replaced only with verified WebP paths, ordered to the same roster sequence.
- `[DUPLICATE_REVIEW]` must record any duplicate or disputed board entries before publication.
- Do not carry forward names from the current JSON, historical registry tables, or the competitive article unless they also appear in the approved final roster.
- Do not invent or infer image URLs. A missing export remains an explicit internal asset TODO.

## Proposed article structure

1. **Answer-first introduction**
   - Define what makes a law-firm logo work in one short paragraph.
   - State that the examples are evaluated through typography, symbol, color, composition, positioning, distinctiveness, and practical flexibility.
   - Explain that the list is an editorial selection from `[FINAL_ROSTER_SOURCE]`.

2. **How I evaluate a law-firm logo**
   - Credibility without generic courthouse or scales-of-justice shorthand.
   - Recognition at small sizes and in one color.
   - A point of view that fits the firm’s clients and practice.
   - A system that can extend to website, document, signage, social, and favicon use.

3. **100 examples in ten editorial chunks**
   - Use ten sections of ten entries, grouped after the final board is reconciled.
   - Do not force geographic or practice-area claims from a logo alone.
   - Each entry gets the verified number and exact firm name, one to three original sentences, and the matching `[PAGE_WEBP_EXPORTS]` asset when available.
   - Vary the analysis: wordmark construction, letter spacing, monogram logic, symbol-to-name relationship, contrast, color restraint, visual rhythm, hierarchy, and practical reduction.

   Suggested chunk lenses, to be confirmed against the actual board:

   - Wordmarks that let the name lead
   - Monograms and compact symbols
   - Editorial serif authority
   - Contemporary sans-serif confidence
   - Restrained systems with one strong accent
   - Long names and complex partner lists
   - Boutique firms with a sharper point of view
   - International identities and visual consistency
   - Warm, human, or approachable legal brands
   - Marks that translate especially well across touchpoints

4. **Recurring lessons from the full board**
   - Clarity is a design decision, not a lack of personality.
   - Distinction usually comes from type, proportion, or system behavior rather than a decorative icon.
   - A logo should be judged in context, not only as an isolated artwork tile.
   - Consistency across client touchpoints builds more trust than visual complexity.

5. **Practical checklist**
   - Can the name be read immediately?
   - Is the identity recognizable in one color and at favicon scale?
   - Does it express a specific positioning rather than “law” in general?
   - Does it work on light and dark surfaces, digital and print?
   - Can the same logic extend into a complete identity and website?

6. **Verified EBAQ proof and CTA**
   - Include Fox Berman only if it remains in the approved final roster and the current repository case study remains the supporting proof.
   - Link to the existing case study and `/start` CTA.
   - Avoid unsupported performance, ranking, or client-acquisition claims.

7. **FAQ and metadata**
   - Keep the existing FAQ only after its answers match the final article.
   - Use the exact approved count in title, SEO title, H1, description, index metadata, and visible copy.
   - Validate FAQ/schema only if the shared renderer emits it correctly.

## Entry writing pattern

`[NUMBER]. [EXACT FIRM NAME]`

`[PAGE_WEBP_EXPORT]`

Write a compact observation about the visible design, then a practical takeaway for a professional-services brand. Use first person selectively: “I notice…”, “What I would borrow…”, or “The useful lesson…” Keep claims limited to what the board artwork and approved source notes actually support.

## Completion checklist

- [ ] Reconciled roster has exactly 100 numbered entries.
- [ ] Duplicate and disputed entries are explicitly approved or replaced.
- [ ] Every entry has a verified asset path or an explicit internal TODO.
- [ ] No stale registry-only firms remain.
- [ ] JSON parses and the existing `/blog/law-firm-logos` URL is preserved.
- [ ] Blog index, title, SEO title, H1, description, FAQ/schema, and canonical agree.
- [ ] Local route, responsive layout, image loading, alt text, lint, build, and diff checks pass.
