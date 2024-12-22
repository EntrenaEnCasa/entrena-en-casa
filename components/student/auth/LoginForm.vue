<template>
    <Form class="w-4/5 space-y-5" @submit="validateAndLogin" v-slot="{ meta }">
        <CommonInput label="Correo Electrónico" v-model="formData.email" name="email" type="email" id="email"
            icon="fa6-solid:envelope" placeholder="Ingresa tu correo electrónico" :rules="validateEmail" />
        <CommonInput label="Contraseña" v-model="formData.password" name="password" type="password" id="password"
            icon="fa6-solid:lock" placeholder="* * * * * * * *" :rules="validatePassword" />

        <div class="flex">
            <router-link to="/password/reset" class="text-secondary">
                Olvidé mi contraseña
            </router-link>
        </div>

        <!-- Mostrar CAPTCHA después de varios intentos fallidos -->
        <div v-if="showCaptcha" class="captcha-container">
            <div id="recaptcha-container" class="g-recaptcha" :data-sitekey="recaptchaSiteKey"></div>
            <p v-if="captchaError" class="error-message">{{ captchaError }}</p>
        </div>

        <CommonButton class="w-full py-2 font-medium" text-size="xl" :loading="loading"
            :disabled="!meta.valid || (showCaptcha && !captchaVerified)">
            Iniciar Sesión
        </CommonButton>
    </Form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter, useRuntimeConfig } from "#app";
import { useAuthStore } from "~/stores/AuthStore";

// Configuración y composables
const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// Variables reactivas
const failedAttempts = ref(0);
const captchaVerified = ref(false);
const captchaError = ref<string | null>(null);
const recaptchaSiteKey = runtimeConfig.public.siteKey;
const loading = ref(false);

const formData = reactive({
    email: "",
    password: "",
});

const showCaptcha = computed(() => failedAttempts.value >= 2);

// Funciones de validación
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

// Cargar el script de reCAPTCHA dinámicamente
const loadRecaptchaScript = () => {
    const scriptId = "recaptcha-script";
    if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
};

// Validar CAPTCHA en el backend
const validateCaptcha = async (): Promise<boolean> => {
    const token = (window as any).grecaptcha.getResponse();

    if (!token) {
        captchaError.value = "Por favor, completa el CAPTCHA.";
        return false;
    }

    try {
        const response = await $fetch("/api/verify-recaptcha", {
            method: "POST",
            body: { token },
        });

        if (response.success) {
            captchaVerified.value = true;
            return true;
        } else {
            captchaError.value = "Verificación del CAPTCHA fallida.";
            (window as any).grecaptcha.reset();
            return false;
        }
    } catch (error) {
        captchaError.value = "Error al verificar el CAPTCHA.";
        console.error(error);
        return false;
    }
};

// Validar el login después del CAPTCHA
const validateAndLogin = async (event: Event) => {
    loading.value = true;

    try {
        if (showCaptcha.value && !(await validateCaptcha())) {
            loading.value = false;
            return;
        }

        // Validar las credenciales
        const response = await $fetch("/api/auth/student/log-in", {
            method: "POST",
            body: {
                email: formData.email,
                password: formData.password,
            },
        });

        if (response.success) {
            authStore.logIn(response.user);
            router.push("/user/dashboard/home");
            toast.success("Inicio de sesión exitoso");
        } else {
            failedAttempts.value++;
            toast.error(response.message);
        }
    } catch (error) {
        failedAttempts.value++;
        console.error("Error:", error);
        toast.error("Ocurrió un error al iniciar sesión.");
    } finally {
        loading.value = false;
    }
};

// Cargar el script en el montaje
onMounted(() => {
    if (showCaptcha.value) loadRecaptchaScript();
});
</script>

<style scoped>
.captcha-container {
    margin: 20px 0;
}

.error-message {
    color: red;
    font-size: 14px;
}
</style>