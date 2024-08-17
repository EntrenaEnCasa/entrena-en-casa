export default defineEventHandler(async (event) => {
    const { token } = await readBody(event);
    const config = useRuntimeConfig(event);

    if (!token) {
        setResponseStatus(event, 400);
        return {
            message: "El token es requerido para la verificación",
            success: false,
        };
    }

    try {
        const payload = verifyToken(token as string);
        const user_id = payload.user_id;

        const apiKey = config.backendApiKey; // Retrieve the API key from environment variables
        const encryptedApiKey = encryptApiKey(apiKey);

        const response = await $fetch<APIResponse>(`${config.public.apiBase}/user/verify-email`, {
            method: "POST",
            headers: {
                "x-api-key": encryptedApiKey,
            },
            body: {
                user_id: user_id,
            },
        });

        if (response.success) {
            return {
                message: "Email verificado correctamente",
                success: true,
            };
        } else {
            setResponseStatus(event, 400);
            return {
                message: "Error al verificar correo electrónico",
                success: false,
            };
        }

        return {
            success: true,
            message: "Email verificado correctamente",
        };
    } catch (err) {
        const error = err as Error;

        if (error.message === "jwt expired") {
            setResponseStatus(event, 400);
            return {
                message: "El token ha expirado",
                success: false,
            };
        } else if (error.message === "invalid signature") {
            setResponseStatus(event, 400);
            return {
                message: "Error al verificar el correo electrónico: Token inválido",
                success: false,
            };
        } else {
            setResponseStatus(event, 500);
            return {
                message: "Error en el servidor",
                success: false,
            };
        }
    }
});
