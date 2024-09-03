<template>
    <div class="relative">
        <div class="bg-gradiente py-10 lg:pb-32">
            <div
                class="tellural justify center mt-5 grid h-full w-full grid-cols-1 place-items-center lg:mt-0 lg:grid-cols-3"
            >
                <div
                    class="mb-10 grid w-4/5 items-center justify-center text-center lg:col-span-2 lg:ml-10 lg:mt-10 lg:w-2/3 lg:text-left"
                >
                    <h1
                        class="tellural mx-auto mb-4 w-full text-4xl font-bold text-black lg:mx-0 lg:w-4/5"
                    >
                        Personal Trainers Online, Domicilio y al aire libre
                    </h1>
                    <p class="mb-4 w-full text-center text-gray-500 lg:w-4/5 lg:text-left">
                        Entrenando donde y cuando quieras, un entrenamiento y nutrición
                        personalizada. ¿Listo para un cambio?
                    </p>

                    <div>
                        <div
                            class="mx-auto mt-6 flex items-center justify-center space-x-4 lg:justify-start"
                        >
                            <NuxtLink
                                to="/user/auth/register"
                                class="rounded-full border-0 bg-secondary px-6 py-3 font-medium text-white"
                                >Registrarse
                            </NuxtLink>
                            <NuxtLink
                                to="https://www.youtube.com/watch?v=o_HHBh3WxX0&ab_channel=JorgeSierraEntrenaenCasa"
                                target="_blank"
                                class="flex items-center space-x-2"
                            >
                                <div
                                    class="flex h-12 w-12 items-center justify-center rounded-full bg-white font-medium text-secondary shadow-lg"
                                >
                                    <Icon name="fa6-solid:play" class="ml-1 text-xl" />
                                </div>
                                <span class="text-secondary">Ver video</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="hidden lg:block">
                    <NuxtImg
                        src="/home/banner-img-min.png"
                        alt="Banner"
                        class="absolute -top-24 right-0 h-screen w-auto object-cover lg:right-16"
                    />
                    <div
                        class="absolute right-24 top-20 flex items-center space-x-2 rounded-lg bg-white px-4 py-3 shadow-xl"
                    >
                        <h3 class="text-2xl font-bold">60+</h3>
                        <p class="text-sm leading-tight text-gray-500">
                            Clases <br />
                            grupales
                        </p>
                    </div>
                    <div
                        class="absolute right-1/3 top-72 flex items-center space-x-2 rounded-lg bg-white px-4 py-3 shadow-xl"
                    >
                        <h3 class="text-2xl font-bold">50+</h3>
                        <p class="text-sm leading-tight text-gray-500">
                            Alumnos <br />
                            activos
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="mx-auto mt-3 w-10/12 rounded-xl bg-white px-4 py-6 shadow-lg lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-12 lg:-translate-x-1/2 lg:translate-y-1/2"
            >
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
                    <div class="flex w-full items-center gap-2">
                        <div>
                            <Icon name="fa6-solid:location-dot" class="w-16 min-w-16 text-3xl" />
                        </div>
                        <div class="flex flex-col leading-tight">
                            <h4 class="mb-1 font-semibold">Modalidad</h4>
                            <p class="text-sm">Online o presencial, tu escoges</p>
                        </div>
                    </div>
                    <div class="flex w-full items-center gap-2">
                        <div>
                            <Icon name="fa6-solid:dumbbell" class="w-16 text-3xl" />
                        </div>

                        <div class="flex flex-col leading-tight">
                            <p class="mb-1 font-semibold">Modalidad</p>
                            <p class="text-sm">
                                Programa tus propias sesiones, ve a tu propio ritmo
                            </p>
                        </div>
                    </div>
                    <div class="flex w-full items-center gap-2">
                        <div>
                            <Icon name="fa6-solid:user" class="w-16 text-3xl" />
                        </div>

                        <div class="flex flex-col leading-tight">
                            <p class="mb-1 font-semibold">Modalidad</p>
                            <p class="text-sm">Entrena tanto individual como grupal</p>
                        </div>
                    </div>
                    <div class="mx-auto flex items-center justify-center">
                        <NuxtLink
                            to="/user/auth/register"
                            class="cursor-pointer rounded-lg border-0 bg-secondary px-3 py-2 font-medium text-white"
                        >
                            Registrarse ahora
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
