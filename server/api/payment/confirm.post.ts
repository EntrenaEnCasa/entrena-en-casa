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
    config.flowSecretKey
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
      }
    );

    console.log(response);

    if (!response.optional) {
      console.log("No se puede realizar la compra de créditos. Intente nuevamente.");
      throw new Error(
        "No se puede realizar la compra de créditos. Intente nuevamente."
      );
    }

    const { user_ids, plan_id } = response.optional;

    if (!user_ids || !plan_id) {
      console.log("No se puede realizar la compra de créditos, faltan parametros. Intente nuevamente.");
      throw new Error(
        "No se puede realizar la compra de créditos, faltan parametros. Intente nuevamente."
      );
    }

    if(response.status == 2) {
      console.log("antes de cargar créditos");
      try {
        const body = {
          user_id: user_ids.split(',').map(Number),
          plan_id: plan_id,
        };

        const apiKey = config.backendApiKey; // Retrieve the API key from environment variables
        const encryptedApiKey = encryptApiKey(apiKey);

        console.log("body");
        console.log(body);

        console.log("encrypted api key: ", encryptedApiKey);
  
        const response = await $fetch<addCreditsResponse>(
          `${config.apiBaseUrl}/student/credits`,
          {
            method: "POST",
            headers: {
              'x-api-key': encryptedApiKey,
            },
            body: body,
          }
        );
  
        console.log(response.message);
        return {
          success: response.success,
          message: response.message,
        }
      } catch (error) {
        console.log(error);
        console.log("Ocurrió un error al intentar cargar los créditos.");
        return {
          success: false,
          message: "Ocurrió un error al intentar cargar los créditos."
        }
      }
    }
    else{
      return {
        success: false,
        message: "El pago no ha sido confirmado. No se han cargado créditos.",
      }
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