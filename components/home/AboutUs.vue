<template>
    <div class="mx-auto py-10 flex w-11/12 flex-col items-center sm:w-10/12">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
          <Icon name="mdi:information" class="w-5 h-5 text-gray-700" />
          <span class="text-sm font-medium text-gray-700">Sobre Nosotros</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">¿Qué es Entrena en Casa?</h2>
        <div class="mt-10">
            <div class="mx-auto grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
                <div class="lg:col-span-2">
                    <div class="overflow-hidden rounded-3xl">
                        <CommonVideoPlayer video-src="/videos/entrena-en-casa.mp4" />
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
