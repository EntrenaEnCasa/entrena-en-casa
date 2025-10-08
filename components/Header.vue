<template>
    <nav class="">
        <div class="mx-auto max-w-7xl px-2 lg:px-8">
            <div class="relative z-30 flex h-20 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center lg:hidden">
                    <!-- Mobile menu button-->
                    <button
                        type="button"
                        class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                        @click="toggleMenu"
                    >
                        <span class="sr-only">Open main menu</span>
                        <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          -->
                        <svg
                            class="block h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                        <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          -->
                        <svg
                            class="hidden h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    class="flex flex-1 items-center justify-center lg:items-stretch lg:justify-between"
                >
                    <NuxtLink to="/" class="flex flex-shrink-0 items-center !bg-transparent">
                        <NuxtImg
                            class="h-12 w-auto"
                            src="/logo-horizontal.png"
                            alt="Logo entrena en casa"
                        />
                    </NuxtLink>
                    <div class="hidden items-center lg:flex">
                        <div class="flex space-x-2">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                            <NuxtLink
                                to="/"
                                class="rounded-md px-4 py-2 font-medium hover:bg-secondary hover:text-white"
                                aria-current="page"
                                >Inicio</NuxtLink
                            >
                            <NuxtLink
                                to="/plans"
                                class="rounded-md px-4 py-2 font-medium text-gray-600 hover:bg-secondary hover:text-white"
                            >
                                Planes</NuxtLink
                            >
                            <NuxtLink
                                to="/about-us"
                                class="rounded-md px-4 py-2 font-medium text-gray-600 hover:bg-secondary hover:text-white"
                            >
                                Sobre nosotros</NuxtLink
                            >
                        </div>
                    </div>
                    <div class="hidden items-center space-x-2 font-medium text-gray-500 lg:flex">
                        <nuxt-link to="/user/auth/register" class="rounded-xl px-3 py-2">
                            Registrarse
                        </nuxt-link>
                        <nuxt-link
                            to="/user/auth/login"
                            class="rounded-3xl border-2 border-secondary px-7 py-2"
                        >
                            Iniciar sesión
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <div class="bg-[#E1F7FF] lg:hidden" id="mobile-menu" :class="menuOpen ? 'block' : 'hidden'">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <nuxt-link
                    to="/"
                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-secondary hover:text-white"
                    >Inicio</nuxt-link
                >
                <!-- <nuxt-link to="/"
                    class="text-gray-600 hover:bg-secondary hover:text-white block rounded-md px-3 py-2 text-base font-medium">Sobre
                    Nosotros</nuxt-link> -->
                <nuxt-link
                    to="/plans"
                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-secondary hover:text-white"
                >
                    Planes
                </nuxt-link>
                <nuxt-link
                    to="/about-us"
                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-secondary hover:text-white"
                >
                    Sobre nosotros
                </nuxt-link>
                <div class="space-y-1 py-5">
                    <nuxt-link
                        to="/user/auth/register"
                        class="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary hover:text-white"
                    >
                        Registrarse
                    </nuxt-link>
                    <nuxt-link
                        to="/user/auth/login"
                        class="block rounded-md border-secondary px-3 py-2 text-base font-medium text-gray-600 hover:bg-secondary hover:text-white"
                    >
                        Iniciar sesión
                    </nuxt-link>
                </div>
            </div>
        </div>
    </nav>
</template>
<style scoped>
.router-link-active {
    @apply text-secondary;
}

.router-link-active:hover {
    @apply bg-secondary text-white;
}
</style>
<script setup>
const menuOpen = ref(false);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};
</script>
