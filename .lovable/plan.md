
## Data Analyst Portfolio — Landing Page

A single-route, dark, futuristic landing page where the **hero IS the carousel**. Visitors land directly on a swipeable skills showcase with parallax depth.

### Visual direction
- **Theme**: Deep space dark (near-black background with subtle blue/cyan undertones), glassmorphic surfaces, thin geometric accents, soft glows. Pro and sober — no neon overload.
- **Typography**: Modern sans (e.g. Space Grotesk / Inter) with one display weight for skill names.
- **Parallax**: Multi-layer depth on scroll & mouse-move — background star/grid field drifts slowly, mid-layer ambient orbs/gradients, foreground carousel sits on top. Subtle, not gimmicky.

### Hero section (the carousel)
- Full-viewport hero. Left side: name, role tagline ("Data Analyst"), brief intro line. Right side (or centered on mobile): the skill carousel.
- **4 glassmorphic skill cards**, one visible at a time, with peek of next/prev card on the sides:
  1. **Data Visualization**
  2. **Reporting**
  3. **ETL**
  4. **Data Programming Languages** (NoSQL, Python, Excel, Power BI)
- **Card anatomy**: Frosted glass panel with subtle gradient border, soft inner glow, custom illustrated visual at top, skill title, description below. 3D-ish tilt on hover (light parallax response to cursor).
- **Per-skill illustrations** (glassmorphic mini-scenes built with layered SVG/CSS — no external assets):
  - *Data Viz*: floating glass chart bars + a glowing line graph orb
  - *Reporting*: stacked translucent dashboard panels with KPI tiles
  - *ETL*: three frosted nodes connected by glowing flow lines (extract → transform → load)
  - *Data Programming*: orbiting language badges (Py / NoSQL / xlsx / PBI) around a central glass core
- **Navigation**: 
  - Swipe left/right (touch + mouse drag)
  - Arrow buttons on either side
  - Dot indicators below
  - Keyboard arrow keys
  - Smooth slide transition with depth scaling (active card larger & brighter, neighbors dimmed/scaled down)

### Customization
- Skill **name** and **description** are easily editable in a single data array at the top of the carousel component, so the user can rewrite content without touching layout.

### Ambient details
- Animated subtle grid / dot matrix in background with parallax drift
- Soft floating gradient orbs (blurred) that respond to scroll
- Cursor-reactive glow on active card
- Smooth fade-in on load

### Below the fold
- A short scroll reveals a minimal footer strip with name + simple contact line (email / LinkedIn placeholders) — keeps the focus on the hero carousel as requested.

### Tech notes
- Single route at `/` (replaces placeholder)
- Embla Carousel (already shadcn-compatible) for swipe + drag
- Pure CSS/SVG illustrations — no image dependencies
- All colors via design tokens in `styles.css` (dark theme refined for futuristic palette)
- Fully responsive: carousel adapts to 710px viewport (single card, smaller peek)
