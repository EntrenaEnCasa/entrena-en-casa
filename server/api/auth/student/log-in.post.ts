// server/api/auth/student/log-in.post.ts
export default defineEventHandler(async (event) => {

    interface Body {
        email: string;
        password: string;
    }

    interface Response {
        success: boolean;
        message: string;
        user: User
        token: string;
    }

    interface User {
        user_id: number;
        email: string;
        user_type: 0 | 1 | 2;
        region: string;
    }

    const { email, password } = await readBody<Body>(event);

    // Validate email and password
    if (!email || !password) {
        throw new Error('El email y la contraseña son necesarios para iniciar sesión');
    }

    const config = useRuntimeConfig(event);

    let response;
    try {
        response = await $fetch<Response>(`${config.public.apiBase}/student/log-in`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const domain = config.public.nodeEnv === 'production' ? '.entrenaencasa.cl' : 'localhost';

        if (response && response.token) {

            // Set HttpOnly cookie
            setCookie(event, 'auth_token', response.token, {
                path: '/',
                domain: domain,
                httpOnly: true,
                secure: true, // Ensure the cookie is only sent over HTTPS
                maxAge: 60 * 60 * 24 * 14, // 14 days of expiration
            });

            const newResponse = {
                success: true,
                message: 'Inicio de sesión correcto',
                user: response.user
            }

            return newResponse;
        }
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        return createError({
            statusCode: 401,
            message: "Error al iniciar sesión",
          });
    }

});
