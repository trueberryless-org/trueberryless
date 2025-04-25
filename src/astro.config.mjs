// @ts-check
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  experimental: {
    responsiveImages: true,
  },
  integrations: [expressiveCode(), mdx()],
});