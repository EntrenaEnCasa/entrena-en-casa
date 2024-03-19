<template>
    <div class="py-10 flex flex-col items-center w-11/12 sm:w-10/12 mx-auto">
        <p class="text-sm tracking-[.15rem]">SOBRE NOSOTROS</p>
        <h2 class="font-medium text-3xl md:text-4xl">¿Qué es Entrena en Casa?</h2>
        <div class="mt-10">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center  mx-auto">
                <div class="lg:col-span-2">
                    <div class="contenedor">
                        <iframe class="responsive-iframe  rounded-3xl" width="560" height="315"
                            src="https://www.youtube.com/embed/LMNJWdFQrHg?si=kuSISxyCRTRFoQzT&amp;controls=0"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
                <div class="w-full lg:w-11/12 mx-auto leading-tight font-light">
                    <p>
                        Elige localidad y si quieres entrenar en tu casa, al aire libre o de manera Online. Nuestros
                        entrenamientos están pensados en hacer de la actividad física una experiencia agradable y junto
                        con ello consigas los resultados.
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