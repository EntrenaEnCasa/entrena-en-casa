<template>
  <section class="py-16 md:py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      
      <!-- Header -->
      <div class="text-center mb-12">
        <p class="text-gray-500 text-sm md:text-base mb-3">Subtitulo 4</p>
        <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
          Nuestros Profesionales
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
          Get to Know the Passionate and Skilled Professionals Dedicated to
          <br />
          Helping You Achieve Your Fitness Goals
        </p>
      </div>

      <!-- Slider Container -->
      <div class="relative">
        
        <!-- Navigation Buttons -->
        <button
          @click="previousSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
          :disabled="currentIndex === 0"
        >
          <Icon name="mdi:chevron-left" class="w-8 h-8 text-gray-700 group-hover:text-gray-900" />
        </button>

        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex >= professionals.length - itemsPerView }"
          :disabled="currentIndex >= professionals.length - itemsPerView"
        >
          <Icon name="mdi:chevron-right" class="w-8 h-8 text-gray-700 group-hover:text-gray-900" />
        </button>

        <!-- Cards Container -->
        <div class="overflow-hidden py-2">
          <div 
            class="flex transition-transform duration-500 ease-in-out gap-6"
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
                    :src="professional.image"
                    :alt="professional.name"
                    class="w-full h-[30vh] object-cover object-top"
                  />
                </div>

                <!-- Content -->
                <div class="p-6">
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    {{ professional.name }}
                  </h3>
                  <p class="text-gray-600 font-medium mb-4">
                    {{ professional.role }}
                  </p>
                  <p class="text-gray-600 mb-4 leading-relaxed">
                    {{ professional.description }}
                  </p>
                  
                  <!-- Location -->
                  <div class="flex items-center gap-2 text-gray-700">
                    <Icon name="mdi:map-marker" class="w-5 h-5" />
                    <span class="text-sm font-medium">{{ professional.location }}</span>
                  </div>
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
  name: string;
  role: string;
  description: string;
  location: string;
  image: string;
}

const professionals: Professional[] = [
  {
    name: 'Alyssa Trent',
    role: 'Head Personal Trainer',
    description: 'There are many variations of passages of Lorem Ipsum available',
    location: 'Valparaíso, Chile',
    image: '/home/team/professional-1.jpg'
  },
  {
    name: 'Franklin Hale',
    role: 'Head Personal Trainer',
    description: 'There are many variations of passages of Lorem Ipsum available',
    location: 'Valparaíso, Chile',
    image: '/home/team/professional-1.jpg'
  },
  {
    name: 'Darius Kemp',
    role: 'Content Strategist',
    description: 'There are many variations of passages of Lorem Ipsum available',
    location: 'Valparaíso, Chile',
    image: '/home/team/professional-1.jpg'
  },
  {
    name: 'María González',
    role: 'Yoga Instructor',
    description: 'There are many variations of passages of Lorem Ipsum available',
    location: 'Valparaíso, Chile',
    image: '/home/team/professional-1.jpg'
  },
  {
    name: 'Carlos Silva',
    role: 'Nutrition Coach',
    description: 'There are many variations of passages of Lorem Ipsum available',
    location: 'Valparaíso, Chile',
    image: '/home/team/professional-1.jpg'
  }
];

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
  if (currentIndex.value < professionals.length - itemsPerView.value) {
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

onMounted(() => {
  updateItemsPerView();
  window.addEventListener('resize', updateItemsPerView);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerView);
});
</script>