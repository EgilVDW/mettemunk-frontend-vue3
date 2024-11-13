import { DatocmsImagePlugin, DatocmsStructuredTextPlugin } from "vue-datocms";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(DatocmsImagePlugin);
  nuxtApp.vueApp.use(DatocmsStructuredTextPlugin);
});
