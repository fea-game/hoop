/**
 * Generates two SVGs:
 *   docs/src/content/docs/odyssey/Research/assets/genre-similarity.svg  — proximity / similarity map
 *     Genres as labelled circles, spring-layout where rest-length ∝ dissimilarity.
 *     Edges drawn between all pairs, thickness + opacity ∝ similarity.
 *     Each shared quality listed on the edge.
 *
 *   docs/src/content/docs/odyssey/Research/assets/genre-mds.svg         — classical MDS (multidimensional scaling) plot
 *     Genres placed as points in 2-D so Euclidean distances approximate the
 *     pairwise dissimilarities computed from the quality table.
 *     Quality annotations shown as a separate legend per cluster.
 *
 * Run: node odyssey/scripts/generate-genre-maps.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const pub   = p => resolve(__dir, "../../docs/src/content/docs/odyssey/Research/assets", p);

mkdirSync(resolve(__dir, "../../docs/src/content/docs/odyssey/Research/assets"), { recursive: true });

// ─── Shared data ─────────────────────────────────────────────────────────────

const GENRES = [
  { id: "BB",   label: "Basketball",    highs: 7 },
  { id: "RPG",  label: "RPG",           highs: 8 },
  { id: "Pok",  label: "Pokémon",       highs: 7 },
  { id: "City", label: "City Building", highs: 6 },
  { id: "RL",   label: "Roguelite",     highs: 11 },
  { id: "DB",   label: "Deck Building", highs: 10 },
];
const N = GENRES.length;

// All 15 pairs — shared 🟩 count + quality names
const PAIRS = [
  { a:"BB",  b:"RPG",  shared:6,  quals:["Build/custom","Progression","Character identity","Mastery curve","Social vocab","Power fantasy"] },
  { a:"BB",  b:"Pok",  shared:5,  quals:["Build/custom","Progression","Character identity","Mastery curve","Social vocab"] },
  { a:"BB",  b:"City", shared:2,  quals:["Skill expression","Mastery curve"] },
  { a:"BB",  b:"RL",   shared:6,  quals:["Build/custom","Progression","Skill expression","Mastery curve","Social vocab","Power fantasy"] },
  { a:"BB",  b:"DB",   shared:5,  quals:["Build/custom","Skill expression","Mastery curve","Social vocab","Power fantasy"] },
  { a:"RPG", b:"Pok",  shared:6,  quals:["Build/custom","Progression","Exploration","Character identity","Mastery curve","Social vocab"] },
  { a:"RPG", b:"City", shared:2,  quals:["Exploration","Mastery curve"] },
  { a:"RPG", b:"RL",   shared:5,  quals:["Build/custom","Progression","Mastery curve","Social vocab","Power fantasy"] },
  { a:"RPG", b:"DB",   shared:4,  quals:["Build/custom","Mastery curve","Social vocab","Power fantasy"] },
  { a:"Pok", b:"City", shared:2,  quals:["Exploration","Mastery curve"] },
  { a:"Pok", b:"RL",   shared:4,  quals:["Build/custom","Progression","Mastery curve","Social vocab"] },
  { a:"Pok", b:"DB",   shared:3,  quals:["Build/custom","Mastery curve","Social vocab"] },
  { a:"City",b:"RL",   shared:5,  quals:["Strategic depth","Emergence","Replayability","Skill expression","Mastery curve"] },
  { a:"City",b:"DB",   shared:5,  quals:["Strategic depth","Emergence","Replayability","Skill expression","Mastery curve"] },
  { a:"RL",  b:"DB",   shared:10, quals:["Build/custom","Strategic depth","Emergence","Replayability","Risk/reward","Skill expression","Mastery curve","Session flex","Social vocab","Power fantasy"] },
];

const IDX = Object.fromEntries(GENRES.map((g, i) => [g.id, i]));

// Dissimilarity matrix  d[i][j] = 1 − shared / min(highs_i, highs_j)
const D = Array.from({ length: N }, () => new Array(N).fill(0));
for (const p of PAIRS) {
  const i = IDX[p.a], j = IDX[p.b];
  const maxShared = Math.min(GENRES[i].highs, GENRES[j].highs);
  const diss = 1 - p.shared / maxShared;
  D[i][j] = D[j][i] = diss;
}

// Similarity S[i][j] = 1 − D[i][j]  (in [0,1])
const S = D.map(row => row.map(d => 1 - d));

const COLOURS = [
  { fill: "#f5c05a", stroke: "#a85c00", text: "#6b3a00" }, // BB
  { fill: "#7aacf0", stroke: "#1a4a9e", text: "#0d2e6e" }, // RPG
  { fill: "#f07ab0", stroke: "#9e1060", text: "#6e003c" }, // Pok
  { fill: "#70d490", stroke: "#1a6e35", text: "#0a3d1a" }, // City
  { fill: "#b898f0", stroke: "#5520a0", text: "#320060" }, // RL
  { fill: "#f07070", stroke: "#9e1010", text: "#6e0000" }, // DB
];

function xe(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function f(n, d=1) { return Number(n).toFixed(d); }

function wrapWords(text, maxCh) {
  const words = text.split(" ");
  const lines = []; let cur = "";
  for (const w of words) {
    if (cur && cur.length + 1 + w.length > maxCh) { lines.push(cur); cur = w; }
    else cur = cur ? cur + " " + w : w;
  }
  if (cur) lines.push(cur);
  return lines;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1.  SIMILARITY / PROXIMITY MAP
// ═══════════════════════════════════════════════════════════════════════════════
//
// Spring-layout: iterative force-directed placement.
// Attractive force along each edge proportional to dissimilarity (similar genres
// pulled close), repulsive force between all pairs to prevent collapse.
// Edge thickness/opacity encodes similarity; quality names shown in a table below.

function buildSimilarityMap() {
  const W = 1000, H = 1100;   // extra height for the pair table below the graph
  const GRAPH_H = 680;         // height of the force-directed area
  const CX = W / 2, CY = GRAPH_H / 2 + 40;
  const NODE_R = 48;           // larger nodes to fit two-line labels comfortably

  // ── Force-directed layout ─────────────────────────────────────────────────
  let pos = GENRES.map((_, i) => {
    const a = (i / N) * 2 * Math.PI - Math.PI / 2;
    return { x: CX + 220 * Math.cos(a), y: CY + 200 * Math.sin(a) };
  });

  const STEPS = 1200;
  const K_ATTR = 0.012;
  const K_REP  = 22000;
  const DAMPING = 0.85;
  let vel = pos.map(() => ({ x: 0, y: 0 }));
  const MAX_DIST = 320;

  for (let step = 0; step < STEPS; step++) {
    const force = pos.map(() => ({ x: 0, y: 0 }));
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pos[j].x - pos[i].x;
        const dy = pos[j].y - pos[i].y;
        const dist = Math.sqrt(dx*dx + dy*dy) || 0.001;
        const nx = dx / dist, ny = dy / dist;
        const restLen = D[i][j] * MAX_DIST + 60;
        const springF = K_ATTR * (dist - restLen);
        force[i].x += springF * nx;  force[i].y += springF * ny;
        force[j].x -= springF * nx;  force[j].y -= springF * ny;
        const repF = K_REP / (dist * dist);
        force[i].x -= repF * nx;  force[i].y -= repF * ny;
        force[j].x += repF * nx;  force[j].y += repF * ny;
      }
    }
    for (let i = 0; i < N; i++) {
      force[i].x += (CX - pos[i].x) * 0.003;
      force[i].y += (CY - pos[i].y) * 0.003;
    }
    for (let i = 0; i < N; i++) {
      vel[i].x = (vel[i].x + force[i].x) * DAMPING;
      vel[i].y = (vel[i].y + force[i].y) * DAMPING;
      pos[i].x += vel[i].x;
      pos[i].y += vel[i].y;
    }
  }

  const MARGIN = NODE_R + 60;
  for (const p of pos) {
    p.x = Math.max(MARGIN, Math.min(W - MARGIN, p.x));
    p.y = Math.max(MARGIN + 30, Math.min(GRAPH_H - MARGIN, p.y));
  }

  // ── SVG output ────────────────────────────────────────────────────────────
  const o = [];
  o.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`);
  o.push(`<style>
  .sm-edge  { fill: none; }
  .sm-nl    { font: bold 14px system-ui,sans-serif; text-anchor: middle; dominant-baseline: central; }
  .sm-ec    { font: bold 11px system-ui,sans-serif; text-anchor: middle; fill: #333; dominant-baseline: central; }
  .sm-title { font: bold 15px system-ui,sans-serif; text-anchor: middle; }
  .sm-leg   { font: 12px system-ui,sans-serif; dominant-baseline: middle; }
  .sm-th    { font: bold 11px system-ui,sans-serif; }
  .sm-td    { font: 11px system-ui,sans-serif; }
</style>`);
  o.push(`<rect width="${W}" height="${H}" fill="#f8f9fa" rx="12"/>`);
  o.push(`<text x="${W/2}" y="24" class="sm-title" fill="#222">Similarity map — genre proximity by shared design qualities</text>`);
  o.push(`<text x="${W/2}" y="42" class="sm-title" font-size="11" font-weight="normal" fill="#666">Edge thickness ∝ similarity · distance ∝ dissimilarity · shared qualities listed below</text>`);

  // Edges — count badge at midpoint only, no quality text on edge
  for (const p of PAIRS) {
    const i = IDX[p.a], j = IDX[p.b];
    const sim = S[i][j];
    const x1 = pos[i].x, y1 = pos[i].y;
    const x2 = pos[j].x, y2 = pos[j].y;
    const strokeW = Math.max(0.5, sim * 10);
    const opacity = 0.15 + sim * 0.65;
    o.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#888" stroke-width="${f(strokeW,1)}" opacity="${f(opacity,2)}" class="sm-edge"/>`);
    // Count badge only for ≥4 shared — small pill at midpoint
    if (p.shared >= 4) {
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      o.push(`<circle cx="${f(mx)}" cy="${f(my)}" r="9" fill="#fff" stroke="#bbb" stroke-width="1" opacity="0.9"/>`);
      o.push(`<text x="${f(mx)}" y="${f(my)}" class="sm-ec">${p.shared}</text>`);
    }
  }

  // Nodes
  for (let i = 0; i < N; i++) {
    const c = COLOURS[i];
    const { x, y } = pos[i];
    o.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${NODE_R}" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2.5" class="sm-node"/>`);
    const parts = GENRES[i].label.split(" ");
    if (parts.length === 1) {
      o.push(`<text x="${f(x)}" y="${f(y)}" class="sm-nl" fill="${c.text}">${xe(parts[0])}</text>`);
    } else {
      const mid = Math.ceil(parts.length / 2);
      const line1 = parts.slice(0, mid).join(" ");
      const line2 = parts.slice(mid).join(" ");
      o.push(`<text class="sm-nl" fill="${c.text}">`);
      o.push(`  <tspan x="${f(x)}" dy="0" y="${f(y - 8)}">${xe(line1)}</tspan>`);
      o.push(`  <tspan x="${f(x)}" dy="16">${xe(line2)}</tspan>`);
      o.push(`</text>`);
    }
  }

  // Legend (two columns, 3 each)
  const legY = GRAPH_H - 10;
  GENRES.forEach((g, i) => {
    const c = COLOURS[i];
    const col = i % 3, row = Math.floor(i / 3);
    const lx = 12 + col * 180, ly = legY + row * 20;
    o.push(`<rect x="${lx}" y="${ly}" width="13" height="13" rx="2" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.5"/>`);
    o.push(`<text x="${lx+18}" y="${ly+6}" class="sm-leg" fill="#333">${xe(g.label)}</text>`);
  });

  // ── Pair table ────────────────────────────────────────────────────────────
  // Only pairs with ≥4 shared qualities, sorted descending by count
  const tableY = GRAPH_H + 46;
  o.push(`<text x="${W/2}" y="${tableY - 16}" class="sm-title" font-size="13" fill="#333">Shared qualities by pair (4 or more)</text>`);

  const tablePairs = PAIRS.filter(p => p.shared >= 4).sort((a, b) => b.shared - a.shared);
  // Two columns
  const COL1_X = 20, COL2_X = W / 2 + 10;
  const ROW_H = 32;
  const half = Math.ceil(tablePairs.length / 2);

  tablePairs.forEach((p, pi) => {
    const col = pi < half ? 0 : 1;
    const row = pi < half ? pi : pi - half;
    const tx = col === 0 ? COL1_X : COL2_X;
    const ty = tableY + row * ROW_H;
    const ca = COLOURS[IDX[p.a]], cb = COLOURS[IDX[p.b]];

    // Coloured genre name chips
    const labelA = GENRES[IDX[p.a]].label;
    const labelB = GENRES[IDX[p.b]].label;
    o.push(`<rect x="${tx}" y="${ty}" width="8" height="8" rx="1" fill="${ca.fill}" stroke="${ca.stroke}" stroke-width="1"/>`);
    o.push(`<text x="${tx+11}" y="${ty+7}" class="sm-th" fill="#222">${xe(labelA)}</text>`);
    const aw = labelA.length * 6.5 + 14;
    o.push(`<text x="${tx + aw}" y="${ty+7}" class="sm-td" fill="#888"> ↔ </text>`);
    const arrowW = 18;
    o.push(`<rect x="${tx + aw + arrowW}" y="${ty}" width="8" height="8" rx="1" fill="${cb.fill}" stroke="${cb.stroke}" stroke-width="1"/>`);
    o.push(`<text x="${tx + aw + arrowW + 11}" y="${ty+7}" class="sm-th" fill="#222">${xe(labelB)}</text>`);
    const bw = labelB.length * 6.5 + 14;
    o.push(`<text x="${tx + aw + arrowW + bw}" y="${ty+7}" class="sm-td" fill="#555"> (${p.shared})</text>`);
    // Quality list on next line
    o.push(`<text x="${tx+10}" y="${ty+20}" class="sm-td" fill="#555">${xe(p.quals.join(" · "))}</text>`);
  });

  o.push(`</svg>`);
  return o.join("\n");
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2.  MDS PLOT  (Classical / Torgerson MDS)
// ═══════════════════════════════════════════════════════════════════════════════
//
// Steps:
//   1. Squared dissimilarity matrix  Δ²
//   2. Double-centre → B matrix
//   3. Power-iteration for top-2 eigenvectors of B
//   4. Coordinates = eigenvectors × sqrt(eigenvalues)
//   5. Place on canvas; annotate with quality labels per cluster region.

function classicalMDS() {
  // 1. Squared dissimilarity
  const D2 = D.map(row => row.map(d => d * d));

  // 2. Double-centring:  B = -½ J D² J  where J = I - (1/n)11ᵀ
  const rowMean = D2.map(row => row.reduce((s, v) => s + v, 0) / N);
  const grandMean = rowMean.reduce((s, v) => s + v, 0) / N;
  const B = D2.map((row, i) =>
    row.map((v, j) => -0.5 * (v - rowMean[i] - rowMean[j] + grandMean))
  );

  // 3. Power iteration for top-2 eigenvectors of B
  function powerIter(M, iters = 400) {
    let v = Array.from({ length: N }, (_, i) => i === 0 ? 1 : Math.random() - 0.5);
    for (let it = 0; it < iters; it++) {
      const Mv = v.map((_, i) => M[i].reduce((s, mij, j) => s + mij * v[j], 0));
      const norm = Math.sqrt(Mv.reduce((s, x) => s + x * x, 0)) || 1;
      v = Mv.map(x => x / norm);
    }
    const eigenval = v.reduce((s, vi, i) =>
      s + vi * M[i].reduce((ss, mij, j) => ss + mij * v[j], 0), 0);
    return { vec: v, val: eigenval };
  }

  // Deflate matrix after extracting first eigenvector
  function deflate(M, vec, val) {
    return M.map((row, i) =>
      row.map((v, j) => v - val * vec[i] * vec[j])
    );
  }

  const e1 = powerIter(B);
  const B2 = deflate(B, e1.vec, e1.val);
  const e2 = powerIter(B2);

  // 4. Coordinates
  const scale1 = Math.sqrt(Math.max(0, e1.val));
  const scale2 = Math.sqrt(Math.max(0, e2.val));
  const raw = GENRES.map((_, i) => ({
    x: e1.vec[i] * scale1,
    y: e2.vec[i] * scale2,
  }));

  return raw;
}

function buildMDS() {
  const W = 1200, H = 860;
  const MARGIN = 110;
  const PLOT_W = W - MARGIN * 2;
  const TITLE_H = 60;
  const LEGEND_H = 110;
  const PLOT_H = H - TITLE_H - LEGEND_H - MARGIN / 2;
  // Node radius sized to hold name + up to 4 quality lines
  const NODE_R = 62;
  const NODE_PAD = NODE_R + 20;

  const raw = classicalMDS();

  const xs = raw.map(p => p.x), ys = raw.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const spanX = maxX - minX || 1, spanY = maxY - minY || 1;

  const plotOriginX = MARGIN, plotOriginY = TITLE_H + MARGIN / 2;

  const scaled = raw.map(p => ({
    x: plotOriginX + NODE_PAD + ((p.x - minX) / spanX) * (PLOT_W - NODE_PAD * 2),
    y: plotOriginY + NODE_PAD + ((p.y - minY) / spanY) * (PLOT_H - NODE_PAD * 2),
  }));

  // Quality annotations rendered inside each bubble
  const qualsByGenre = {
    BB:   ["Character identity","Social vocab","Power fantasy","Progression"],
    RPG:  ["Exploration","Narrative","Character identity"],
    Pok:  ["Collection drive","Exploration","Character identity"],
    City: ["Strategic depth","Emergence","Replayability"],
    RL:   ["Risk/reward","Session flex","Emergence"],
    DB:   ["Risk/reward","Session flex","Strategic depth"],
  };

  const o = [];
  o.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`);
  o.push(`<style>
  .md-title { font: bold 15px system-ui,sans-serif; text-anchor: middle; }
  .md-sub   { font: 11px system-ui,sans-serif; text-anchor: middle; }
  .md-axis  { font: 11px system-ui,sans-serif; text-anchor: middle; fill: #888; }
  .md-nl    { font: bold 13px system-ui,sans-serif; text-anchor: middle; }
  .md-ql    { font: 10px system-ui,sans-serif; text-anchor: middle; }
  .md-edge  { fill: none; }
  .md-leg   { font: 12px system-ui,sans-serif; dominant-baseline: middle; }
</style>`);
  o.push(`<rect width="${W}" height="${H}" fill="#f8f9fa" rx="12"/>`);
  o.push(`<text x="${W/2}" y="24" class="md-title" fill="#222">MDS plot — genre similarity in 2-D (classical multidimensional scaling)</text>`);
  o.push(`<text x="${W/2}" y="42" class="md-sub" fill="#666">Distance between genres ≈ design dissimilarity · computed from shared high-quality counts</text>`);

  o.push(`<rect x="${plotOriginX}" y="${plotOriginY}" width="${PLOT_W}" height="${PLOT_H}" fill="none" stroke="#ddd" stroke-width="1" rx="4"/>`);
  o.push(`<text x="${plotOriginX + PLOT_W/2}" y="${plotOriginY + PLOT_H + 20}" class="md-axis">← more dissimilar    Principal component 1    more similar →</text>`);
  o.push(`<text x="${plotOriginX - 26}" y="${plotOriginY + PLOT_H/2}" class="md-axis" transform="rotate(-90,${plotOriginX - 26},${plotOriginY + PLOT_H/2})">PC 2</text>`);

  // Edges
  for (const p of PAIRS) {
    const i = IDX[p.a], j = IDX[p.b];
    const sim = S[i][j];
    if (sim < 0.3) continue;
    const { x: x1, y: y1 } = scaled[i];
    const { x: x2, y: y2 } = scaled[j];
    const sw = Math.max(0.5, sim * 7);
    const op = 0.12 + sim * 0.5;
    o.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#999" stroke-width="${f(sw,1)}" opacity="${f(op,2)}" class="md-edge"/>`);
  }

  // Nodes: circle + name + quality list inside
  for (let i = 0; i < N; i++) {
    const c = COLOURS[i];
    const { x, y } = scaled[i];
    const quals = qualsByGenre[GENRES[i].id] || [];
    const nameParts = GENRES[i].label.split(" ");
    // Layout: name takes 1–2 lines (13px bold), then a 3px gap, then quals at 10px
    const NAME_LINE_H = 15, QUAL_LINE_H = 12, GAP = 4;
    const nameLines = nameParts.length <= 2 ? [nameParts.join(" ")] : [nameParts.slice(0,Math.ceil(nameParts.length/2)).join(" "), nameParts.slice(Math.ceil(nameParts.length/2)).join(" ")];
    const totalH = nameLines.length * NAME_LINE_H + GAP + quals.length * QUAL_LINE_H;
    const startY = y - totalH / 2 + NAME_LINE_H * 0.8;

    o.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${NODE_R}" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2.5"/>`);

    // Genre name
    nameLines.forEach((line, li) => {
      o.push(`<text x="${f(x)}" y="${f(startY + li * NAME_LINE_H)}" class="md-nl" fill="${c.text}">${xe(line)}</text>`);
    });

    // Divider line
    const divY = startY + nameLines.length * NAME_LINE_H + GAP / 2 - 2;
    const divHalfW = NODE_R * 0.55;
    o.push(`<line x1="${f(x - divHalfW)}" y1="${f(divY)}" x2="${f(x + divHalfW)}" y2="${f(divY)}" stroke="${c.stroke}" stroke-width="0.8" opacity="0.5"/>`);

    // Quality lines
    quals.forEach((q, qi) => {
      const qy = startY + nameLines.length * NAME_LINE_H + GAP + qi * QUAL_LINE_H;
      o.push(`<text x="${f(x)}" y="${f(qy)}" class="md-ql" fill="${c.text}">${xe(q)}</text>`);
    });
  }

  // Legend — two rows of 3 to save vertical space
  const legX = 12, legY = plotOriginY + PLOT_H + 38;
  GENRES.forEach((g, i) => {
    const c = COLOURS[i];
    const col = i % 3, row = Math.floor(i / 3);
    const lx = legX + col * 180, ly = legY + row * 20;
    o.push(`<rect x="${lx}" y="${ly}" width="12" height="12" rx="2" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.5"/>`);
    o.push(`<text x="${lx+17}" y="${ly+6}" class="md-leg" fill="#333">${xe(g.label)}</text>`);
  });

  o.push(`</svg>`);
  return o.join("\n");
}

// ─── Write ───────────────────────────────────────────────────────────────────

writeFileSync(pub("genre-similarity.svg"), buildSimilarityMap(), "utf8");
console.log("Written: genre-similarity.svg");

writeFileSync(pub("genre-mds.svg"), buildMDS(), "utf8");
console.log("Written: genre-mds.svg");
