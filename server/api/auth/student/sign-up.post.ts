export default defineEventHandler(async (event) => {

    interface Body {
        email: string;
        password: string;
        region: string;
    }

    interface Response {
        success: boolean;
        message: string;
        user: User;
        token: string;
    }

    interface User {
        user: {
            user_id: number;
            email: string;
            user_type: 0 | 1 | 2;
        };
    }

    const { email, password, region } = await readBody<Body>(event);

    // Validate email, password region
    if (!email || !password || !region) {
        throw createError({
            statusCode: 400,
            message: "Faltan datos para registrarse",
        });
    }

    const config = useRuntimeConfig(event);

    let response;
    try {
        response = await $fetch<Response>(`${config.public.apiBase}/student/sign-up`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                region,
            }),
        });

        if (response.success) {

            const domain = config.public.nodeEnv === 'production' ? '.entrenaencasa.cl' : 'localhost';
            const maxAge = 60 * 60 * 24 * 14; // 14 days of expiration

            // Set HttpOnly cookie
            setCookie(event, 'auth_token', response.token, {
                path: '/',
                httpOnly: true,
                domain: domain,
                secure: true, // Ensure the cookie is only sent over HTTPS
                maxAge: maxAge
            });

            // Set client-accessible cookie
            setCookie(event, 'is_authenticated', 'true', {
                path: '/',
                domain: domain,
                secure: true,
                maxAge: maxAge,
            });

            const newResponse = {
                success: true,
                message: 'Usuario registrado correctamente',
                user: response.user
            }

            return newResponse;
        }
        else {
            return {
                success: false,
                message: response.message
            }
        
        }
    } catch (error) {
        console.error('Error al intentar registrarse: ', error);
        throw createError({
            statusCode: 401,
            message: "Error al intentar registrarse",
        });
    }

});