export function emailTemplate (email: string, subject: string, message: string): string {
    return (`
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
  `);
} 