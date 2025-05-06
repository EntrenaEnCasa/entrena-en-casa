// se elimina al estudiante creado para el regalo con el user_id que se pasa por el body
// y se elimina el regalo de la base de datos con la api user/delete-gift-user
export default defineEventHandler(async (event) => {
    interface DeleteStudentResponse {
        success: boolean;
        message: string;
    }
    try {
        const { user_id } = await readBody(event);
        const response = await $fetch<DeleteStudentResponse>(
            `${useRuntimeConfig(event).public.apiBase}/user/delete-gift-user`,
            {
                method: "POST",
                body: {
                    user_id,
                },
            },
        );
        if (response.success) {
            setResponseStatus(event, 200);
            return {
                message: "Estudiante eliminado correctamente con el correo del regalo",
                success: true,
            };
        } else {
            setResponseStatus(event, 400);
            return {
                message: "Error al eliminar al estudiante creado para el regalo",
                success: false,
            };
        }
    } catch (err) {
        setResponseStatus(event, 500);
        return {
            message: "Error interno del servidor",
            success: false,
        };
    }
});

