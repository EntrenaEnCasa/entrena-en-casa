<template>
  <section class="py-10 bg-gray-50">
    <div class="max-w-4xl mx-auto px-6 md:px-12">
      
      <!-- Header -->
      <div class="text-center mb-12">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
          <Icon name="mdi:help-circle" class="w-5 h-5 text-gray-700" />
          <span class="text-sm font-medium text-gray-700">FAQs</span>
        </div>

        <h2 class="text-2xl md:text-4xl font-bold text-gray-900">
          Preguntas Frecuentes
        </h2>
      </div>

      <!-- FAQ Accordion -->
      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          <!-- Question Button -->
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left transition-colors duration-200"
            :class="openIndex === index ? 'bg-gray-50' : 'bg-white'"
          >
            <h3 class="text-lg md:text-xl font-semibold text-gray-900 pr-4">
              {{ faq.question }}
            </h3>
            
            <!-- Icon -->
            <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              <Icon 
                :name="openIndex === index ? 'mdi:minus' : 'mdi:plus'" 
                class="w-6 h-6 text-gray-700 transition-transform duration-300"
              />
            </div>
          </button>

          <!-- Answer -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div
              v-show="openIndex === index"
              class="overflow-hidden"
            >
              <div class="px-6 md:px-8 pb-6 pt-2">
                <p class="text-gray-600 leading-relaxed">
                  {{ faq.answer }}
                </p>
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

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: '¿Cómo funciona EntrenaEnCasa?',
    answer: 'EntrenaEnCasa conecta a personas con entrenadores profesionales para realizar sesiones personalizadas a domicilio, online o al aire libre. Solo debes crear tu perfil, agendar tu evaluación gratuita y seleccionar el tipo de plan que mejor se adapte a tus objetivos. Luego, tu entrenador diseña un programa hecho especialmente para ti.'
  },
  {
    question: '¿Necesito tener equipamiento para entrenar?',
    answer: 'No necesariamente. Nuestros entrenadores adaptan cada sesión al espacio y materiales que tengas en casa. Podrás entrenar solo con tu peso corporal, y si lo deseas, el profesor puede llevar implementos básicos (bandas, pesas, TRX, etc.).'
  },
  {
    question: '¿Cuánto duran las sesiones?',
    answer: 'Cada sesión tiene una duración promedio de 45 a 60 minutos, dependiendo de tu nivel, condición física y objetivos. El tiempo se adapta a ti, no al revés.'
  },
  {
    question: '¿Quiénes son los entrenadores?',
    answer: 'Todo nuestro equipo está formado por profesores de Educación Física y especialistas certificados en ejercicio físico y salud, con años de experiencia en entrenamiento funcional, fuerza, rehabilitación y longevidad.'
  },
  {
    question: '¿Puedo entrenar online si no tengo experiencia?',
    answer: '¡Por supuesto! Nuestras sesiones online son guiadas en tiempo real por un entrenador que te acompaña, corrige y motiva. No necesitas experiencia previa, solo conexión a internet y disposición a moverte.'
  },
  {
    question: '¿Tienen programas para adultos mayores?',
    answer: 'Sí. EntrenaEnCasa es pionera en programas de entrenamiento funcional motor-cognitivo para personas mayores. Mejoramos fuerza, equilibrio y autonomía con ejercicios seguros, basados en evidencia científica.'
  },
  {
    question: '¿Puedo entrenar si tengo una lesión o condición médica?',
    answer: 'Sí. Trabajamos en coordinación con kinesiólogos y médicos deportivos cuando es necesario. Nuestros entrenadores están capacitados para adaptar los ejercicios y garantizar un entrenamiento seguro y progresivo.'
  },
  {
    question: '¿Cómo agendo o reprogramo mis clases?',
    answer: 'Desde tu celular, en nuestra plataforma puedes ver tu calendario, filtrar por ciudad y reservar tu clase disponible del día. También puedes reagendar fácilmente si surge un imprevisto.'
  },
  {
    question: '¿Cuáles son los medios de pago?',
    answer: 'Puedes pagar tus planes con tarjeta de crédito, débito o transferencia electrónica a través de un sistema seguro. Además, contamos con renovación automática mensual para mayor comodidad.'
  },
  {
    question: '¿Incluyen evaluaciones o seguimiento?',
    answer: 'Sí. Todas las modalidades incluyen una evaluación inicial gratuita y seguimientos periódicos para medir tu progreso físico y funcional. Te entregamos reportes claros, basados en datos.'
  },
  {
    question: '¿En qué ciudades están disponibles?',
    answer: 'Actualmente ofrecemos servicios en Santiago, Viña del Mar, Concón, Rancagua, Antofagasta y nuevas zonas en expansión. También puedes entrenar desde cualquier parte del país vía online.'
  },
  {
    question: '¿Qué diferencia a EntrenaEnCasa de un gimnasio tradicional?',
    answer: 'Nuestro enfoque es personalizado, funcional e inclusivo. No solo entrenamos, educamos y acompañamos. Nos distingue la cercanía, el respaldo profesional y la historia de un equipo que cree que el ejercicio es más que movimiento: es salud y bienestar.'
  },
  {
    question: '¿Ofrecen capacitaciones o mentorías para entrenadores?',
    answer: 'Sí. A través de nuestra línea educativa, desarrollamos cursos y mentorías para profesionales del movimiento que buscan mejorar su práctica y gestión. Creemos en compartir conocimiento y elevar el estándar del entrenamiento en Chile.'
  },
  {
    question: '¿Puedo probar antes de contratar un plan?',
    answer: 'Sí. Ofrecemos una evaluación inicial gratuita, donde conocerás a tu entrenador, revisarán tus objetivos y recibirás tus primeras recomendaciones personalizadas.'
  }
];

const openIndex = ref<number | null>(0);

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>