<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
          <Icon name="mdi:alert-circle" class="w-5 h-5 text-red-600" />
          <span class="text-sm font-medium text-gray-700">El Problema</span>
        </div>

        <!-- Title -->
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          ¿Por qué tantas personas abandonan el entrenamiento?
        </h2>
        
        <p class="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
          Entrenar no debería depender del azar ni de la disponibilidad de una sola persona
        </p>
      </div>

      <!-- Problems Cards -->
      <div class="flex flex-wrap justify-center gap-5 mb-12 max-w-5xl mx-auto">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 w-full sm:w-64 md:w-72"
        >
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-3">
              <Icon :name="service.icon" class="w-7 h-7 text-red-600" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">
              {{ service.title }}
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="text-center">
        <button class="px-10 py-4 bg-secondary hover:bg-secondary-200 text-white text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Descubre la solución
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Service {
  icon: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: 'mdi:clock-alert',
    title: 'Falta de tiempo y poca continuidad',
    description: 'Es difícil mantener una rutina constante cuando no hay flexibilidad en los horarios'
  },
  {
    icon: 'mdi:account-alert',
    title: 'Dependencia de una sola persona',
    description: 'Si tu entrenador no está disponible, tu entrenamiento se cancela'
  },
  {
    icon: 'mdi:calendar-remove',
    title: 'Poca planificación',
    description: 'Entrenamientos improvisados sin una estructura clara ni objetivos definidos'
  },
  {
    icon: 'mdi:chart-line-variant',
    title: 'Cero seguimiento real',
    description: 'No hay registro de tu progreso ni ajustes basados en resultados medibles'
  },
  {
    icon: 'mdi:shield-off',
    title: 'Entrenadores sin respaldo ni estructura',
    description: 'Profesionales independientes sin el apoyo de un equipo multidisciplinario'
  }
];
</script>