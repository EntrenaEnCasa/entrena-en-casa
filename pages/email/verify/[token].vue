<template>
    <div class="flex min-h-[calc(100vh_-_5rem)] items-center justify-center space-y-4">
        <div class="mx-auto max-w-2xl text-center">
            <div v-if="loading">
                <p class="mb-4 text-3xl font-semibold">Verificando información...</p>
                <CommonLoading />
            </div>
            <div v-else-if="error" class="space-y-5">
                <div>
                    <h3 class="mb-2 text-4xl font-bold">¡Oops!</h3>
                    <p>Hubo un error al verificar tu correo electrónico</p>
                    <code v-if="error.data.message">{{ error.data.message }}</code>
                </div>
                <div class="inline-flex rounded-full bg-tertiary-50/30 p-12">
                    <Icon name="fa6-solid:circle-check" class="text-9xl text-tertiary" />
                </div>
                <div>
                    <p class="mb-4">Puedes volver a intentarlo o contactarnos para ayudarte.</p>
                    <div class="inline-flex flex-col gap-2 lg:flex-row">
                        <CommonButton
                            @click="() => $router.push('/email/verify-email')"
                            bg-color="secondary"
                            class="px-4 py-2"
                        >
                            <Icon name="fa6-solid:envelope" class="mb-0.5 mr-0.5" />
                            Volver a intentar
                        </CommonButton>

                        <CommonButton @click="goToWhatsapp" class="px-4 py-2">
                            <Icon name="ic:baseline-whatsapp" class="mb-0.5 text-2xl" />
                            Hablar con soporte
                        </CommonButton>
                    </div>
                </div>
            </div>
            <div v-else-if="!response">
                <p>No se pudo verificar tu correo electrónico</p>
            </div>

            <div v-else-if="response.success" class="space-y-5">
                <div>
                    <h3 class="mb-2 text-4xl font-bold">¡Verificación exitosa!</h3>
                    <p>Tu correo ha sido verificado correctamente.</p>
                </div>
                <div class="inline-flex rounded-full bg-primary-50/30 p-12">
                    <Icon name="fa6-solid:circle-check" class="text-9xl text-primary" />
                </div>
                <div>
                    <CommonButton
                        @click="() => $router.push('/user/dashboard/home')"
                        bg-color="primary"
                        class="px-4 py-2"
                    >
                        Ir a inicio
                    </CommonButton>
                </div>
            </div>
            <div v-else class="space-y-5">
                <div>
                    <h3 class="mb-2 text-4xl font-bold">¡Oops!</h3>
                    <p>Hubo un error al verificar tu correo electrónico</p>
                </div>
                <div class="inline-flex rounded-full bg-tertiary-50/30 p-12">
                    <Icon name="fa6-solid:circle-check" class="text-9xl text-tertiary" />
                </div>
                <div>
                    <p class="mb-4">Puedes volver a intentarlo o contactarnos para ayudarte.</p>
                    <div class="inline-flex gap-3">
                        <CommonButton
                            @click="() => $router.push('/user/dashboard/home')"
                            bg-color="zinc-500"
                            class="px-4 py-2"
                        >
                            Ir a inicio
                        </CommonButton>
                        <CommonButton
                            @click="() => $router.push('/email/verify-email')"
                            bg-color="secondary"
                            class="px-4 py-2"
                        >
                            <Icon name="fa6-solid:envelope" class="mb-0.5 mr-0.5" />
                            Volver a intentar
                        </CommonButton>
                        <CommonButton @click="goToWhatsapp" bg-color="secondary" class="px-4 py-2">
                            <Icon name="ic:baseline-whatsapp" class="mb-0.5 text-2xl" />
                            Hablar con soporte
                        </CommonButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from "~/stores/UserStore";

const route = useRoute();
const userStore = useUserStore();

const {
    data: response,
    pending: loading,
    error,
} = await useFetch(`/api/auth/verify-email`, {
    method: "POST",
    body: {
        token: route.params.token,
    },
    onResponse({ response }) {
        if (response._data.success) {
            const currentUser = userStore.user;
            const newUser = { ...currentUser, verified: true };
            userStore.setUser(newUser);
        }
    },
    lazy: true,
});

const goToWhatsapp = async () => {
    await navigateTo(
        "https://wa.me/56971370313?text=Hola%20Jorge,%20necesito%20ayuda%20con%20la%20verificación%20de%20mi%20correo.",
        {
            external: true,
            open: {
                target: "_blank",
            },
        },
    );
};
</script>
