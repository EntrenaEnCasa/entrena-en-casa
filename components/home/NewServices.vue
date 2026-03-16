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
                      <div>
                        <!-- Description -->
                        <p class="text-gray-600 leading-relaxed mb-4">
                          {{ service.description }}
                        </p>

                        <!-- Features List -->
                        <ul v-if="service.features" class="space-y-2 mb-6">
                          <li
                            v-for="(feature, idx) in service.features"
                            :key="idx"
                            class="flex items-start gap-2 text-gray-600"
                          >
                            <Icon name="mdi:check-circle" class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                            <span>{{ feature }}</span>
                          </li>
                        </ul>
                      </div>

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
  features?: string[];
  image: string;
  ctaText: string;
  ctaLink: string;
}

const services: Service[] = [
  {
    icon: '💻',
    title: 'Personal Trainer Online',
    description: 'Entrena desde cualquier lugar con la guía de un profesional y el respaldo de EntrenaEnCasa. Nuestro entrenamiento online son en vivo, cuenta con una planificación estructurada y seguimiento profesional, permitiéndote entrenar de forma segura, flexible y efectiva, estés donde estés.',
    features: [
      'Evaluación inicial online',
      'Entrenamientos guiados en tiempo real',
      'Planificación personalizada',
      'Seguimiento y ajustes constantes',
      'Soporte del equipo EntrenaEnCasa',
      'Ideal para personas con poco tiempo, que viajan o prefieren entrenar desde casa',
      'Modalidades: individual, dupla o familiar'
    ],
    image: '/home/services/personal-trainer.jpg',
    ctaText: 'Agenda una asesoría gratuita',
    ctaLink: '#contact'
  },
  {
    icon: '🏠',
    title: 'Personal Trainer a Domicilio',
    description: 'Entrena en la comodidad de tu hogar con un entrenador personal certificado, adaptando cada sesión a tu espacio, tiempo y objetivos. En EntrenaEnCasa diseñamos programas personalizados basados en evaluación inicial, planificación progresiva y seguimiento continuo, todo respaldado por nuestra plataforma y equipo profesional.',
    features: [
      'Evaluación inicial y definición de objetivos',
      'Entrenador personal certificado',
      'Planificación adaptada a tu nivel y espacio',
      'Seguimiento y control del proceso',
      'Garantía de continuidad del servicio',
      'Ideal para quienes buscan resultados, privacidad y constancia sin ir al gimnasio',
      'Modalidades: individual y dupla'
    ],
    image: '/home/services/personal-trainer.jpg',
    ctaText: 'Agenda una asesoría gratuita',
    ctaLink: '#contact'
  },
  {
    icon: '👥',
    title: 'Clases Grupales Online y Presenciales',
    description: 'Accede a clases grupales cerca de donde vives o entrena online en vivo con horarios flexibles y profesionales certificados de distintas partes del mundo. Todo con seguimiento y respaldo EntrenaEnCasa para que entrenar sea simple, accesible y continuo.',
    features: [
      'Explora clases disponibles cerca de tu ubicación',
      'Gestiona tu asistencia desde nuestra plataforma',
      'Accede a clases online en vivo con entrenadores internacionales',
      'Pilates, Yoga, HIIT, Funcional, Movilidad y más'
    ],
    image: '/home/services/brain-training.jpg',
    ctaText: 'Encuentra clases cerca de ti',
    ctaLink: '/user/auth/register'
  },
  {
    icon: '🧓',
    title: 'Programas de Entrenamiento para Longevidad',
    description: 'Fuerza, equilibrio y autonomía a cualquier edad. Programa especializado que ayuda a prevenir caídas, mantener independencia y mejorar la movilidad diaria. Entrenamiento seguro con base científica y acompañamiento humano.',
    features: [
      'Entrenadores especializados en longevidad y salud funcional',
      'Ejercicios seguros, progresivos y controlados',
      'Entrenamiento Funcional Motor Cognitivo (Brain Functional Training)',
      'Coordinación con profesionales de la salud',
      'Evaluaciones periódicas y seguimiento personalizado'
    ],
    image: '/home/services/longevidad.jpg',
    ctaText: 'Conoce nuestros planes senior',
    ctaLink: '#contact'
  },
  {
    icon: '🏢',
    title: 'Gestión de Gimnasios en Condominios y Empresas',
    description: 'Llevamos la experiencia EntrenaEnCasa a tu comunidad o lugar de trabajo. Administramos, planificamos y operamos gimnasios con profesionales certificados. Transformamos espacios subutilizados en centros de bienestar activos.',
    features: [
      'Profesores certificados y evaluados',
      'Registro de asistencia automatizado',
      'Reportes de impacto y satisfacción',
      'Programas personalizados para cada tipo de residente o colaborador',
      'Gestión integral del espacio deportivo'
    ],
    image: '/home/services/gimnasios.jpg',
    ctaText: 'Solicita una propuesta',
    ctaLink: '#contact'
  },
  {
    icon: '🧑‍🏫',
    title: 'Asesorías Profesionales y Educación Continua',
    description: 'Formamos entrenadores con propósito. Ofrecemos mentorías, cursos y capacitaciones para profesionales del movimiento que buscan mejorar su impacto y gestión. Eleva tu práctica profesional con formación respaldada por experiencia y ciencia.',
    features: [
      'Cursos de entrenamiento funcional y fuerza',
      'Programas de envejecimiento activo',
      'Metodologías basadas en evidencia científica',
      'Mentorías personalizadas para profesionales',
      'Certificaciones y educación continua'
    ],
    image: '/home/services/educacion.jpg',
    ctaText: 'Ver programas educativos',
    ctaLink: '/blog'
  },
  {
    icon: '🏋️',
    title: 'Venta de Equipamiento Profesional',
    description: 'Somos distribuidores oficiales de marcas líderes como Athletic, Reebok y Eleiko. Solución integral para tu gimnasio. Maximiza tu inversión con equipamiento de calidad y el respaldo de expertos en fitness.',
    features: [
      'Asesoría técnica completa y personalizada',
      'Diseño de layout funcional optimizado',
      'Equipamiento profesional de alta calidad',
      'Instalación certificada y garantizada',
      'Programas de entrenamiento incluidos'
    ],
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
