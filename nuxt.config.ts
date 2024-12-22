// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: false },

    modules: [
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss",
        "nuxt-icon",
        "@vee-validate/nuxt",
        "nuxt-mapbox",
        "@nuxt/image",
        "@pinia-plugin-persistedstate/nuxt",
    ],
    runtimeConfig: {
        flowApiKey: process.env.FLOW_API_KEY,
        flowSecretKey: process.env.FLOW_SECRET_KEY,
        flowHosting: process.env.FLOW_HOSTING,
        backendApiKey: process.env.BACKEND_API_KEY,
        backendSecretKey: process.env.BACKEND_SECRET_KEY,
        emailToken: process.env.EMAIL_TOKEN,
        recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
        public: {
            apiBase: process.env.API_BASE,
            nuxtApiBase: process.env.NUXT_API_BASE,
            nodeEnv: process.env.NODE_ENV,
            mapboxApiKey: process.env.MAPBOX_API_KEY,
            siteKey: process.env.RECAPTCHA_SITE_KEY,
        },
    },
    app: {
        head: {
            script: [
                {
                    src: "https://www.google.com/recaptcha/api.js",
                    async: true,
                    defer: true,
                },
            ],
        },
    },
    mapbox: {
        accessToken: process.env.MAPBOX_API_KEY,
    },
    compatibilityDate: "2024-07-11",
});
