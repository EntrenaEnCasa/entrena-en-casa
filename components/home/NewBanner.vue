<template>
  <div class="relative w-full h-auto overflow-hidden">
    <!-- Hero Background Image -->
    <div 
      class="absolute inset-0 bg-cover lg:mb-8  lg:mx-8 lg:rounded-xl lg:shadow-lg "
      :style="{
        backgroundImage: 'url(/home/bg-banner-home.jpg)',
        backgroundPosition: ' center'
      }"
    />
    
    <!-- Content Container -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <!-- Main Content -->
      <div class="max-w-2xl my-auto text-center md:text-left">
        <!-- Heading -->
        <h1 class="text-5xl w-5/6 mx-auto md:mx-0 font-bold text-gray-900 mb-6 leading-tight">
          Muévete mejor,
          <br />
          vive mejor.
        </h1>
        
        <!-- Subheading -->
        <p class="text-base  w-5/6 mx-auto md:mx-0 md:text-lg text-gray-700 mb-8 font-light">
          Conecta con un profesor, agenda en 3 clics
          <br class="hidden md:block" />
          y entrena donde estés.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-row gap-4 mb-16 md:mb-24">
          <button @click="() => navigateTo('/user/auth/register')" class="w-full sm:w-auto px-6 py-3 bg-secondary hover:bg-secondary-200 text-white font-medium rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">
            Comienza ahora
          </button>
          <button @click="scrollToAbout" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 font-medium rounded-full border-2 border-gray-300 transition-transform duration-300 transform hover:scale-105 shadow-md">
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
          <div class="relative h-36 sm:h-40 lg:h-40 overflow-hidden">
            <h3 class="text-white text-[11px] sm:text-sm lg:text-base font-semibold leading-tight z-10 p-3 sm:p-4 absolute top-1/2 left-0 transform -translate-y-2/3 w-1/2">
              {{ category.title }}
            </h3>
            <img
              :src="category.image"
              :alt="category.title"
              class="absolute bottom-0 right-0 w-full h-full object-cover object-right transition-transform duration-300 transform hover:scale-105"
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

const categories: Category[] = [
  {
    title: 'Movilidad En Adultos Mayores',
    image: '/home/card-1.png',
    bgColor: 'bg-cyan-500'
  },
  {
    title: 'Entrenamiento Personalizado',
    image: '/home/card-2.png',
    bgColor: 'bg-cyan-500'
  },
  {
    title: 'Rehabilitación Guiada',
    image: '/home/card-3.png',
    bgColor: 'bg-lime-500'
  },
  {
    title: 'Pausa Activa Corporativa',
    image: '/home/card-4.png',
    bgColor: 'bg-orange-500'
  }
];
</script>