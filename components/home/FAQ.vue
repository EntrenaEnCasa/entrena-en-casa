<template>
  <section class="py-16 md:py-24 bg-gray-50">
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
    question: '¿Qué es Entrena En Casa?',
    answer: 'Entrena En Casa es una plataforma chilena que conecta a personas con profesores de fitness certificados para realizar entrenamientos personalizados desde la comodidad de tu hogar. Puedes agendar sesiones en solo 3 clics y entrenar donde y cuando quieras.'
  },
  {
    question: '¿Necesito pagar antes de agendar una sesión?',
    answer: 'Sí, el pago se realiza al momento de confirmar tu reserva. Aceptamos diversos medios de pago incluyendo tarjetas de crédito, débito y transferencias. El pago es seguro y puedes ver el precio exacto antes de confirmar.'
  },
  {
    question: '¿Qué tipo de entrenamientos ofrecen?',
    answer: 'Ofrecemos una amplia variedad de entrenamientos adaptados a tus necesidades: movilidad para adultos mayores, entrenamiento personalizado, rehabilitación guiada, pausas activas corporativas, yoga, pilates, y más. Cada sesión está diseñada por profesionales certificados.'
  },
  {
    question: '¿Cuánto tiempo toma agendar una sesión?',
    answer: 'El proceso es muy rápido y simple. En solo 3 clics puedes agendar tu sesión: selecciona el tipo de entrenamiento, elige el horario que mejor te acomode y confirma. Todo el proceso toma menos de 2 minutos.'
  },
  {
    question: '¿Tengo que entrenar todos los días?',
    answer: 'No, tú decides la frecuencia de tus entrenamientos según tus objetivos y disponibilidad. Puedes agendar sesiones semanales, quincenales o cuando lo necesites. Nuestros profesores te ayudarán a crear un plan que se ajuste a tu ritmo de vida.'
  },
  {
    question: '¿Qué necesito para entrenar en casa?',
    answer: 'Depende del tipo de entrenamiento que elijas. En general, necesitarás un espacio cómodo y una conexión a internet estable. Tu profesor te indicará si necesitas algún equipo específico como pesas, colchoneta o bandas elásticas antes de la sesión.'
  },
  {
    question: '¿Cómo puedo cancelar o reprogramar una sesión?',
    answer: 'Puedes cancelar o reprogramar tu sesión desde tu perfil en la plataforma con al menos 24 horas de anticipación sin costo adicional. Si cancelas con menos tiempo, se aplicarán las políticas de cancelación que podrás revisar en nuestros términos.'
  }
];

const openIndex = ref<number | null>(0);

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>