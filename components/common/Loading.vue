<template>
    <div class="flex justify-center items-center">
        <p>{{ text }}</p>
        <Icon class="animate-spin text-2xl text-primary ml-2" name="fa6-solid:circle-notch" />
    </div>
</template>
<script setup>

const props = defineProps({
    text: {
        type: String,
        default: 'Cargando'
    }
});

</script>