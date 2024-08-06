<template>
    <div class="min-h-screen flex items-center max-w-3xl mx-auto">
        <div class="w-full flex flex-col justify-center items-center mb-12 gap-6">
            <NuxtLink to="/">
                <NuxtImg src="/logo.png" class=" w-36" alt="logo" />
            </NuxtLink>
            <div v-if="!dataSend" class="w-full flex flex-col justify-center items-center mb-12 gap-4">
                <h1 class="text-2xl font-bold text-center">Restablece tu contraseña</h1>

                <Form class="w-full space-y-5" @submit="resetPassword" v-slot="{ meta }">
                    <CommonInput label="Contraseña" v-model="formData.password" name="password" type="password"
                        id="password" icon="fa6-solid:lock" placeholder="* * * * * * * *" :rules="validatePassword" />
                    <CommonInput label="Confirmar Contraseña" v-model="formData.password_confirmation"
                        name="password_confirmation" type="password" id="password_confirmation" icon="fa6-solid:lock"
                        placeholder="* * * * * * * *" :rules="validatePassword" />
                    <CommonButton class="py-2 w-full font-medium" text-size="xl" :disabled="!meta.valid">
                        Enviar correo
                    </CommonButton>
                </Form>
            </div>
            <div v-else-if="success" class="w-full flex flex-col justify-center items-center mb-12 gap-4">
                <h1 class="text-2xl font-bold text-center">¡Cambio de contraseña exitoso!</h1>
                <p class="text-gray-500 text-center">Se ha establecido tu nueva contraseña correctamente, ahora puedes
                    ingresar a tu cuenta con esta.</p>

                <div class="inline-flex bg-primary-50/30 p-12 rounded-full">
                    <Icon name="fa6-solid:circle-check" class="text-primary text-9xl" />
                </div>
                <CommonButton @click="() => $router.push('/user/auth/login')" bg-color="primary" class="px-4 py-2">
                    Ir a Inicio de sesión
                </CommonButton>
            </div>
            <div v-else class="w-full flex flex-col justify-center items-center mb-12 gap-4">
                <h1 class="text-2xl font-bold text-center">¡Ocurrió un error!</h1>
                <p class="text-gray-500 text-center">No se ha podido establecer tu nueva contraseña. Inténtalo
                    nuevamente más tarde.</p>

                <div class="inline-flex bg-tertiary-50/30 p-12 rounded-full">
                    <Icon name="fa6-solid:circle-exclamation" class="text-tertiary text-9xl" />
                </div>
                <div class=" w-full inline-flex flex-row justify-center gap-4 mt-6">

                    <CommonButton @click="() => $router.push('/')" class="bg-gray-500 px-4 py-2">
                        Volver a Inicio
                    </CommonButton>
                    <CommonButton @click="goToWhatsapp" bg-color="primary" class="px-4 py-2">
                        Comunicarse con el administrador
                    </CommonButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useToast } from 'vue-toastification'
const toast = useToast();
const router = useRouter();
const route = useRoute();
const dataSend = ref(false);
const success = ref(false);
const formData = reactive({
    email: "",
});
const validatePassword = (password) => {

    if (!password) {
        return 'La contraseña es requerida';
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres';
    }
    // Check if the password contains at least one number
    let hasNumber = false;
    for (let char of password) {
        if (char >= '0' && char <= '9') {
            hasNumber = true;
            break;
        }
    }
    if (!hasNumber) {
        return 'La contraseña debe tener al menos un número';
    }
    // Check if the password contains at least one capital letter
    let hasCapital = false;
    for (let char of password) {
        if (char >= 'A' && char <= 'Z') {
            hasCapital = true;
            break;
        }
    }
    if (!hasCapital) {
        return 'La contraseña debe tener al menos una letra mayúscula';
    }
    // All good
    return true;
};

const resetPassword = async () => {
    try {
        const response = await $fetch('/api/auth/update-password', {
            method: 'POST',
            body: {
                token: route.params.token,
                newPassword: formData.password,
            },
        });

        if (response.success) {
            toast.success('Contraseña actualizada exitosamente. Puedes iniciar sesión.');
            router.push('/user/auth/login');
        }
        else {
            toast.error(response.message);
        }

    } catch (error) {
        console.error(error);
        toast.error('Ocurrió un error al intentar actualizar la contraseña. Intente nuevamente más tarde.');
    };
}
const goToWhatsapp = async () => {
    await navigateTo('https://wa.me/56971370313?text=Hola%20Jorge,%20necesito%20ayuda%20para%20restablecer%20mi%20contraseña.', {
        external: true,
        open: {
            target: '_blank'
        }
    });
}
</script>