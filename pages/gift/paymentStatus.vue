<template>
    <div class="bg-gradiente min-h-[calc(100vh_-_5rem)] py-10">
        <div class="mx-auto w-11/12 max-w-6xl">
            <h2 class="tellural mb-10 text-center text-4xl font-bold">
                Estado de la transacción
            </h2>
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
                        <!-- Recargar la misma página para obtener el estatus-->
                        <p class="mb-4">
                            Prueba recargar la página para obtener el estado del pago.
                        </p>
                        <CommonButton @click="() => $router.push('/gift/paymentStatus')" " bg-color=" primary"
                            class="px-4 py-2">
                            Recargar
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
                            Se cargará el plan a la cuenta del usuario a quien le regalaste el plan. Le enviamos un
                            correo
                            para avisarle con copia a ti.
                        </p>
                        <!-- Gracias -->
                        <p class="mb-4">
                            Gracias por regalar un plan de Entrena en Casa. Esperamos que lo disfrute.
                        </p>

                    </div>
                </div>
                <div v-else-if="data.response.status == 3 || data.response.status == 4" class="space-y-5">
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
                            Puedes volver a intentar comprar un plan en la página de planes de regalos, o si así
                            lo deseas, también puedes consultar por ayuda a nuestro jefe de servicio al
                            cliente, Jorge.
                        </p>
                        <div class="inline-flex gap-3">
                            <CommonButton @click="() => $router.push('/gift')" bg-color="tertiary" class="px-4 py-2">
                                Volver a Planes de Regalo
                            </CommonButton>
                            <CommonButton @click="goToWhatsapp" bg-color="secondary" class="px-4 py-2">
                                Hablar vía whatsapp
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useGiftStore } from "~/stores/GiftStore";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const config = useRuntimeConfig();
const toast = useToast();
const router = useRouter();


interface PaymentStatusResponse extends APIResponse {
    response: Payment;
}
interface GetPlanResponse {
    success: boolean;
    message: string;
    plan: {
        plan_id: number;
        credit_type: string;
        format_credit: string;
        credit_quantity: number;
        expiration_date: string;
    };
}
interface Payment {
    flowOrder: number;
    commerceOrder: string;
    requestDate: string;
    status: 1 | 2 | 3 | 4;
    subject: string;
}

const giftStore = useGiftStore();
const { data, error, pending } = await useFetch<PaymentStatusResponse>(
    "/api/gift/payment/paymentStatus",
    {
        method: "GET",
        query: {
            flowOrder: giftStore.giftTransaction?.flowOrder,
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
const plan = ref<GetPlanResponse["plan"] | null>(null); // Mueve esta línea hacia arriba

onMounted(async () => {
    const response = await useFetch<GetPlanResponse>(`${config.public.apiBase}/user/plans/${giftStore.giftTransaction?.plan_id}`, {
        method: "GET",
    });
    if (!response.data?.value || !response.data.value.success) {
        toast.error("Error al obtener el plan");
        return;
    }
    plan.value = response.data.value.plan;
});

const emailSent = ref(false); // Bandera para controlar el envío del correo

watch(
    [() => data.value?.response.status, () => plan.value], // Observa el estatus y el plan
    async ([status, currentPlan]) => {
        if (status === 2 && currentPlan && !emailSent.value) {
            emailSent.value = true; // Marca el correo como enviado
            await sendEmail();
        } else if ((status === 3 || status === 4) && !giftStore.giftTransaction?.has_account) {
            await deleteUser();
        }
    },
    { immediate: true }
);
const format = computed(() => {
    if (plan.value?.credit_type === "PO" || plan.value?.credit_type === "PP") {
        return plan.value?.format_credit === "Individual" ? "Personalizado Individual" : "Personalizado Dupla";
    } else {
        return "Grupal";
    }
});
const modality = computed(() => {
    if (plan.value?.credit_type === "PO" || plan.value?.credit_type === "GO") {
        return "Online";
    } else {
        return "Presencial";
    }
});

const sendEmail = async () => {
    console.log(giftStore.giftTransaction);
    const EmailResponse = await $fetch<APIResponse>("/api/gift/new-gift/send-gift-email", {
        method: "POST",
        body: {
            credit_quantity: plan.value?.credit_quantity,
            format: format.value,
            modality: modality.value,
            expiration_date: plan.value?.expiration_date,
            sender_email: giftStore.giftTransaction?.sender_email,
            sender_name: giftStore.giftTransaction?.sender_name,
            recipient_email: giftStore.giftTransaction?.recipient_email,
            has_account: giftStore.giftTransaction?.has_account,
        },
    });
    if (EmailResponse.success) {
        toast.success("Correo enviado correctamente");
        // Si pasa esto, se debe eliminar el giftTransaction
        giftStore.clearGiftTransaction();
        //después de 10 segundos, redirigir a la página de inicio
        setTimeout(() => {
            router.push("/gift");
        }, 10000);

    } else {
        toast.error("Error al enviar el correo. Contáctese con el soporte técnico");
    }
};
// Si el status es 3 o 4, se debe verificar que en la giftStore el has_account. Si es falso, se debe llamar a la API para eliminar ese usuario a api/gift/abort-gift/delete-student.post.ts
const deleteUser = async () => {
    if (giftStore.giftTransaction?.has_account) return;
    const response = await $fetch<APIResponse>(
        "/api/gift/abort-gift/delete-student",
        {
            method: "POST",
            body: {
                user_id: giftStore.giftTransaction?.user_id,
            },
        },
    );
    if (response.success) {
        giftStore.clearGiftTransaction();
    } else {
        toast.error("Error al eliminar el usuario");
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
