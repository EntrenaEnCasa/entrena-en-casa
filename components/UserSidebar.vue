<template>
    <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-24 duration-300 transition-transform -translate-x-full bg-white border-r border-gray-200 lg:translate-x-0"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
            <ul class="space-y-2 font-medium">
                <li>
                    <router-link
                        @click="sidebarOpen = false"
                        to="/user/dashboard/home"
                        class="flex items-center p-3 text-gray-500 rounded-lg hover:bg-secondary-300 group">
                        <Icon
                            name="fa6-solid:house-chimney"
                            class="w-5 h-5 group-hover:text-white" />
                        <span class="flex-1 ml-3 whitespace-nowrap group-hover:text-white"
                            >Inicio</span
                        >
                    </router-link>
                </li>
                <li>
                    <router-link
                        @click="sidebarOpen = false"
                        to="/user/dashboard/sessions"
                        class="flex items-center p-3 text-gray-500 rounded-lg hover:bg-secondary-300 group">
                        <Icon
                            name="fa6-solid:circle-check"
                            class="w-5 h-5 group-hover:text-white" />
                        <span class="flex-1 ml-3 whitespace-nowrap group-hover:text-white"
                            >Sesiones agendadas</span
                        >
                    </router-link>
                </li>
                <li>
                    <router-link
                        @click="sidebarOpen = false"
                        to="/user/dashboard/schedule"
                        class="flex items-center p-3 text-gray-500 rounded-lg hover:bg-secondary-300 group">
                        <Icon
                            name="fa6-solid:calendar-days"
                            class="w-5 h-5 group-hover:text-white" />
                        <span class="flex-1 ml-3 whitespace-nowrap group-hover:text-white"
                            >Agendar sesión</span
                        >
                    </router-link>
                </li>
                <li>
                    <router-link
                        @click="sidebarOpen = false"
                        to="/user/dashboard/credits"
                        class="flex items-center p-3 text-gray-500 rounded-lg hover:bg-secondary-300 group">
                        <Icon name="fa6-solid:money-bill" class="w-5 h-5 group-hover:text-white" />
                        <span class="flex-1 ml-3 whitespace-nowrap group-hover:text-white"
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
