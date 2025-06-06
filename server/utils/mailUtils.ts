
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

export function notificationNewProfessionalTemplate(first_name: string, last_name: string, email: string, title: string): string {
  return `
    <div style="width: 100%; background-color: #F6F6F6; padding-top: 2.5rem; padding-bottom: 2.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; text-align: center;">
      <h1 style="font-size: 2rem; color: #333; margin-bottom: 1rem;">Nuevo profesional registrado</h1>
      <p style="font-size: 1rem; color: #333; margin-bottom: 1rem;">${new Date().toLocaleString()}</p>
      <div style="margin-bottom: 2.5rem;">
      <img src="https://res.cloudinary.com/deg11anix/image/upload/v1710952923/logo-horizontal_rrgbm0.png" width="200" />
      </div>
      <h3 style="font-size: 1.5rem; color: #333; margin-bottom: 1rem;">Datos del profesional:</h3>
      <div style="max-width: 48rem; background-color: white; border-radius: 0.375rem; padding: 1.5rem; margin: 0 auto;">
        <p style="margin-bottom: 0.5rem;">Nombre: ${first_name} ${last_name}</p>
        <p style="margin-bottom: 0.5rem;">Email: ${email}</p>
        <p style="margin-bottom: 0.5rem;">Título: ${title}</p>
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

export function giftEmailTemplateNew(sender_name: string, sender_email: string,
  recipient_email: string,
  credit_quantity: number,
  format: string,
  modality: string,
  expiration_date: string
) {
  return `
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background-color: #f6f6f6;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
        }
        .logo {
          margin-bottom: 32px;
        }
        .title {
          font-size: 28px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 16px;
        }
        .text {
          font-size: 16px;
          color: #333333;
          margin-bottom: 12px;
        }
        .credentials {
          background-color: #f0f0f0;
          padding: 16px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .button {
          display: inline-block;
          background-color: #4f46e5;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          margin-top: 20px;
        }
        .footer {
          font-size: 14px;
          color: #888888;
          margin-top: 32px;
        }
      </style>
    </head>
    <body>
      <div style="text-align: center; padding-top: 40px;">
        <img src="https://res.cloudinary.com/deg11anix/image/upload/v1710952923/logo-horizontal_rrgbm0.png" width="180" class="logo" />
      </div>
      <div class="container">
        <div class="title">¡Felicidades!</div>
        <div class="text">Has recibido un regalo de entrenamiento <strong>${modality}</strong> de Entrena en Casa.</div>
        <div class="text">Incluye <strong>${credit_quantity}</strong> sesiones <strong>${format}</strong> para agendar en nuestra plataforma.</div>
        <div class="text">Podrás usarlas hasta el <strong>${expiration_date}</strong>.</div>

        <div class="text">Aquí están tus credenciales para entrar en la plataforma:</div>
        <div class="credentials">
          <div class="text"><strong>Email:</strong> ${recipient_email}</div>
          <div class="text"><strong>Contraseña:</strong> RegaloEntrena</div>
        </div>
        <div class="text">Te recomendamos cambiar tu contraseña al ingresar.</div>
<button style="background-color: #B5CD13; padding: 0.6rem 1.2rem; border-radius: 0.375rem; border:none; margin: 0.5rem 0;">
        	<a href="https://www.entrenaencasa.cl/user/auth/login" style="text-decoration: none; color: white; font-size: 14px;">Iniciar sesión</a>
        </button>

        <div class="text">Si no puedes hacer clic en el botón, copia y pega la URL siguiente en tu navegador: <a href="https://www.entrenaencasa.cl/user/auth/login">https://www.entrenaencasa.cl/user/auth/login</a></div>
        <div class="text">Este regalo fue enviado por <strong>${sender_name}</strong> - ${sender_email}.</div>

        <div class="text" style="margin-top: 24px;">¡Disfruta tu regalo!</div>
        <div class="footer">El equipo de Entrena en Casa</div>

      </div>
    </body>
  </html>
  `;
}

// En caso de que tenga ya una cuenta, no se le envía la contraseña por email, sino que se le envía un link para que vea el regalo en la sección de créditos de su cuenta
export function giftEmailTemplate(recipient_email: string, sender_name: string, sender_email: string,
  credit_quantity: number,
  format: string,
  modality: string,
  expiration_date: string, link: string
) {
  return `
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background-color: #f6f6f6;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
        }
        .logo {
          margin-bottom: 32px;
        }
        .title {
          font-size: 28px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 16px;
        }
        .text {
          font-size: 16px;
          color: #333333;
          margin-bottom: 12px;
        }
        .credentials {
          background-color: #f0f0f0;
          padding: 16px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .button {
          display: inline-block;
          background-color: #4f46e5;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          margin-top: 20px;
        }
        .footer {
          font-size: 14px;
          color: #888888;
          margin-top: 32px;
        }
      </style>
    </head>
    <body>
      <div style="text-align: center; padding-top: 40px;">
        <img src="https://res.cloudinary.com/deg11anix/image/upload/v1710952923/logo-horizontal_rrgbm0.png" width="180" class="logo" />
      </div>
      <div class="container">
        <div class="title">¡Felicidades!</div>
        <div class="text" >Ha llegado solo para ti: ${recipient_email}</div>
        <div class="text">Has recibido un regalo de entrenamiento <strong>${modality}</strong> de Entrena en Casa.</div>
        <div class="text">Incluye <strong>${credit_quantity}</strong> sesiones <strong>${format}</strong> para agendar en nuestra plataforma.</div>
        <div class="text">Podrás usarlas hasta el <strong>${expiration_date}</strong>.</div>
  
          <div class="text">El plan ya está cargado a tu cuenta, puedes verlo en la sección de créditos.</div>
          <button style="background-color: #B5CD13; padding: 0.6rem 1.2rem; border-radius: 0.375rem; border:none; margin: 0.5rem 0;">
        	<a href="${link}" style="text-decoration: none; color: white; font-size: 14px;">Ir a la sección de créditos</a>
        </button>
          
        <div class="text">Este regalo fue enviado por <strong>${sender_name}</strong> - ${sender_email}.</div>
        <div class="text" style="margin-top: 24px;">¡Disfruta tu regalo!</div>
        <div class="footer">El equipo de Entrena en Casa</div>
      </div>
    </body>
  </html>
  `;
}


