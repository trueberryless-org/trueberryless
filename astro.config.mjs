// @ts-check
import netlify from "@astrojs/netlify";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://trueberryless.org",
  adapter: netlify(),
});
