<template>
    <Form class="w-4/5 space-y-5" @submit="handleLogin" v-slot="{ meta }">
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
        <p v-if="isLocked" class="text-sm text-red-500">
            Demasiados intentos fallidos, espera antes de volver a intentarlo
        </p>
        <div class="flex">
            <router-link to="/password/reset" class="text-secondary">
                Olvidé mi contraseña
            </router-link>
        </div>

        <CommonButton
            class="w-full py-2 font-medium"
            text-size="xl"
            :loading="loading"
            :disabled="!meta.valid || isLocked"
        >
            {{ isLocked ? `Reintentar en ${timer}s` : "Iniciar Sesión" }}
        </CommonButton>
    </Form>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { useLoginAttempts } from "~/composables/auth/useLoginAttempts";
import { useCaptcha } from "~/composables/auth/useCaptcha";

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const { attempts, isLocked, timer, increment, reset } = useLoginAttempts();
const { verify, required: captchaRequired } = useCaptcha(attempts);
const loading = ref(false);

const formData = reactive({
    email: "",
    password: "",
});

// Validation rules
const validateEmail = (value: string) => {
    if (!value) return "El email es requerido";
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) return "El email no es válido";
    return true;
};

const validatePassword = (password: string) => {
    if (!password) return "La contraseña es requerida";
    return true;
};

// login handler
const handleLogin = async () => {
    if (isLocked.value) {
        toast.error("Debes esperar antes de volver a intentar.");
        return;
    }

    loading.value = true;

    try {
        if (captchaRequired.value && !(await verify())) {
            throw new Error("Verificación del CAPTCHA fallida");
        }

        const response = await $fetch("/api/auth/professional/log-in", {
            method: "POST",
            body: {
                email: formData.email,
                password: formData.password,
            },
        });

        if (response.success) {
            authStore.logIn(response.user);
            reset();
            await router.push("/professional/dashboard/home");
            toast.success("Inicio de sesión exitoso");
        } else {
            increment();
            toast.error(response.message);
        }
    } catch (error) {
        increment();
        console.error("Error:", error);
        toast.error("Ocurrió un error al iniciar sesión.");
    } finally {
        loading.value = false;
    }
};
</script>
