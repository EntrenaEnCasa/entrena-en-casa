<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Image Section -->
        <div class="relative order-2 lg:order-1">
          <div class="relative w-full">
            <img
              src="/home/img-section-3.png"
              alt="Wellness and fitness lifestyle"
              class="w-full h-auto rounded-3xl"
            />
          </div>
        </div>

        <!-- Content Section -->
        <div class="order-1 lg:order-2">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
            <Icon name="mdi:shield-check" class="w-5 h-5" />
            <span class="text-sm font-medium text-gray-700">Preventative care</span>
          </div>

          <!-- Title -->
          <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-8">
            Titulo 3
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
          <button class="px-8 py-4 bg-secondary hover:bg-secondary-200 text-white text-lg font-medium rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-lg">
            Conoce más
          </button>
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
    icon: 'mdi:heart-pulse',
    title: 'Health Counselling',
    description: 'We offer guidance on healthy lifestyle behaviours'
  },
  {
    icon: 'mdi:clipboard-text',
    title: 'Wellness Exams',
    description: 'We offer guidance on healthy lifestyle behaviours'
  },
  {
    icon: 'mdi:medication',
    title: 'Preventative Medications',
    description: 'We offer guidance on healthy lifestyle behaviours'
  }
];
</script>