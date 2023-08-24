<template>
    <NuxtPage />
</template>
<script setup>

definePageMeta({
    middleware: 'student-auth',
});

</script>
