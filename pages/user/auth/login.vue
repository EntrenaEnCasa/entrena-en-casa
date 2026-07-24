<template>
    <div
        class="relative flex min-h-screen items-start justify-center bg-cover
        h-full bg-no-repeat px-6 pb-10 pt-14 lg:px-8 lg:pt-16"
        style="background-image: url('/auth/login-bg.jpg');"
    >
        <div
            class="relative z-10 flex w-full max-w-6xl flex-col items-center gap-2 md:gap-10 lg:flex-row lg:items-center lg:justify-between"
        >
            <NuxtLink to="/" class="relative z-10 lg:hidden">
                <NuxtImg src="/logo-white.png" class="mb-2 w-40" alt="logo" />
            </NuxtLink>

            <div class="w-full max-w-xl rounded-3xl h-full md:min-h-[80vh] min-h-auto flex flex-col justify-center items-center bg-white p-8 shadow-2xl lg:p-10">
                <h2 class="mb-1 text-2xl font-bold text-gray-800">Inicia sesión</h2>
                <p class="mb-6 text-sm text-gray-500">Ingresa tus datos para continuar</p>
                <StudentAuthLoginForm />
                <p class="mt-4 text-gray-500">
                    <p class="mt-6 text-center text-sm text-gray-600">
            ¿No tienes cuenta?
            <router-link to="/user/auth/register" class="font-semibold text-secondary">
                Registrarse
            </router-link>
        </p>
                </p>
                <p class="text-center text-sm text-gray-600 mt-2">
                    ¿Eres profesional?
                    <router-link to="/professional/auth/login" class="font-semibold text-secondary">
                        Inicia sesión como profesional
                    </router-link>
                </p>
            </div>

            <div
                class="hidden max-h-[50vh] w-full flex-col items-end justify-start self-start text-right text-white lg:flex"
            >
                <NuxtLink to="/">
                    <NuxtImg src="/logo-white.png" class="mb-4 w-32" alt="logo" />
                </NuxtLink>
                <h1 class="mb-2 text-2xl font-bold leading-tight lg:text-[2.25rem]">
                    ¡Bienvenido de nuevo!
                </h1>
                <h2 class="mb-2 text-xl font-semibold leading-tight lg:text-[1.75rem]">
                   ¿Listo para un nuevo desafío?
                </h2>
                <p class="mb-4 text-sm text-white/90">
                    Sigue entrenando desde casa con tu personal trainer.
                </p>
                <div
                    class="ml-auto flex w-4/5 justify-center gap-4 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur-sm"
                >
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
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "auth",
});
const { setSEO } = useSEO();

setSEO({
  title: 'Inicia sesión como estudiante - Entrena en Casa',
  description: 'Elige tu plan con personal trainer online, a domicilio o grupal. Filtra por comuna y horario. Entrena solo, en dupla o con quien tú quieras. Rápido y fácil.',
  keywords: [
    "Inicio de sesión estudiante", "personal trainer online", "entrenadores personales", "entrenamiento personalizado", "Entrenamientos grupales online",
    "Personal Trainer Viña del Mar", "Personal Trainer Concon", "Personal trainer las condes", "ejercicios con hijos", "entrena en casa", "entrenador",
    "entrenamiento personal en santiago", "personal trainer presencial", "personal trainer a domicilio", "entrenamiento online personalizado",
    "entrenamiento personalizado providencia", "rutina para adultos mayores", "entrenamiento funcional oficina", "entrenar fuerza online",
    "entrenamiento en pareja en casa", "entrenar con mi pareja", "necesito entrenar con mi pareja en casa"
  ],
  image: '/SEO/user/auth/login.png',
  type: 'website',
  noindex: true
})

</script>
