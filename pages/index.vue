<template>
    <div>
        <HomeBanner />
        <main>
            <HomeServices />
            <HomeSlider />
            <HomeWhyUs />
            <HomeAboutUs />
            <HomeTestimonialOurStudents />
            <HomeContact />
        </main>
        <HomeWhatsappButton />
        <HomeSpecialOfferModal ref="specialOfferModal" />
    </div>
</template>
<script setup lang="ts">
const specialOfferModal = ref<Modal | null>(null);

const openSpecialOfferModal = (session: Session) => {
    specialOfferModal.value?.openModal();
};
//Abrir automáticamente el modal de oferta especial al cargar la página

onMounted(() => {
    const hasSeenSpecialOffer = localStorage.getItem("hasSeenSpecialOffer");
    if (!hasSeenSpecialOffer) {
        specialOfferModal.value?.openModal();
        localStorage.setItem("hasSeenSpecialOffer", "true");
    }
});
const closeSpecialOfferModal = () => {
    specialOfferModal.value?.closeModal();
};
defineExpose({
    openSpecialOfferModal,
    closeSpecialOfferModal
});

</script>
