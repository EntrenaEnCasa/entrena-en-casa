import { createQueryParams } from "~/server/utils/paymentUtils";

export default defineEventHandler(async (event) => {
    const { flowOrder } = getQuery(event);

    if (!flowOrder) {
        console.log("Se debe especificar una orden de Flow.");
        setResponseStatus(event, 400);
        return {
            success: false,
            message: "Token no encontrado",
        };
    }

    const config = useRuntimeConfig();

    const queryParams = createQueryParams(
        {
            apiKey: config.flowApiKey,
            flowOrder,
        },
        config.flowSecretKey,
    );

    try {
        const response = await $fetch(`${config.flowHosting}/api/payment/getStatusByFlowOrder`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            query: queryParams,
        });

        console.log("get status response");
        console.log(response);

        return {
            success: true,
            message: "Información del pago obtenida exitosamente.",
            response,
        };
    } catch (error: any) {
        if (error.hasOwnProperty("data")) {
            console.log(error.data);
        } else {
            console.log(error);
        }

        setResponseStatus(event, 400);
        return {
            success: false,
            message: "Error al confirmar el pago. Intente nuevamente.",
        };
    }
});
