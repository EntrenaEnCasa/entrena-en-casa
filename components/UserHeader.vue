<template>
    <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex lg:hidden items-center justify-start">
                    <button @click="toggleSidebar" data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                        aria-controls="logo-sidebar" type="button"
                        class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                        <span class="sr-only">Open sidebar</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                            </path>
                        </svg>
                    </button>
                </div>
                <div class="hidden lg:block">
                    <router-link to="/" class="flex ml-3">
                        <img src="/logo-horizontal.png" class="h-8" alt="Logo" />
                    </router-link>
                </div>
                <div>
                    <h3>Créditos disponibles</h3>
                    <div class="flex justify-center items-center space-x-4">
                        <div class="flex items-center space-x-1">
                            <img src="/plans/bronze-medal.png" class="w-4 h-4" alt="">
                            <span>0</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <img src="/plans/silver-medal.png" class="w-4 h-4" alt="">
                            <span>0</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <img src="/plans/silver-medal.png" class="w-4 h-4" alt="">
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center ml-3">
                        <div class="flex space-x-4">
                            <div class="text-right hidden sm:block">
                                <p class="font-medium">Nombre de usuario</p>
                                <p class="font-light text-sm">Alumno</p>
                            </div>
                            <div>
                                <button type="button" @click="toggleUserMenu"
                                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                                    aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span class="sr-only">Open user menu</span>
                                    <img class="w-12 h-12 rounded-full" src="/icons/woman.png" alt="user photo">
                                </button>
                            </div>
                        </div>
                        <div class="absolute top-14 border right-5 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow-md"
                            :class="{ hidden: !userMenuOpen }" id="dropdown-user">
                            <div class="px-4 py-3" role="none">
                                <p class="text-sm text-gray-900" role="none">
                                    Neil Sims
                                </p>
                                <p class="text-sm font-medium text-gray-900 truncate" role="none">
                                    neil.sims@flowbite.com
                                </p>
                            </div>
                            <ul class="py-1" role="none">
                                <li>
                                    <routerLink @click="userMenuOpen = false" to="/user/dashboard/settings"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                        Configuración</routerLink>
                                </li>
                                <!-- <li>
                                    <routerLink @click="userMenuOpen = false" to="/user/dashboard/support"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                        Soporte</routerLink>
                                </li> -->
                                <li>
                                    <button @click="logout"
                                        class="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem">Cerrar sesión
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>

import { ref } from 'vue';

const router = useRouter();

const toggleSidebar = () => emit('toggleSidebar');

const userMenuOpen = ref(false);
const toggleUserMenu = () => userMenuOpen.value = !userMenuOpen.value;

const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    router.push('/');
}

const emit = defineEmits(['toggleSidebar'])

</script>