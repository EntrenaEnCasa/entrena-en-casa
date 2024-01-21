// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-icon', '@vee-validate/nuxt', 'nuxt-mapbox'
  ],
  runtimeConfig: {
    public: {
      apiBase: 'https://entrena-en-casa-backend-production.up.railway.app'
    }
  },
  mapbox: {
    accessToken: 'pk.eyJ1IjoiZ29uemFsby1icnVuYSIsImEiOiJjbHJqcGlkcDgwMWZiMmtwOWliMHJsOGkxIn0.waguLODGXsYqrv8Ol0lwoQ',
  },
})
