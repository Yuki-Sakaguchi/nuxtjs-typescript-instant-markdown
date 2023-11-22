// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: [
    "~/assets/css/main.css",
    "remixicon/fonts/remixicon.css",
    "vue-final-modal/style.css",
  ],
  postcss: {
    plugins: {
      "postcss-custom-media": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  imports: {
    dirs: ["stores/**"],
  },
  modules: ["@pinia/nuxt"],
  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
  ],
});
