## Goal

Add the same zoom interactions previously approved (hover magnifier + click-to-lightbox) to the project showcase image, **and** extend the PDF call-to-action so the user can zoom into the PDF inline as well — not just open it in a new tab.

This applies to both `/skills/dashboarding` and `/skills/reporting`, since both share `ProjectShowcase.tsx`.

---

## 1. Project image — hover magnifier + lightbox

In `src/components/portfolio/ProjectShowcase.tsx`:

- **Hover magnifier (lens)**
  - Circular ~180px lens that follows the cursor over the image
  - `background-image` of the same source at ~250% scale, positioned via the cursor's relative x/y
  - Disable the 3D tilt while the lens is active so the zoom stays accurate
  - Hidden on touch devices

- **Click-to-open lightbox**
  - Use existing `src/components/ui/dialog.tsx` (Radix Dialog)
  - Fullscreen-ish content with the image rendered large
  - Controls: mouse wheel to zoom (1x–4x), click-drag to pan, `+` / `-` / `0` keyboard shortcuts, on-screen `ZoomIn` / `ZoomOut` / `Maximize2` / `X` buttons (lucide-react)
  - Hotspots remain visible inside the lightbox at their relative positions
  - State: `lensActive`, `lightboxOpen`, `zoom`, `offset {x,y}`, `dragging`

- **Toolbar overlay** (top-right of the inline image): small glass buttons for "Magnifier on/off" and "Open fullscreen", matching existing glass-panel style.

## 2. PDF — zoomable inline preview

Currently the "Open the PDF" button is just an `<a target="_blank">`. Upgrade it so the user can also preview + zoom the PDF inside the app:

- Convert the PDF link into **two affordances** on the Reporting card:
  1. **"Preview inline"** button → opens a new `Dialog` ("PDF lightbox") containing the PDF
  2. **"Open in new tab"** secondary link → keeps the existing `target="_blank"` behavior as a fallback / download path

- **PDF lightbox implementation** (no new heavy deps):
  - Render the PDF via `<iframe src={pdfUrl} />` filling the dialog
  - Wrap the iframe in a transform container with `scale(zoom)` and translate offsets
  - Same zoom controls as the image lightbox: wheel-to-zoom (1x–3x), click-drag to pan, `+` / `-` / `0` shortcuts, on-screen `ZoomIn` / `ZoomOut` / `RotateCcw` (reset) / `X` buttons
  - Browsers' built-in PDF viewer already provides its own zoom — our wrapper adds an extra outer zoom layer for quick magnification of the whole page, which is what was requested ("zoom in for the PDF too")
  - The 5-page-only restriction is already enforced by serving `public/reports/olist-report-preview.pdf` — no change needed there

- A small caption under the PDF in the dialog: *"Preview limited to the first 5 pages."*

## 3. Wiring & types

- No changes needed to `skills-data.ts` types — `pdfUrl` / `pdfLabel` already exist
- All new state lives inside `ProjectShowcase.tsx`
- Reuses existing design tokens (`accent-cyan`, `accent-violet`, `glass-panel`, `--glow`) — no new colors

## Files to update

- `src/components/portfolio/ProjectShowcase.tsx` — add magnifier, image lightbox, and PDF lightbox

## Out of scope

- No new npm packages (no `react-pdf` / `pdf.js`) — keeps the bundle lean and avoids Worker-runtime concerns; relies on the browser's native PDF rendering inside the iframe
- No changes to the PDF file itself (already truncated to 5 pages)
