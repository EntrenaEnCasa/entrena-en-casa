<template>
    <Form class="w-full" @submit="register" v-slot="{ meta }">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <CommonInput label="Correo electrónico" v-model="formData.email" name="email" type="email" id="email"
                icon="fa6-solid:envelope" placeholder="Ingresa tu correo electrónico" :rules="validateEmail"
                class="md:col-span-2" />
            <CommonInput label="Contraseña" v-model="formData.password" name="password" type="password" id="password"
                icon="fa6-solid:lock" placeholder="* * * * * * * *" :rules="validatePassword" />
            <CommonInput label="Confirmar contraseña" v-model="formData.passwordRepeat" name="password-repeat"
                type="password" id="password-repeat" icon="fa6-solid:lock" placeholder="* * * * * * * *"
                :rules="validatePasswordRepeat" />
            <CommonSelect label="¿En qué región te encuentras?" v-model="formData.region" name="region" id="region"
                placeholder="Ingresa tu región" :rules="validateRegion" :options="regionOptions"
                class="md:col-span-2" />
        </div>
        <!-- <div class="flex items-center space-x-1">
            <input class="h-5 w-5 rounded-full shadow" id="remember" type="checkbox" />
            <label class="text-gray-500" for="remember">
                Acepto los
                <span class="underline">
                    términos y condiciones
                </span>
            </label>
        </div> -->
        <CommonButton class="py-2 w-full font-medium" text-size="xl" :disabled="!meta.valid" :loading="loading">
            Registrarse
        </CommonButton>
    </Form>
</template>
<script setup>

import { useAuthStore } from '~/stores/AuthStore'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const toast = useToast();

const formData = reactive({
    email: '',
    password: '',
    passwordRepeat: '',
    region: '',
});

const loading = ref(false);

const regionOptions = [
    { value: 'CL-AI', label: 'Aisén del General Carlos Ibañez del Campo' },
    { value: 'CL-AN', label: 'Antofagasta' },
    { value: 'CL-AP', label: 'Arica y Parinacota' },
    { value: 'CL-AT', label: 'Atacama' },
    { value: 'CL-BI', label: 'Bío Bío' },
    { value: 'CL-CO', label: 'Coquimbo' },
    { value: 'CL-AR', label: 'Araucanía' },
    { value: 'CL-LI', label: 'Libertador General Bernardo O\'Higgins' },
    { value: 'CL-LL', label: 'Los Lagos' },
    { value: 'CL-LR', label: 'Los Ríos' },
    { value: 'CL-MA', label: 'Magallanes y de la Antártica Chilena' },
    { value: 'CL-ML', label: 'Maule' },
    { value: 'CL-RM', label: 'Región Metropolitana de Santiago' },
    { value: 'CL-NB', label: 'Ñuble' },
    { value: 'CL-TA', label: 'Tarapacá' },
    { value: 'CL-VS', label: 'Valparaíso' }
];

const registrationState = reactive({
    error: false,
    errorMessage: '',
});

defineExpose({
    registrationState
});

const validateEmail = (value) => {
    // if the field is empty
    if (!value) {
        return 'El email es requerido';
    }
    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return 'El email no es válido';
    }
    // All is good
    return true;
}

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

const validatePasswordRepeat = (passRepeat) => {
    if (!passRepeat) {
        return 'Debes repetir la contraseña';
    }

    if (passRepeat !== password.value) {
        return 'Las contraseñas no coinciden';
    }

    return true;
};

const validateRegion = () => {
    if (!formData.region) {
        return 'La región es requerida';
    }
    return true;
}

const register = async () => {

    loading.value = true;

    const registerData = {
        email: formData.email,
        password: formData.password,
        region: formData.region,
    }

    registrationState.error = false;

    try {

        const response = await $fetch(`${runtimeConfig.public.apiBase}/student/sign-up`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: registerData,
        });

        if (response.success) {
            authStore.signUp(response.user);
            router.push('/user/dashboard/aboutyou');
        }
        else {
            registrationState.error = true;
            registrationState.errorMessage = response.message;
            toast.error(response.message);
        }
    }
    catch (error) {
        registrationState.error = true;
        registrationState.errorMessage = "Error al intentar registrarse";
        toast.error("Error al intentar registrarse");
    }
    finally {
        loading.value = false;
    }

}

</script>