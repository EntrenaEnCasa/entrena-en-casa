<template>
    <div class="bg-gradiente py-14">
        <div class="mx-auto grid w-11/12 grid-cols-1 items-center lg:grid-cols-2">
            <div class="mb-10 text-center lg:mb-0">
                <p class="text-sm tracking-[.15rem]">TESTIOMONIOS</p>
                <h2 class="text-4xl font-medium">Nuestros alumnos</h2>
                <p class="mx-auto w-9/12">
                    Algunos comentarios de alumnos que han utilizado Entrena en Casa
                </p>
            </div>
            <div class="mx-auto w-10/12">
                <swiper-container ref="swiperInstance" loop="true" effect="cards">
                    <swiper-slide v-for="testimonial in testimonials" :key="testimonial.id">
                        <HomeTestimonialCard
                            :name="testimonial.name"
                            :profession="testimonial.profession"
                            :description="testimonial.description"
                        />
                    </swiper-slide>
                </swiper-container>
                <div class="mt-5 flex justify-center gap-6">
                    <button
                        @click="handleNavigationPrev"
                        class="h-16 w-16 rounded-full border border-gray-300 bg-white text-gray-700"
                    >
                        <Icon name="fa6-solid:arrow-left" class="text-2xl" />
                    </button>
                    <button
                        @click="handleNavigationNext"
                        class="h-16 w-16 rounded-full border border-gray-300 bg-white text-gray-700"
                    >
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
import testimonials from "@/public/testimonials.json";

const swiperInstance = ref<any>(null);

const handleNavigationNext = () => {
    if (swiperInstance.value) {
        swiperInstance.value.swiper.slideNext();
    }
};

const handleNavigationPrev = () => {
    if (swiperInstance.value) {
        swiperInstance.value.swiper.slidePrev();
    }
};
</script>
