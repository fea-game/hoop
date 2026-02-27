// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  base: isProd ? "/hoop" : undefined,
  integrations: [
    starlight({
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
