<template>
    <div class="mx-auto py-5 flex w-11/12 flex-col items-center sm:w-10/12">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
          <Icon name="mdi:information" class="w-5 h-5 text-gray-700" />
          <span class="text-sm font-medium text-gray-700">Sobre Nosotros</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">¿Qué es Entrena en Casa?</h2>
        
        <div class="mt-10 max-w-5/6 mx-auto space-y-10">
            <!-- Texto antes del video -->
            <div class="text-center text-gray-700 leading-relaxed space-y-1">
                <p class="text-lg">
                    EntrenaEnCasa es mucho más que un personal trainer.
                </p>
                <p class="text-lg">
                    Contamos con una <strong>plataforma de entrenamiento personalizado</strong> que conecta a personas y empresas con entrenadores certificados, <strong>garantizando continuidad, calidad y resultados reales</strong>.
                </p>
            </div>

            <!-- Video centrado -->
            <div class="overflow-hidden rounded-3xl">
                <CommonVideoPlayer video-src="/videos/entrena-en-casa.mp4" />
            </div>

            <!-- Texto después del video -->
            <div class="text-center text-gray-700 leading-relaxed space-y-4">
                <p class="text-lg">
                    EntrenaEnCasa es una empresa chilena de entrenamiento personalizado con <strong>más de 10 años de experiencia</strong> en el mundo del ejercicio físico y la salud, ayudando a personas, empresas y comunidades a entrenar de forma segura, constante y con resultados reales.
                
                    Nacimos desde la práctica profesional del entrenamiento personalizado, entendiendo que el principal problema no es comenzar a entrenar, sino <strong>mantener la continuidad en el tiempo</strong>.
                
                    EntrenaEnCasa combina lo mejor del entrenamiento personalizado con el respaldo de una plataforma profesional que gestiona y protege tu experiencia.
                </p>
            </div>
        </div>
    </div>
</template>
