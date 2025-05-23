export default defineEventHandler(async (event) => {
    interface FlowStatusResponse {
        flowOrder: number;
        commerceOrder: string;
        requestDate: string; // <yyyy-mm-dd hh:mm:ss>
        status: 1 | 2 | 3 | 4; // 1: pendiente de pago, 2: pagada, 3: rechazada, 4: anulada
        subject: string;
        currency: string;
        amount: number;
        payer: string;
        optional: { [key: string]: any } | null;
        pending_info: {
            media: string | null;
            date: string | null;
        } | null;
        paymentData: {
            date: string | null;
            media: string | null;
            conversionDate: string | null;
            conversionRate: number | null;
            amount: number | null;
            currency: string | null;
            fee: number | null;
            balance: number | null;
            transferDate: string | null;
        } | null;
        merchantId: string | null;
    }

    interface addCreditsResponse {
        success: boolean;
        message: string;
    }


    const { token } = await readBody(event);

    if (!token) {
        console.log("no token found");
        setResponseStatus(event, 400);
        return {
            success: false,
            message: "Token no encontrado",
        };
    }

    const config = useRuntimeConfig(event);

    const queryParams = createQueryParams(
        {
            apiKey: config.flowApiKey,
            token,
        },
        config.flowSecretKey,
    );

    try {

        const response = await $fetch<FlowStatusResponse>(
            `${config.flowHosting}/api/payment/getStatus`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                query: queryParams,
            },
        );

        if (!response.optional) {
            throw new Error("No se puede realizar la compra del plan de regalo. Intente nuevamente.");
        }

        const { user_id, plan_id } = response.optional;

        if (response.status == 2) {
            try {

                const body = {
                    user_id: user_id,
                    plan_id: plan_id,
                };


                const responseAddCredits = await $fetch<addCreditsResponse>(
                    `${config.public.apiBase}/user/add-gift`,
                    {
                        method: "POST",
                        body: body,
                    },
                );
                console.log("responseAddCredits", responseAddCredits);
                if (responseAddCredits.success) {
                    console.log("Compra realizada exitosamente.");
                    return {
                        success: true,
                        message: "Compra realizada exitosamente"
                    };
                } else {
                    console.log("Error al intentar cargar los créditos.");
                    setResponseStatus(event, 400);
                    return {
                        success: false,
                        message: responseAddCredits.message,
                    }

                }
            } catch (error) {
                setResponseStatus(event, 400);
                console.log(error);
                console.log("Ocurrió un error al intentar cargar los créditos.");
                return {
                    success: false,
                    message: "Ocurrió un error al intentar cargar los créditos.",
                };
            }
        } else {
            return {
                success: false,
                message: "El pago no ha sido confirmado. No se ha realizado la compra del plan de regalo.",
            };
        }
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
