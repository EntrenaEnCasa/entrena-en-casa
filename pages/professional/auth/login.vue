<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div class="hidden lg:flex items-center justify-center text-center"
            style="background: linear-gradient(135deg, #99d0dfcc 0%, rgba(0, 129, 183, 0.80) 100%);">
            <div>
                <div class="mb-10">
                    <h1 class="mb-3 text-7xl font-bold text-white">¡Bienvenido querido profesional!</h1>
                    <div class="mt-10 flex flex-col items-center gap-2">
                        <p class="text-[22px] text-white">Te estabamos esperando</p>
                        <NuxtImg src="/emoji/face-stars.png" class="w-20 h-20" alt="emoji" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center mb-12">
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