export default defineEventHandler(async (event) => {
    interface EmailSendResponse {
        success: boolean;
        message?: string;
    }

    const config = useRuntimeConfig(event);

    const { first_name, last_name, title, email } = await readBody(event);

    try {

        const fromMail = "Entrena en casa <noreply@entrenaencasa.cl>";
        const toMails = ["entrenaencasa0@gmail.com"];

        const data = {
            from: fromMail,
            to: toMails,
            subject: "Notificación nuevo profesional registrado",
            html: notificationNewProfessionalTemplate(first_name, last_name, email, title),
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
                message: "Correo de notificación enviado exitosamente",
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
            message: "Hubo un error en el servidor",
            success: false,
        };
    }
});
