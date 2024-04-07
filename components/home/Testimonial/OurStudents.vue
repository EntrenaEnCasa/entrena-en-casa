<template>
    <div class="bg-gradiente py-14">
        <div class="grid grid-cols-1 lg:grid-cols-2 items-center w-11/12 mx-auto">
            <div class="text-center mb-10 lg:mb-0">
                <p class="text-sm tracking-[.15rem]">TESTIOMONIOS</p>
                <h2 class="font-medium text-4xl ">Nuestros alumnos</h2>
                <p class="w-9/12 mx-auto">Algunos comentarios de alumnos que han utilizado Entrena en Casa</p>
            </div>
            <div class="w-10/12 mx-auto">
                <swiper-container ref="swiperInstance" loop="true" effect="cards">
                    <swiper-slide v-for="testimonial in testimonials" :key="testimonial.id">
                        <HomeTestimonialCard :name="testimonial.name" :profession="testimonial.profession"
                            :description="testimonial.description" />
                    </swiper-slide>
                </swiper-container>
                <div class="flex justify-center gap-6 mt-5">
                    <button @click="handleNavigationPrev"
                        class="border border-gray-300 bg-white text-gray-700 rounded-full h-16 w-16">
                        <Icon name="fa6-solid:arrow-left" class="text-2xl" />
                    </button>
                    <button @click="handleNavigationNext"
                        class="border border-gray-300 bg-white text-gray-700 rounded-full h-16 w-16">
                        <Icon name="fa6-solid:arrow-right" class="text-2xl" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
swiper-slide {
    border-radius: 18px;
}
</style>
<script setup lang="ts">

import testimonials from '@/public/testimonials.json'

const swiperInstance = ref<any>(null);

const handleNavigationNext = () => {
    if (swiperInstance.value) {
        swiperInstance.value.swiper.slideNext();
    }
}

const handleNavigationPrev = () => {
    if (swiperInstance.value) {
        swiperInstance.value.swiper.slidePrev();
    }
}

</script>