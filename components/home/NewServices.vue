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

      <!-- Accordion Container -->
      <div class="max-w-5xl mx-auto space-y-4">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
          <!-- Accordion Header -->
          <button
            @click="toggleService(index)"
            class="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 transition-colors duration-200"
          >
            <div class="flex items-center gap-4 flex-1">
              <!-- Icon -->
              <div class="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-2xl">
                {{ service.icon }}
              </div>
              
              <!-- Title -->
              <h3 class="text-lg md:text-xl font-bold text-gray-900 flex-1">
                {{ service.title }}
              </h3>
            </div>

            <!-- Chevron Icon -->
            <Icon
              name="mdi:chevron-down"
              class="w-6 h-6 text-gray-500 transition-transform duration-300 flex-shrink-0"
              :class="{ 'rotate-180': openIndex === index }"
            />
          </button>

          <!-- Accordion Content -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-[1000px]"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 max-h-[1000px]"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-show="openIndex === index" class="overflow-hidden">
              <div class="px-6 pb-6 pt-2">
                <div class="border-t border-gray-100 pt-6">
                  <!-- Content Grid: Image left, Text right on lg -->
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <!-- Image -->
                    <div class="rounded-xl overflow-hidden">
                      <img
                        :src="service.image"
                        :alt="service.title"
                        class="w-full h-64 lg:h-auto lg:max-h-64 object-cover"
                      />
                    </div>

                    <!-- Text and CTA -->
                    <div class="flex flex-col justify-between">
                      <!-- Description -->
                      <p class="text-gray-600 leading-relaxed mb-6">
                        {{ service.description }}
                      </p>

                      <!-- CTA Button -->
                      <NuxtLink
                        :to="service.ctaLink"
                        class="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all duration-200 hover:scale-105 shadow-lg shadow-secondary/25"
                      >
                        {{ service.ctaText }}
                        <Icon name="mdi:arrow-right" class="w-5 h-5 ml-2" />
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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

const openIndex = ref<number | null>(null);

const toggleService = (index: number) => {
  if (openIndex.value === index) {
    openIndex.value = null;
  } else {
    openIndex.value = index;
  }
};
</script>
