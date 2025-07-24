<template>
  <div class="bg-green-100 p-6 rounded-lg border border-green-200 flex flex-col items-center text-center">
    <h3 class="text-xl font-bold text-green-800 mb-4">{{ title }}</h3>
    <p v-if="description" class="text-green-700 mb-6">{{ description }}</p>

    <a
      href="https://wa.me/56971370313?text=Hola,%20estoy%20interesado%20en%20obtener%20más%20información%20sobre%20sus%20servicios.%20Vengo%20del%20blog."
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
</script>