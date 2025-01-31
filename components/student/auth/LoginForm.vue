<template>
    <Form class="w-4/5 space-y-5" @submit="validateAndLogin" v-slot="{ meta }">
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
        <p v-if="isLocked" class="error-message">
            {{
                errorTimeMessage ||
                "Demasiados intentos fallidos, espera antes de volver a intentarlo"
            }}
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
            :disabled="!meta.valid || (isLocked && timer > 0)"
        >
            {{ isLocked && timer > 0 ? `Reintentar en ${timer}s` : "Iniciar Sesión" }}
        </CommonButton>
    </Form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "#app";
import { useAuthStore } from "~/stores/AuthStore";
import { useReCaptcha } from "vue-recaptcha-v3";

// Configuración y composables
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const recaptcha = useReCaptcha();
const executeRecaptcha = recaptcha?.executeRecaptcha;

// Variables reactivas
const failedAttempts = ref(0);
const captchaVerified = ref(false);
const errorTimeMessage = ref<string | null>(null);
const loading = ref(false);
const isLocked = ref(false);
const timer = ref(0);
let timerInterval: NodeJS.Timeout | null = null;

const formData = reactive({
    email: "",
    password: "",
});

// Mostrar CAPTCHA solo después de ciertos intentos fallidos
const captchaRequired = computed(() => failedAttempts.value >= 2);

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

// Bloquear intentos adicionales por 30 segundos después de 5 intentos fallidos
const startLockout = () => {
    isLocked.value = true;
    timer.value = 15;
    timerInterval = setInterval(() => {
        timer.value--;
        if (timer.value <= 0) {
            clearInterval(timerInterval!);
            isLocked.value = false;
            errorTimeMessage.value = null;
        }
    }, 1000);
};

// Validar CAPTCHA con vue-recaptcha-v3
const validateCaptcha = async (): Promise<boolean> => {
    try {
        if (!executeRecaptcha) {
            throw new Error("Recaptcha is not available");
        }
        const token = await executeRecaptcha("login_action");
        const response = await $fetch("/api/verify-recaptcha", {
            method: "POST",
            body: { token },
        });

        if (response.success) {
            captchaVerified.value = true;
            return true;
        } else {
            toast.error("Verificación del CAPTCHA fallida.");
            return false;
        }
    } catch (error) {
        toast.error("Error al verificar el CAPTCHA.");
        console.error(error);
        return false;
    }
};

// Validar el login después del CAPTCHA
const validateAndLogin = async (event: Event) => {
    if (isLocked.value) {
        toast.error("Debes esperar antes de volver a intentar.");
        return;
    }

    loading.value = true;

    try {
        // Si el CAPTCHA es requerido, validarlo antes de continuar
        if (captchaRequired.value && !(await validateCaptcha())) {
            loading.value = false;
            startLockout();
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
            failedAttempts.value = 0; // Reiniciar intentos fallidos en caso de éxito
        } else {
            failedAttempts.value++;
            toast.error(response.message);

            if (failedAttempts.value >= 5) {
                startLockout();
            }
        }
    } catch (error) {
        failedAttempts.value++;
        console.error("Error:", error);
        toast.error("Ocurrió un error al iniciar sesión.");

        if (failedAttempts.value >= 5) {
            startLockout();
        }
    } finally {
        loading.value = false;
    }
};

// Limpiar el intervalo al desmontar el componente
watch(timer, (newTimer) => {
    if (newTimer <= 0 && timerInterval) {
        clearInterval(timerInterval);
    }
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
