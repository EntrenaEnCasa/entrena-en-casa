<template>
    <div class="mx-auto my-14 w-11/12 lg:mt-32 lg:w-10/12">
        <div class="mb-10 text-center">
            <h3 class="tracking-[.3rem]">NUESTROS SERVICIOS</h3>
            <h2 class="my-3 text-4xl font-medium">¿Qué ofrecemos?</h2>
        </div>
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div
                class="grid grid-cols-1 gap-5 rounded-xl border border-sky-100 p-8 shadow-xl shadow-indigo-50 md:grid-cols-2"
            >
                <NuxtImg
                    src="/home/online-training.jpeg"
                    class="h-[250px] w-full rounded-xl object-cover"
                    alt="online training"
                />
                <div class="flex flex-col items-center justify-center gap-5 text-center">
                    <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                        <Icon name="ic:twotone-computer" class="text-3xl text-white" />
                    </div>
                    <h4 class="text-xl font-semibold">Planes Online</h4>
                    <p class="tellural text-sm">
                        Nos conectamos contigo y guiamos tu entrenamiento el 100% de la sesión
                    </p>
                </div>
            </div>
            <div
                class="grid grid-cols-1 gap-5 rounded-xl border border-sky-100 p-8 shadow-xl shadow-indigo-50 md:grid-cols-2"
            >
                <div class="flex flex-col items-center justify-center gap-5 text-center">
                    <div
                        class="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary"
                    >
                        <Icon name="game-icons:weight-lifting-up" class="text-3xl text-white" />
                    </div>
                    <h4 class="text-xl font-semibold">Planes Presenciales</h4>
                    <p class="tellural text-sm">
                        Puede ser a domicilio, al aire libre o en el gimnasio de tu edificio.
                    </p>
                </div>
                <NuxtImg
                    src="/home/presencial-training.jpg"
                    class="h-[250px] w-full rounded-xl object-cover"
                    alt="presencial training"
                />
            </div>
        </div>
    </div>
</template>
