# Research: manager-roguelite-core

## Task context

Design and prototype the core systems of a basketball manager roguelite: tactic chain
construction (playbook), chemistry & familiarity economy, and the nemesis / rivalry mechanic.
Stage A resolves open design questions and produces a PRD. Stage B builds a minimal runnable
code prototype that exercises the preparation-then-execution autobattler loop.

## Relevant code

| Path | Relevance |
|---|---|
| `docs/brainstorming/manager-roguelite/1-brainstorming.mdx` | Primary design source — all open questions, failure modes, and decisions live here |
| `apps/docs/src/charts/Heatmap.astro` | Reference for SSR SVG pattern; props, color system, dark/light theme approach |
| `apps/docs/src/charts/PcaChart.astro` | Reference for D3 + server-side math pattern; shows how complex computation is done in frontmatter |
| `apps/docs/astro.config.mjs` | Base path `/hoop` in prod; `@charts` alias; `preserveSymlinks: true`; mermaid integration |
| `apps/docs/package.json` | Installed deps: Astro 5.6, D3 7.9, Mermaid 11, Starlight 0.37 — all available for prototype use |
| `apps/docs/src/content/docs` | Symlink → `../../docs/` — new MDX pages for prototype docs go in `docs/` |
| `apps/docs/app/src/` | Empty stub dirs (`charts/assets/`, `content/docs/`) — possibly reserved for a game app, currently unused |
| `.github/workflows/deploy.yml` | CI: Node 18, npm install + build, deploy to GitHub Pages — no test or lint step |
| `scripts/gen-favicon.mjs` | Only other non-chart JS in repo; illustrates seeded PRNG pattern usable in prototype |

## Constraints

1. **Cross-platform mobile + desktop, free release, minimal effort** — any prototype must
   run in a browser without install friction. No native app, no game engine binary.
2. **No existing game runtime** — the repo has only a Starlight docs site and two D3 chart
   components. The prototype is entirely greenfield.
3. **D3 7.x is available** in `apps/docs/` but it is used server-side only (SSR SVG). If
   the prototype needs client-side interactivity it must add a client-side JS approach; D3 can
   be used but is not the natural choice for interactive UI.
4. **Astro's content model is SSG/SSR** — Astro components run at build time. Any runtime
   game state (player picks, tactic chain assembly, match simulation) must either live in
   client-side JS or use a separate app.
5. **`apps/docs/app/`** contains only empty placeholder stubs — it is available as a second
   app location if the prototype outgrows a single Astro page, but has no scaffolding yet.
6. **CI deploys only `apps/docs/`** — any prototype that lives outside `apps/docs/` will not
   be auto-deployed to GitHub Pages without workflow changes.
7. **Node 18/20/22 all valid** — locally running 22.19.0; CI runs 18. No engine constraint
   in `apps/docs/package.json`.
8. **No test or lint pipeline** — the CI has no test step. The prototype has no test
   infrastructure to conform to or break.

## Risks

1. **Prototype scope creep** — the brainstorming doc is very detailed with many systems. The
   smallest validating slice must be defined precisely before building; otherwise the prototype
   expands to cover chemistry, familiarity, nemesis, opponent knowledge, and player knowledge
   simultaneously — none of which will be polished enough to validate the core loop.
2. **Autobattler legibility on mobile** — the tactic chain assembly UI (role slots, synergy
   activations, compatibility flags) is the primary UX risk. Without a prototype, there is no
   evidence that this can be made legible on a small screen. The prototype must specifically
   test this.
3. **Match resolution variance** — the brainstorm identifies "preparation outcome not legible"
   as a core risk. The prototype simulation must be simple enough that outcomes are traceable
   to preparation decisions, not opaque RNG.
4. **Procedural narrative volume** — the media commentary, origin moment text, and tendency
   overlay system all require authored content at scale. The prototype should stub these with
   templates to validate the mechanic without committing to content production.
5. **Tech choice lock-in** — choosing a framework for the prototype (vanilla JS, React,
   Svelte, a game library) has downstream implications if the prototype evolves into the
   shipped product. The minimal-effort constraint favours vanilla HTML/CSS/JS or a thin
   reactive layer (Svelte, Vue) embedded as an Astro island.
6. **Chemistry / familiarity invisibility** — the brainstorm explicitly flags "invisible
   familiarity" as a failure mode. The prototype must surface pair-familiarity bars visually
   from the start; adding them later is harder than designing them in.

## Handoff notes

**For PRD (Phase 4):**
- The brainstorming doc is the authoritative source. It already contains named failure modes,
  comparable games, and a decision log. The PRD should close the open questions (marked with
  bullet-point questions throughout the doc) and produce testable acceptance criteria — not
  re-describe what is already decided.
- The three systems to close: (1) tactic chain — time economy, card categories, complexity
  constraints; (2) chemistry/familiarity — momentum visibility, forced engagement levers;
  (3) nemesis — counter-trait resolution, narrative text approach.
- Cross-system risk: roguelite impermanence vs. emotional attachment (flagged at bottom of
  brainstorm section 3). The PRD must take a position on this.

**For Prototype (Phase 3):**
- The smallest validating slice is: pre-season draft of 5 players from a pool of ~12,
  tactic chain assembly (3 role slots, 2 tactic cards, synergy indicator), single match
  resolution (deterministic formula with ±variance, summary display).
- Chemistry and familiarity can be present but passive in v1 (visible bars that accumulate
  but don't yet gate synergies).
- Nemesis: out of scope for v1 prototype; the loop must be fun before narrative layers are added.
- Tech recommendation: Svelte 5 as an Astro island inside `apps/docs/` — zero deploy
  changes, mobile-friendly, reactive UI without React complexity, D3 available if needed for
  visualisation.
