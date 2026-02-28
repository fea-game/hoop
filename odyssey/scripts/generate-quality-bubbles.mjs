// generate-quality-bubbles.mjs
// Generates docs/src/content/docs/odyssey/Research/assets/quality-bubbles.svg
// Each quality is a colored circle. Center = most universal (count=6), largest.
// Rings expand outward, circles shrink, as universality decreases.
// Run: node odyssey/scripts/generate-quality-bubbles.mjs  (from repo root)

import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dir, '../../docs/src/content/docs/odyssey/Research/assets');
mkdirSync(OUT_DIR, { recursive: true });

// ── Data ─────────────────────────────────────────────────────────────────────
// [label, genreCount]
const qualities = [
  ['Mastery curve',             6],
  ['Build / customisation',     5],
  ['Social vocabulary',         5],
  ['Skill expression',          4],
  ['Power fantasy',             4],
  ['Progression visibility',    4],
  ['Replayability',             3],
  ['Strategic depth',           3],
  ['Emergent complexity',       3],
  ['Exploration & discovery',   3],
  ['Character / team identity', 3],
  ['Risk / reward tension',     2],
  ['Session flexibility',       2],
  ['Collection drive',          1],
  ['Narrative weight',          1],
];

// ── Colour palette (one per tier 6→1) ────────────────────────────────────────
// Warm→cool gradient moving outward from center
const tierColour = {
  6: '#FF6B6B', // coral-red   — center
  5: '#FF9F43', // amber
  4: '#FECA57', // yellow
  3: '#48DBFB', // sky-blue
  2: '#A29BFE', // lavender
  1: '#C8D6E5', // slate-grey  — outermost
};

// ── Radius per tier (px) ──────────────────────────────────────────────────────
const tierRadius = {
  6: 72,
  5: 58,
  4: 48,
  3: 38,
  2: 30,
  1: 24,
};

// ── Ring orbit radii (distance from canvas centre to blob centre) ─────────────
// tier-6 sits at origin; subsequent tiers step outward
const ringOrbit = {
  6: 0,
  5: 155,
  4: 255,
  3: 355,
  2: 440,
  1: 510,
};

// ── Canvas ────────────────────────────────────────────────────────────────────
const W = 1100;
const H = 1100;
const cx = W / 2;
const cy = H / 2;

// ── Layout: place blobs ───────────────────────────────────────────────────────
// Group qualities by tier
const tiers = {};
for (const [label, count] of qualities) {
  if (!tiers[count]) tiers[count] = [];
  tiers[count].push(label);
}

// For each tier, distribute blobs evenly around the ring.
// For tier-6 (single item) it sits at centre.
// We offset each tier's start angle slightly so labels don't stack vertically.
const tierStartAngle = {
  6: 0,
  5: -Math.PI / 2,            // 12 o'clock
  4: -Math.PI / 2 + Math.PI / 6,
  3: -Math.PI / 2 + Math.PI / 10,
  2: -Math.PI / 2 + Math.PI / 4,
  1: -Math.PI / 2 + Math.PI / 2,
};

const blobs = []; // { x, y, r, colour, label, count }

for (const [tierStr, labels] of Object.entries(tiers)) {
  const tier = Number(tierStr);
  const orbit = ringOrbit[tier];
  const r = tierRadius[tier];
  const colour = tierColour[tier];
  const n = labels.length;
  const startAngle = tierStartAngle[tier] ?? -Math.PI / 2;

  for (let i = 0; i < n; i++) {
    const angle = n === 1 ? 0 : startAngle + (2 * Math.PI * i) / n;
    const x = cx + orbit * Math.cos(angle);
    const y = cy + orbit * Math.sin(angle);
    blobs.push({ x, y, r, colour, label: labels[i], count: tier });
  }
}

// ── Font size per tier ────────────────────────────────────────────────────────
const tierFontSize = {
  6: 13,
  5: 11,
  4: 10,
  3: 9,
  2: 8,
  1: 8,
};

// ── Wrap text into lines that fit inside the circle ───────────────────────────
function wrapText(label, r) {
  // Approximate character width at 1px = ~0.55em for sans-serif
  const charWidth = 5.5; // rough px per char at 10px font
  const maxChars = Math.floor((r * 1.6) / charWidth);
  const words = label.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (test.length <= maxChars) {
      cur = test;
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// ── SVG helpers ───────────────────────────────────────────────────────────────
function circle(x, y, r, fill, stroke, strokeW) {
  return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeW}" opacity="0.92"/>`;
}

function textBlock(x, y, lines, fontSize, colour) {
  if (lines.length === 0) return '';
  const lineH = fontSize * 1.25;
  const totalH = lineH * lines.length;
  const startY = y - totalH / 2 + fontSize * 0.82;
  return lines.map((l, i) =>
    `<text x="${x.toFixed(1)}" y="${(startY + i * lineH).toFixed(1)}" ` +
    `text-anchor="middle" dominant-baseline="auto" ` +
    `font-family="system-ui,sans-serif" font-size="${fontSize}" ` +
    `font-weight="${fontSize >= 12 ? 700 : 600}" fill="${colour}">` +
    `${l}</text>`
  ).join('\n');
}

// ── Draw faint orbit rings (guides) ──────────────────────────────────────────
const orbitRingsSvg = Object.entries(ringOrbit)
  .filter(([t]) => Number(t) !== 6)
  .map(([, orbit]) =>
    `<circle cx="${cx}" cy="${cy}" r="${orbit}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="4 6"/>`
  ).join('\n');

// ── Assemble SVG ──────────────────────────────────────────────────────────────
const circleSvg = blobs.map(b =>
  circle(b.x, b.y, b.r, b.colour, 'rgba(255,255,255,0.25)', 1.5)
).join('\n');

const labelSvg = blobs.map(b => {
  const fs = tierFontSize[b.count];
  const lines = wrapText(b.label, b.r);
  return textBlock(b.x, b.y, lines, fs, '#fff');
}).join('\n');

// Legend
const legendItems = [
  [6, 'Universal (6/6 genres)'],
  [5, 'Near-universal (5/6)'],
  [4, 'Majority (4/6)'],
  [3, 'Common (3/6)'],
  [2, 'Minority (2/6)'],
  [1, 'Niche (1/6)'],
];
const legendX = 28;
const legendStartY = H - 28 - legendItems.length * 24;
const legendSvg = legendItems.map(([tier, desc], i) => {
  const y = legendStartY + i * 24;
  const r = Math.min(tierRadius[tier] * 0.38, 10);
  return [
    `<circle cx="${legendX + 10}" cy="${y + 2}" r="${r}" fill="${tierColour[tier]}" opacity="0.92"/>`,
    `<text x="${legendX + 24}" y="${y + 6}" font-family="system-ui,sans-serif" font-size="11" fill="rgba(255,255,255,0.7)">${desc}</text>`,
  ].join('\n');
}).join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#1a1a2e"/>
      <stop offset="100%" stop-color="#0d0d1a"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Orbit guide rings -->
  ${orbitRingsSvg}

  <!-- Glow layer (soft copy behind) -->
  <g filter="url(#glow)" opacity="0.45">
    ${circleSvg}
  </g>

  <!-- Solid blobs -->
  ${circleSvg}

  <!-- Labels -->
  ${labelSvg}

  <!-- Legend -->
  ${legendSvg}

  <!-- Title -->
  <text x="${cx}" y="30" text-anchor="middle" font-family="system-ui,sans-serif"
        font-size="15" font-weight="700" fill="rgba(255,255,255,0.5)" letter-spacing="2">
    DESIGN QUALITY UNIVERSALITY
  </text>
</svg>
`;

writeFileSync(resolve(OUT_DIR, 'quality-bubbles.svg'), svg, 'utf8');
console.log('✓ src/content/docs/odyssey/Research/images/quality-bubbles.svg written');
