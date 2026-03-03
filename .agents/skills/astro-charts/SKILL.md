---
name: astro-charts
description: >
  Conventions, recipes, and anti-patterns for building static SVG chart
  components with Astro and D3. Use this skill whenever you are creating or
  editing Astro chart components, adding chart imports to MDX files, or
  debugging layout and theming issues in existing charts. Triggers on any work
  involving chart components (`*.astro` in a charts directory), `@charts/`
  imports, or D3-based server-side SVG development.
---

# Chart development

Read `apps/docs/src/charts/AGENTS.md` immediately — it contains all hard constraints,
layout recipes, theming patterns, anti-patterns, and the pre-ship checklist.
Everything you need to build or edit a chart correctly is in that file.

Do not proceed with chart work before loading it.

## Keeping documentation current

Whenever a new pattern, convention, or strategy emerges during chart work — or an existing one changes or is found to be incorrect — update `apps/docs/src/charts/AGENTS.md` and `apps/docs/src/charts/README.md` before finishing the task. Do not leave discoveries undocumented.
