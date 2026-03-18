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
                <p class="text-gray-600 leading-relaxed whitespace-pre-line">
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
    question: '🚀 ¿Cómo funciona EntrenaEnCasa?',
    answer: 'EntrenaEnCasa conecta a personas con entrenadores profesionales para realizar sesiones personalizadas a domicilio, online o al aire libre.\n\nSolo debes crear tu perfil, agendar tu evaluación y seleccionar el tipo de plan que mejor se adapte a tus objetivos.\n\n✅ Tu plan es gestionado y respaldado por EntrenaEnCasa\n✅ Pagos, agenda, seguimiento y continuidad están centralizados\n✅ Si tu entrenador no puede continuar, nosotros nos encargamos del reemplazo\n\n💡 No contratas solo a una persona. Contratas un sistema que te acompaña.'
  },
  {
    question: '🏠 ¿Necesito tener equipamiento para entrenar?',
    answer: 'No necesariamente. Nuestros entrenadores adaptan cada sesión al espacio y materiales que tengas en casa. Podrás entrenar solo con tu peso corporal, y si lo deseas, el profesor puede llevar implementos básicos (bandas, pesas, TRX, etc.). Además tenemos planes de Entrenamiento con kit de entrenamiento incluido.'
  },
  {
    question: '⏰ ¿Cuánto duran las sesiones?',
    answer: 'Cada sesión tiene una duración promedio de 60 minutos, dependiendo de tu nivel, condición física y objetivos. El tiempo se adapta a ti, no al revés.'
  },
  {
    question: '🧠 ¿Qué diferencia a EntrenaEnCasa de un gimnasio tradicional?',
    answer: 'Nuestro enfoque es personalizado, funcional e inclusivo. No solo entrenamos, educamos y acompañamos. Nos distingue la cercanía, el respaldo y la historia de un equipo que cree que el ejercicio es más que movimiento: es salud y bienestar.'
  },
  {
    question: '💻 ¿Puedo entrenar online si no tengo experiencia?',
    answer: '¡Por supuesto! Nuestras sesiones online son guiadas en tiempo real por un entrenador que te acompaña, corrige y motiva. No necesitas experiencia previa, solo conexión a internet y disposición a moverte.'
  },
  {
    question: '📅 ¿Cómo agendo mis clases?',
    answer: 'Desde tu celular, en nuestra plataforma puedes ver tu calendario, filtrar por ciudad y reservar tu clase disponible del día. También puedes reagendar fácilmente si surge un imprevisto.'
  },
  {
    question: '💰 ¿Cuáles son los medios de pago?',
    answer: 'Puedes pagar tus planes con tarjeta de crédito, débito o transferencia electrónica a través de un sistema seguro. Además, contamos con renovación automática mensual para mayor comodidad.'
  },
  {
    question: '🌎 ¿En qué ciudades están disponibles?',
    answer: 'Nuestros clientes se encuentran en Santiago, Nuñoa, Las Condes, Providencia, Chicureo, Vitacura, Lo Barnechea, Viña del Mar, Concón, Rancagua, Antofagasta, Huechuraba y nuevas zonas en expansión. También puedes entrenar desde cualquier parte del país vía online.'
  },
  {
    question: '💬 ¿Puedo probar antes de contratar un plan?',
    answer: 'Sí. Ofrecemos una evaluación inicial gratuita, donde conocerás a tu entrenador, revisarán tus objetivos y recibirás tus primeras recomendaciones personalizadas.'
  }
];

const openIndex = ref<number | null>(0);

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>