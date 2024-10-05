<template>
    <div class="mx-auto flex w-11/12 flex-col items-center py-10 sm:w-10/12">
        <p class="text-sm tracking-[.15rem]">SOBRE NOSOTROS</p>
        <h2 class="text-3xl font-medium md:text-4xl">¿Qué es Entrena en Casa?</h2>
        <div class="mt-10">
            <div class="mx-auto grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
                <div class="lg:col-span-2">
                    <div class="contenedor">
                        <lite-youtube
                            class="responsive-iframe rounded-3xl"
                            videoid="o_HHBh3WxX0"
                            posterquality="maxresdefault"
                            params="rel=0&vq=hd1080&controls=0"
                        ></lite-youtube>
                    </div>
                </div>
                <div class="mx-auto w-full font-light leading-tight lg:w-11/12">
                    <p>
                        Elige localidad y si quieres entrenar en tu casa, al aire libre o de manera
                        Online. Nuestros entrenamientos están pensados en hacer de la actividad
                        física una experiencia agradable y junto con ello consigas los resultados.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.contenedor {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%;
}

.responsive-iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
}
</style>
<script>
import "@justinribeiro/lite-youtube";
</script>
