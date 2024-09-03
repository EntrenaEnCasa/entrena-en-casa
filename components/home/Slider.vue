<template>
    <div class="my-12">
        <Vue3Marquee :duration="40">
            <template v-for="image in images" :key="image.id">
                <div class="p-5">
                    <NuxtImg
                        class="h-[300px] rounded-2xl border border-gray-100 shadow-lg lg:h-[420px]"
                        :src="image.src"
                        :alt="image.alt"
                    />
                </div>
            </template>
        </Vue3Marquee>
    </div>
</template>

<script setup lang="ts">
const generateArrayOfImages = () => {
    const images = [];
    for (let i = 0; i < 7; i++) {
        const img = {
            id: i,
            src: `/home/slider/${i}.jpg`,
            alt: `Slider image ${i}`,
        };
        images.push(img);
    }
    return images;
};

const images = generateArrayOfImages();
</script>
