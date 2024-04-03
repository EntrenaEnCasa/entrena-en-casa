<template>
    <div>
        <UserHeader v-if="authStore.loggedIn" ref="header" />
        <div v-else class="flex justify-center items-center h-20">
            <NuxtImg src="/logo-horizontal.png" alt="Logo entrena en casa" class="h-12" />
        </div>
        <slot></slot>
    </div>
</template>
<script setup>

import { useAuthStore } from '~/stores/AuthStore'

const authStore = useAuthStore();

</script>