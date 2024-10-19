<template>
    <div class="relative w-full">
        <video
            ref="videoRef"
            class="h-auto w-full cursor-pointer"
            @click="togglePlay"
            :controls="showControls"
        >
            <source :src="videoSrc" type="video/mp4" />
            Tu navegador no soporta este tipo de video.
        </video>

        <!-- Play button overlay -->
        <div
            v-if="!isPlaying"
            class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40"
            @click="togglePlay"
        >
            <button
                class="rounded-full bg-white bg-opacity-80 p-6 transition-transform hover:scale-110"
            >
                <Icon name="fa-solid:play" class="h-8 w-8 text-black" />
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    videoSrc: {
        type: String,
        required: true,
    },
});

const videoRef = ref(null);
const isPlaying = ref(false);

const togglePlay = () => {
    if (videoRef.value.paused) {
        videoRef.value.play();
        isPlaying.value = true;
    } else {
        videoRef.value.pause();
        isPlaying.value = false;
    }
};

// Update isPlaying when video ends
onMounted(() => {
    videoRef.value.addEventListener("ended", () => {
        isPlaying.value = false;
    });
});
</script>
