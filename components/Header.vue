<template>
    <nav class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div class="mx-auto max-w-7xl px-4 lg:px-8">
            <div class="relative flex h-20 items-center justify-between">
                <!-- Mobile menu button -->
                <div class="flex items-center lg:hidden">
                    <button
                        type="button"
                        class="inline-flex items-center justify-center rounded-xl p-2.5 text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                        aria-controls="mobile-menu"
                        :aria-expanded="menuOpen"
                        @click="toggleMenu"
                    >
                        <span class="sr-only">Open main menu</span>
                        <Icon :name="menuOpen ? 'mdi:close' : 'mdi:menu'" class="h-6 w-6" />
                    </button>
                </div>

                <!-- Logo -->
                <NuxtLink to="/" class="flex flex-shrink-0 items-center logo-link">
                    <NuxtImg
                        class="h-12 w-auto"
                        src="/logo-horizontal.png"
                        alt="Logo entrena en casa"
                    />
                </NuxtLink>

                <!-- Desktop Navigation -->
                <div class="hidden lg:flex items-center flex-1 justify-center">
                    <div class="flex items-center space-x-1">
                        <NuxtLink
                            to="/"
                            class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                        >
                            Inicio
                        </NuxtLink>
                        <NuxtLink
                            to="/plans"
                            class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                        >
                            Planes
                        </NuxtLink>
                        <NuxtLink
                            to="/about-us"
                            class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                        >
                            Sobre nosotros
                        </NuxtLink>
                        <a
                            href="/#beneficios"
                            class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                        >
                            Beneficios
                        </a>
                        <a
                            href="/#contacto"
                            class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                        >
                            Contacto
                        </a>
                        <NuxtLink
                            to="/blog"
                            class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                        >
                            Blog
                        </NuxtLink>
                    </div>
                </div>

                <!-- Desktop Auth Buttons -->
                <div class="hidden lg:flex items-center space-x-3">
                    <NuxtLink 
                        to="/user/auth/login" 
                        class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200"
                    >
                                                <Icon name="mdi:login" class="w-5 h-5" />
                        Iniciar sesión
                    </NuxtLink>
                    <NuxtLink
                        to="/user/auth/register"
                        class="rounded-lg px-5 py-2.5 text-sm font-semibold bg-secondary text-white hover:bg-secondary-600 transition-all duration-200 shadow-sm"
                    >
                                                <Icon name="mdi:account-plus" class="w-5 h-5" />

                        Registrarse
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Mobile menu -->
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
                        <NuxtLink
                            to="/"
                            class="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                            @click="toggleMenu"
                        >
                            Inicio
                        </NuxtLink>
                        
                        <NuxtLink
                            to="/plans"
                            class="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                            @click="toggleMenu"
                        >
                            Planes
                        </NuxtLink>
                        
                        <NuxtLink
                            to="/about-us"
                            class="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                            @click="toggleMenu"
                        >
                            Sobre nosotros
                        </NuxtLink>

                        <a
                            href="/#beneficios"
                            class="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                            @click="toggleMenu"
                        >
                            Beneficios
                        </a>

                        <a
                            href="/#contacto"
                            class="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                            @click="toggleMenu"
                        >
                            Contacto
                        </a>

                        <NuxtLink
                            to="/blog"
                            class="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                            @click="toggleMenu"
                        >
                            Blog
                        </NuxtLink>
                        
                        <!-- Divider -->
                        <div class="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                        
                        <!-- Auth Links -->
                        <NuxtLink
                            to="/user/auth/register"
                            class="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-semibold bg-secondary text-white hover:bg-secondary-600 transition-all duration-200 shadow-lg shadow-secondary/25"
                            @click="toggleMenu"
                        >
                            <Icon name="mdi:account-plus" class="w-5 h-5" />
                            <span>Registrarse</span>
                        </NuxtLink>
                        
                        <NuxtLink
                            to="/user/auth/login"
                            class="flex items-center justify-center gap-2 rounded-xl border-2 border-secondary px-4 py-3 text-base font-semibold text-secondary hover:bg-secondary hover:text-white transition-all duration-200"
                            @click="toggleMenu"
                        >
                            <Icon name="mdi:login" class="w-5 h-5" />
                            <span>Iniciar sesión</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </Transition>
    </nav>
</template>
<style scoped>
.logo-link {
    background: transparent !important;
}

.logo-link:hover {
    background: transparent !important;
}

.router-link-active:not(.logo-link) {
    @apply text-secondary;
}

.router-link-active:not(.logo-link):hover {
    @apply bg-secondary text-white;
}
</style>
<script setup>
const menuOpen = ref(false);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};
</script>
