<template>
    <div class="py-10 lg:pb-32 bg-gradiente relative ">
        <div class="tellural h-[200px] lg:h-[300px]">

            <div class="grid grid-cols-1 lg:grid-cols-3 place-items-center justify center w-full  mt-5 lg:mt-0 h-full">

                <div
                    class="col-span-2 grid items-center justify-center w-4/5 lg:w-2/3 text-center lg:text-left lg:ml-10  mb-10 lg:mt-10">
                    <h1 class="text-4xl   text-black mb-4 tellural font-bold w-full mx-auto lg:mx-0 lg:w-4/5">Personal
                        Trainers
                        Online,
                        Domicilio y al aire libre
                    </h1>
                    <p class=" text-center lg:text-left text-gray-500 mb-4 w-full lg:w-4/5">Entrenando donde y cuando
                        quieras,
                        un entrenamiento y nutrición personalizada.
                        ¿Listo para un cambio?</p>

                    <div>
                        <div class="flex items-center justify-center lg:justify-start mx-auto mt-6 space-x-4 ">
                            <router-link to="/user/auth/register"
                                class="border-0 rounded-full text-white px-6 py-3 font-medium bg-secondary">Registrarse
                            </router-link>
                            <nuxtLink to="https://youtu.be/LMNJWdFQrHg" target="_blank"
                                class="flex items-center space-x-2">
                                <div
                                    class="rounded-full shadow-lg text-secondary h-12 w-12 font-medium bg-white flex justify-center items-center">
                                    <Icon name="fa6-solid:play" class="ml-1 text-xl" />
                                </div>
                                <span class="text-secondary">Ver video</span>
                            </nuxtLink>
                        </div>

                    </div>
                </div>
                <div class="hidden lg:block -z-10">
                    <NuxtImg src="/home/banner-img-min.png" alt="Banner"
                        class="absolute h-screen -top-24 right-0 lg:right-16 w-auto object-cover" />
                    <div
                        class="absolute top-20 right-24 bg-white px-4 py-3 rounded-lg space-x-2 flex items-center shadow-xl">
                        <h3 class="text-2xl font-bold">60+</h3>
                        <p class="text-gray-500 text-sm leading-tight">Clases <br> grupales</p>
                    </div>
                    <div
                        class="absolute top-72 right-1/3  bg-white px-4 py-3 rounded-lg  space-x-2 flex items-center shadow-xl">
                        <h3 class="text-2xl font-bold">50+</h3>
                        <p class="text-gray-500 text-sm leading-tight">Alumnos <br> activos</p>
                    </div>
                </div>


            </div>
        </div>
        <div
            class="mt-20 lg:mt-12 mx-auto rounded-xl shadow-lg bg-white w-10/12 px-4 py-6 lg:absolute  lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-1/2 ">

            <div class=" grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div class="w-full flex items-center gap-2">
                    <div>
                        <Icon name="fa6-solid:location-dot" class="text-3xl w-16 min-w-16" />
                    </div>
                    <div class="flex flex-col leading-tight">
                        <h4 class="font-semibold mb-1">
                            Modalidad
                        </h4>
                        <p class="text-sm">Online o presencial, tu escoges</p>
                    </div>
                </div>
                <div class="w-full flex items-center gap-2">
                    <div>
                        <Icon name="fa6-solid:dumbbell" class="text-3xl w-16" />
                    </div>

                    <div class="flex flex-col leading-tight">
                        <p class="font-semibold mb-1">Modalidad
                        </p>
                        <p class="text-sm">Programa tus propias
                            sesiones, ve a tu propio ritmo</p>
                    </div>
                </div>
                <div class="w-full flex items-center gap-2">
                    <div>
                        <Icon name="fa6-solid:user" class="text-3xl w-16" />
                    </div>

                    <div class="flex flex-col leading-tight">
                        <p class="font-semibold mb-1">Modalidad
                        </p>
                        <p class="text-sm">Entrena tanto
                            individual como grupal</p>
                    </div>
                </div>
                <div class="flex items-center justify-center mx-auto ">
                    <router-link to="/user/auth/register" class="border-0 rounded-lg text-white px-3 py-2 font-medium"
                        style="background-color: #00A4E8">Registrarse
                        ahora
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.bg-gradiente {
    background: url('/background.svg') no-repeat center center fixed;
    z-index: -20;
    /* background: linear-gradient(136deg, rgba(198, 243, 255, 0.15) 0%, rgba(113, 212, 240, 0.15) 64.54%, rgba(0, 142, 181, 0.15) 100%); */
}
</style>