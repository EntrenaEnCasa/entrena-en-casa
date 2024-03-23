// server/api/auth/logout.post.ts
import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
    // Clear the HttpOnly cookie by setting its expiration date in the past or setting its value to empty
    deleteCookie(event, 'auth_token', {
        path: '/',
        httpOnly: true,
        secure: true, // Ensure the cookie is only sent over HTTPS
    });

    // Clear the client-accessible cookie by setting its expiration date in the past or setting its value to empty
    deleteCookie(event, 'is_authenticated', {
        path: '/',
        secure: true,
    });

    return { success: true, message: 'Cierre de sesión correcto' };
});
