<template>
    <div>
        <HomeNewBanner />
        <main>
            <HomeServices />
            <!-- <HomeSlider /> -->
            <HomeNewFeatures />
            <HomeAboutUs />
            <HomeOurTeam />
            <HomeNewTestimonial />
            <HomeFAQ />

            <HomeNewContact />
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
const { setSEO } = useSEO()

setSEO({
  title: 'Entrena en Casa - Entrenamiento Personal Online y Presencial',
  description: 'Descubre cómo un personal trainer puede transformar tu rutina de ejercicios en casa. Entrena en casa con un programa de entrenamiento personalizado y alcanza tus metas fitness sin salir de tu hogar. ¡Comienza hoy!',
  keywords: [
    "personal trainer a domicilio", "personal trainer", "entrenamiento personalizado", "entrenamiento personalizado viña del mar", "personal trainer viña del mar", "entrenamiento online",
    "personal trainer domicilio", "entrenador personal casa", "preparador físico certificado", "entrenamiento en casa", "personal trainer viña", "asesoría entrenamiento online",
    "ejercicios con hijos", "clases personalizadas domicilio", "entrenamiento adultos mayores", "entrenador funcional casa", "rutina ejercicios hogar", "entrenador personal viña",
    "entrenamiento sin gimnasio", "entrenador mujeres casa", "personal trainer casa", "entrenamiento con niños", "clases fitness hogar", "ejercicios guiados casa", "entrenador a domicilio",
    "personal trainer chile", "sesión personal trainer", "rutina personalizada casa", "entrenamiento familiar casa", "ejercicios domicilio guiado", "personal trainer resultados",
    "entrenamiento seguro hogar", "entrenador personalizado casa", "personal trainer adultos", "preparador físico hogar", "entrenador fitness domicilio",
    "personal trainer las condes", "entrenador personal vitacura", "entrenador con con domicilio", "entrenamiento reñaca casa", "preparador físico providencia",
    "personal trainer santiago centro", "clases fitness las condes", "entrenador domicilio viña", "entrenamiento personalizado vitacura", "entrenador adulto mayor", "rutinas adaptadas mayores",
    "clases mayores domicilio", "entrenamiento fuerza mujeres", "entrenamiento para personas de 50 años", "Entrenamiento Personalizado Online am", "entrenaamiento en pareja online"
  ],
  image: '/SEO/home.png',
  type: 'website'
})


</script>

