<template>
    <NuxtPage />
</template>
<script setup>

definePageMeta({
    middleware: 'user-auth',
});

</script>
