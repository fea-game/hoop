#!/usr/bin/env node
/**
 * generateQRIcon({ text, width, height, shape })
 *
 * Generates an SVG icon where a QR-code-like pattern of filled blocks
 * surrounds negative space in the shape of a single letter/character.
 *
 * Parameters (all optional except text):
 *   text   {string}                        — character(s) to render (A–Z only)
 *   width  {number}  default 64            — output SVG width in pixels
 *   height {number}  default 64            — output SVG height in pixels
 *   shape  {"square"|"rounded"|"circle"}   — corner treatment, default "square"
 *
 * Grid resolution adapts to the output size via inferBlockSize():
 *   < 64px  → 1px blocks
 *   ≥ 64px  → 2px blocks
 * So the effective grid = floor(dim / blockSize) cells per axis.
 */

// ── Block size inference ──────────────────────────────────────────────────────
// Returns the pixel size of each logical cell for a given canvas dimension.
// Adjust the thresholds here to change density at any size.
function inferBlockSize(minDim) {
  if (minDim < 64) return 1;
  return 2;
}

// ── Seeded PRNG (mulberry32) ──────────────────────────────────────────────────
function makePRNG(seed) {
  let s = seed >>> 0;
  return () => {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Glyph definitions ─────────────────────────────────────────────────────────
// Each glyph is a function: isMasked(col, row, W, H) → bool
//   col, row — integer cell coordinates within the slot
//   W, H     — slot dimensions in cells (may be non-integer for multi-char strips)
//   Returns true = this cell is EMPTY (part of the letter shape).
//
// Layout convention:
//   barT = max(1, round(min(W,H) / 8))  — bar thickness in cells
//   All positions derived from barT so bars are always consistent.
//   The letter bounding box is centred in the W×H slot.

const GLYPHS = {
  // ── F ──────────────────────────────────────────────────────────────────────
  // Total letter size: 6*barT wide × 10*barT tall (centred in W×H)
  F: (col, row, W, H) => {
    const barT  = Math.max(1, Math.floor(Math.min(W, H) / 14));
    const stemL = Math.round((W - 6 * barT) / 2);
    const topT  = Math.round((H - 10 * barT) / 2);
    const stemR = stemL + 2 * barT;
    const topR  = stemL + 6 * barT;
    const midR  = stemL + 5 * barT;
    const topB  = topT + 2 * barT;
    const midT  = topT + 4 * barT;
    const midB  = midT + 2 * barT;
    const botB  = topT + 10 * barT;
    const inStem   = col >= stemL && col < stemR && row >= topT && row < botB;
    const inTopBar = col >= stemL && col < topR  && row >= topT && row < topB;
    const inMidBar = col >= stemL && col < midR  && row >= midT && row < midB;
    return inStem || inTopBar || inMidBar;
  },

  // ── E ──────────────────────────────────────────────────────────────────────
  // Total letter size: 6*barT wide × 10*barT tall
  E: (col, row, W, H) => {
    const barT  = Math.max(1, Math.floor(Math.min(W, H) / 14));
    const stemL = Math.round((W - 6 * barT) / 2);
    const topT  = Math.round((H - 10 * barT) / 2);
    const stemR = stemL + 2 * barT;
    const topR  = stemL + 6 * barT;
    const midR  = stemL + 5 * barT;
    const topB  = topT + 2 * barT;
    const midT  = topT + 4 * barT;
    const midB  = midT + 2 * barT;
    const botB  = topT + 10 * barT;
    const botT  = botB - 2 * barT;
    const inStem   = col >= stemL && col < stemR && row >= topT && row < botB;
    const inTopBar = col >= stemL && col < topR  && row >= topT && row < topB;
    const inMidBar = col >= stemL && col < midR  && row >= midT && row < midB;
    const inBotBar = col >= stemL && col < topR  && row >= botT && row < botB;
    return inStem || inTopBar || inMidBar || inBotBar;
  },

  // ── A ──────────────────────────────────────────────────────────────────────
  // Total letter size: 6*barT wide × 10*barT tall
  A: (col, row, W, H) => {
    const barT   = Math.max(1, Math.floor(Math.min(W, H) / 14));
    const leftL  = Math.round((W - 6 * barT) / 2);
    const topT   = Math.round((H - 10 * barT) / 2);
    const leftR  = leftL + 2 * barT;
    const rightL = leftL + 4 * barT;
    const rightR = leftL + 6 * barT;
    const topB   = topT + 2 * barT;
    const midT   = topT + 4 * barT;
    const midB   = midT + 2 * barT;
    const botB   = topT + 10 * barT;
    const inLeftLeg  = col >= leftL  && col < leftR  && row >= topT && row < botB;
    const inRightLeg = col >= rightL && col < rightR && row >= topT && row < botB;
    const inTopBar   = col >= leftL  && col < rightR && row >= topT && row < topB;
    const inMidBar   = col >= leftL  && col < rightR && row >= midT && row < midB;
    return inLeftLeg || inRightLeg || inTopBar || inMidBar;
  },

  // ── H ──────────────────────────────────────────────────────────────────────
  H: (col, row, W, H) => {
    const barT   = Math.max(1, Math.floor(Math.min(W, H) / 14));
    const leftL  = Math.round((W - 6 * barT) / 2);
    const topT   = Math.round((H - 10 * barT) / 2);
    const leftR  = leftL + 2 * barT;
    const rightL = leftL + 4 * barT;
    const rightR = leftL + 6 * barT;
    const midT   = topT + 4 * barT;
    const midB   = midT + 2 * barT;
    const botB   = topT + 10 * barT;
    const inLeft  = col >= leftL  && col < leftR  && row >= topT && row < botB;
    const inRight = col >= rightL && col < rightR && row >= topT && row < botB;
    const inCross = col >= leftL  && col < rightR && row >= midT && row < midB;
    return inLeft || inRight || inCross;
  },

  // ── O ──────────────────────────────────────────────────────────────────────
  // Hollow rectangle with 2*barT walls
  O: (col, row, W, H) => {
    const barT  = Math.max(1, Math.floor(Math.min(W, H) / 14));
    const outerL = Math.round((W - 6 * barT) / 2);
    const topT   = Math.round((H - 10 * barT) / 2);
    const outerR = outerL + 6 * barT;
    const botB   = topT + 10 * barT;
    const innerL = outerL + 2 * barT;
    const innerR = outerR - 2 * barT;
    const innerT = topT   + 2 * barT;
    const innerB = botB   - 2 * barT;
    const inOuter = col >= outerL && col < outerR && row >= topT && row < botB;
    const inInner = col >= innerL && col < innerR && row >= innerT && row < innerB;
    return inOuter && !inInner;
  },

  // ── P ──────────────────────────────────────────────────────────────────────
  P: (col, row, W, H) => {
    const barT  = Math.max(1, Math.floor(Math.min(W, H) / 14));
    const stemL = Math.round((W - 6 * barT) / 2);
    const topT  = Math.round((H - 10 * barT) / 2);
    const stemR = stemL + 2 * barT;
    const topR  = stemL + 6 * barT;
    const topB  = topT + 2 * barT;
    const midT  = topT + 4 * barT;
    const midB  = midT + 2 * barT;
    const botB  = topT + 10 * barT;
    const inStem   = col >= stemL && col < stemR && row >= topT && row < botB;
    const inTopBar = col >= stemL && col < topR  && row >= topT && row < topB;
    const inMidBar = col >= stemL && col < topR  && row >= midT && row < midB;
    const inRight  = col >= topR - 2 * barT && col < topR && row >= topT && row < midB;
    return inStem || inTopBar || inMidBar || inRight;
  },
};

// ── Main generation function ──────────────────────────────────────────────────

/**
 * @param {object} opts
 * @param {string} opts.text
 * @param {number} [opts.width=64]
 * @param {number} [opts.height=64]
 * @param {"square"|"rounded"|"circle"} [opts.shape="square"]
 * @param {number} [opts.outlineCoverage=1.0] — fraction (0–1) of outline cells that are
 *   forced filled. 1.0 = solid border around letter and boundary edges (original behaviour).
 *   0.8 = 80% of those cells are filled, 20% left open, giving a softer/broken outline.
 * @param {string} [opts.color] — fill colour for blocks. Any valid CSS/SVG colour string
 *   (e.g. "#1a6b6b", "teal", "rgb(0,128,128)"). When omitted the SVG uses `currentColor`
 *   so the icon inherits colour from its CSS context.
 * @returns {string} SVG markup
 */
export function generateQRIcon({
  text,
  width           = 64,
  height          = 64,
  shape           = 'square',
  outlineCoverage = 1.0,
  color,
}) {
  const chars = (text ?? '').toUpperCase().replace(/[^A-Z]/g, '') || 'F';

  // ── Derive grid dimensions from block size ───────────────────────────────
  const minDim    = Math.min(width, height);
  const blockSize = inferBlockSize(minDim);
  const gridW     = Math.floor(width  / blockSize);
  const gridH     = Math.floor(height / blockSize);

  // ── Corner radius in cells ───────────────────────────────────────────────
  // Expressed as a fraction of the short grid dimension.
  const CORNER_FRAC = { square: 0, rounded: 3 / 16, circle: 0.5 };
  const cornerRadius = Math.round((CORNER_FRAC[shape] ?? 0) * Math.min(gridW, gridH));

  // ── Build combined glyph function ───────────────────────────────────────
  // For multi-char text the grid width is divided into N equal strips.
  // Each glyph sees its local (col, row, stripW, gridH) in integer cell coords.
  const n      = chars.length;
  const stripW = gridW / n;   // may be fractional; glyph fns handle this fine

  function glyphFn(col, row) {
    const idx    = Math.min(Math.floor(col / stripW), n - 1);
    const localC = col - idx * stripW;
    return (GLYPHS[chars[idx]] ?? (() => false))(localC, row, stripW, gridH);
  }

  // ── Boundary helpers ──────────────────────────────────────────────────────
  // "rounded": true Euclidean arc at each of the four corners, radius = cornerRadius.
  // "circle":  single Euclidean circle inscribed in the canvas.

  const circleR  = Math.min(gridW, gridH) / 2;
  const circleCX = gridW / 2;
  const circleCY = gridH / 2;

  function isInsideBoundary(col, row) {
    if (cornerRadius <= 0) return true;
    if (shape === 'circle') {
      const dx = col + 0.5 - circleCX;
      const dy = row + 0.5 - circleCY;
      return Math.sqrt(dx * dx + dy * dy) <= circleR - 0.5;
    }
    if (shape === 'rounded') {
      const r = cornerRadius;
      const inCornerZone = (col < r || col >= gridW - r) && (row < r || row >= gridH - r);
      if (!inCornerZone) return true;
      const fc = col < r ? col : gridW - 1 - col;
      const fr = row < r ? row : gridH - 1 - row;
      const dx = fc + 0.5 - r;
      const dy = fr + 0.5 - r;
      return Math.sqrt(dx * dx + dy * dy) <= r;
    }
    return true;
  }

  function isAdjacentToBoundaryClip(col, row) {
    if (cornerRadius <= 0) return false;
    if (!isInsideBoundary(col, row)) return false;
    for (const [dc, dr] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nc = col + dc, nr = row + dr;
      if (nc < 0 || nc >= gridW || nr < 0 || nr >= gridH) return true;
      if (!isInsideBoundary(nc, nr)) return true;
    }
    return false;
  }

  function isAdjacentToGlyph(col, row) {
    for (const [dc, dr] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nc = col + dc, nr = row + dr;
      if (nc >= 0 && nc < gridW && nr >= 0 && nr < gridH && glyphFn(nc, nr)) return true;
    }
    return false;
  }

  // ── Build logical grid ───────────────────────────────────────────────────

  let seed = 0;
  for (let i = 0; i < chars.length; i++) seed = (seed * 31 + chars.charCodeAt(i)) >>> 0;
  if (seed === 0) seed = 0xDEADBEEF;
  const rand        = makePRNG(seed);
  // Second PRNG for outline coverage decisions — offset seed so it's independent.
  const randOutline = makePRNG(seed ^ 0xA5A5A5A5);

  const raw = Array.from({ length: gridH }, (_, row) =>
    Array.from({ length: gridW }, (_, col) => glyphFn(col, row) ? -1 : rand())
  );

  const BASE = 0.50;

  function countFilledNeighbours(grid, col, row) {
    let n = 0;
    for (const [dc, dr] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[-1,1],[1,1]]) {
      const nc = col + dc, nr = row + dr;
      if (nc < 0 || nc >= gridW || nr < 0 || nr >= gridH) continue;
      if (grid[nr][nc] === 1) n++;
    }
    return n;
  }

  // Pass 1: straight threshold
  const grid = raw.map(row => row.map(v => (v === -1 ? 0 : v < BASE ? 1 : 0)));

  // Pass 2: clustering refinement (2 iterations)
  for (let pass = 0; pass < 2; pass++) {
    const next = grid.map(r => [...r]);
    for (let row = 0; row < gridH; row++) {
      for (let col = 0; col < gridW; col++) {
        if (glyphFn(col, row)) { next[row][col] = 0; continue; }
        if (isAdjacentToGlyph(col, row) || isAdjacentToBoundaryClip(col, row)) {
          next[row][col] = randOutline() < outlineCoverage ? 1 : 0;
          continue;
        }
        const neighbours = countFilledNeighbours(grid, col, row);
        const threshold  = BASE - (neighbours - 3) * 0.08;
        next[row][col]   = raw[row][col] < threshold ? 1 : 0;
      }
    }
    for (let row = 0; row < gridH; row++)
      for (let col = 0; col < gridW; col++)
        grid[row][col] = next[row][col];
  }

  // ── Emit SVG ──────────────────────────────────────────────────────────────
  const vbW  = gridW * blockSize;
  const vbH  = gridH * blockSize;
  const rects = [];
  for (let row = 0; row < gridH; row++) {
    for (let col = 0; col < gridW; col++) {
      if (grid[row][col] === 1 && isInsideBoundary(col, row)) {
        const px = col * blockSize;
        const py = row * blockSize;
        rects.push(`  <rect x="${px}" y="${py}" width="${blockSize}" height="${blockSize}"/>`);
      }
    }
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg"`,
    `     viewBox="0 0 ${vbW} ${vbH}"`,
    `     width="${width}" height="${height}"`,
    `     shape-rendering="crispEdges" fill="${color ?? 'currentColor'}">`,
    ...rects,
    `</svg>`,
  ].join('\n');
}

// ── CLI entry point ───────────────────────────────────────────────────────────
// Usage: node gen-favicon.mjs [text] [width] [height] [shape] [outlineCoverage] [color]
// Defaults: F 64 64 square 1.0  (no color → currentColor)

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const [,, text = 'F', w = '64', h = '64', shape = 'square', oc = '1.0', color] = process.argv;
  process.stdout.write(
    generateQRIcon({ text, width: Number(w), height: Number(h), shape, outlineCoverage: Number(oc), color }) + '\n'
  );
}
