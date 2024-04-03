<template>
    <div class="flex flex-col items-center justify-center text-center min-h-[calc(100vh_-_5.0rem)]">
        <div v-if="!userStore.user.verified" class="max-w-3xl px-6">
            <template v-if="!emailSent">
                <h2 class="font-semibold text-3xl text-zinc-700 mb-2">Para disfrutar de todas las características de
                    Entrena
                    en
                    Casa, ¡Debes
                    verificar tu
                    email!</h2>
                <p class="mb-5 max-w-xl mx-auto">Cuando presiones el botón, te enviarémos un correo de verificación.</p>
                <div class="inline-flex flex-col gap-2">
                    <CommonButton class="px-5 py-2" @click="sendVerificationEmail"
                        :loading="sendVerificationEmailLoading">
                        <Icon name="fa6-solid:envelope" class="mr-2" />
                        Enviar correo de verificación
                    </CommonButton>
                    <CommonButton v-if="sendVerificationEmailError" @click="goToWhatsapp" class="px-4 py-2">
                        <Icon name="ic:baseline-whatsapp" class="mb-0.5 text-2xl" />
                        Hablar con soporte
                    </CommonButton>
                </div>
            </template>
            <template v-if="emailSent">
                <Icon name="fxemoji:openmailboxlowered" class="text-8xl mb-6" />
                <h2 class="font-semibold text-3xl text-zinc-700 mb-2">¡Correo de verificación enviado!</h2>
                <p class="mb-5 max-w-xl mx-auto">
                    Revisa tu bandeja de entrada y sigue las instrucciones para
                    verificar
                    tu
                    correo.
                </p>
            </template>
        </div>
        <div class="max-w-3xl px-6">
            <h2 class="font-semibold text-3xl text-zinc-700 mb-2">¡Tu cuenta ya ha sido verificada!</h2>
            <p class="mb-5 max-w-xl mx-auto">¡Ya puedes disfrutar de todas las características de Entrena en Casa!</p>
            <CommonButton @click="() => $router.push('/user/dashboard/home')" class="px-5 py-2">
                Ir a inicio
            </CommonButton>
        </div>
    </div>
</template>

<script setup>

import { useToast } from 'vue-toastification'
import { useUserStore } from '~/stores/UserStore';

const sendVerificationEmailLoading = ref(false);
const toast = useToast();
const userStore = useUserStore();
const sendVerificationEmailError = ref(false);
const emailSent = ref(false);

const sendVerificationEmail = async () => {
    sendVerificationEmailLoading.value = true
    try {
        const response = await $fetch('/api/auth/send-verification-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                user_id: userStore.user.user_id,
                email: userStore.user.email
            }
        })

        if (response.success) {
            toast.success('Correo de verificación enviado')
            emailSent.value = true;
        } else {
            toast.error(response.message)
            sendVerificationEmailError.value = true;
        }
    }
    catch (error) {
        toast.error('No se pudo enviar el correo de verificación')
        sendVerificationEmailError.value = true;
    }
    finally {
        sendVerificationEmailLoading.value = false
    }
}

const goToWhatsapp = async () => {
    await navigateTo('https://wa.me/56971370313?text=Hola%20Jorge,%20necesito%20ayuda%20con%20la%20verificación%20de%20mi%20correo.', {
        external: true,
        open: {
            target: '_blank'
        }
    });
}

</script>
