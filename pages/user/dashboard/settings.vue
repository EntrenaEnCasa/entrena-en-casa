<template>
    <div>
        <div class="row row-gap-4 mb-5">
            <h3 class="text-xl font-medium mb-4">Configuración</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div v-if="userStore.user.name" class="bg-white border py-4 px-7 rounded-xl">
                    <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-500">Nombre de usuario</p>
                        <button disabled
                            class="px-8 py-1 rounded-lg bg-primary text-white disabled:bg-primary-100 disabled:cursor-not-allowed">
                            Editar
                        </button>
                    </div>
                    <h3 class="font-medium text-2xl text-ellipsis overflow-hidden">{{ userStore.user.name }}</h3>
                </div>
                <div v-if="userStore.user.email" class="bg-white border py-4 px-7 rounded-xl">
                    <div class="flex justify-between items-center">
                        <p class="text-sm text-gray-500">Correo electrónico</p>
                        <button class="px-8 py-1 rounded-lg bg-primary text-white" @click="openModalEmail()">
                            Editar
                        </button>
                    </div>
                    <h3 class="font-medium text-2xl text-ellipsis overflow-hidden">{{ userStore.user.email }}</h3>
                </div>
                <div v-if="userStore.user.bornDate" class="bg-white border py-4 px-7 rounded-xl">
                    <div class="flex justify-between items-center">
                        <p class="text-sm text-gray-500">Fecha de nacimiento</p>
                        <button disabled
                            class="px-8 py-1 rounded-lg bg-primary text-white disabled:bg-primary-100 disabled:cursor-not-allowed">
                            Editar
                        </button>
                    </div>
                    <h3 class="font-medium text-2xl text-ellipsis overflow-hidden">{{ userStore.user.bornDate }}</h3>
                </div>
                <div class="bg-white border py-4 px-7 rounded-xl">
                    <div class="flex justify-between items-center">
                        <p class="text-sm text-gray-500">Contraseña</p>
                        <button class="px-8 py-1 rounded-lg bg-primary text-white" @click="openModalPassword()">
                            Editar
                        </button>
                    </div>
                    <h3 class="font-medium text-2xl text-ellipsis overflow-hidden">************</h3>
                </div>
            </div>
        </div>
        <div class="flex justify-center mt-20">
            <div class="flex items-center gap-2">
                <p class="font-medium text-red-500 text-xl">¿Darse de baja?</p>
                <button class="px-4 py-1 bg-red-500 text-white flex items-center gap-2 font-medium rounded-md">
                    <Icon name="fa6-solid:triangle-exclamation" />
                    <span>Desactivar perfil</span>
                </button>
            </div>
        </div>
        <Teleport to="body">
            <CommonModal ref="modalEmail">
                <Form class="w-full" @submit="changeEmail">
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <CommonInput label="Email" v-model="email" name="email" type="email" id="email"
                            icon="fa6-solid:lock" placeholder="1234@entrenaencasa.cl" :rules="validateEmail" />

                        <CommonInput label="Confirmar email" name="email-repeat" type="email" id="email-repeat"
                            icon="fa6-solid:lock" placeholder="1234@entrenaencasa.cl" :rules="validateEmailRepeat" />
                    </div>
                    <CommonButton text="Confirmar" class="py-2 w-full font-medium" text-size="xl" :loading="loading" />
                </Form>
            </CommonModal>
        </Teleport>
        <Teleport to="body">
            <CommonModal ref="modalPassword">
                <Form class="w-full" @submit="changePassword">
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <CommonInput label="Contraseña" v-model="password" name="password" type="password" id="password"
                            icon="fa6-solid:lock" placeholder="* * * * * * * *" :rules="validatePassword" />

                        <CommonInput label="Confirmar contraseña" name="password-repeat" type="password"
                            id="password-repeat" icon="fa6-solid:lock" placeholder="* * * * * * * *"
                            :rules="validatePasswordRepeat" />
                    </div>
                    <CommonButton text="Confirmar" class="py-2 w-full font-medium" text-size="xl" :loading="loading" />
                </Form>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup>

import { useUserStore } from '@/stores/UserStore';

import { ref } from 'vue';

const runtimeConfig = useRuntimeConfig();

const userStore = useUserStore();
const loading = ref(false);
const modalPassword = ref(null);
const modalEmail = ref(null);
const password = ref('');
const email = ref('');

const openModalPassword = () => {
    modalPassword.value.openModal();
};

const openModalEmail = () => {
    modalEmail.value.openModal();
};

const validateEmail = (value) => {
    // if the field is empty
    if (!value) {
        return 'El correo electrónico es requerido';
    }
    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return 'El correo electrónico no es válido';
    }
    // All is good
    return true;
}

const validateEmailRepeat = (emailRepeat) => {
    if (!emailRepeat) {
        return 'Debes repetir el correo electrónico';
    }

    if (emailRepeat !== email.value) {
        return 'Los correos electrónicos no coinciden';
    }

    return true;
};

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

const changePassword = async () => {
    loading.value = true;

    await useFetch(`${runtimeConfig.public.apiBase}/user/update-password`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.getUserToken()
        },
        body: JSON.stringify({
            user_id: userStore.user.user_id,
            newPassword: password.value,
        }),
        onResponse({ request, response, options }) {

            loading.value = false;
            const responseData = response._data;

            if (responseData.success) {
                alert(responseData.message);
            }
            else {
                alert(responseData.message);
            }
        }
    });
};


const changeEmail = async () => {
    loading.value = true;

    await useFetch(`${runtimeConfig.public.apiBase}/user/update-email`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userStore.getUserToken()
        },
        body: JSON.stringify({
            user_id: userStore.user.user_id,
            newEmail: email.value,
        }),
        onResponse({ request, response, options }) {

            loading.value = false;
            const responseData = response._data;

            if (responseData.success) {
                alert(responseData.message);
            }
            else {
                alert(responseData.message);
            }
        }
    });
};

</script>