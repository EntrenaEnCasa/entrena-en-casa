import { useReCaptcha } from "vue-recaptcha-v3";

export const useCaptcha = (attempts: Ref<number>, maxAttempts: 3) => {
    const recaptcha = useReCaptcha();
    const executeRecaptcha = recaptcha?.executeRecaptcha;
    const recaptchaLoaded = recaptcha?.recaptchaLoaded;
    const required = computed(() => attempts.value >= maxAttempts - 1);

    const verify = async (action = "login") => {
        try {
            if (!recaptchaLoaded) {
                throw new Error("Recaptcha not loaded");
            }

            await recaptchaLoaded();

            if (!executeRecaptcha) {
                throw new Error("Recaptcha not initialized");
            }

            const token = await executeRecaptcha(action);

            if (!token) {
                throw new Error("Recaptcha token not received");
            }

            const { success } = await $fetch("/api/verify-recaptcha", {
                method: "POST",
                body: { token },
            });

            return success;
        } catch (error) {
            console.error("Captcha verification failed:", error);
            return false;
        }
    };

    return {
        verify,
        required,
    };
};
