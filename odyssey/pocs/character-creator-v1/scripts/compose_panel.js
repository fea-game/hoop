// Simple POC: Compose a match panel from SVG layers using Node.js and canvas
// Requires: npm install canvas
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

const manifest = require("../assets/manifest.json");
const WIDTH = 128;
const HEIGHT = 256;

async function composePanel(panelDef, outputPath) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // Load and draw pose (body)
  const posePath = manifest.poses[panelDef.pose][panelDef.body_type];
  const poseImg = await loadImage(posePath);
  ctx.drawImage(poseImg, 0, 0, WIDTH, HEIGHT);

  // Load and draw jersey
  const jerseyPath = manifest.jersey[panelDef.jersey];
  const jerseyImg = await loadImage(jerseyPath);
  ctx.drawImage(jerseyImg, 0, 0, WIDTH, HEIGHT);

  // Load and draw hair
  const hairPath = manifest.hair[panelDef.hair];
  const hairImg = await loadImage(hairPath);
  ctx.drawImage(hairImg, 0, 0, WIDTH, HEIGHT);

  // Save output
  const out = fs.createWriteStream(outputPath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("Panel composed:", outputPath));
}

async function main() {
  const panel = manifest.panel_templates.shot[0];
  await composePanel(panel, "../output/shot_panel.png");
}

main();
