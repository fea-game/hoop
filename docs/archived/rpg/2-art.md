---
title: Art
---

## Match Panel Art Pipeline (No AI at Runtime)

### Overview
All match panels are composed at runtime from pre-produced, layered assets. No AI art is generated during gameplay. The system mirrors the exploration view: deterministic, fast, and fully customizable via palette swaps and overlays.

### Asset Strategy
- **Base Poses & Body Types:**
	- 3–5 core body types (e.g. short, tall, lanky, strong, average).
	- 6–8 core poses (dribble, pass, shot, block, steal, special, idle, celebrate).
	- Each pose/body is a flat-color silhouette (SVG or PNG with alpha).
- **Overlays:**
	- Hair styles (separate layer, palette-swappable).
	- Jerseys, shorts, shoes, accessories (separate layers, team color overlays).
	- Trait/effect icons (SVG/PNG overlays).
- **Asset Sources:**
	- Use CC0/free sprite bases (Kenney, OpenGameArt) or trace reference photos in a vector editor (Inkscape, Figma).
	- All overlays are simple vector or flat color for easy palette swapping.

### Customization Pipeline
At runtime, for each panel:
1. Select the correct body type and pose.
2. Apply palette swap for skin tone.
3. Overlay chosen hairstyle (palette swap for hair color).
4. Apply team color overlays to jersey/shorts.
5. Add trait/effect icons as overlays.
6. Compose all layers into the final panel image.

### Production Workflow
- **Asset Organization:**
	- `assets/poses/{pose_name}/{body_type}.svg`
	- `assets/hair/{hair_style}.svg`
	- `assets/jersey/{type}.svg`, `assets/shorts/{type}.svg`, etc.
	- `assets/icons/{trait}.svg`
- **Manifest:**
	- JSON or YAML file mapping poses, body types, hair, overlays, and color regions.
- **New Assets:**
	- Add new SVG/PNGs and update manifest—no code changes needed.

### Panel System
- Each match action (e.g. shot, block) is a template: a sequence of 2–3 panels, each referencing a pose and overlays.
- Panel composition script (Node+sharp, or browser canvas) reads the template, loads assets, applies palette swaps, and outputs the final panel.

### Scalability
- New body types, poses, or overlays can be added by dropping new SVG/PNGs and updating the manifest.
- All customization is data-driven.

### Optional: Gen AI for Production Only
- If desired, use Gen AI to create new base poses or overlays during asset production, but always export to static SVG/PNG for runtime use.

### POC: JavaScript Match Panel Composer

This proof-of-concept demonstrates the layered match panel system using Node.js and SVG/PNG assets.

#### Folder Structure

```
assets/
	poses/shot_average.svg
	hair/short.svg
	jersey/base.svg
	manifest.json
output/
	shot_panel.png
scripts/
	compose_panel.js
```

#### Asset Manifest Example (`assets/manifest.json`)
```json
{
	"poses": { "shot": { "average": "assets/poses/shot_average.svg" } },
	"hair": { "short": "assets/hair/short.svg" },
	"jersey": { "base": "assets/jersey/base.svg" },
	"panel_templates": {
		"shot": [
			{ "pose": "shot", "body_type": "average", "hair": "short", "jersey": "base" }
		]
	}
}
```

#### Composition Script (`scripts/compose_panel.js`)
- Uses [canvas](https://www.npmjs.com/package/canvas) for Node.js SVG/PNG composition.
- Loads the manifest, assembles the panel from layers, and outputs a PNG.

##### Usage
1. Install dependencies:
	 ```sh
	 npm install canvas
	 ```
2. Run the script:
	 ```sh
	 node scripts/compose_panel.js
	 ```
3. Output: `output/shot_panel.png` (composed panel)