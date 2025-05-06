
export default defineEventHandler(async (event) => {
    interface EmailSendResponse {
        success: boolean;
        message?: string;
    }

    const config = useRuntimeConfig(event);

    const { credit_quantity, format, modality, expiration_date, sender_email, sender_name, recipient_email, has_account } = await readBody(event);

    try {
        const fromMail = "Entrena en casa <noreply@entrenaencasa.cl>";
        const toMails = [sender_email, recipient_email];
        const subject = "Entrenamiento de regalo de Entrena en Casa";
        var html = "";

        if (has_account) {
            html = giftEmailTemplateNew(sender_name, sender_email, recipient_email, credit_quantity, format, modality, expiration_date);
        } else {
            const link = `${config.public.nuxtBase}/user/dashboard/credits`;
            html = giftEmailTemplate(sender_name, sender_email, credit_quantity, format, modality, expiration_date, link);
        }
        const data = {
            from: fromMail,
            to: toMails,
            subject: subject,
            html: html,
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
            message: "Hubo un error en el servidor",
            success: false,
        };
    }
});