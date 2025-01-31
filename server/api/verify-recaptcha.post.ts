import { defineEventHandler, readBody } from "h3";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
    const { token } = await readBody(event);
    const config = useRuntimeConfig();

    if (!token) {
        return { success: false, message: "El token es requerido." };
    }

    try {
        const response: { success: boolean } = await $fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
                method: "POST",
                body: {
                    secret: config.recaptchaSecretKey,
                    response: token,
                },
            },
        );

        if (response.success) {
            return { success: true, message: "CAPTCHA válido." };
        } else {
            return { success: false, message: "CAPTCHA no válido." };
        }
    } catch (error) {
        console.error("Error al validar reCAPTCHA:", error);
        return { success: false, message: "Error interno al validar el CAPTCHA." };
    }
});
