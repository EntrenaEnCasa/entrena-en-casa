<template>
    <aside
        id="logo-sidebar"
        class="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-24 transition-transform duration-300 lg:translate-x-0"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        aria-label="Sidebar"
    >
        <div class="h-full overflow-y-auto bg-white px-3 pb-4">
            <ul class="space-y-2 font-medium">
                <li>
                    <router-link
                        @click="sidebarOpen = false"
                        to="/user/dashboard/home"
                        class="group flex items-center rounded-lg p-3 text-gray-500 hover:bg-secondary-300"
                    >
                        <Icon
                            name="fa6-solid:house-chimney"
                            class="h-5 w-5 group-hover:text-white"
                        />
                        <span class="ml-3 flex-1 whitespace-nowrap group-hover:text-white"
                            >Inicio</span
                        >
                    </router-link>
                </li>
                <li>
                    <router-link
                        @click="sidebarOpen = false"
                        to="/user/dashboard/sessions"
                        class="group flex items-center rounded-lg p-3 text-gray-500 hover:bg-secondary-300"
                    >
                        <Icon
                            name="fa6-solid:circle-check"
                            class="h-5 w-5 group-hover:text-white"
                        />
                        <span class="ml-3 flex-1 whitespace-nowrap group-hover:text-white"
                            >Sesiones agendadas</span
                        >
                    </router-link>
                </li>
                <li>
                    <router-link
                        @click="sidebarOpen = false"
                        to="/user/dashboard/schedule"
                        class="group flex items-center rounded-lg p-3 text-gray-500 hover:bg-secondary-300"
                    >
                        <Icon
                            name="fa6-solid:calendar-days"
                            class="h-5 w-5 group-hover:text-white"
                        />
                        <span class="ml-3 flex-1 whitespace-nowrap group-hover:text-white"
                            >Agendar sesión</span
                        >
                    </router-link>
                </li>
                <li>
                    <router-link
                        @click="sidebarOpen = false"
                        to="/user/dashboard/credits"
                        class="group flex items-center rounded-lg p-3 text-gray-500 hover:bg-secondary-300"
                    >
                        <Icon name="fa6-solid:money-bill" class="h-5 w-5 group-hover:text-white" />
                        <span class="ml-3 flex-1 whitespace-nowrap group-hover:text-white"
                            >Créditos</span
                        >
                    </router-link>
                </li>
                <!-- <li>
                    <router-link @click="sidebarOpen = false" to="/user/dashboard/recommendations"
                        class="flex items-center p-3 text-gray-500 rounded-lg hover:bg-secondary group">
                        <Icon name="fa6-solid:ranking-star" class="w-5 h-5 text-gray-500 group-hover:text-white" />
                        <span class="flex-1 ml-3 whitespace-nowrap group-hover:text-white">Recomendaciones</span>
                    </router-link>
                </li>
                <li>
                    <router-link @click="sidebarOpen = false" to="#"
                        class="flex items-center p-3 text-gray-500 rounded-lg hover:bg-secondary group">
                        <Icon name="fa6-solid:chart-column" class="w-5 h-5 text-gray-500 group-hover:text-white" />
                        <span class="flex-1 ml-3 whitespace-nowrap group-hover:text-white">Estadísticas</span>
                    </router-link>
                </li>
                -->
            </ul>
        </div>
    </aside>
</template>
<style scoped>
.router-link-active {
    @apply bg-secondary text-white;
}

.router-link-active:hover {
    @apply bg-secondary text-white;
}
</style>
<script setup>
const sidebarOpen = ref(false);
const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value);

defineExpose({
    toggleSidebar,
    sidebarOpen,
});
</script>
