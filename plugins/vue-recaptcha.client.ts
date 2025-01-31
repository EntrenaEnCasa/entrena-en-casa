import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { VueReCaptcha } from "vue-recaptcha-v3";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const siteKey = config.public.siteKey;

    if (!siteKey) {
        console.error(
            "La clave pública de reCAPTCHA no está configurada en la configuración de runtime",
        );
        return;
    }

    const options = {
        siteKey,
        loaderOptions: {
            autoHideBadge: false,
        },
    };

    nuxtApp.vueApp.use(VueReCaptcha, options);
});
