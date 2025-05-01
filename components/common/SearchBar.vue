<template>
    <div class="relative mb-4">
        <input type="text" v-model="searchQuery" @input="onSearch" placeholder="Buscar..."
            class="w-full rounded-md border border-gray-300 p-2 text-sm outline-none pr-10" />
        <button v-if="searchQuery" @click="clearSearch"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
            <Icon name="material-symbols:delete-outline-rounded" class="w-5 h-5 text-lg group-hover:text-white" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue';

const emit = defineEmits(['update:searchQuery']);
const searchQuery = ref('');

const onSearch = () => {
    emit('update:searchQuery', searchQuery.value);
};

const clearSearch = () => {
    searchQuery.value = '';
    emit('update:searchQuery', searchQuery.value);
};
</script>