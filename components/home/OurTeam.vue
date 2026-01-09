<template>
  <section class="py-10 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      
      <!-- Header -->
      <div class="text-center mb-12">
<div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
          <Icon name="mdi:account-group" class="w-5 h-5 text-gray-700" />
          <span class="text-sm font-medium text-gray-700">Equipo</span>
        </div>        <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
          Nuestros Profesionales
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
          Conoce al equipo de expertos dedicados a ayudarte a alcanzar tus objetivos de fitness y bienestar.
        </p>
      </div>

      <!-- Slider Container -->
      <div class="relative px-12 md:px-0">
        
        <!-- Navigation Buttons -->
        <button
          @click="previousSlide"
          class="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-12 z-10 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
          :disabled="currentIndex === 0"
        >
          <Icon name="mdi:chevron-left" class="w-6 h-6 md:w-8 md:h-8 text-gray-700 group-hover:text-gray-900" />
        </button>

        <button
          @click="nextSlide"
          class="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-12 z-10 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex >= professionals.length - itemsPerView }"
          :disabled="currentIndex >= professionals.length - itemsPerView"
        >
          <Icon name="mdi:chevron-right" class="w-6 h-6 md:w-8 md:h-8 text-gray-700 group-hover:text-gray-900" />
        </button>

        <!-- Cards Container -->
        <div class="overflow-hidden py-2">
          <div 
            class="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6"
            :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }"
          >
            <div
              v-for="(professional, index) in professionals"
              :key="index"
              class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
            >
              <!-- Professional Card -->
              <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-11/12 ">
                <!-- Image -->
                <div class="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                  <img
                    :src="professional.photo_url"
                    :alt="`${professional.first_name} ${professional.last_name}`"
                    class="w-full h-[30vh] object-cover object-top"
                  />
                </div>

                <!-- Content -->
                <div class="p-6">
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    {{ professional.first_name }} {{ professional.last_name }}
                  </h3>
                  <p class="text-gray-600 font-medium mb-2">
                    {{ professional.title }}
                  </p>
                  <p class="text-gray-500 text-sm mb-4">
                    {{ professional.institution }}
                  </p>
                  <p class="text-gray-600 leading-relaxed">
                    {{ professional.biography }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dots Indicator -->
        <div class="flex justify-center gap-2 mt-8">
          <button
            v-for="(dot, index) in Math.ceil(professionals.length / itemsPerView)"
            :key="index"
            @click="goToSlide(index)"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="currentIndex === index ? 'bg-cyan-500 w-8' : 'bg-gray-300 hover:bg-gray-400'"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Professional {
  user_id: string;
  photo_url: string;
  first_name: string;
  last_name: string;
  title: string;
  institution: string;
  biography: string;
}

const runtimeConfig = useRuntimeConfig();
const professionals = ref<Professional[]>([]);

const currentIndex = ref(0);
const itemsPerView = ref(3);

const updateItemsPerView = () => {
  if (window.innerWidth < 768) {
    itemsPerView.value = 1;
  } else if (window.innerWidth < 1024) {
    itemsPerView.value = 2;
  } else {
    itemsPerView.value = 3;
  }
};

const nextSlide = () => {
  if (currentIndex.value < professionals.value.length - itemsPerView.value) {
    currentIndex.value++;
  }
};

const previousSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

const fetchProfessionals = async () => {
  try {
    const response = await $fetch<{ success: boolean; message: string; professionals: Professional[] }>(
      `${runtimeConfig.public.apiBase}/user/professionals`,
      {
        method: 'GET',
      }
    );
    professionals.value = response.professionals;
  } catch (error) {
    console.error('Error fetching professionals:', error);
  }
};

onMounted(() => {
  updateItemsPerView();
  window.addEventListener('resize', updateItemsPerView);
  fetchProfessionals();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerView);
});
</script>