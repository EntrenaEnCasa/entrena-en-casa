<template>
  <div class="bg-tertiary-50 p-6 rounded-lg border border-tertiary-200">
    <h3 class="text-xl font-bold text-tertiary-800 mb-4">{{ title }}</h3>
    <p v-if="description" class="text-tertiary-700 mb-6">{{ description }}</p>
    
    <div class="flex flex-col sm:flex-row gap-4">
      <NuxtLink
        to="/user/auth/register"
        class="flex-1 bg-tertiary-600 text-white px-6 py-3 rounded-md hover:bg-tertiary-700 transition-colors text-center"
      >
        Registrarme como Estudiante
      </NuxtLink>
      
      <NuxtLink
        to="/professional/auth/register"
        class="flex-1 bg-tertiary-600 text-white px-6 py-3 rounded-md hover:bg-tertiary-700 transition-colors text-center"
      >
        Registrarme como Profesor
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>
