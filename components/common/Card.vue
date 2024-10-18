<template>
    <div :class="['rounded-2xl bg-white px-6 py-4 shadow-lg', bgClass, spaceClass]">
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps({
    bgClass: {
        type: String,
        default: "bg-white",
    },
    spaceClass: {
        type: String,
        default: "space-y-4",
    },
});
</script>
