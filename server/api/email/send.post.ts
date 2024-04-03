import { Resend } from 'resend';

const config = useRuntimeConfig();
const resend = new Resend(config.resendApiKey);

export default defineEventHandler(async (event) => {

  const { data } = await readBody(event);
  
  try {
    const response = await resend.emails.send(data);

    if(response.error) {
        return {
            success: false,
            message: "Hubo un error al enviar la solicitud"
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
        message: "Hubo un error al enviar la solicitud"
     };
  }
});