// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
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
