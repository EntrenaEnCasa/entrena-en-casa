export default defineEventHandler(async (event) => {
    const { token, newPassword } = await readBody(event);
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
        const email = payload.email;

        const apiKey = config.backendApiKey;
        // Retrieve the API key from environment variables
        const encryptedApiKey = encryptApiKey(apiKey);

        const response = await $fetch<APIResponse>(
            `${config.public.apiBase}/user/update-password`,
            {
                method: "PATCH",
                headers: {
                    "x-api-key": encryptedApiKey,
                },
                body: {
                    email,
                    newPassword,
                },
            }
        );

        if (response.success) {
            setResponseStatus(event, 200);
            return {
                message: "Contraseña actualizazda correctamente",
                success: true,
            };
        } else {
            setResponseStatus(event, 400);
            return {
                message: "Error al actualizar la contraseña",
                success: false,
            };
        }
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
                message: "Error al actualizar la contraseña: Token inválido",
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
