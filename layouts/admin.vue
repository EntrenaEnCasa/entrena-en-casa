<template>
    <div>
        <UserHeader @toggleSidebar="toggleSidebar" />
        <AdminSidebar ref="sidebar" />
        <main @click="sidebar.sidebarOpen = false" class="mt-[4.5rem] lg:ml-64 transition-[background]">
            <div class="relative">
                <div class="min-h-[calc(100vh_-_4.5rem)] bg-[#F7FAFA] flex">
                    <div class="flex-1">
                        <slot></slot>
                    </div>
                </div>
                <div class="absolute top-0 w-full h-full min-h-[calc(100vh_-_4.5rem)] bg-black/10 backdrop-blur-[3px] lg:backdrop-blur-none lg:bg-transparent transition-all"
                    :class="{ 'hidden': !sidebar?.sidebarOpen }">
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>

const sidebar = ref(null);
const toggleSidebar = () => sidebar.value.toggleSidebar();

</script>