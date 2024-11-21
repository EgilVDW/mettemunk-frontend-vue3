// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  sourcemap: false,
  devtools: { enabled: true },
  css: ["./assets/styles/site.scss"],
  modules: ["@vueuse/nuxt", "nuxt-icons"],
  runtimeConfig: {
    public: {
      CULTURE: process.env.CULTURE,
      DANISH_BASEURL: process.env.DANISH_BASEURL,
      ENGLISH_BASEURL: process.env.ENGLISH_BASEURL,
    },
  },
});