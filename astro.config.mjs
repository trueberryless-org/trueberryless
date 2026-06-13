import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://trueberryless.org",
  output: "static",
  adapter:
    process.env.ADAPTER_TYPE === "netlify"
      ? netlify()
      : node({ mode: "standalone" }),
});
