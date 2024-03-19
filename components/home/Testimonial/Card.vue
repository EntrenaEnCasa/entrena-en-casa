<template>
    <div class="shadow py-8 px-6 flex flex-col bg-white gap-2 rounded-2xl">
        <div class="self-end">
            <NuxtImg src="/icons/stars-group.svg" alt="icons-stars" />
        </div>
        <div class="self-start">
            <NuxtImg src="/icons/comillas.png" width="40" alt="icon-comillas" />
        </div>
        <div class="self-center w-11/12">
            <p class="text-justify">
                {{ description }}
            </p>
        </div>
        <div class="self-end text-end">
            <p class="text-lg font-semibold">- {{ name }}</p>
            <p>{{ profession }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">

defineProps({
    title: String,
    description: String,
    name: String,
    profession: String
})
</script>