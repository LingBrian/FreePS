// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecret: "",
    apiOpenid: "",
    apiApikey: "",
    apiSmsId: 0,
  },
  modules: ["@element-plus/nuxt", "@vueform/nuxt"],
});
