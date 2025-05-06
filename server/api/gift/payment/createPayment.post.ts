import { createFormData } from "~/server/utils/paymentUtils";

export default defineEventHandler(async (event) => {
    interface Body {
        email: string;
        user_id: number;
        plan_id: number;
    }

    interface FlowResponse {
        url: string;
        token: string;
        flowOrder: number;
    }

    interface PlanInfoResponse extends APIResponse {
        plan: {
            credit_type: "PP" | "PO" | "GO" | "GP";
            format_credit: "Individual" | "Dupla" | "Grupal";
            credit_quantity: number;
            expiration_time: number;
            price: number;
            expiration_date: string;
        };
    }

    const { email, user_id, plan_id } = await readBody<Body>(event);
    let amount = null;

    const config = useRuntimeConfig();

    try {
        const response = await $fetch<PlanInfoResponse>(
            `${config.public.apiBase}/user/plans/${plan_id}`,
            {
                method: "GET"
            },
        );


        amount = response.plan.price;
    } catch (error) {
        console.log(error);
        setResponseStatus(event, 400);
        return {
            success: false,
            message: "Hubo un error al la información del plan. Intente nuevamente.",
        };
    }

    const formData = createFormData(
        {
            amount,
            email,
            apiKey: config.flowApiKey,
            currency: "CLP",
            subject: "Compra de Plan de Regalo - Entrena en Casa",
            commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
            urlConfirmation: `${config.public.nuxtApiBase}/api/gift/payment/confirm`,
            urlReturn: `${config.public.nuxtApiBase}/gift/paymentStatus`,
            optional: JSON.stringify({
                user_id: user_id,
                plan_id: plan_id,
            }),
        },
        config.flowSecretKey,
    );


    try {
        const response = await $fetch<FlowResponse>(`${config.flowHosting}/api/payment/create`, {
            method: "POST",
            body: formData,
            redirect: "follow",
        });
        console.log("create payment success");
        console.log(response);
        const redirectUrl = `${response.url}?token=${response.token}`;
        console.log(redirectUrl);
        const returnData = {
            success: true,
            message: "Pago creado exitosamente. Redirigiendo a Flow.",
            url: redirectUrl,
            flowOrder: response.flowOrder,
        };

        return returnData;
    } catch (error: any) {
        if (error.hasOwnProperty("data")) {
            console.log(error.data);
        } else {
            console.log(error);
        }

        return {
            success: false,
            message: "Error al crear el pago. Intente nuevamente.",
        };
    }
});
