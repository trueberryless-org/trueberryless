// @ts-check
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  experimental: {
    responsiveImages: true,
  },
  integrations: [expressiveCode()],
});
