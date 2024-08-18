<template>
    <div>
        <UserHeader ref="header" @toggleSidebar="toggleSidebar" />
        <UserSidebar ref="sidebar" />
        <main @click="closeElements" class="mt-[4.5rem] lg:ml-64">
            <div class="relative">
                <div class="min-h-[calc(100vh_-_4.5rem)] bg-[#F7FAFA]">
                    <slot></slot>
                </div>
                <div
                    class="absolute top-0 w-full h-full bg-black/30 lg:bg-transparent transition-all"
                    :class="{ hidden: !sidebar?.sidebarOpen }"></div>
            </div>
        </main>
    </div>
</template>

<script setup>
const header = ref(null);

const sidebar = ref(null);
const toggleSidebar = () => sidebar.value.toggleSidebar();

const closeElements = () => {
    header.value.userMenuOpen = false;
    sidebar.value.sidebarOpen = false;
};
</script>
