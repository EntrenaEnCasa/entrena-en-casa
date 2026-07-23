<template>
    <Form class="w-full" @submit="register" v-slot="{ meta }">
        <!-- Step indicator -->
        <div class="mb-8 flex items-center justify-center gap-4">
            <div class="flex items-center gap-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-base font-bold text-white"
                >
                    1
                </div>
                <div class="text-sm font-semibold text-secondary">Paso 1 de 2</div>
            </div>
            <div class="h-0.5 w-14 bg-gray-200"></div>
            <div class="flex items-center gap-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-base font-bold text-gray-400"
                >
                    2
                </div>
                <div class="text-sm font-medium text-gray-400">Paso 2 (opcional)</div>
            </div>
        </div>

        <div class="mb-6 space-y-5">
            <div>
                <label class="mb-2 block text-sm font-semibold text-gray-800" for="email">
                    Correo electrónico
                </label>
                <div
                    class="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20"
                >
                    <Icon name="fa6-solid:envelope" class="mr-3 text-base text-secondary" />
                    <Field
                        id="email"
                        name="email"
                        v-model="formData.email"
                        type="email"
                        placeholder="tucorreo@ejemplo.com"
                        :rules="validateEmail"
                        class="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                    />
                </div>
                <ErrorMessage name="email" class="mt-1 block text-sm text-red-500" />
            </div>

            <div>
                <label class="mb-2 block text-sm font-semibold text-gray-800" for="password">
                    Contraseña
                </label>
                <div
                    class="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20"
                >
                    <Icon name="fa6-solid:lock" class="mr-3 text-base text-secondary" />
                    <Field
                        id="password"
                        name="password"
                        v-model="formData.password"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Crea una contraseña segura"
                        :rules="validatePassword"
                        class="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                    />
                    <button
                        type="button"
                        class="ml-2 text-gray-400 transition hover:text-gray-600"
                        @click="showPassword = !showPassword"
                    >
                        <Icon :name="showPassword ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'" class="text-base" />
                    </button>
                </div>
                <ErrorMessage name="password" class="mt-1 block text-sm text-red-500" />
            </div>

            <div>
                <label class="mb-2 block text-sm font-semibold text-gray-800" for="password-repeat">
                    Repetir contraseña
                </label>
                <div
                    class="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20"
                >
                    <Icon name="fa6-solid:lock" class="mr-3 text-base text-secondary" />
                    <Field
                        id="password-repeat"
                        name="password-repeat"
                        v-model="formData.passwordRepeat"
                        :type="showPasswordRepeat ? 'text' : 'password'"
                        placeholder="Repite tu contraseña"
                        :rules="validatePasswordRepeat"
                        class="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400"
                    />
                    <button
                        type="button"
                        class="ml-2 text-gray-400 transition hover:text-gray-600"
                        @click="showPasswordRepeat = !showPasswordRepeat"
                    >
                        <Icon
                            :name="showPasswordRepeat ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'"
                            class="text-base"
                        />
                    </button>
                </div>
                <ErrorMessage name="password-repeat" class="mt-1 block text-sm text-red-500" />
            </div>

            <CommonListbox
                id="region"
                name="region"
                v-model="formData.region"
                label="Seleccionar región"
                icon="fa6-solid:location-dot"
                placeholder="Selecciona tu región"
                :options="regionOptions"
                :rules="validateRegion"
            />
        </div>

        <div class="mb-6 flex items-start gap-3">
            <input
                v-model="formData.acceptTerms"
                class="mt-1 h-5 w-5 rounded-md border-gray-300 text-secondary focus:ring-secondary"
                id="terms"
                type="checkbox"
            />
            <label class="text-sm text-gray-600" for="terms">
                Acepto los
                <NuxtLink to="/terms" class="text-secondary underline">
                    términos y condiciones
                </NuxtLink>
            </label>
        </div>

        <CommonButton
            class="w-full py-3.5 font-semibold"
            bg-color="secondary"
            rounded-size="xl"
            text-size="base"
            :disabled="!meta.valid || !formData.acceptTerms"
            :loading="loading"
        >
            Continuar
        </CommonButton>

        <p class="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?
            <router-link to="/user/auth/login" class="font-semibold text-secondary">
                Iniciar sesión
            </router-link>
        </p>
    </Form>
</template>
<script setup>
import { useAuthStore } from "~/stores/AuthStore";
import { useToast } from "vue-toastification";

const authStore = useAuthStore();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const toast = useToast();

const formData = reactive({
    email: "",
    password: "",
    passwordRepeat: "",
    region: "",
    firstName: "",
    lastName: "",
    phone: "",
    acceptTerms: false
});

const loading = ref(false);
const showPassword = ref(false);
const showPasswordRepeat = ref(false);

const regionOptions = [
    { value: 11, label: "Aisén del General Carlos Ibañez del Campo" },
    { value: 2, label: "Antofagasta" },
    { value: 15, label: "Arica y Parinacota" },
    { value: 3, label: "Atacama" },
    { value: 8, label: "Bío Bío" },
    { value: 4, label: "Coquimbo" },
    { value: 9, label: "Araucanía" },
    { value: 6, label: "Libertador General Bernardo O'Higgins" },
    { value: 10, label: "Los Lagos" },
    { value: 14, label: "Los Ríos" },
    { value: 12, label: "Magallanes y de la Antártica Chilena" },
    { value: 7, label: "Maule" },
    { value: 13, label: "Región Metropolitana de Santiago" },
    { value: 16, label: "Ñuble" },
    { value: 1, label: "Tarapacá" },
    { value: 5, label: "Valparaíso" },
];

const registrationState = reactive({
    error: false,
    errorMessage: "",
});

defineExpose({
    registrationState,
});

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

const validatePhone = (value) => {
    if (!value) {
        return "El teléfono es requerido";
    }
    const regex = /^[0-9]{8,15}$/;
    if (!regex.test(value)) {
        return "El teléfono no es válido";
    }
    return true;
};

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

const validatePasswordRepeat = (passRepeat) => {
    if (!passRepeat) {
        return "Debes repetir la contraseña";
    }

    if (passRepeat !== formData.password) {
        return "Las contraseñas no coinciden";
    }

    return true;
};

const validateRegion = () => {
    if (!formData.region) {
        return "La región es requerida";
    }
    return true;
};

const register = async () => {
    loading.value = true;

    const registerData = {
        email: formData.email,
        password: formData.password,
        region: formData.region,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone
    };

    registrationState.error = false;

    try {
        const response = await $fetch(`/api/auth/student/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: registerData,
        });

        if (response.success) {
            authStore.signUp(response.user);
            router.push("/user/dashboard/aboutYou");
            toast.success(response.message);
        } else {
            registrationState.error = true;
            registrationState.errorMessage = response.message;
            toast.error(response.message);
        }
    } catch (error) {
        registrationState.error = true;
        registrationState.errorMessage = "Error al intentar registrarse";
        toast.error("Error al intentar registrarse");
    } finally {
        loading.value = false;
    }
};
</script>