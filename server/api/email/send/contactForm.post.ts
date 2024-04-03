const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {

    interface EmailSendResponse {
        success: boolean;
        message?: string;
    }

    const { subject, message, email } = await readBody(event);

    const fromMail = 'Entrena en casa <contacto@entrenaencasa.cl>';
    const toMails = ['entrenaencasa0@gmail.com']

    const data = {
        from: fromMail,
        to: toMails,
        subject: "Contacto desde entrenaencasa.cl",
        html: contactFormTemplate(email, subject, message)
    }

    try {
        const response = await $fetch<EmailSendResponse>(`${config.public.nuxtApiBase}/api/email/send`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                data
            }
        });

        if(response.success){
            return {
                success: true,
                message: "Correo enviado exitosamente",
            }
        }
        else {
            return {
                success: false,
                message: "Hubo un error al enviar el correo electrónico"
            }
        }
    }
    catch (error) {
        return {
            success: false,
            message: "Hubo un error al enviar el correo electrónico"
        }
    }

});