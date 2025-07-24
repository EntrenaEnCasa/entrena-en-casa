<template>
  <div class="bg-primary-50 p-6 rounded-lg border border-primary-200">
    <h3 class="text-xl font-bold text-primary-800 mb-4">{{ title }}</h3>
    <p v-if="description" class="text-primary-700 mb-6">{{ description }}</p>
    
    <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-4">
      <input
        v-model="email"
        type="email"
        placeholder="Tu email"
        required
        class="flex-1 px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      
      <button
        type="submit"
        :disabled="loading"
        class="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50 transition-colors"
      >
        {{ loading ? 'Suscribiendo...' : 'Suscribirme' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()

const email = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  
  try {
    await $fetch('/api/newsletter', {
      method: 'POST',
      body: { email: email.value }
    })
    
    email.value = ''
    alert('¡Suscripción exitosa!')
  } catch (error) {
    alert('Error al suscribirse')
  } finally {
    loading.value = false
  }
}
</script>