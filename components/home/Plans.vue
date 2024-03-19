<template>
    <div class="bg-gradiente py-10 lg:pt-32 lg:pb-20">
        <div class="grid grid-cols-1 lg:grid-cols-3 w-11/12 mx-auto">
            <div class="order-last lg:order-none col-span-2">
                <div class="flex flex-col gap-8 w-11/12 mx-auto">
                    <div class="px-6 py-4 border mx-auto bg-white relative w-full">
                        <p class="font-semibold tracking-[.2rem]">ENTRENAMIENTO FUNCIONAL</p>
                        <p class="font-semibold text-sm" style="letter-spacing: .15rem;">BORDE COSTERO</p>
                        <p class="text-center my-3">
                            Entrenamiento una vez por semana de forma grupal por un mes
                            <br>
                            Cada sábado a las 12:00hrs
                        </p>
                        <div class="flex flex-col items-center md:flex-row md:justify-between">
                            <p class="italic text-center md:text-left text-secondary mb-3">Apto para todo tipo de personas
                            </p>
                            <CommonButton class="tellural py-1 px-3 rounded-md">
                                Contratar
                            </CommonButton>
                        </div>
                        <div class="flex justify-center mt-4 md:mt-0 md:absolute md:-top-4 md:-right-8">
                            <span class="text-white text-3xl font-semibold py-2 px-4 tellural rounded-lg bg-secondary">
                                $20.000
                            </span>
                        </div>
                    </div>
                    <div class="px-4 py-3 border mx-auto bg-white relative w-full">
                        <p class="font-semibold tracking-[.2rem]">PLAN PERSONALIZADO ONLINE</p>
                        <p class="text-center my-3">
                            Entrenamiento dos veces por semana por un mes
                            <br>
                            Acompañamiento el 100% de la sesión
                            <br />
                            Modalidad <span class="text-secondary">online</span>
                        </p>
                        <div class="flex justify-center md:justify-end text-secondary">
                            <CommonButton class="tellural py-1 px-3 rounded-md">
                                Contratar
                            </CommonButton>
                        </div>
                        <div class="flex justify-center mt-4 md:mt-0 md:absolute md:-top-4 md:-right-8">
                            <span class="text-white text-3xl font-semibold py-2 px-4 tellural rounded-lg bg-secondary">
                                $112.000
                            </span>
                        </div>
                        <div class="text-center mt-2 md:mt-0 md:absolute md:top-[15%] md:right-[8px] md:translate-y-full">
                            <span class="tellural text-secondary">
                                $14.000/sesión
                            </span>
                        </div>
                    </div>
                    <div class="px-4 py-3 border mx-auto bg-white relative w-full">
                        <p class="font-semibold tracking-[.2rem]">PLAN PERSONALIZADO INDIVIDUAL</p>
                        <p class="font-semibold text-sm" style="letter-spacing: .15rem;">VIÑA DEL MAR</p>
                        <p class="text-center my-3">
                            Entrenamiento dos veces por semana por un mes
                            <br>
                            Sesión personalizada individual
                            <br />
                            Modalidad <span class="text-secondary">presencial</span>
                        </p>
                        <div class="flex justify-center md:justify-end text-secondary">
                            <CommonButton class="tellural py-1 px-3 rounded-md">
                                Contratar
                            </CommonButton>
                        </div>
                        <div class="flex justify-center mt-4 md:mt-0 md:absolute md:-top-4 md:-right-8">
                            <span class="text-white text-3xl font-semibold py-2 px-4 tellural rounded-lg bg-secondary">
                                $140.000
                            </span>
                        </div>
                        <div class="text-center mt-2 md:mt-0 md:absolute md:top-[15%] md:right-[8px] md:translate-y-full">
                            <span class="tellural text-secondary">
                                $17.500/sesión
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-1 flex flex-col justify-center items-center space-y-2 mb-10 lg:mb-0">
                <p class="text-sm tracking-[.2rem]">SERVICIOS</p>
                <h5 class="text-4xl font-medium">Nuestros planes</h5>
                <p class="text-sm tracking-[.2rem]">MÁS VENDIDOS</p>
                <img src=" /home/runner.png" alt="" width="350">
                <router-link to="/" class="bg-primary text-white px-2 py-2 tellural">Ver todos los planes</router-link>
            </div>
        </div>
    </div>
</template>
<style scoped>
.bg-gradiente {
    background: url('/background.svg') no-repeat center center fixed;
}
</style>