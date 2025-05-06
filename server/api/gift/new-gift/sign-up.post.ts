export default defineEventHandler(async (event) => {
    interface Body {
        email: string;
        password: string;
        region: number;
    }

    interface User {
        user_id: number;
        email: string;
        user_type: 0 | 1 | 2;
    }

    interface Response {
        success: boolean;
        message: string;
        user?: User; // Hacer que `user` sea opcional en caso de error
        token?: string;
    }

    const config = useRuntimeConfig(event);

    // Leer el cuerpo de la solicitud
    const { email } = await readBody(event);

    if (!email) {
        return {
            success: false,
            message: "Email no proporcionado",
        };
    }

    const password = "RegaloEntrena";
    const region = 13;
    let response;
    try {
        // Llamada al endpoint externo
        response = await $fetch<Response>(`${config.public.apiBase}/student/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                email,
                password,
                region,
            },
        });


        // Verificar si la respuesta fue exitosa
        if (response.success) {
            return {
                success: true,
                message: "Usuario registrado correctamente",
                user: response.user,
            };
        } else {
            return {
                success: false,
                message: response.message || "Error desconocido al registrar el usuario",
            };
        }
    } catch (error) {
        console.error("Error al intentar registrarse: ", error);

        // Devolver un error manejable al cliente
        return {
            success: false,
            message: "Error al intentar registrarse. Por favor, inténtalo de nuevo más tarde.",
        };
    }
});