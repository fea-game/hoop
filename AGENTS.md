# hoop

Game design and research docs site built with Astro + Starlight.

## Project structure

- `apps/docs/` — Astro/Starlight site (`npm run dev` in `apps/docs/`)
- `odyssey/docs/` — source-of-truth authoring files (mirrored into `apps/docs/src/content/docs/odyssey/`)
- `fantasy/docs/` — fantasy league docs (mirrored into `apps/docs/src/content/docs/fantasy/`)
- `apps/docs/src/charts/` — static SVG chart components (Astro, D3, server-side only)

## Chart development

When working on files in `docs/src/charts/` or adding charts to MDX files, load the `astro-charts` skill.