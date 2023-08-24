<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div class="flex flex-col justify-center items-center mb-12 w-4/5 mx-auto">
            <img src="/logo.png" class="mb-4 w-36" alt="logo">
            <StudentAuthRegisterForm ref="form" />
            <!-- <Form class="w-full space-y-4" @submit="register" v-slot="{ meta }">
                <div>
                    <label class="block mb-1" for="email">Correo electrónico</label>
                    <div class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full"
                        style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                                <path
                                    d="M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z"
                                    fill="#0EB3E0" />
                            </svg>
                        </div>
                        <Field name="email" type="email" class="w-full" id="email" :rules="validateEmail"
                            placeholder="Ingresa tu correo electrónico" />
                    </div>
                    <ErrorMessage class="mt-1 block rounded-lg text-red-500" name="email" />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-1" for="password">Contraseña</label>
                        <div class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full"
                            style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                                    <path
                                        d="M368 192h-16v-80a96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 64.07 0 0064-64V256a64.07 64.07 0 00-64-64zm-48 0H192v-80a64 64 0 11128 0z"
                                        fill="#0EB3E0" />
                                </svg>
                            </div>
                            <Field name="password" type="password" class="w-full" id="password" :rules="validatePassword"
                                v-model="password" placeholder="* * * * * * * *" />
                        </div>
                        <ErrorMessage class="mt-1 block rounded-lg text-red-500" name="password" />
                    </div>
                    <div>
                        <label class="block mb-1" for="password-repeat">Confirmar Contraseña</label>
                        <div class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full"
                            style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                                    <path
                                        d="M368 192h-16v-80a96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 64.07 0 0064-64V256a64.07 64.07 0 00-64-64zm-48 0H192v-80a64 64 0 11128 0z"
                                        fill="#0EB3E0" />
                                </svg>
                            </div>
                            <Field name="password-repeat" type="password" class="w-full" id="password-repeat"
                                :rules="validatePasswordRepeat" placeholder="* * * * * * * *" />
                        </div>
                        <ErrorMessage class="mt-1 block rounded-lg text-red-500" name="password-repeat" />
                    </div>
                </div>
                <div class="flex items-center space-x-1">
                    <input class="h-5 w-5 rounded-full shadow" id="remember" type="checkbox" />
                    <label class="text-gray-500" for="remember">Acepto los <span class="underline">términos y
                            condiciones</span></label>
                </div>
                <button
                    class="bg-primary text-xl rounded-sm p-2 w-full text-white font-medium mt-2 disabled:bg-primary-100 disabled:cursor-not-allowed"
                    :disabled="!meta.valid" value="registrarse" to="/user/dashboard/home">Registrarse</button>
            </Form> -->
            <p class="mt-4 text-gray-500">
                ¿Ya tienes cuenta?
                <router-link to="/user/auth/login" class="text-secondary">
                    Iniciar sesión
                </router-link>
            </p>
            <div v-if="form?.registrationState.error"
                class="w-full mt-5 border rounded-md border-red-500 px-5 py-2 text-red-500">
                <p>{{ form.registrationState.errorMessage }}</p>
            </div>
        </div>
        <div class="hidden lg:flex items-center justify-center text-center"
            style="background: linear-gradient(135deg, #99d0dfcc 0%, rgba(0, 129, 183, 0.80) 100%);">
            <div class="space-y-10">
                <div class="mb-4">
                    <h1 class="font-bold text-white text-7xl">¿Estás <br> preparado?</h1>
                </div>
                <img src="/emoji/runners.svg" class="w-1/2 mx-auto" alt="runners">
            </div>
        </div>

    </div>
</template>
<script setup>

import { ref } from 'vue';

const form = ref(null);

definePageMeta({
    layout: "auth",
});
</script>

<style scoped lang="scss">
svg {
    width: 20px;
    height: 20px;
}

*:focus {

    outline: none !important;
    box-shadow: none;
}
</style>