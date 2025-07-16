<template>
  <div class="bg-primary-50 p-6 rounded-lg border border-primary-200">
    <h3 class="text-xl font-bold text-primary-800 mb-4">{{ title }}</h3>
    <p v-if="description" class="text-primary-700 mb-6">{{ description }}</p>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-primary-700 mb-2">
          Nombre
        </label>
        <input
          v-model="form.name"
          type="text"
          required
          class="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-primary-700 mb-2">
          Email
        </label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-primary-700 mb-2">
          Mensaje
        </label>
        <textarea
          v-model="form.message"
          rows="4"
          required
          class="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        ></textarea>
      </div>
      
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50 transition-colors"
      >
        {{ loading ? 'Enviando...' : 'Enviar Mensaje' }}
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

const form = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  
  try {
    // Aquí integras con tu API de contacto
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })
    
    // Resetear formulario
    form.value = { name: '', email: '', message: '' }
    
    // Mostrar mensaje de éxito
    alert('Mensaje enviado correctamente')
  } catch (error) {
    alert('Error al enviar el mensaje')
  } finally {
    loading.value = false
  }
}
</script>
