<template>
    <div>
        <UserHeader ref="header" @toggleSidebar="toggleSidebar" />
        <UserSidebar ref="sidebar" />
        <main @click="closeElements" class="mt-[4.5rem] lg:ml-64 transition-[background]">
            <div class="relative">
                <div class="min-h-[calc(100vh_-_4.5rem)] bg-[#F7FAFA]">
                    <slot></slot>
                </div>
                <div class="absolute top-0 w-full h-full bg-black/10 backdrop-blur-[3px] lg:backdrop-blur-none lg:bg-transparent transition-all"
                    :class="{ 'hidden': !sidebar?.sidebarOpen }">
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>

import { ref } from "vue";

const header = ref(null);

const sidebar = ref(null);
const toggleSidebar = () => sidebar.value.toggleSidebar();

const closeElements = () => {
    header.value.userMenuOpen = false;
    sidebar.value.sidebarOpen = false;
}

</script>