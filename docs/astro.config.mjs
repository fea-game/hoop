// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeGalaxy from "starlight-theme-galaxy";
import mermaid from "astro-mermaid";
import remarkRewriteMdLinks from "./remark-rewrite-md-links.mjs";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

config({ path: resolve(process.cwd(), "../.env") });

const isProd = process.env.NODE_ENV === "production";
const tailscaleHostname = process.env.TAILSCALE_HOSTNAME;
const docsPort = parseInt(process.env.DOCS_PORT ?? "4001");

// https://astro.build/config
export default defineConfig({
  base: isProd ? "/hoop" : undefined,
  server: {
    port: docsPort,
    allowedHosts: tailscaleHostname ? [tailscaleHostname] : [],
  },
  vite: {
    resolve: {
      alias: {
        "@charts": resolve(__dirname, "src/charts"),
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkRewriteMdLinks],
  },
  integrations: [
    mermaid({ autoTheme: true }),
    starlight({
      plugins: [starlightThemeGalaxy()],
      title: "@fea-game/Hoop",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/fea-game/hoop",
        },
      ],
      sidebar: [
        {
          label: "Odyssey",
          autogenerate: { directory: "odyssey" },
        },
        {
          label: "Fantasy",
          autogenerate: { directory: "fantasy" },
        },
      ],
    }),
  ],
});
