import { defineConfig } from 'astro/config';
import relativeLinks from 'astro-relative-links';
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import htmlBeautifier from "astro-html-beautifier";
import { astroImageTools } from "astro-imagetools";

// https://astro.build/config
export default defineConfig({
  base: "",
  outDir: './dist',
  compressHTML: true,
  build: {
    assets: 'assets',
    format: 'directory'
  },
  server: {
    open: true
  },
  placeholder: "none",
  site: 'http://localhost:4321/',
  integrations: [astroImageTools, relativeLinks(), sitemap(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), tailwind(), //htmlBeautifier(),
  ],
  vite: {
    build: {
      sourcemap: false
    }
  }
});