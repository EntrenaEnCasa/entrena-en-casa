<template>
    <div class="min-h-screen flex items-center max-w-3xl mx-auto">
        <div class="w-full flex flex-col justify-center items-center mb-12 gap-6">
            <NuxtLink to="/">
                <NuxtImg src="/logo.png" class=" w-36" alt="logo" />
            </NuxtLink>
            <div v-if="!success" class="w-full flex flex-col justify-center items-center mb-12 gap-4">
                <h1 class="text-2xl font-bold text-center">¿Olvidaste tu contraseña?</h1>
                <p class="text-gray-500 text-center">Ingresa tu correo electrónico. Si existe una cuenta asociada a
                    este,
                    recibirás un correo con un link para poder restablecer tu contraseña.</p>
                <Form class="w-full space-y-5" @submit="sendResetLink" v-slot="{ meta }">
                    <CommonInput label="Correo Electrónico" v-model="formData.email" name="email" type="email"
                        id="email" icon="fa6-solid:envelope" placeholder="Ingresa tu correo electrónico"
                        :rules="validateEmail" />
                    <CommonButton class="py-2 w-full font-medium" text-size="xl" :disabled="!meta.valid">
                        Enviar correo
                    </CommonButton>
                </Form>
            </div>
            <div v-else class="w-full flex flex-col justify-center items-center mb-12 gap-4">
                <h1 class="text-2xl font-bold text-center">¡Correo enviado!</h1>
                <p class="text-gray-500 text-center">Si tienes una cuenta con nosotros, te llegará un correo electrónico
                    a la dirección ingresada para restablecer tu contraseña. No olvides revisar la carpeta Spam.</p>

                <div class="inline-flex bg-primary-50/30 p-12 rounded-full">
                    <Icon name="fa6-solid:circle-check" class="text-primary text-9xl" />
                </div>
                <CommonButton @click="() => $router.push('/')" bg-color="primary" class="px-4 py-2">
                    Ir a Inicio
                </CommonButton>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useToast } from 'vue-toastification'
import { useUserStore } from '~/stores/UserStore';

const userStore = useUserStore();
const toast = useToast();
const success = ref(false);
const formData = reactive({
    email: "",
});
const validateEmail = (value) => {
    // if the field is empty
    if (!value) {
        return 'El email es requerido';
    }
    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return 'El email no es válido';
    }
    // All is good
    return true;
}

const sendResetLink = async () => {
    try {
        const response = await $fetch('/api/auth/send-reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: formData.email
            }
        })

        if (response.success) {
            toast.success('Correo de verificación enviado. Revisa la bandeja de entrada del correo ingresado.')
        } else {
            toast.error(response.message)
        }
    }
    catch (error) {
        console.log(error)
        toast.error('No se pudo enviar el correo de verificación')
    }
}
</script>