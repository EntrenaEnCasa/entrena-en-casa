<template>
    <div class="py-10 md:pb-32 bg-gradiente relative">
        <div class="tellural">
            <h1 class="w-11/12 mx-auto text-center font-bold text-4xl md:text-5xl">
                Son cada vez más
                <br>
                alumnos entrenando
                <br>
                <div class="mt-4 inline-block px-5 py-2 text-white rounded-xl text-2xl md:text-3xl font-bold bg-primary">
                    online
                </div>
            </h1>
            <div class="grid grid-cols-1 md:grid-cols-3 place-items-center mt-5 md:mt-0">
                <div class="hidden md:flex flex-col space-y-4">
                    <div class="self-start ml-8">
                        <img src="/icons/star.svg" alt="running" width="60">
                    </div>
                    <div>
                        <img src="/home/dad-son-exercising.png" alt="dad-son-exercising" class="w-full h-auto">
                    </div>
                    <div class="self-end mr-4">
                        <img src="/icons/star.svg" alt="running" width="40">
                    </div>
                </div>
                <div class="gap-4 flex items-center justify-center flex-col space-y-6">
                    <div class="px-10 py-2 text-white rounded-full leading-tight shadow-xl"
                        style="background-color: #00A4E8">
                        Conoce la nueva
                        <br>
                        metodología
                    </div>
                </div>
                <div class="hidden md:flex">
                    <img src="/home/yoga-couple.png" alt="yoga-couple" width="200">
                    <div>
                        <div>
                            <span class="text-3xl">+50</span>
                            <p class="lh-1 text-secondary">
                                Alumnos
                                <br>
                                activos
                            </p>
                        </div>
                        <div>
                            <span class="text-3xl">+60</span>
                            <p class="lh-1 text-secondary">
                                Clases
                                <br>
                                grupales
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="mt-12 mx-auto rounded-lg shadow-lg bg-white w-10/12 p-8 md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 ">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="w-full flex items-center gap-2">
                    <div>
                        <Icon name="fa6-solid:location-dot" class="text-4xl w-16 min-w-16" />
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
                        <Icon name="fa6-solid:dumbbell" class="text-4xl w-16" />
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
                        <Icon name="fa6-solid:user" class="text-4xl w-16" />
                    </div>

                    <div class="flex flex-col leading-tight">
                        <p class="font-semibold mb-1">Modalidad
                        </p>
                        <p class="text-sm">Entrena tanto
                            individual como grupal</p>
                    </div>
                </div>
                <div class="flex items-center justify-center md:justify-start">
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
    /* background: linear-gradient(136deg, rgba(198, 243, 255, 0.15) 0%, rgba(113, 212, 240, 0.15) 64.54%, rgba(0, 142, 181, 0.15) 100%); */
}
</style>