<template>
  <div class="bg-quaternary-50 p-6 rounded-lg border border-quaternary-200">
    <h3 class="text-xl font-bold text-quaternary-800 mb-4">{{ title }}</h3>
    <p v-if="description" class="text-quaternary-700 mb-6">{{ description }}</p>
    
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
    >
      <Icon name="logos:whatsapp-icon" class="mr-2 h-5 w-5" />
      <span>Hablar con Ventas</span>
    </a>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

const props = defineProps<Props>()

const whatsappUrl = computed(() => {
  const message = encodeURIComponent('Hola, estoy interesado en obtener más información sobre sus servicios.')
  return `"https://wa.me/56971370313?text=${message}`
})
</script>