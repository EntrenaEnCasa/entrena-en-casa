<template>
    <Form class="w-4/5 space-y-5" @submit="login" v-slot="{ meta }">
        <CommonInput
            label="Correo Electrónico"
            v-model="formData.email"
            name="email"
            type="email"
            id="email"
            icon="fa6-solid:envelope"
            placeholder="Ingresa tu correo electrónico"
            :rules="validateEmail"
        />
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

        <div class="flex">
            <router-link to="/password/reset" class="text-secondary">
                Olvidé mi contraseña
            </router-link>
        </div>
        <CommonButton
            class="w-full py-2 font-medium"
            text-size="xl"
            :loading="loading"
            :disabled="!meta.valid"
        >
            Iniciar Sesión
        </CommonButton>
    </Form>
</template>

<script setup>
import { useAuthStore } from "~/stores/AuthStore";
import { useToast } from "vue-toastification";

const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const authStore = useAuthStore();
const toast = useToast();

const formData = reactive({
    email: "",
    password: "",
});

const loading = ref(false);

const validateEmail = (value) => {
    // if the field is empty
    if (!value) {
        return "El email es requerido";
    }
    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return "El email no es válido";
    }
    // All is good
    return true;
};

const validatePassword = (password) => {
    if (!password) {
        return "La contraseña es requerida";
    }

    return true;
};

const login = async () => {
    loading.value = true;

    try {
        const response = await $fetch("/api/auth/student/log-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                email: formData.email,
                password: formData.password,
            },
        });

        if (response.success) {
            authStore.logIn(response.user);
            router.push("/user/dashboard/home");
            toast.success("Inicio de sesión existoso");
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("Ocurrió un error al iniciar sesión");
    } finally {
        loading.value = false;
    }
};
</script>
