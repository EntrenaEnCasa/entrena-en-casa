<template>
  <section id="beneficios" class="py-10 bg-white">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Image Section -->
        <div class="relative order-2 lg:order-1">
          <div class="relative w-full">
            <img
              src="/home/img-section-3.png"
              alt="Wellness and fitness lifestyle"
              class="w-full hidden md:block h-auto rounded-3xl"
            />
          </div>
        </div>

        <!-- Content Section -->
        <div class="order-1 lg:order-2">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full w-full justify-center shadow-sm mb-6">
          <Icon name="mdi:star" class="w-5 h-5 text-gray-700" />
          <span class="text-sm font-medium text-gray-700">Beneficios</span>
        </div>

          <!-- Title -->
          <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-8">
            Entrena desde donde estés, a tu ritmo
          </h2>

          <!-- Services List -->
          <div class="space-y-6 mb-10">
            <!-- Service Items -->
            <div
              v-for="(service, index) in services"
              :key="index"
              class="flex gap-4"
            >
              <div class="flex-shrink-0 w-12 h-12 bg-transparent rounded-lg flex items-center justify-center">
                <Icon :name="service.icon" class="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  {{ service.title }}
                </h3>
                <p class="text-gray-600">
                  {{ service.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
           <div class="w-full mx-auto">
          <button class="px-8 py-4 bg-secondary hover:bg-secondary-200 text-white text-lg font-medium rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg mx-auto md:-mx-0 block md:flex">
            Conoce más
          </button>
          </div>
        </div>

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
    icon: 'mdi:target',
    title: 'Entrenamiento personalizado',
    description: 'Para todos, a tu medida sin importar tu edad y nivel de condición física'
  },
  {
    icon: 'mdi:clock-outline',
    title: 'Flexibilidad total',
    description: 'Entrena sin moverte de tu hogar, no pierdas tiempo en traslados, el horario lo eliges tú'
  },
  {
    icon: 'mdi:piggy-bank',
    title: 'Ahorra dinero',
    description: 'En combustible y en planes de gimnasio que no asistes'
  },
  {
    icon: 'mdi:account-multiple-check',
    title: 'Asesoramiento integral',
    description: 'Coaching, actividad física y nutrición con profesionales calificados'
  }
];
</script>