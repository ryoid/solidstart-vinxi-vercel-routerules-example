import { defineConfig } from "@solidjs/start/config"

export default defineConfig({
  start: {
    middleware: "./src/middleware.ts",
    server: {
      routeRules: {
        // revalidated every 60 seconds, in the background
        "/**": { isr: 60 },
        // this page will be always fresh
        "/dynamic": { isr: false },
        // this page will be generated on demand and then cached permanently
        "/static": { isr: true },
        // this page is generated at build time and cached permanently
        "/prerendered": { prerender: true },
        // you can do lots more with route rules too!
        "/redirect": { redirect: "/static" },
        "/headers": { headers: { "x-magic-of": "nuxt and vercel" } },
        // Doesnt work
        // "/spa": { ssr: false },
      },
    },
  },
})
