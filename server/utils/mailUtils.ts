export function contactFormTemplate(email: string, subject: string, message: string): string {
    return `
    <div style="width: 100%; background-color: #F6F6F6; padding-top: 2.5rem; padding-bottom: 2.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; text-align: center;">
      <div style="margin-bottom: 2.5rem;">
        <img src="https://res.cloudinary.com/deg11anix/image/upload/v1710952923/logo-horizontal_rrgbm0.png" width="200" />
      </div>
      <div style="max-width: 48rem; background-color: white; border-radius: 0.375rem; padding: 1.5rem; margin: 0 auto;">
        <p style="margin-bottom: 0.5rem;">De: ${email}</p>
        <p style="margin-bottom: 0.5rem; font-size: 1.25rem;">Asunto: ${subject}</p>
        <p>${message}</p>
      </div>
    </div>
  `;
}

export function emailVerificationTemplate(link: string) {
    return `
  <html>
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
  </head>
<body>
    <div style="width: 100%; background-color: #F6F6F6; padding-top: 2.5rem; padding-bottom: 2.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; text-align: center;">
      <div style="margin-bottom: 2.5rem;">
        <img src="https://res.cloudinary.com/deg11anix/image/upload/v1710952923/logo-horizontal_rrgbm0.png" width="200" />
      </div>
      <div style="max-width: 48rem; background-color: white; border-radius: 0.375rem; padding: 1.5rem; margin: 0 auto;">
        <p style="margin-bottom: 0.5rem; font-size: 28px; font-weight: 500; color: #333;">¡Gracias por registrarte en Entrena en Casa!</p>
        <p style="font-size: 16px; color: #333;">Para verificar tu correo electrónico, haz click en el siguiente enlace:</p>
        <button  style="background-color: #B5CD13; padding: 0.6rem 1.2rem; border-radius: 0.375rem; border:none; margin: 0.5rem 0;">
        	<a href="${link}" style="text-decoration: none; color: white; font-size: 14px;">Verificar email</a>
        </button>
        <p><small>Si no puedes hacer click en el enlace, copia y pega la siguiente URL en tu navegador: ${link}<small></p>
        <p style="margin-top: 0.5rem; color: #777"><small>Por favor, ten en cuenta que este enlace expirará en una hora.<small></p>
      </div>
    </div>
  </body>
</html>
`;
}

export function passwordResetTemplate(link: string) {
    return `
  <html>
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
  </head>
  <body>
    <div style="width: 100%; background-color: #F6F6F6; padding-top: 2.5rem; padding-bottom: 2.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; text-align: center;">
      <div style="margin-bottom: 2.5rem;">
        <img src="https://res.cloudinary.com/deg11anix/image/upload/v1710952923/logo-horizontal_rrgbm0.png" width="200" />
      </div>
      <div style="max-width: 48rem; background-color: white; border-radius: 0.375rem; padding: 1.5rem; margin: 0 auto;">
        <p style="margin-bottom: 0.5rem; font-size: 28px; font-weight: 500; color: #333;">Restablece tu contraseña</p>
        <p style="font-size: 16px; color: #333;">Haz clic en el siguiente botón para restablecer tu contraseña:</p>
        <button style="background-color: #B5CD13; padding: 0.6rem 1.2rem; border-radius: 0.375rem; border:none; margin: 0.5rem 0;">
        	<a href="${link}" style="text-decoration: none; color: white; font-size: 14px;">Restablecer contraseña</a>
        </button>
        <p><small>Si no puedes hacer clic en el botón, copia y pega la URL siguiente en tu navegador: ${link}<small></p>
        <p style="margin-top: 0.5rem; color: #777"><small>Por favor, ten en cuenta que este enlace expirará en una hora.<small></p>
      </div>
    </div>
  </body>
</html>
  `;
}
