<template>
    <NuxtPage />
</template>
<script setup>

definePageMeta({
    middleware: 'alumno-auth',
});

</script>
