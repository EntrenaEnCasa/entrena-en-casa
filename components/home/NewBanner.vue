<template>
  <div class="relative w-full h-auto overflow-hidden">
    <!-- Hero Background Image -->
    <div 
      class="absolute inset-0 bg-cover lg:mb-8  lg:mx-8 lg:rounded-xl lg:shadow-lg "
      :style="{
        backgroundImage: 'url(/home/bg-banner-home.jpg)',
        backgroundPosition: isMobile ? '65% center' : 'center',
        filter: isMobile ? 'blur(4px)' : 'blur(0px)'
      }"
    />
    
    <!-- White Overlay - Mobile Only -->
    <div 
      v-if="isMobile"
      class="absolute inset-0 bg-white lg:mb-8 lg:mx-8 lg:rounded-xl"
      style="opacity: 0.3;"
    />
    
    <!-- Content Container -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <!-- Main Content -->
      <div class="max-w-2xl my-auto text-center md:text-left">
        <!-- Heading -->
        <h1 class="text-4xl sm:text-5xl w-5/6 mx-auto md:mx-0 font-bold text-gray-900 mb-6 leading-tight">
         Personal Trainer a Domicilio y Online
        </h1>
        
        <!-- Subheading -->
        <p class="text-xs sm:text-base w-5/6 mx-auto md:mx-0 md:text-md text-gray-800 mb-8 ">
          Nos acomodamos a tus tiempos, vamos donde ti o nos conectamos de manera remota. Te ayudamos a dar ese primer paso.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-row justify-center md:justify-start gap-4 mb-16 md:mb-24">
          <button @click="() => navigateTo('/user/auth/register')" class="w-full sm:w-auto px-6 py-3 bg-secondary hover:bg-secondary-200 text-white font-medium rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-base">
            Comienza ahora
          </button>
          <button @click="scrollToAbout" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 font-medium rounded-full border-2 border-gray-300 transition-transform duration-300 transform hover:scale-105 shadow-md text-xs sm:text-base">
            <Icon name="iconamoon:play-circle-duotone" class="w-8 h-8 text-secondary" />
            <span>Ver video</span>
          </button>
        </div>
      </div>
      
      <!-- Category Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-8xl">
        <div
          v-for="(category, index) in categories"
          :key="index"
          :class="[
            'rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1'
          ]"
        >
          <div :class="`relative h-36 sm:h-40 lg:h-40 overflow-hidden`" :style="{ backgroundColor: getCategoryColor(category.bgColor) }">
            <!-- Background Gradient Overlay -->
            <div 
              :class="`absolute inset-y-0 left-0 w-[80%] sm:w-[60%] lg:w-[50%] z-[1]`"
              :style="{
                background: `linear-gradient(to right, ${getCategoryColor(category.bgColor)}, transparent)`
              }"
            ></div>
            
            <!-- Text -->
            <div class="absolute left-0 w-1/2 z-10 top-1 md:top-1/2 md:-translate-y-3/4">
              <h3 class="text-white text-[0.9rem] sm:text-base md:text-lg font-semibold leading-tight p-3 sm:p-4">
                {{ category.title }}
              </h3>
            </div>
            
            <!-- Image -->
            <img
              :src="category.image"
              :alt="category.title"
              class="absolute bottom-0 right-0 h-full w-auto max-w-[70%] max-h-[80%] md:max-w-none  md:max-h-none object-contain object-bottom transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
      
      <!-- Rating Section -->
      <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-8 mx-auto w-full justify-center text-center">
        <div class="flex items-center gap-2">
          <div class="flex text-yellow-400 text-lg sm:text-xl">
            ★★★★★
          </div>
          <span class="text-gray-700 font-semibold text-base sm:text-lg">4,9</span>
        </div>
        <span class="text-gray-700 text-sm sm:text-base">+1.200 sesiones agendadas</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Category {
  title: string;
  image: string;
  bgColor: string;
}

const scrollToAbout = () => {
  const element = document.querySelector('#about');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const isMobile = ref(false);

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });
});

const getCategoryColor = (bgColorClass: string): string => {
  const colorMap: Record<string, string> = {
    'card-1': '#00A4E8',
    'card-2': '#0EB3E0',
    'card-3': '#B5CD13',
    'card-4': '#EE7203'
  };
  return colorMap[bgColorClass] || '#00A4E8';
};

const categories: Category[] = [
  {
    title: 'Entrenamiento para todos',
    image: '/home/card-1.png',
    bgColor: 'card-1'
  },
  {
    title: 'Asesoría constante',
    image: '/home/card-2.png',
    bgColor: 'card-2'
  },
  {
    title: 'Profesionales capacitados',
    image: '/home/card-3.png',
    bgColor: 'card-3'
  },
  {
    title: 'Planes Corporativos',
    image: '/home/card-4.png',
    bgColor: 'card-4'
  }
];
</script>