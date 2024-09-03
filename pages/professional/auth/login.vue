<template>
    <div class="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div
            class="hidden items-center justify-center text-center lg:flex"
            style="background: linear-gradient(135deg, #99d0dfcc 0%, rgba(0, 129, 183, 0.8) 100%)"
        >
            <div>
                <div class="mb-10">
                    <h1 class="mb-3 text-7xl font-bold text-white">
                        ¡Bienvenido querido profesional!
                    </h1>
                    <div class="mt-10 flex flex-col items-center gap-2">
                        <p class="text-[22px] text-white">Te estabamos esperando</p>
                        <NuxtImg src="/emoji/face-stars.png" class="h-20 w-20" alt="emoji" />
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-12 flex flex-col items-center justify-center">
            <NuxtLink to="/">
                <NuxtImg src="/logo.png" class="mb-4 w-36" alt="logo" />
            </NuxtLink>
            <ProfessionalAuthLoginForm />
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "auth",
});
</script>
