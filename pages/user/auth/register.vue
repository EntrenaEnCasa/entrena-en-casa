<template>
    <div class="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div class="mx-auto mb-12 flex w-4/5 flex-col items-center justify-center">
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
                class="mt-5 w-full rounded-md border border-red-500 px-5 py-2 text-red-500"
            >
                <p>{{ form.registrationState.errorMessage }}</p>
            </div>
        </div>
        <div
            class="hidden items-center justify-center text-center lg:flex"
            style="background: linear-gradient(135deg, #99d0dfcc 0%, rgba(0, 129, 183, 0.8) 100%)"
        >
            <div class="space-y-10">
                <div class="mb-4">
                    <h1 class="text-7xl font-bold text-white">
                        ¿Estás <br />
                        preparado?
                    </h1>
                </div>
                <NuxtImg src="/emoji/runners.svg" class="mx-auto w-1/2" alt="runners" />
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
