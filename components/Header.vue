<template>
    <nav class="">
        <div class="mx-auto max-w-7xl px-2 lg:px-8">
            <div class="relative z-30 flex h-20 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center lg:hidden">
                    <!-- Mobile menu button-->
                    <button
                        type="button"
                        class="inline-flex items-center justify-center rounded-xl p-2.5 text-gray-700 hover:bg-secondary/10 hover:text-secondary  transition-all duration-200"
                        aria-controls="mobile-menu"
                        :aria-expanded="menuOpen"
                        @click="toggleMenu"
                    >
                        <span class="sr-only">Open main menu</span>
                        <!-- Hamburger Icon -->
                        <svg
                            :class="menuOpen ? 'hidden' : 'block'"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                        <!-- Close Icon -->
                        <svg
                            :class="menuOpen ? 'block' : 'hidden'"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
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
        <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
        >
            <div v-show="menuOpen" class="lg:hidden" id="mobile-menu">
                <div class="backdrop-blur-xl bg-white/95 shadow-2xl border-t border-gray-100">
                    <div class="space-y-1 px-4 py-6">
                        <!-- Navigation Links -->
                        <nuxt-link
                            to="/"
                            class="group flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                            @click="toggleMenu"
                        >
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <span>Inicio</span>
                        </nuxt-link>
                        
                        <nuxt-link
                            to="/plans"
                            class="group flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                            @click="toggleMenu"
                        >
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>
                            <span>Planes</span>
                        </nuxt-link>
                        
                        <nuxt-link
                            to="/about-us"
                            class="group flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                            @click="toggleMenu"
                        >
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                            <span>Sobre nosotros</span>
                        </nuxt-link>
                        
                        <!-- Divider -->
                        <div class="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                        
                        <!-- Auth Links -->
                        <nuxt-link
                            to="/user/auth/register"
                            class="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-semibold bg-secondary text-white hover:bg-secondary-200 transition-all duration-200 shadow-lg shadow-secondary/25"
                            @click="toggleMenu"
                        >
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                            <span>Registrarse</span>
                        </nuxt-link>
                        
                        <nuxt-link
                            to="/user/auth/login"
                            class="flex items-center justify-center gap-2 rounded-xl border-2 border-secondary px-4 py-3 text-base font-semibold text-secondary hover:bg-secondary hover:text-white transition-all duration-200"
                            @click="toggleMenu"
                        >
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                            <span>Iniciar sesión</span>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </Transition>
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
