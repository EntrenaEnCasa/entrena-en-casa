export default defineEventHandler(async (event) => {
    interface Body {
        email: string;
        password: string;
        region: number;
    }

    interface User {
        user: {
            user_id: number;
            email: string;
            user_type: 0 | 1 | 2;
        };
    }

    interface Response {
        success: boolean;
        message: string;
        user: User;
        token: string;
    }


    const { email, region } = await readBody<Body>(event);

    // Validate email, password region
    if (!email || !region) {
        throw createError({
            statusCode: 400,
            message: "Faltan datos para registrarse",
        });
    }
    const password = "RegaloEntrena"
    const config = useRuntimeConfig(event);

    let response;
    try {
        response = await $fetch<Response>(`${config.public.apiBase}/student/sign-up`, {
            method: "POST",
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


            const newResponse = {
                success: true,
                message: "Usuario registrado correctamente",
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
        console.error("Error al intentar registrarse: ", error);
        throw createError({
            statusCode: 401,
            message: "Error al intentar registrarse",
        });
    }
});
