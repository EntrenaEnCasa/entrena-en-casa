export default defineEventHandler(async (event) => {
    interface EmailSendResponse {
        success: boolean;
        message?: string;
    }

    const config = useRuntimeConfig(event);
    const { email } = await readBody(event);

    try {
        const token = createToken({ email }, "1h");
        const domain =
            config.public.nodeEnv === "production"
                ? "https://www.entrenaencasa.cl"
                : "http://localhost:3000";
        const link = domain + "/password/new/" + token;

        const fromMail = "Entrena en casa <noreply@entrenaencasa.cl>";
        const toMails = [email];

        const data = {
            from: fromMail,
            to: toMails,
            subject: "Restablecimiento de contraseña",
            html: passwordResetTemplate(link),
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
            }
        );

        if (response.success) {
            setResponseStatus(event, 200);
            return {
                success: true,
                message: "Correo de restablecimiento de contraseña enviado",
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
            message: "Error en el servidor",
            success: false,
        };
    }
});
