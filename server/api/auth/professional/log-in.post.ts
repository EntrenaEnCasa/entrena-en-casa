// server/api/auth/professional/log-in.post.ts
export default defineEventHandler(async (event) => {
    interface Body {
        email: string;
        password: string;
    }

    interface Response {
        success: boolean;
        message: string;
        user: User;
        token: string;
    }

    interface User {
        user_id: number;
        email: string;
        first_name: string;
        last_name: string;
        title: string;
        phone: string;
        photo_url: string | null;
        birth_date: string | null;
        institution: string | null;
        biography: string | null;
        user_type: 0 | 1 | 2;
    }

    const { email, password } = await readBody<Body>(event);

    // Validate email and password
    if (!email || !password) {
        throw createError({
            statusCode: 400,
            message: "Faltan datos para iniciar sesión",
        });
    }

    const config = useRuntimeConfig(event);

    let response;
    try {
        response = await $fetch<Response>(`${config.public.apiBase}/professional/log-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (response.success) {
            const domain =
                config.public.nodeEnv === "production" ? ".entrenaencasa.cl" : "localhost";
            const maxAge = 60 * 60 * 24 * 14; // 14 days of expiration

            // Set HttpOnly cookie
            setCookie(event, "auth_token", response.token, {
                path: "/",
                domain: domain,
                httpOnly: true,
                secure: true, // Ensure the cookie is only sent over HTTPS
                maxAge: maxAge,
            });

            // Set client-accessible cookie
            setCookie(event, "is_authenticated", "true", {
                path: "/",
                domain: domain,
                secure: true,
                maxAge: maxAge,
            });

            const newResponse = {
                success: true,
                message: "Inicio de sesión correcto",
                user: response.user,
            };

            return newResponse;
        } else {
            return {
                success: false,
                message: response.message,
            };
        }
    } catch (error) {
        console.error("Error al intentar iniciar sesión:", error);
        throw createError({
            statusCode: 401,
            message: "Error al iniciar sesión",
        });
    }
});
