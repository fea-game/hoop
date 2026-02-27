// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeGalaxy from "starlight-theme-galaxy";
import remarkRewriteMdLinks from "./remark-rewrite-md-links.mjs";

const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  base: isProd ? "/hoop" : undefined,
  markdown: {
    remarkPlugins: [remarkRewriteMdLinks],
  },
  integrations: [
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
