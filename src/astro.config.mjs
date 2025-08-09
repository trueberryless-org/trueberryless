// @ts-check
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  experimental: {
    responsiveImages: true,
  },
  integrations: [expressiveCode(), mdx(), react()],
  adapter: netlify(),
});
