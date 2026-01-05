<template>
  <section class="py-10 bg-white">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
          <Icon name="mdi:briefcase" class="w-5 h-5 text-gray-700" />
          <span class="text-sm font-medium text-gray-700">Servicios</span>
        </div>
        <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
          Nuestros Servicios
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
          Descubre soluciones integrales de entrenamiento diseñadas para transformar tu bienestar y el de tu comunidad.
        </p>
      </div>

      <!-- Slider Container -->
      <div class="relative">
        
        <!-- Navigation Buttons -->
        <button
          @click="previousSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110"
        >
          <Icon name="mdi:chevron-left" class="w-8 h-8 text-gray-700 group-hover:text-gray-900" />
        </button>

        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110"
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
              v-for="(service, index) in services"
              :key="index"
              class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
            >
              <!-- Service Card -->
              <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <!-- Image -->
                <div class="overflow-hidden h-64">
                  <img
                    :src="service.image"
                    :alt="service.title"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <!-- Content -->
                <div class="p-6 flex flex-col flex-grow">
                  <!-- Icon -->
                  <div class="mb-4">
                    <span class="text-4xl">{{ service.icon }}</span>
                  </div>
                  
                  <h3 class="text-2xl font-bold text-gray-900 mb-4">
                    {{ service.title }}
                  </h3>
                  
                  <p class="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {{ service.description }}
                  </p>

                  <!-- CTA Button -->
                  <NuxtLink
                    :to="service.ctaLink"
                    class="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-200 hover:scale-105"
                  >
                    {{ service.ctaText }}
                    <Icon name="mdi:arrow-right" class="w-5 h-5 ml-2" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dots Indicator -->
        <div class="flex justify-center gap-2 mt-8">
          <button
            v-for="(dot, index) in Math.ceil(services.length / itemsPerView)"
            :key="index"
            @click="goToSlide(index)"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="currentIndex === index ? 'bg-quaternary w-8' : 'bg-gray-300 hover:bg-gray-400'"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Service {
  icon: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const services: Service[] = [
  {
    icon: '💻',
    title: 'Personal Trainer Online y Presencial',
    description: 'Tu rutina, a un clic de distancia. Participa en clases dirigidas de Pilates, Yoga, HIIT, Funcional, Movilidad y más, guiadas por instructores certificados. Acceso desde cualquier ciudad o dispositivo con planes flexibles 2 o 3 veces por semana.',
    image: '/home/services/personal-trainer.jpg',
    ctaText: 'Únete a nuestras clases',
    ctaLink: '/user/auth/register'
  },
  {
    icon: '🧓',
    title: 'Programas de Entrenamiento para Longevidad',
    description: 'Fuerza, equilibrio y autonomía a cualquier edad. Programa especializado basado en ciencia y experiencia. Ayuda a prevenir caídas, mantener independencia y mejorar la movilidad diaria con entrenadores especializados en longevidad y salud funcional.',
    image: '/home/services/longevidad.jpg',
    ctaText: 'Conoce nuestros planes senior',
    ctaLink: 'https://programa-de-entrenamient-n3t3rh7.gamma.site/'
  },
  {
    icon: '🧠',
    title: 'Clases Grupales Online/Presencial',
    description: 'Ejercita cuerpo y cerebro. Basado en el método Brain Functional Training, combina movimiento, coordinación, memoria y toma de decisiones. Ideal para adultos mayores y personas que buscan prevenir el deterioro cognitivo con protocolos avalados por investigación científica.',
    image: '/home/services/brain-training.jpg',
    ctaText: 'Ver clases disponibles',
    ctaLink: '/user/auth/login'
  },
  {
    icon: '🏢',
    title: 'Gestión de Gimnasios en Condominios y Empresas',
    description: 'Llevamos la experiencia EntrenaEnCasa a tu comunidad o lugar de trabajo. Administramos, planificamos y operamos gimnasios con profesores certificados, registro de asistencia, reportes de impacto y programas personalizados para cada tipo de residente o colaborador.',
    image: '/home/services/gimnasios.jpg',
    ctaText: 'Solicita una propuesta',
    ctaLink: '#contact'
  },
  {
    icon: '🧑‍🏫',
    title: 'Asesorías Profesionales y Educación Continua',
    description: 'Formamos entrenadores con propósito. Ofrecemos mentorías, cursos y capacitaciones para profesionales del movimiento que buscan mejorar su impacto y gestión. Cursos de entrenamiento funcional, fuerza y envejecimiento activo basados en evidencia científica.',
    image: '/home/services/educacion.jpg',
    ctaText: 'Ver programas educativos',
    ctaLink: '/blog'
  },
  {
    icon: '🏋️',
    title: 'Venta de Equipamiento Profesional',
    description: 'Somos distribuidores oficiales de marcas líderes como Athletic, Reebok y Eleiko. Ofrecemos asesoría técnica completa, diseño de layout funcional, equipamiento profesional, instalación certificada y programas de entrenamiento para maximizar el uso del gimnasio.',
    image: '/home/services/equipamiento.jpg',
    ctaText: 'Solicita tu cotización',
    ctaLink: '#contact'
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
  if (currentIndex.value < services.length - itemsPerView.value) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

const previousSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = services.length - itemsPerView.value;
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
