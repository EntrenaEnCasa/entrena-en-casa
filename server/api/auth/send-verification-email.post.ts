export default defineEventHandler(async (event) => {
    interface EmailSendResponse {
        success: boolean;
        message?: string;
    }

    const config = useRuntimeConfig(event);

    const { user_id, email } = await readBody(event);

    try {
        const token = createToken({ user_id }, "1h");
        const domain =
            config.public.nodeEnv === "production"
                ? "https://www.entrenaencasa.cl"
                : "http://localhost:3000";
        const link = domain + "/email/verify/" + token;

        const fromMail = "Entrena en casa <noreply@entrenaencasa.cl>";
        const toMails = [email];

        const data = {
            from: fromMail,
            to: toMails,
            subject: "Verificación de email",
            html: emailVerificationTemplate(link),
        };

        const response = await $fetch<EmailSendResponse>(
            `${config.public.nuxtApiBase}/api/email/send`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    data,
                },
            },
        );

        if (response.success) {
            return {
                success: true,
                message: "Correo de verificación enviado exitosamente",
            };
        } else {
            setResponseStatus(event, 500);
            return {
                success: false,
                message: response.message,
            };
        }
    } catch (error) {
        setResponseStatus(event, 500);
        return {
            message: "Hubo un en el servidor",
            success: false,
        };
    }
});
