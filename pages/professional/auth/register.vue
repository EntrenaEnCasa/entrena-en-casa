<template>
    <div class="grid min-h-screen items-center">
        <div>
            <div class="mx-3 flex flex-col items-center pt-10">
                <NuxtLink to="/">
                    <NuxtImg class="mx-auto h-28 w-28" src="/logo.png" alt="logo" />
                </NuxtLink>
            </div>
            <div class="mx-auto w-4/5 py-12">
                <h1 class="mb-2 text-center text-2xl font-bold">Registro de profesionales</h1>
                <p class="text-center text-gray-500">
                    ¡Únete a la comunidad de profesionales de la salud y el deporte!
                </p>
            </div>
            <Form v-slot="{ meta }" @submit="register" class="h-full w-full pb-10">
                <div
                    class="grid w-full grid-cols-1 items-center justify-items-center gap-6 lg:grid-cols-2 lg:space-x-4 lg:px-10">
                    <div class="w-4/5 space-y-6 lg:justify-self-end">
                        <div class="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
                            <CommonInput label="¿Cual es tu nombre?" v-model="formData.firstName" name="firstName"
                                type="firstName" id="firstName" placeholder="Ingresa tu nombre"
                                :rules="validateFirstName" class="w-full" />
                            <CommonInput label="¿Cual es tu apellido?" v-model="formData.lastName" name="lastName"
                                type="lastName" id="lastName" placeholder="Ingresa tu apellido"
                                :rules="validateLastName" class="w-full" />
                        </div>
                        <CommonInput label="¿Cuál es tu título o especialidad?" v-model="formData.title" name="title"
                            type="title" id="title" placeholder="Entrenador físico" :rules="validateTitle"
                            class="w-full" />
                    </div>
                    <div class="w-4/5 space-y-6 lg:justify-self-start">
                        <CommonInput label="Correo Electrónico" v-model="formData.email" name="email" type="email"
                            id="email" icon="fa6-solid:envelope" placeholder="Ingresa tu correo electrónico"
                            :rules="validateEmail" />
                        <div class="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
                            <CommonInput label="Contraseña" v-model="formData.password" name="password" type="password"
                                id="password" icon="fa6-solid:lock" placeholder="* * * * * * * *"
                                :rules="validatePassword" />

                            <CommonInput label="Confirma tu contraseña" v-model="formData.repassword" name="repassword"
                                type="password" icon="fa6-solid:lock" id="repassword" placeholder="* * * * * * * *"
                                :rules="validateRePassword" class="w-full" />
                        </div>
                    </div>
                </div>

                <div class="mt-10">
                    <div class="flex justify-center">
                        <CommonButton type="submit" :loading="saveUserDataLoading" :disabled="!meta.valid"
                            class="px-8 py-2">
                            Registrarse
                        </CommonButton>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface UserAPIResponse extends APIResponse {
    user: User;
}
const runtimeConfig = useRuntimeConfig();
const authStore = useAuthStore();

const formData = reactive({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
    title: "",
});

const saveUserDataLoading = ref(false);

import { useToast } from "vue-toastification";
const toast = useToast();

const validateFirstName = () => {
    if (!formData.firstName) {
        return "El nombre es requerido";
    } else if (formData.firstName.length < 3) {
        return "El nombre debe tener al menos 3 caracteres";
    }
    return true;
};

const validateLastName = () => {
    if (!formData.lastName) {
        return "El apellido es requerido";
    } else if (formData.lastName.length < 3) {
        return "El apellido debe tener al menos 3 caracteres";
    }
    return true;
};

const validateEmail = () => {
    if (!formData.email) {
        return "El correo es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        return "El correo no es válido";
    }
    return true;
};

const validatePassword = () => {
    if (!formData.password) {
        return "La contraseña es requerida";
    } else if (formData.password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
    }
    return true;
};

const validateRePassword = () => {
    if (!formData.repassword) {
        return "La contraseña es requerida";
    } else if (formData.repassword !== formData.password) {
        return "Las contraseñas no coinciden";
    }
    return true;
};

const validateTitle = () => {
    if (!formData.title) {
        return "El título es requerido";
    } else if (formData.title.length < 3) {
        return "El título debe tener al menos 3 caracteres";
    } else if (formData.title.length > 30) {
        return "El título debe tener menos de 30 caracteres";
    }
    return true;
};

const router = useRouter();

const register = async () => {
    saveUserDataLoading.value = true;

    try {
        const response = await $fetch<UserAPIResponse>(`/api/auth/professional/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password,
                title: formData.title,
            }),
        });

        if (response.success) {
            const responseNotification = await $fetch<APIResponse>(
                `/api/auth/professional/send-notification-email`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        title: formData.title,
                        email: formData.email,

                    }),
                },
            );
            toast.success(response.message);
            authStore.signUp(response.user);
            router.push("/professional/dashboard/home");
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("Error al intentar registrarse");
    } finally {
        saveUserDataLoading.value = false;
    }
};

definePageMeta({
    layout: "auth",
});
</script>
