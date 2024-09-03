<template>
    <div class="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div
            class="hidden items-center justify-center text-center lg:flex"
            style="background: linear-gradient(135deg, #99d0dfcc 0%, rgba(0, 129, 183, 0.8) 100%)"
        >
            <div>
                <div class="mb-10">
                    <h1 class="mb-3 text-7xl font-bold text-white">
                        ¡Bienvenido <br />
                        de nuevo!
                    </h1>
                    <p class="text-[22px] text-white">¿Listo para un nuevo desafío?</p>
                </div>
                <NuxtImg src="/emoji/runners.svg" class="mx-auto w-1/2" alt="runner" />
            </div>
        </div>
        <div class="mb-12 flex flex-col items-center justify-center">
            <NuxtLink to="/">
                <NuxtImg src="/logo.png" class="mb-4 w-36" alt="logo" />
            </NuxtLink>
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
