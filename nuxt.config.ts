// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  sourcemap: false,
  devtools: { enabled: true },
  css: ["./assets/styles/site.scss"],
  modules: ["@vueuse/nuxt", "nuxt-icons"],
  app: {
    head: {
      link: [{
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
        },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "anonymous",
      }, {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Heebo:wght@100..900&display=swap",
      }]
    },
    pageTransition: {
      mode: 'out-in',
    },
  },
  runtimeConfig: {
    public: {
      CULTURE: process.env.CULTURE,
      DANISH_BASEURL: process.env.DANISH_BASEURL,
      ENGLISH_BASEURL: process.env.ENGLISH_BASEURL,
    },
  },
});