# Chart Development — Agent Instructions

Rules and recipes for building chart components in `docs/src/charts/`. Follow these exactly; all patterns have been validated against the live site.

## Hard constraints

- **Zero client JS.** All logic runs in the Astro frontmatter (Node.js at build time). No `<script>` tags, no `client:*` directives, no browser D3.
- **`viewBox` only.** Never set `width` or `height` attributes on `<svg>`. Use `viewBox="0 0 VW VH"` and CSS `width: 100%; height: auto`.
- **Labels inside the SVG.** All text (axis labels, headers, annotations) must be `<text>` nodes inside the `viewBox`. HTML elements outside the SVG cause unrecoverable page overflow.
- **No default prop data.** Components are generic. Domain data lives in the MDX file as JSX props.
- **`@charts/` import alias.** Always. Never relative paths — they break because Vite resolves MDX from the odyssey source path.

## File structure

```
docs/src/charts/MyChart.astro
```

Import in MDX:
```mdx
import MyChart from '@charts/MyChart.astro';
```

Alias is defined in `docs/astro.config.mjs` (Vite) and `docs/tsconfig.json` (TS paths).

## Layout recipe

Define constants first, derive coordinates from them. Never use magic numbers.

```ts
// ── Constants ─────────────────────────────────────────────────────────────────
const CELL   = 100;    // grid cell size; must be ≥ 2 × R_MAX + gap
const LINE_H = 15;     // px between stacked label lines (declare FIRST — used in TOP)
const GAP    = 16;     // label-edge → bubble-edge spacing, both axes
const R_MAX  = 38;     // largest mark radius in the scale

const LEFT   = 78 + GAP;                        // fits two-line label + gap
const TOP    = LINE_H * 2 + GAP + R_MAX + GAP;  // two header lines + gaps + bubble arc

// ── Coordinate helpers ────────────────────────────────────────────────────────
const colX = (j: number) => LEFT + CELL / 2 + j * CELL;
const rowY = (i: number) => TOP  + CELL / 2 + i * CELL;

// ── ViewBox dimensions ────────────────────────────────────────────────────────
const VW = LEFT + N * CELL;
const VH = TOP  + N * CELL + 24;   // 24px bottom padding
```

**Column header base Y:**
```ts
const baseY = rowY(0) - R_MAX - GAP - 11;
// -11 is empirical; it produces visual parity with the row-label horizontal gap
```

**Multi-line label vertical centring (row labels):**
```ts
const totalH = (label.length - 1) * LINE_H;
const y = cy - totalH / 2 + lineIndex * LINE_H + 4;
// +4 corrects SVG baseline vs. visual cap-height centre
```

## Theming recipe

### Selector rule
Always pair both selectors — Starlight uses either depending on context:

```css
:global([data-theme="dark"]) .cls,
:global(.sl-theme-dark) .cls { … }

:global([data-theme="light"]) .cls,
:global(.sl-theme-light) .cls { … }
```

### Coloured fills — use CSS custom properties, not presentation attributes

```tsx
{/* template */}
<circle
  style={`--fill-dark:${hex1};--fill-light:${hex2}`}
  class="my-bubble"
/>
```

```css
/* style block */
.my-bubble { fill: var(--fill-light); }

:global([data-theme="dark"]) .my-bubble,
:global(.sl-theme-dark) .my-bubble { fill: var(--fill-dark); }
```

### Glow / dark-only effects — CSS opacity, not conditional rendering

```css
.my-glow { opacity: 0; }

:global([data-theme="dark"]) .my-glow,
:global(.sl-theme-dark) .my-glow { opacity: 0.35; }
```

### Label fills

```css
/* Dark mode default — white */
.my-label { fill: #fff; }

/* Light mode override */
:global([data-theme="light"]) .my-label,
:global(.sl-theme-light) .my-label { fill: oklch(15% 0 0); }
```

### Axis / header labels

```css
.pm-label {
  font-family: system-ui, sans-serif;
  fill: oklch(30% 0 0);
  opacity: 0.8;
}

:global([data-theme="dark"]) .pm-label,
:global(.sl-theme-dark) .pm-label { fill: rgba(255, 255, 255, 0.75); }
```

## SVG boilerplate

```astro
---
// all computation here
---

<figure class="chart-figure">
  <svg viewBox={`0 0 ${VW} ${VH}`} role="img" class="chart-svg">
    <!-- content -->
  </svg>
</figure>

<style>
  .chart-figure { margin: 1.5rem 0; }
  .chart-svg { display: block; width: 100%; height: auto; }
</style>
```

## Anti-patterns — do not retry

| Pattern | Why it fails |
|---|---|
| `padding-top: X%` on HTML label wrapper | `%` padding is relative to container **width**, not height |
| `right: 100%` on absolutely-positioned HTML label | Escapes the container; causes page overflow |
| `overflow: visible` on SVG to let labels paint outside | Browser still allocates layout space; causes overflow |
| `fill="red"` presentation attribute on themed elements | CSS cannot reliably override SVG presentation attributes |
| Relative import path in MDX (`../../charts/Foo.astro`) | Vite resolves MDX from odyssey source path; path breaks |
| Default prop data in the component | Couples domain data to the component; violates single-source-of-truth |

## Pre-ship checklist

- [ ] `<svg>` has `viewBox` only — no `width`/`height` attributes
- [ ] CSS has `width: 100%; height: auto` on the SVG
- [ ] All text is `<text>` inside the `viewBox`
- [ ] Every themed fill uses CSS custom properties, not presentation attributes
- [ ] Both `:global([data-theme])` and `:global(.sl-theme-*)` selectors present for each theme rule
- [ ] No data hardcoded in the component — all passed as props
- [ ] MDX import uses `@charts/` alias
