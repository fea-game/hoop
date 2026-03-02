# hoop

Game design and research docs site built with Astro + Starlight.

## Project structure

- `docs/` — Astro/Starlight site (`npm run dev` in `docs/`)
- `odyssey/docs/` — source-of-truth authoring files (mirrored into `docs/src/content/docs/odyssey/`)
- `fantasy/docs/` — fantasy league docs (mirrored into `docs/src/content/docs/fantasy/`)
- `docs/src/charts/` — static SVG chart components (Astro, D3, server-side only)

## Chart development

When working on files in `docs/src/charts/` or adding charts to MDX files, load the `astro-charts` skill.