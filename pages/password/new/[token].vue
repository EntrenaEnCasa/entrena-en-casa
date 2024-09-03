<template>
    <div class="mx-auto flex min-h-screen max-w-3xl items-center">
        <div class="mb-12 flex w-full flex-col items-center justify-center gap-6">
            <NuxtLink to="/">
                <NuxtImg src="/logo.png" class="w-36" alt="logo" />
            </NuxtLink>
            <div
                v-if="!dataSend"
                class="mb-12 flex w-full flex-col items-center justify-center gap-4"
            >
                <h1 class="text-center text-2xl font-bold">Restablece tu contraseña</h1>

                <Form class="w-full space-y-5" @submit="resetPassword" v-slot="{ meta }">
                    <CommonInput
                        label="Contraseña"
                        v-model="formData.password"
                        name="password"
                        type="password"
                        id="password"
                        icon="fa6-solid:lock"
                        placeholder="* * * * * * * *"
                        :rules="validatePassword"
                    />
                    <CommonInput
                        label="Confirmar Contraseña"
                        v-model="formData.password_confirmation"
                        name="password_confirmation"
                        type="password"
                        id="password_confirmation"
                        icon="fa6-solid:lock"
                        placeholder="* * * * * * * *"
                        :rules="validatePassword"
                    />
                    <CommonButton
                        class="w-full py-2 font-medium"
                        text-size="xl"
                        :disabled="!meta.valid"
                    >
                        Enviar correo
                    </CommonButton>
                </Form>
            </div>
            <div
                v-else-if="success"
                class="mb-12 flex w-full flex-col items-center justify-center gap-4"
            >
                <h1 class="text-center text-2xl font-bold">¡Cambio de contraseña exitoso!</h1>
                <p class="text-center text-gray-500">
                    Se ha establecido tu nueva contraseña correctamente, ahora puedes ingresar a tu
                    cuenta con esta.
                </p>

                <div class="inline-flex rounded-full bg-primary-50/30 p-12">
                    <Icon name="fa6-solid:circle-check" class="text-9xl text-primary" />
                </div>
                <CommonButton
                    @click="() => $router.push('/user/auth/login')"
                    bg-color="primary"
                    class="px-4 py-2"
                >
                    Ir a Inicio de sesión
                </CommonButton>
            </div>
            <div v-else class="mb-12 flex w-full flex-col items-center justify-center gap-4">
                <h1 class="text-center text-2xl font-bold">¡Ocurrió un error!</h1>
                <p class="text-center text-gray-500">
                    No se ha podido establecer tu nueva contraseña. Inténtalo nuevamente más tarde.
                </p>

                <div class="inline-flex rounded-full bg-tertiary-50/30 p-12">
                    <Icon name="fa6-solid:circle-exclamation" class="text-9xl text-tertiary" />
                </div>
                <div class="mt-6 inline-flex w-full flex-row justify-center gap-4">
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
import { useToast } from "vue-toastification";
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
        return "La contraseña es requerida";
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
    }
    // Check if the password contains at least one number
    let hasNumber = false;
    for (let char of password) {
        if (char >= "0" && char <= "9") {
            hasNumber = true;
            break;
        }
    }
    if (!hasNumber) {
        return "La contraseña debe tener al menos un número";
    }
    // Check if the password contains at least one capital letter
    let hasCapital = false;
    for (let char of password) {
        if (char >= "A" && char <= "Z") {
            hasCapital = true;
            break;
        }
    }
    if (!hasCapital) {
        return "La contraseña debe tener al menos una letra mayúscula";
    }
    // All good
    return true;
};

const resetPassword = async () => {
    try {
        const response = await $fetch("/api/auth/update-password", {
            method: "POST",
            body: {
                token: route.params.token,
                newPassword: formData.password,
            },
        });

        if (response.success) {
            toast.success("Contraseña actualizada exitosamente. Puedes iniciar sesión.");
            router.push("/user/auth/login");
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
        toast.error(
            "Ocurrió un error al intentar actualizar la contraseña. Intente nuevamente más tarde.",
        );
    }
};
const goToWhatsapp = async () => {
    await navigateTo(
        "https://wa.me/56971370313?text=Hola%20Jorge,%20necesito%20ayuda%20para%20restablecer%20mi%20contraseña.",
        {
            external: true,
            open: {
                target: "_blank",
            },
        },
    );
};
</script>
