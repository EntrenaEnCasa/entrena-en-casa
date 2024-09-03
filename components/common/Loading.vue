<template>
    <div class="flex items-center justify-center">
        <p>{{ text }}</p>
        <Icon class="ml-2 animate-spin text-2xl text-primary" name="fa6-solid:circle-notch" />
    </div>
</template>
<script setup>
const props = defineProps({
    text: {
        type: String,
        default: "Cargando",
    },
});
</script>
