<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
          What our Customers say
        </h2>
        <p class="text-md text-gray-500">
          All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks.
        </p>
      </div>

      <!-- Testimonial Slider -->
      <div class="relative max-w-6xl mx-auto">
        
        <!-- Navigation Buttons -->
        <button
          @click="previousTestimonial"
          class="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
          :disabled="currentIndex === 0"
        >
          <Icon name="mdi:chevron-left" class="w-7 h-7 text-gray-700 group-hover:text-gray-900" />
        </button>

        <button
          @click="nextTestimonial"
          class="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex === testimonials.length - 1 }"
          :disabled="currentIndex === testimonials.length - 1"
        >
          <Icon name="mdi:chevron-right" class="w-7 h-7 text-gray-700 group-hover:text-gray-900" />
        </button>

        <!-- Testimonials Container -->
        <div class="overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="w-full flex-shrink-0"
            >
              <!-- Testimonial Content -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                
                <!-- Image -->
                <div class="order-2 md:order-1">
                  <div class="relative rounded-3xl overflow-hidden ">
                    <img
                      :src="testimonial.image"
                      :alt="testimonial.name"
                      class="w-full h-auto aspect-[4/3] object-cover"
                    />
                  </div>
                </div>

                <!-- Content -->
                <div class="order-1 md:order-2">
                  <!-- Quote Icon -->
                  <div class="mb-6">
                    <Icon name="mdi:format-quote-open" class="w-12 h-12 text-tertiary" />
                  </div>

                  <!-- Stars -->
                  <div class="flex gap-1 mb-6">
                    <Icon 
                      v-for="star in 5" 
                      :key="star" 
                      name="mdi:star" 
                      class="w-6 h-6 text-tertiary"
                    />
                  </div>

                  <!-- Testimonial Text -->
                  <blockquote class="text-xl md:text-2xl text-gray-900 font-medium leading-relaxed mb-8">
                    {{ testimonial.quote }}
                  </blockquote>

                  <!-- Author Info -->
                  <div>
                    <h4 class="text-xl font-bold text-gray-900 mb-1">
                      {{ testimonial.name }}
                    </h4>
                    <p class="text-gray-500">
                      {{ testimonial.description }}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Dots Indicator -->
        <div class="flex justify-center gap-2 mt-12">
          <button
            v-for="(dot, index) in testimonials.length"
            :key="index"
            @click="goToTestimonial(index)"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="currentIndex === index ? 'bg-tertiary w-8' : 'bg-gray-300 hover:bg-gray-400'"
          />
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Testimonial {
  name: string;
  description: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'María Perez',
    description: '56 años - Empresaria',
    quote: 'Lorem ipsum dolor sit amet consectetur. Ipsum elementum senectus gravida nunc fermentum. Consequat lectus tortor adipiscing arcu et elementum.',
    image: '/home/testimonial/1.jpg'
  },
  {
    name: 'Carlos Rodríguez',
    description: '45 años - Ingeniero',
    quote: 'La experiencia ha sido increíble, los profesionales son muy atentos y me han ayudado a alcanzar mis objetivos de fitness de manera efectiva.',
    image: '/home/testimonial/1.jpg'
  },
  {
    name: 'Ana Silva',
    description: '38 años - Doctora',
    quote: 'Excelente servicio y atención personalizada. He visto resultados sorprendentes en poco tiempo gracias al equipo profesional.',
    image: '/home/testimonial/1.jpg'
  }
];

const currentIndex = ref(0);

const nextTestimonial = () => {
  if (currentIndex.value < testimonials.length - 1) {
    currentIndex.value++;
  }
};

const previousTestimonial = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const goToTestimonial = (index: number) => {
  currentIndex.value = index;
};
</script>