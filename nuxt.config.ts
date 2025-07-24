// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({

    ssr: false,
    app: {
        head: {
            script: [
                {
                    src: "https://www.googletagmanager.com/gtag/js?id=G-R7YCCTWR7P",
                    async: true,
                },
                {
                    src: "/assets/js/ga.js",
                }
            ],
            htmlAttrs: {
        lang: 'es-CL'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        // Meta tags globales
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Entrena en Casa' },
        { name: 'theme-color', content: '#00A4E8' },
        { name: 'msapplication-TileColor', content: '#00A4E8' },
        { name: 'format-detection', content: 'telephone=no' },
        
        // PWA meta tags
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        
        // Geo meta tags (Chile)
        { name: 'geo.region', content: 'CL' },
        { name: 'geo.country', content: 'Chile' },
        
        // Open Graph defaults
        { property: 'og:site_name', content: 'Entrena en Casa' },
        { property: 'og:locale', content: 'es_CL' },
        { property: 'og:type', content: 'website' },
        
        // Twitter defaults
        { name: 'twitter:site', content: '@entrenaencasa' },
        { name: 'twitter:creator', content: '@entrenaencasa' },
        { name: 'twitter:card', content: 'summary_large_image' },

        // Instagram defaults
        { name: 'instagram:site', content: '@entrenaencasa' },
        { name: 'instagram:creator', content: '@entrenaencasa' },


      ],
      link: [
        // Favicons
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        // { rel: 'manifest', href: '/site.webmanifest' },
        
        // DNS prefetch para mejor rendimiento
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
        
        // Canonical (se sobrescribe en cada página)
        { rel: 'canonical', href: 'https://entrenaencasa.com' },
        
        // RSS Feed
        { rel: 'alternate', type: 'application/rss+xml', title: 'Entrena en Casa - RSS', href: '/api/rss.xml' },
        
        // Sitemap
        { rel: 'sitemap', type: 'application/xml', href: '/api/sitemap.xml' },
      ]
        },
    },
    modules: [
        "@pinia/nuxt",
        "nuxt-icon",
        "@vee-validate/nuxt",
        "nuxt-mapbox",
        "@nuxt/image",
        "@pinia-plugin-persistedstate/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/sitemap",
        "@nuxtjs/robots",
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
    mapbox: {
        accessToken: process.env.MAPBOX_API_KEY,
    },
    compatibilityDate: "2025-07-17",
    typescript: {
        tsConfig: {
            compilerOptions: {
                paths: {
                    "@": ["."],
                    "@/*": ["./*"],
                },
            },
        },
    },
      nitro: {
    preset: 'vercel'
  }
});
