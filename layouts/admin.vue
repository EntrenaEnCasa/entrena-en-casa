<template>
    <div>
        <UserHeader @toggleSidebar="toggleSidebar" />
        <AdminSidebar ref="sidebar" />
        <main @click="sidebar.sidebarOpen = false" class="mt-[4.5rem] lg:ml-64">
            <div class="relative">
                <div class="min-h-[calc(100vh_-_4.5rem)] bg-[#F7FAFA]">
                    <slot></slot>
                </div>
                <div
                    class="absolute top-0 h-full min-h-[calc(100vh_-_4.5rem)] w-full transition-all duration-300 ease-in-out"
                    :class="[
                        sidebar?.sidebarOpen ? 'bg-black/30' : 'bg-transparent',
                        { 'pointer-events-none': !sidebar?.sidebarOpen },
                    ]"
                ></div>
            </div>
        </main>
    </div>
</template>

<script setup>
const sidebar = ref(null);
const toggleSidebar = () => sidebar.value.toggleSidebar();
</script>
