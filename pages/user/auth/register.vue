<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div class="flex flex-col justify-center items-center mb-12 w-4/5 mx-auto">
            <NuxtLink to="/">
                <NuxtImg src="/logo.png" class="mb-4 w-36" alt="logo" />
            </NuxtLink>
            <StudentAuthRegisterForm ref="form" />
            <p class="mt-4 text-gray-500">
                ¿Ya tienes cuenta?
                <router-link to="/user/auth/login" class="text-secondary">
                    Iniciar sesión
                </router-link>
            </p>
            <div
                v-if="form?.registrationState.error"
                class="w-full mt-5 border rounded-md border-red-500 px-5 py-2 text-red-500">
                <p>{{ form.registrationState.errorMessage }}</p>
            </div>
        </div>
        <div
            class="hidden lg:flex items-center justify-center text-center"
            style="background: linear-gradient(135deg, #99d0dfcc 0%, rgba(0, 129, 183, 0.8) 100%)">
            <div class="space-y-10">
                <div class="mb-4">
                    <h1 class="font-bold text-white text-7xl">
                        ¿Estás <br />
                        preparado?
                    </h1>
                </div>
                <NuxtImg src="/emoji/runners.svg" class="w-1/2 mx-auto" alt="runners" />
            </div>
        </div>
    </div>
</template>
<script setup>
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
