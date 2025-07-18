<template>
    <div>
        <HomeBanner />
        <main>
            <HomeServices />
            <!-- <HomeSlider /> -->
            <HomeWhyUs />
            <HomeAboutUs />
            <HomeTestimonialOurStudents />
            <HomeContact />
        </main>
        <HomeWhatsappButton />
        <!-- <HomeSpecialOfferModal ref="specialOfferModal" /> -->
    </div>
</template>
<script setup lang="ts">
// const specialOfferModal = ref<Modal | null>(null);

// const openSpecialOfferModal = (session: Session) => {
//     specialOfferModal.value?.openModal();
// };
// //Abrir automáticamente el modal de oferta especial al cargar la página

// onMounted(() => {
//     const lastSeenSpecialOffer = localStorage.getItem("lastSeenSpecialOffer");
//     const now = new Date().getTime();
//     if (!lastSeenSpecialOffer || now - parseInt(lastSeenSpecialOffer, 10) > 2 * 60 * 60 * 1000) {
//         specialOfferModal.value?.openModal();
//         localStorage.setItem("lastSeenSpecialOffer", now.toString());
//     }
// });
// const closeSpecialOfferModal = () => {
//     specialOfferModal.value?.closeModal();
// };
// defineExpose({
//     openSpecialOfferModal,
//     closeSpecialOfferModal
// });
const { setSEO, generateStructuredData } = useSEO()

// SEO específico para la página de inicio
setSEO({
  title: 'Entrena en Casa - Entrenamiento Personal Online y Presencial',
  description: 'Plataforma de entrenamiento personalizado con profesionales certificados. Sesiones online y presenciales adaptadas a tus necesidades. ¡Comienza tu transformación hoy!',
  keywords: ['entrenamiento personal', 'fitness online', 'ejercicio en casa', 'entrenador personal', 'rutinas personalizadas', 'Chile'],
  image: '/home/banner-img-min.png',
  type: 'website'
})


</script>

