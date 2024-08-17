<template>
    <div class="w-11/12 lg:w-10/12 mx-auto my-14 lg:mt-32">
        <div class="text-center mb-10">
            <h3 class="tracking-[.3rem]">NUESTROS SERVICIOS</h3>
            <h2 class="font-medium my-3 text-4xl">¿Qué ofrecemos?</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div
                class="border border-sky-100 rounded-xl shadow-xl shadow-indigo-50 p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                <NuxtImg
                    src="/home/online-training.jpeg"
                    class="h-[250px] w-full object-cover rounded-xl"
                    alt="online training" />
                <div class="flex flex-col items-center justify-center text-center gap-5">
                    <div class="h-16 w-16 flex justify-center items-center bg-primary rounded-2xl">
                        <Icon name="ic:twotone-computer" class="text-3xl text-white" />
                    </div>
                    <h4 class="text-xl font-semibold">Planes Online</h4>
                    <p class="text-sm tellural">
                        Nos conectamos contigo y guiamos tu entrenamiento el 100% de la sesión
                    </p>
                </div>
            </div>
            <div
                class="border border-sky-100 rounded-xl shadow-xl shadow-indigo-50 p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="flex flex-col items-center justify-center text-center gap-5">
                    <div
                        class="h-16 w-16 flex justify-center items-center bg-secondary rounded-2xl">
                        <Icon name="game-icons:weight-lifting-up" class="text-3xl text-white" />
                    </div>
                    <h4 class="text-xl font-semibold">Planes Presenciales</h4>
                    <p class="text-sm tellural">
                        Puede ser a domicilio, al aire libre o en el gimnasio de tu edificio.
                    </p>
                </div>
                <NuxtImg
                    src="/home/presencial-training.jpg"
                    class="h-[250px] w-full object-cover rounded-xl"
                    alt="presencial training" />
            </div>
        </div>
    </div>
</template>
