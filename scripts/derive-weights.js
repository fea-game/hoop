#!/usr/bin/env node
// derive-weights.js — Recomputes actual_weight values from impact scores in goals.yaml.
//
// Usage:
//   node scripts/derive-weights.js
//
// Output:
//   Prints the updated actual_weight values for each pillar.
//   Copy these values back into the `actual_weight` fields in goals.yaml.
//
// Run this script whenever you:
//   - Add a new resolved decision to goals.yaml
//   - Change the impact score of an existing decision
//   - Change the pillar tags on a decision
//
// See docs/dynasty-new/6-meta/weight-derivation-prompt.md for the full
// methodology and impact scoring rules.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

// js-yaml lives in apps/docs/node_modules; resolve it from there.
const _require = createRequire(
  pathToFileURL(resolve(dirname(fileURLToPath(import.meta.url)), '../apps/docs/package.json'))
);
const yaml = _require('js-yaml');

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const GOALS_YAML = resolve(__dirname, '../docs/dynasty-new/6-meta/goals.yaml');

// ── Load ──────────────────────────────────────────────────────────────────────

const data = yaml.load(readFileSync(GOALS_YAML, 'utf8'));
const { pillars, decisions } = data;

// ── Compute impact-weighted totals per pillar ─────────────────────────────────

const pillarScores = {};
for (const pillar of pillars) {
  pillarScores[pillar.id] = 0;
}

for (const decision of decisions) {
  for (const pillarId of decision.pillars) {
    if (!(pillarId in pillarScores)) {
      console.warn(`  Warning: decision ${decision.id} references unknown pillar "${pillarId}"`);
      continue;
    }
    pillarScores[pillarId] += decision.impact;
  }
}

const grandTotal = Object.values(pillarScores).reduce((s, v) => s + v, 0);

// ── Print results ─────────────────────────────────────────────────────────────

console.log('\nDerived actual_weight values from impact scores:\n');
console.log('  Pillar                      Score    Actual%   Intent%   Gap');
console.log('  ' + '-'.repeat(64));

const updates = [];
for (const pillar of pillars) {
  const score = pillarScores[pillar.id] ?? 0;
  const actualPct = (score / grandTotal) * 100;
  const gap = actualPct - pillar.intent_weight;
  const sign = gap > 0 ? '+' : '';
  const name = pillar.name.padEnd(28);
  console.log(
    `  ${name} ${String(score).padStart(5)}    ${actualPct.toFixed(1).padStart(6)}%  ` +
    `${pillar.intent_weight.toFixed(1).padStart(6)}%  ${sign}${gap.toFixed(1)}pp`
  );
  updates.push({ id: pillar.id, actual_weight: Math.round(actualPct * 10) / 10 });
}

console.log(`\n  Grand total impact score: ${grandTotal}`);

// ── Offer to write back ───────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (args.includes('--write')) {
  // Patch actual_weight values in the raw YAML text to preserve comments/formatting.
  let raw = readFileSync(GOALS_YAML, 'utf8');
  let patched = raw;

  for (const update of updates) {
    // Match lines like:  actual_weight: 23.1  (with optional trailing whitespace)
    // preceded by a line containing the pillar's id: field.
    // Strategy: replace each occurrence sequentially (one per pillar).
    const re = new RegExp(
      `(  - id: ${update.id}[\\s\\S]*?actual_weight: )([\\d.]+)`,
    );
    patched = patched.replace(re, `$1${update.actual_weight}`);
  }

  writeFileSync(GOALS_YAML, patched, 'utf8');
  console.log('\n  Written back to goals.yaml (--write flag detected).');
} else {
  console.log('\n  Run with --write to update actual_weight values in goals.yaml automatically.');
}
