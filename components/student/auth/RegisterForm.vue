<template>
    <Form class="w-full space-y-4" @submit="register" v-slot="{ meta }">
        <CommonInput label="Correo electrónico" name="email" type="email" id="email" icon="fa6-solid:envelope"
            placeholder="Ingresa tu correo electrónico" :rules="validateEmail" />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CommonInput label="Contraseña" v-model="password" name="password" type="password" id="password"
                icon="fa6-solid:lock" placeholder="* * * * * * * *" :rules="validatePassword" />

            <CommonInput label="Confirmar contraseña" name="password-repeat" type="password" id="password-repeat"
                icon="fa6-solid:lock" placeholder="* * * * * * * *" :rules="validatePasswordRepeat" />
        </div>
        <div class="flex items-center space-x-1">
            <input class="h-5 w-5 rounded-full shadow" id="remember" type="checkbox" />
            <label class="text-gray-500" for="remember">Acepto los <span class="underline">términos y
                    condiciones</span></label>
        </div>
        <CommonButton text="Registrarse" class="py-2 w-full font-medium" size="xl" :disabled="!meta.valid"
            :loading="loading" />
    </Form>
</template>
<script setup>

import { useAuthStore } from '~/stores/AuthStore'

import { ref } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const password = ref('');
const loading = ref(false);

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

const register = async (values) => {

    loading.value = true;

    const { email, password } = values;

    const registerData = {
        email: email,
        password: password
    }

    registrationState.error = false;

    await useFetch(`${runtimeConfig.public.apiBase}/student/sign-up`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: registerData,
        onResponse({ request, response, options }) {
            const responseData = response._data;
            loading.value = false;

            if (responseData.success) {
                authStore.signUp(responseData.user);
                router.push('/user/dashboard/aboutyou');
            }
            else {
                registrationState.error = true;
                registrationState.errorMessage = responseData.message;
            }
        },
    });
}

</script>