import { Resend } from 'resend';

const config = useRuntimeConfig();
const resend = new Resend(config.resendApiKey);

export default defineEventHandler(async (event) => {

  const { subject, message, email } = await readBody(event);
  const fromMail = 'Entrena en casa <contacto@entrenaencasa.cl>';
  const toMails = ['gonzalo.antoniobc@gmail.com']

  try {
    const data = await resend.emails.send({
      from: fromMail,
      to: toMails,
      subject: "Contacto desde entrenaencasa.cl",
      html: emailTemplate(email, subject, message)
    });

    if(data.error) {
        return {
            success: false,
            error: "Hubo un error al enviar la solicitud"
        }
    }
    return {
        success: true,
        message: "Correo enviado correctamente",
        data   
    };
  } catch (error) {
    return { 
        success: false,
        error: "Hubo un error al enviar la solicitud"
     };
  }
});