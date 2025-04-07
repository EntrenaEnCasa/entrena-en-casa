<template>
    <CommonModal ref="modalRef">
        <div class="px-4 py-8 sm:px-6">
            <h2 class="mb-8 text-center text-2xl font-bold">Crear una cuenta</h2>
            <Form class="mx-auto space-y-5" @submit="register" v-slot="{ meta }">
                <CommonInput
                    label="Correo electrónico"
                    v-model="formData.email"
                    name="register-email"
                    type="email"
                    id="register-email"
                    icon="fa6-solid:envelope"
                    placeholder="Ingresa tu correo electrónico"
                    :rules="validateEmail"
                />
                <CommonInput
                    label="Contraseña"
                    v-model="formData.password"
                    name="register-password"
                    type="password"
                    id="register-password"
                    icon="fa6-solid:lock"
                    placeholder="* * * * * * * *"
                    :rules="validatePassword"
                />
                <CommonInput
                    label="Confirmar contraseña"
                    v-model="formData.passwordRepeat"
                    name="password-repeat"
                    type="password"
                    id="password-repeat"
                    icon="fa6-solid:lock"
                    placeholder="* * * * * * * *"
                    :rules="validatePasswordRepeat"
                />
                <CommonSelect
                    label="¿En qué región te encuentras?"
                    v-model="formData.region"
                    name="region"
                    id="region"
                    placeholder="Ingresa tu región"
                    :rules="validateRegion"
                    :options="regionOptions"
                />

                <div class="mb-4 flex justify-end">
                    <button
                        type="button"
                        class="text-orange-500 hover:underline"
                        @click="openLoginModal"
                    >
                        Ya tengo una cuenta
                    </button>
                </div>
                <CommonButton
                    class="w-full py-2 font-medium"
                    text-size="xl"
                    :disabled="!meta.valid"
                    :loading="loading"
                >
                    Registrarse
                </CommonButton>
            </Form>
        </div>
    </CommonModal>
</template>

<script setup>
import { useToast } from "vue-toastification";

const modalRef = ref(null);
const emit = defineEmits(["openLogin"]);
const toast = useToast();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const formData = reactive({
    email: "",
    password: "",
    passwordRepeat: "",
    region: "",
});

const loading = ref(false);

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

const validateEmail = (email) => {
    // if the field is empty
    if (!email) return "El email es requerido";

    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(email)) {
        return "El email no es válido";
    }
    // All is good
    return true;
};

const validatePassword = (password) => {
    if (!password) return "La contraseña es requerida";

    // Check if the password is at least 8 characters long
    if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres";

    // Check if the password contains at least one number
    let hasNumber = false;
    for (let char of password) {
        if (char >= "0" && char <= "9") {
            hasNumber = true;
            break;
        }
    }

    if (!hasNumber) return "La contraseña debe tener al menos un número";

    // Check if the password contains at least one capital letter
    let hasCapital = false;
    for (let char of password) {
        if (char >= "A" && char <= "Z") {
            hasCapital = true;
            break;
        }
    }

    if (!hasCapital) return "La contraseña debe tener al menos una letra mayúscula";

    // All good
    return true;
};

const validatePasswordRepeat = (passRepeat) => {
    if (!passRepeat) return "Debes repetir la contraseña";

    if (passRepeat !== formData.password) return "Las contraseñas no coinciden";

    return true;
};

const validateRegion = () => {
    if (!formData.region) return "La región es requerida";
    return true;
};

const register = async () => {
    loading.value = true;
    try {
        const response = await $fetch(`/api/auth/student/sign-up`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: {
                email: formData.email,
                password: formData.password,
                region: formData.region,
            },
        });

        if (response.success) {
            authStore.signUp(response.user);
            modalRef.value.closeModal();

            // Get planId from the current route
            const planId = route.params.id;

            // Redirect to credits page with planId as query param
            await router.push({
                path: "/user/dashboard/credits",
                query: planId ? { planId } : {},
            });
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        toast.error("Error al intentar registrarse");
    } finally {
        loading.value = false;
    }
};

const openLoginModal = () => {
    modalRef.value.closeModal();
    emit("openLogin");
};

defineExpose({
    openModal: () => modalRef.value?.openModal(),
    closeModal: () => modalRef.value?.closeModal(),
});
</script>
