// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-icon', '@vee-validate/nuxt'
  ],
  runtimeConfig: {
    public: {
      apiBase: 'https://entrena-en-casa-backend-production.up.railway.app'
    }
  }
})
