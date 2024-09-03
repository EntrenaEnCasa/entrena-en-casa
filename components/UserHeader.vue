<template>
    <nav class="fixed top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start lg:hidden">
                    <button
                        @click="toggleSidebar"
                        data-drawer-target="logo-sidebar"
                        data-drawer-toggle="logo-sidebar"
                        aria-controls="logo-sidebar"
                        type="button"
                        class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <span class="sr-only">Open sidebar</span>
                        <svg
                            class="h-6 w-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div class="hidden lg:block">
                    <router-link to="/" class="ml-3 flex">
                        <NuxtImg src="/logo-horizontal.png" class="h-8" alt="Logo" />
                    </router-link>
                </div>
                <div class="flex items-center">
                    <div class="ml-3 flex items-center">
                        <div class="flex space-x-4">
                            <div class="hidden text-right sm:block">
                                <p class="font-medium">{{ user.email }}</p>

                                <p v-if="user.user_type == 2" class="text-sm font-light">Alumno</p>
                                <p v-if="user.user_type == 1" class="text-sm font-light">
                                    Profesional
                                </p>
                                <p v-if="user.user_type == 0" class="text-sm font-light">
                                    Administrador
                                </p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    @click="toggleUserMenu"
                                    class="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300"
                                    aria-expanded="false"
                                    data-dropdown-toggle="dropdown-user"
                                >
                                    <span class="sr-only">Open user menu</span>
                                    <NuxtImg
                                        class="h-12 w-12 rounded-full"
                                        src="/icons/dumbbell.png"
                                        alt="user photo"
                                    />
                                </button>
                            </div>
                        </div>
                        <div
                            class="absolute right-5 top-14 z-50 my-4 list-none divide-y divide-gray-100 rounded border bg-white text-base shadow-md"
                            :class="{ hidden: !userMenuOpen }"
                            id="dropdown-user"
                        >
                            <div class="px-4 py-3" role="none">
                                <p class="truncate text-sm font-medium text-gray-900" role="none">
                                    {{ user.email }}
                                </p>
                            </div>
                            <ul class="py-1" role="none">
                                <li v-show="user.user_type != 0">
                                    <routerLink
                                        v-if="user.user_type === 2"
                                        @click="userMenuOpen = false"
                                        to="/user/dashboard/settings"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        Configuración</routerLink
                                    >
                                    <routerLink
                                        v-else-if="user.user_type === 1"
                                        @click="userMenuOpen = false"
                                        to="/professional/dashboard/settings"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        Configuración</routerLink
                                    >
                                </li>
                                <!-- <li>
                                    <routerLink @click="userMenuOpen = false" to="/user/dashboard/support"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                        Soporte</routerLink>
                                </li> -->
                                <li>
                                    <button
                                        @click="logout"
                                        class="w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        Cerrar sesión
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
import { useAuthStore } from "~/stores/AuthStore";
import { useUserStore } from "~/stores/UserStore";
import { useToast } from "vue-toastification";

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToast();

const toggleSidebar = () => emit("toggleSidebar");
const userMenuOpen = ref(false);
const user = ref({});

onMounted(() => {
    user.value = userStore.user;
});

const toggleUserMenu = () => (userMenuOpen.value = !userMenuOpen.value);

const logout = async () => {
    try {
        const response = await $fetch("/api/auth/log-out", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.success) {
            authStore.logOut();
        } else {
            toast.error("Error al cerrar sesión");
        }
    } catch (error) {
        console.log(error);
        toast.error("Error al cerrar sesión");
    }
};

const emit = defineEmits(["toggleSidebar"]);
defineExpose({
    userMenuOpen,
});
</script>
