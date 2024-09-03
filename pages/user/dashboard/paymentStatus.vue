<template>
    <div class="space-y-4">
        <div v-if="pending">
            <CommonLoading />
            <p class="tetx-xl">Cargando información del pago</p>
        </div>
        <div v-else-if="error">
            <p>Hubo un error al consultar el estado de la transacción</p>
        </div>
        <div v-else-if="!data">
            <p>No se encontró información del pago</p>
        </div>
        <div v-else-if="data" class="mx-auto flex max-w-2xl justify-center text-center">
            <div v-if="data.response.status == 1" class="space-y-5">
                <div>
                    <h3 class="mb-2 text-4xl font-bold">¡Esperando!</h3>
                    <p>El pago está pendiente de ser procesado.</p>
                </div>
                <div class="inline-flex rounded-full bg-yellow-50 p-12">
                    <Icon name="fa6-solid:circle-exclamation" class="text-9xl text-yellow-500" />
                </div>
                <div>
                    <p class="mb-4">
                        Puedes volver a intentar comprar un plan en la página de créditos.
                    </p>
                    <CommonButton
                        @click="() => $router.push('/user/dashboard/credits')"
                        bg-color="primary"
                        class="px-4 py-2"
                    >
                        Ir a creditos
                    </CommonButton>
                </div>
            </div>
            <div v-else-if="data.response.status == 2" class="space-y-5">
                <div>
                    <h3 class="mb-2 text-4xl font-bold">¡Pago exitoso!</h3>
                    <p>Tu pago se ha procesado correctamente.</p>
                </div>
                <div class="inline-flex rounded-full bg-primary-50/30 p-12">
                    <Icon name="fa6-solid:circle-check" class="text-9xl text-primary" />
                </div>
                <div>
                    <p class="mb-4">
                        Se cargará a tu cuenta el plan contratado, puedes revisarlo en la página de
                        créditos.
                    </p>
                    <CommonButton
                        @click="() => $router.push('/user/dashboard/credits')"
                        bg-color="primary"
                        class="px-4 py-2"
                    >
                        Ir a créditos
                    </CommonButton>
                </div>
            </div>
            <div
                v-else-if="data.response.status == 3 || data.response.status == 4"
                class="space-y-5"
            >
                <div>
                    <h3 class="mb-2 text-4xl font-bold">¡Oops!</h3>
                    <p>
                        El pago no ha concluido correctamente o se ha sobrepasado el tiempo de
                        espera para efectuar transacción.
                    </p>
                </div>
                <div class="inline-flex rounded-full bg-tertiary-50/30 p-12">
                    <Icon name="fa6-solid:circle-check" class="text-9xl text-tertiary" />
                </div>
                <div>
                    <p class="mb-4">
                        Puedes volver a intentar comprar un plan en la página de créditos, o si así
                        lo deseas, también puedes consultar por ayuda a nuestro jefe de servicio al
                        cliente, Jorge.
                    </p>
                    <div class="inline-flex gap-3">
                        <CommonButton
                            @click="() => $router.push('/user/dashboard/credits')"
                            bg-color="tertiary"
                            class="px-4 py-2"
                        >
                            Volver a créditos
                        </CommonButton>
                        <CommonButton @click="goToWhatsapp" bg-color="secondary" class="px-4 py-2">
                            Hablar vía whatsapp
                        </CommonButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { usePaymentStore } from "~/stores/PaymentStore";

interface PaymentStatusResponse extends APIResponse {
    response: Payment;
}

interface Payment {
    flowOrder: number;
    commerceOrder: string;
    requestDate: string;
    status: 1 | 2 | 3 | 4;
    subject: string;
}

const paymentStore = usePaymentStore();

const { data, error, pending } = await useFetch<PaymentStatusResponse>(
    "/api/payment/paymentStatus",
    {
        method: "GET",
        query: {
            flowOrder: paymentStore.flowTransaction?.flowOrder,
        },
        lazy: true,
    },
);

const getStatus = (status: number) => {
    switch (status) {
        case 1:
            return "Pendiente";
        case 2:
            return "Pagado";
        case 3:
            return "Rechazado";
        case 4:
            return "Anulado";
        default:
            return "Desconocido";
    }
};

const goToWhatsapp = async () => {
    await navigateTo(
        "https://wa.me/56971370313?text=Hola%20Jorge,%20necesito%20ayuda%20con%20mi%20pago%20en%20la%20plataforma.",
        {
            external: true,
            open: {
                target: "_blank",
            },
        },
    );
};
</script>
