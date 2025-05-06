<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <NuxtLink @click="goToGiftPage()" class="grid grid-cols-2 gap-4 p-10 cursor-pointer">
                    <NuxtImg src="/special-offer/banner-special-offer.png" alt="Special Offer"
                        class="col-span-2 mb-4 max-h-[60vh] h-auto w-full object-fit" />
                    <div class="col-span-2 text-center text-lg font-semibold text-gray-800">
                        ¡Aprovecha nuestra oferta especial!
                    </div>
                </NuxtLink>
            </CommonModal>
        </Teleport>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
const modal = ref<Modal | null>(null);
const config = useRuntimeConfig();
const $router = useRouter();

const goToGiftPage = () => {
    $router.push('/gift');
    closeModal();
};

const openModal = () => {
    modal.value?.openModal();
};
const closeModal = () => {
    modal.value?.closeModal();
};

defineExpose({
    openModal,
    closeModal
});
</script>