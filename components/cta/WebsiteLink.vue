<template>
  <div class="bg-secondary-50 p-6 rounded-lg border border-secondary-200">
    <h3 class="text-xl font-bold text-secondary-800 mb-4">{{ title }}</h3>
    <p v-if="description" class="text-secondary-700 mb-6">{{ description }}</p>
    
    <NuxtLink
      :to="url"
      class="inline-flex items-center bg-secondary-600 text-white px-6 py-3 rounded-full mx-auto hover:bg-secondary-700 transition-colors"
    >
      <span>Visitar</span>
      <Icon name="heroicons:arrow-right-20-solid" class="ml-2 h-5 w-5" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
  url: string
}

defineProps<Props>()
</script>
