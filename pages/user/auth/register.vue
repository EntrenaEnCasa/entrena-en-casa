<template>
    <div
        class="relative flex min-h-screen items-start justify-center bg-cover 
        h-full bg-no-repeat px-6 pb-10 pt-5 md:pt-14 lg:px-8 lg:pt-16"
        style="background-image: url('/auth/step-1-bg.jpg');"
    >
        <!-- <div
            class="absolute inset-0 bg-gradient-to-r from-secondary/75 via-secondary/40 to-transparent"
        ></div> -->

        <div
            class="relative z-10 flex w-full max-w-6xl flex-col items-center md:gap-10 lg:flex-row lg:items-start lg:justify-between"
        >
            <div class="hidden max-h-[50vh] w-full flex-col justify-start text-white lg:flex">
                <NuxtLink to="/">
                    <NuxtImg src="/logo-white.png" class="mb-4 w-32" alt="logo" />
                </NuxtLink>
                <h1 class="mb-2 text-2xl font-bold leading-tight lg:text-[2.25rem]">
                    Tu mejor versión<br />comienza aquí
                </h1>
                <p class="mb-4 text-sm text-white/90">
                    Únete a miles de personas que ya<br />entrenan desde casa.
                </p>
                <div class="flex w-4/5 gap-4 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur-sm justify-center">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-secondary">+10K</div>
                        <div class="mt-1 text-xs text-gray-600">Usuarios activos</div>
                    </div>
                    <div class="w-px bg-gray-300"></div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-secondary">+500</div>
                        <div class="mt-1 text-xs text-gray-600">Entrenamientos</div>
                    </div>
                    <div class="w-px bg-gray-300"></div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-secondary">95%</div>
                        <div class="mt-1 text-xs text-gray-600">Satisfacción</div>
                    </div>
                </div>
            </div>

            <NuxtLink to="/" class="relative z-10 lg:hidden">
                <NuxtImg src="/logo-white.png" class=" w-40" alt="logo" />
            </NuxtLink>

            <div class="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl lg:p-10">
                <StudentAuthRegisterForm ref="form" />
                <div
                    v-if="form?.registrationState.error"
                    class="mt-5 w-full rounded-lg border border-red-500 bg-red-50 px-5 py-3 text-red-600"
                >
                    <p>{{ form.registrationState.errorMessage }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const form = ref(null);
const { setSEO } = useSEO()

setSEO({
  title: 'Regístrate como Estudiante - Entrena en Casa',
  description: 'Crea tu cuenta y accede a entrenamiento personalizado online o a domicilio. Entrena en casa fácil, rápido y con profesionales en tu comuna.',
  keywords: [
    "buscar entrenamiento personalizado", "entrenamiento a domicilio", "por que es importante entrenar", "entrenamientos personales online",
    "personal trainer a domicilio en viña del mar", "registrarse entrenamiento personalizado", "crear cuenta entrenamiento online",
    "cuenta entrenamiento personalizado", "Evaluación ejercicios en casa", "Necesito Personal Trainer Online", "Busco Personal Trainer mujer",
    "ejercicios bajar de peso"
  ],
  image: '/SEO/user/auth/register.png',
  type: 'website',
  noindex: true
})


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
