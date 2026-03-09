# hoop

Game design and research docs site built with Astro + Starlight.

## Project structure

- `apps/docs/` — Astro/Starlight site (`npm run dev` in `apps/docs/`)
- `docs/` — the actual documents of this repository (apps/docs has a symlink to them)
- `apps/docs/src/charts/` — static SVG chart components (Astro, D3, server-side only)

## Chart development

When working on files in `docs/src/charts/` or adding charts to MDX files, load the `astro-starlight-charts` skill.