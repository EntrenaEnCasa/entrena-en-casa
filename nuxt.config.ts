// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@vee-validate/nuxt',
    'nuxt-mapbox',
    "@nuxt/image"
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
      mapboxApiKey: process.env.MAPBOX_API_KEY,
    }
  },
  mapbox: {
    accessToken: process.env.MAPBOX_API_KEY,
  },
})