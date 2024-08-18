<template>
    <div>
        <UserHeader @toggleSidebar="toggleSidebar" />
        <ProfessionalSidebar ref="sidebar" />
        <main @click="sidebar.sidebarOpen = false" class="mt-[4.5rem] lg:ml-72">
            <div class="relative">
                <div class="min-h-[calc(100vh_-_4.5rem)] bg-[#F7FAFA]">
                    <slot></slot>
                </div>
                <div
                    class="absolute top-0 w-full h-full min-h-[calc(100vh_-_4.5rem)] bg-black/30 lg:bg-transparent transition-all"
                    :class="{ hidden: !sidebar?.sidebarOpen }"></div>
            </div>
        </main>
    </div>
</template>

<script setup>
const sidebar = ref(null);
const toggleSidebar = () => sidebar.value.toggleSidebar();
</script>
