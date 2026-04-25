## Diagnosis

After reviewing the code, the wiring is **correct**:
- `DataModelingIllustration` is exported from `src/components/portfolio/SkillIllustrations.tsx` (line 318).
- It is imported and assigned to the `data-prep-modeling` skill in `skills-data.ts` (lines 3 + 221).
- `SkillsCarousel` renders `<Illustration />` for every skill (line 77).

So the illustration *is* in the DOM — but the current star-schema design likely renders too faintly / sparsely against the dark glass card, especially the four small "DIM" tables at the edges of the viewBox. The previous tweak rounds didn't decisively fix the perceived emptiness.

## Plan

Replace the body of `DataModelingIllustration` in `src/components/portfolio/SkillIllustrations.tsx` with a **simpler, denser, higher-contrast composition** that visually matches the weight of `DataVizIllustration` and `ProgrammingIllustration`.

### New composition (single 320×200 viewBox)

A **central glass "table" stack** flanked by **flowing data streams** — clearer metaphor for "preparation & modeling":

1. **Background** — large violet→cyan glow orb (high opacity 0.85) + dashed orbit ring, identical pattern to ProgrammingIllustration so the card reads as part of the same family.
2. **Left side — raw data streams**: 3 horizontal "data flow" lines made of small dashes/dots in cyan, suggesting incoming raw rows. Each line ends in a small glass chip labeled `CSV`, `API`, `DB`.
3. **Center — the model**: a tall stacked "table" card (glass panel, ~110×130) with:
   - a bold cyan header bar labeled `MODEL`
   - 5 column rows with key-icon dots (cyan + violet) on the left
   - a subtle inner divider showing "fact / dim" split
   - a glowing pulse dot on the header
4. **Right side — clean output**: 3 short "polished" bars (solid glass with cyan top-glow), suggesting the modeled output ready for BI.
5. **Connector arrows** (dashed, cyan→violet gradient stroke) from each raw stream into the model, and from the model out to the output bars, with `animate-pulse-glow` particles travelling along them.

### Why this will be visible

- Uses the **same primitives** (GlassDefs gradients, oklch tokens, animate-pulse-glow) already proven to render on the other cards.
- A single large central element (≥110px tall) guarantees the card has a clear focal point instead of small scattered tables that read as empty space.
- Stroke widths ≥1.6 and fill opacities ≥0.35, matching `DataVizIllustration` density.
- Stays within the safe 20–300 / 20–180 area of the viewBox so nothing gets clipped by the card's padding.

### Files touched

- **Update only**: `src/components/portfolio/SkillIllustrations.tsx` — replace the `DataModelingIllustration` function body. The `<GlassDefs id="dm" />` defs stay; only the visual elements change.

No changes to `skills-data.ts`, `SkillsCarousel.tsx`, or any route — wiring is already correct.

### Acceptance

- The third carousel card ("Data Preparation & Modeling") shows a dense, clearly visible illustration with a central model panel, flow arrows, and labeled raw/output chips.
- Visual weight matches the other two cards (Dashboarding / Reporting).
- No TypeScript errors; no other components affected.