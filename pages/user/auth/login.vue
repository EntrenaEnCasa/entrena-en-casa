<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div class="hidden lg:flex items-center justify-center text-center"
            style="background: linear-gradient(135deg, #99d0dfcc 0%, rgba(0, 129, 183, 0.80) 100%);">
            <div>
                <div class="mb-10">
                    <h1 class="mb-3 text-7xl font-bold text-white">¡Bienvenido <br> de nuevo!</h1>
                    <p class="text-[22px] text-white">¿Listo para un nuevo desafío?</p>
                </div>
                <img src="/emoji/runners.svg" class="w-1/2 mx-auto" alt="runner">
            </div>
        </div>
        <div class="flex flex-col justify-center items-center mb-12">
            <nuxt-link to="/">
                <img src="/logo.png" class="mb-4 w-36" alt="logo">
            </nuxt-link>
            <form class="w-4/5 space-y-5" @submit.prevent="login">
                <div>
                    <label class="block mb-1" for="email">Correo electrónico</label>
                    <div class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full"
                        style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
                        <div>
                            <Icon name="fa6-solid:envelope" class="text-secondary text-lg" />
                        </div>
                        <input v-model="formData.email" class="w-full" type="email" id="email" aria-describedby="emailHelp"
                            placeholder="Ingresa tu correo electrónico">
                    </div>
                </div>
                <div>
                    <label class="block mb-1" for="password">Contraseña</label>
                    <div class="border rounded-md px-4 py-3 flex items-center space-x-4 w-full"
                        style="box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.10);">
                        <div>
                            <Icon name="fa6-solid:lock" class="text-secondary text-lg" />
                        </div>
                        <input v-model="formData.password" type="password" class="w-full" id="password"
                            placeholder="* * * * * * * *">
                    </div>

                </div>
                <div class="flex justify-between">
                    <div class="flex items-center space-x-1">
                        <input class="h-5 w-5 rounded-full shadow" id="remember" type="checkbox" />
                        <label class="text-gray-500" for="remember">Recuérdame</label>
                    </div>
                    <p class=" text-secondary">Olvidé mi contraseña</p>
                </div>
                <button type="submit" class="bg-primary py-3 w-full text-white font-medium mt-2 text-xl rounded-sm">Iniciar
                    sesión</button>
            </form>
            <p class="mt-4 text-gray-500">
                ¿No tienes cuenta?
                <router-link to="/user/auth/register" class="text-secondary">
                    Registrarse
                </router-link>
            </p>
        </div>
    </div>
</template>
<script setup>

import { useAuthStore } from '~/stores/AuthStore'

const router = useRouter();
const authStore = useAuthStore();
const formData = reactive({
    email: "",
    password: ""
});

definePageMeta({
    layout: "auth",
});

const login = async () => {

    await useFetch('http://localhost:1234/student/log-in', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: {
            email: formData.email,
            password: formData.password,
        },
        onResponse({ request, response, options }) {

            const responseData = response._data;

            if (responseData.success) {
                authStore.logIn(responseData.user);
                router.push('/user/dashboard/home');
            }
            else {
                alert(responseData.message);
            }
        },
    });
}

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