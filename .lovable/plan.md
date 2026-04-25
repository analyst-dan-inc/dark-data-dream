# Add SVG illustration — Data Preparation & Modeling

## Goal
Give the **Data Preparation & Modeling** card its own visual identity, instead of reusing `ETLIllustration`. The new SVG should tell the story of the skill at a glance: **messy raw sources → cleaning/shaping pipeline → clean star-schema model**.

## Design concept — `DataModelingIllustration`
Three stacked horizontal "lanes" inside the same 320×200 glass viewBox used by the other illustrations, so it sits visually consistent with `DataVizIllustration`, `ReportingIllustration`, and `ETLIllustration`.

1. **Left lane — Raw sources (chaos)**
   - 3 small glass tiles representing heterogeneous inputs: a **CSV** sheet (grid of tiny cells), an **API** brace `{ }`, and a **DB** cylinder.
   - Slightly tilted / uneven — visual hint of "messy".
   - Tiny red/amber dots on a couple of cells = data quality issues.

2. **Middle lane — Transformation pipeline**
   - A horizontal flow with two glass "gear/funnel" nodes connected by a dashed animated stroke (reusing the existing `animate-pulse-glow` / dashed-stroke language from `ETLIllustration`).
   - Small floating particles travel along the line (static SVG, animation-delay staggered) to suggest rows being processed.
   - Micro-labels: `clean` and `shape` in tiny uppercase tracking — matches the typographic voice used elsewhere (`Space Grotesk`, 10–12px).

3. **Right lane — Star-schema model (order)**
   - A central **fact table** rectangle (glass + cyan stroke) surrounded by 4 smaller **dimension tables** connected by thin straight lines = classic star schema silhouette.
   - Each table shows 2–3 horizontal lines as "columns".
   - Subtle radial orb behind the star to make it feel like the "destination of clarity".

## Visual language (consistent with existing illustrations)
- Reuses the same `<GlassDefs id="dm" />` pattern (glass gradient, stroke gradient, glow gradient, orb radial, blur filter).
- Same color tokens: `oklch(0.82 0.13 200)` cyan + `oklch(0.7 0.18 285)` violet accents, `oklch(1 0 0 / …)` whites for glass.
- Same animations already in the codebase: `animate-pulse-glow`, `animate-float-slow`.
- Same 320×200 viewBox + `h-full w-full` sizing so it slots into the card unchanged.

## Files to change

### 1. `src/components/portfolio/SkillIllustrations.tsx`
- Add a new exported component `DataModelingIllustration()` implementing the three-lane composition above.
- Keep all existing illustrations untouched.

### 2. `src/components/portfolio/skills-data.ts`
- Update the import line to also bring in `DataModelingIllustration`.
- For the `data-prep-modeling` skill entry, replace `Illustration: ETLIllustration` with `Illustration: DataModelingIllustration`.
- Leave all other skill entries (Dashboarding, Reporting) untouched — they keep their current illustrations.
- `ETLIllustration` stays exported so it remains available if needed later.

## Out of scope
- No changes to `SkillsCarousel`, the skill detail route, or the skill copy/highlights/tools.
- No new assets, no PNG/JPG — pure inline SVG, matching the rest of the file.
- No animation/CSS additions in `styles.css` — only reuse existing utility classes.

## Acceptance check
- The Data Preparation & Modeling card on `/` shows a distinct, on-brand glass SVG (raw → pipeline → star schema) instead of the current ETL nodes.
- Dashboarding and Reporting cards look identical to before.
- No TypeScript errors; build stays clean.
