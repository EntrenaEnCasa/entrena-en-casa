<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div class="hidden lg:flex items-center justify-center text-center"
            style="background: linear-gradient(135deg, #99d0dfcc 0%, rgba(0, 129, 183, 0.80) 100%);">
            <div>
                <div class="mb-10">
                    <h1 class="mb-3 text-7xl font-bold text-white">¡Bienvenido <br> de nuevo!</h1>
                    <p class="text-[22px] text-white">¿Listo para un nuevo desafío?</p>
                </div>
                <NuxtImg src="/emoji/runners.svg" class="w-1/2 mx-auto" alt="runner" />
            </div>
        </div>
        <div class="flex flex-col justify-center items-center mb-12">
            <nuxt-link to="/">
                <NuxtImg src="/logo.png" class="mb-4 w-36" alt="logo" />
            </nuxt-link>
            <StudentAuthLoginForm />
            <p class="mt-4 text-gray-500">
                ¿No tienes cuenta?
                <router-link to="/user/auth/register" class="text-secondary">
                    Registrarse
                </router-link>
            </p>
            <p class="mt-2 text-gray-500">
                ¿Eres profesional?
                <router-link to="/professional/auth/login" class="text-secondary">
                    Inicia sesión como profesional
                </router-link>
            </p>
        </div>
    </div>
</template>
<script setup>

definePageMeta({
    layout: "auth",
});

</script>