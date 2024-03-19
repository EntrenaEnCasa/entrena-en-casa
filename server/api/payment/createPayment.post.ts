import crypto from 'crypto';
import { createFormData } from '~/server/utils/paymentUtils';

export default defineEventHandler(async (event) => {

    interface Body {
        amount: number;
        email: string;
        user_ids: number[];
        plan_id: number;
    }

    interface FlowResponse {
        url: string;
        token: string;
        flowOrder: number;
    }

    interface PlanInfoResponse extends APIResponse {
        
        Plan: {
            credit_type: "PP" | "PO" | "GO" | "GP",
            format_credit: "Individual" | "Dupla" | "Grupal",
            credit_quantity: number,
            expiration_time: number,
            price: number,
            expiration_date: string,
        }
    } 

    const { email, user_ids, plan_id } = await readBody<Body>(event);
    let amount = null;

    const config = useRuntimeConfig();
    const userIdsString = user_ids.join(',');
    const { auth_token } = parseCookies(event);

    try {

        const response = await $fetch<PlanInfoResponse>(`${config.public.apiBase}/student/plan/${plan_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `auth_token=${auth_token}`
            },
        });

        console.log("get plan success");
        amount = response.Plan.price;

    }
    catch(error){
        console.log("get plan error");
        console.log(error);
        setResponseStatus(event, 400);
        return {
            success: false,
            message: 'Hubo un error al la información del plan. Intente nuevamente.',
        }
    }

    const formData = createFormData({
        amount,
        apiKey: config.flowApiKey,
        currency: 'CLP',
        email: "gonzalo.antoniobc@gmail.com",
        subject: 'Pago de prueba',
        commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
        urlConfirmation: `${config.public.nuxtApiBase}/api/payment/confirm`,
        urlReturn: `${config.public.nuxtApiBase}/user/dashboard/paymentStatus`,
        optional: JSON.stringify({ user_ids: userIdsString, plan_id: plan_id }),
      }, config.flowSecretKey);

    console.log(formData);

    try {
        const response = await $fetch<FlowResponse>("https://sandbox.flow.cl/api/payment/create", {
            method: 'POST',
            body: formData,
            redirect: 'follow',
        });

        const redirectUrl = `${response.url}?token=${response.token}`;

        const returnData = {
            success: true,
            message: 'Pago creado exitosamente. Redirigiendo a Flow.',
            url: redirectUrl,
            flowOrder: response.flowOrder,
        }

        return returnData;

    }
    catch(error: any){
        if (error.hasOwnProperty('data')) {
            console.log(error.data);
        } else {
            console.log(error);
        }

        return {
            success: false,
            message: 'Error al crear el pago. Intente nuevamente.',
        }
    }

});