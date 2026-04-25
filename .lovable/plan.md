# Fix: Data Modeling illustration appears tiny on desktop

## Root cause

All other skill illustrations (`DataVizIllustration`, `ReportingIllustration`, `ETLIllustration`, `ProgrammingIllustration`) use **`viewBox="0 0 320 200"`** — a landscape ratio that matches the card's illustration area (a wide, short slot, ~`h-[14rem]` tall).

`DataModelingIllustration` was authored with **`viewBox="0 0 280 360"`** — a portrait ratio. With SVG's default `preserveAspectRatio="xMidYMid meet"`, the portrait viewBox gets scaled down to fit the container's *height*, then horizontally centered. Result: a narrow vertical sliver in the middle of a wide slot, which is exactly the "still too small" symptom — even after enlarging the container.

So yes, the SVG's internal aspect ratio is the problem, not the container, and not the size of the shapes inside it.

## Fix

Refactor `DataModelingIllustration` in `src/components/portfolio/SkillIllustrations.tsx` to a **landscape `viewBox="0 0 320 200"`**, identical to the other illustrations. The three-stage story is rotated 90° from the current top→bottom flow into a left→middle→right flow — matching the horizontal-flow language already established by `ETLIllustration`.

### New layout (landscape, 320 × 200)

- **Left column — Raw Sources** (x ≈ 18–80)
  - CSV sheet tile (slightly tilted), API `{ }` tile, DB cylinder tile stacked vertically with small offsets — keeps the "messy" feel.
- **Middle column — Transformation pipeline** (x ≈ 110–200)
  - "CLEAN" funnel node and "SHAPE" hex/gear node connected by an animated dashed `url(#dm-stroke)` path.
  - Travelling particles using `animate-pulse-glow` with staggered `animationDelay` (same technique as `ETLIllustration`).
  - Tiny `Space Grotesk` uppercase labels (`CLEAN`, `SHAPE`).
- **Right column — Star schema** (x ≈ 230–305)
  - Central FACT table rectangle with header bar + column lines (kept compact, ~50×46).
  - 4 dimension tables placed N/S/E/W around the fact, connected by thin dashed lines — the classic star silhouette.
  - Subtle radial orb behind the star (reusing `url(#dm-orb)` + `url(#dm-blur)`) as the "destination of clarity".

### What stays the same

- Same `<GlassDefs id="dm" />` block — no defs changes.
- Same color tokens: cyan `oklch(0.82 0.13 200)`, violet `oklch(0.7 0.18 285)`, white glass.
- Same animation classes: `animate-pulse-glow`, `animate-float-slow`.
- Same `className="h-full w-full"` on the `<svg>`.
- All other illustrations untouched.
- `SkillsCarousel.tsx` untouched — the container is already correctly sized; only the SVG's internal viewBox needs to match.

## Acceptance check

- The Data Preparation & Modeling card's illustration fills the visual slot at the same scale as the Dashboarding, Reporting, and Programming cards across mobile and desktop (1304×900 viewport included).
- The three stages (raw sources → pipeline → star schema) read clearly left-to-right.
- No TypeScript errors; no changes to `styles.css` or carousel layout.
