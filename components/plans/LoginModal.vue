<template>
    <CommonModal ref="modalRef">
        <div class="px-4 py-8 sm:px-6">
            <h2 class="mb-8 text-center text-2xl font-bold">Inicia sesión para continuar</h2>
            <Form class="mx-auto space-y-5" @submit="login" v-slot="{ meta }">
                <CommonInput
                    label="Correo Electrónico"
                    v-model="formData.email"
                    name="login-email"
                    type="email"
                    id="login-email"
                    icon="fa6-solid:envelope"
                    placeholder="Ingresa tu correo electrónico"
                    :rules="validateEmail"
                />
                <CommonInput
                    label="Contraseña"
                    v-model="formData.password"
                    name="login-password"
                    type="password"
                    id="login-password"
                    icon="fa6-solid:lock"
                    placeholder="* * * * * * * *"
                    :rules="validatePassword"
                />

                <div class="flex justify-between">
                    <router-link to="/password/reset" class="text-secondary">
                        Olvidé mi contraseña
                    </router-link>
                    <button
                        type="button"
                        class="text-orange-500 hover:underline"
                        @click="openRegisterModal"
                    >
                        Crear cuenta
                    </button>
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
        </div>
    </CommonModal>
</template>

<script setup>
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const modalRef = ref(null);
const emit = defineEmits(["openRegister"]);
const toast = useToast();
const authStore = useAuthStore();

const formData = reactive({
    email: "",
    password: "",
});

const loading = ref(false);

const validateEmail = (email) => {
    if (!email) return "El email es requerido";

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(email)) return "El email no es válido";
    return true;
};

const validatePassword = (password) => {
    if (!password) return "La contraseña es requerida";
    return true;
};

const login = async () => {
    loading.value = true;
    try {
        const response = await $fetch("/api/auth/student/log-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: {
                email: formData.email,
                password: formData.password,
            },
        });

        if (response.success) {
            authStore.logIn(response.user);
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
        console.error(error);
        toast.error("Ocurrió un error al iniciar sesión");
    } finally {
        loading.value = false;
    }
};

const openRegisterModal = () => {
    modalRef.value.closeModal();
    emit("openRegister");
};

defineExpose({
    openModal: () => modalRef.value?.openModal(),
    closeModal: () => modalRef.value?.closeModal(),
});
</script>
