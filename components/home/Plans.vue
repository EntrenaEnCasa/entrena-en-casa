<template>
    <div class="bg-gradiente py-10 lg:pb-20 lg:pt-32">
        <div class="mx-auto grid w-11/12 grid-cols-1 lg:grid-cols-3">
            <div class="order-last col-span-2 lg:order-none">
                <div class="mx-auto flex w-11/12 flex-col gap-8">
                    <div class="relative mx-auto w-full border bg-white px-6 py-4">
                        <p class="font-semibold tracking-[.2rem]">ENTRENAMIENTO FUNCIONAL</p>
                        <p class="text-sm font-semibold" style="letter-spacing: 0.15rem">
                            BORDE COSTERO
                        </p>
                        <p class="my-3 text-center">
                            Entrenamiento una vez por semana de forma grupal por un mes
                            <br />
                            Cada sábado a las 12:00hrs
                        </p>
                        <div class="flex flex-col items-center md:flex-row md:justify-between">
                            <p class="mb-3 text-center italic text-secondary md:text-left">
                                Apto para todo tipo de personas
                            </p>
                            <CommonButton class="tellural rounded-md px-3 py-1">
                                Contratar
                            </CommonButton>
                        </div>
                        <div
                            class="mt-4 flex justify-center md:absolute md:-right-8 md:-top-4 md:mt-0"
                        >
                            <span
                                class="tellural rounded-lg bg-secondary px-4 py-2 text-3xl font-semibold text-white"
                            >
                                $20.000
                            </span>
                        </div>
                    </div>
                    <div class="relative mx-auto w-full border bg-white px-4 py-3">
                        <p class="font-semibold tracking-[.2rem]">PLAN PERSONALIZADO ONLINE</p>
                        <p class="my-3 text-center">
                            Entrenamiento dos veces por semana por un mes
                            <br />
                            Acompañamiento el 100% de la sesión
                            <br />
                            Modalidad <span class="text-secondary">online</span>
                        </p>
                        <div class="flex justify-center text-secondary md:justify-end">
                            <CommonButton class="tellural rounded-md px-3 py-1">
                                Contratar
                            </CommonButton>
                        </div>
                        <div
                            class="mt-4 flex justify-center md:absolute md:-right-8 md:-top-4 md:mt-0"
                        >
                            <span
                                class="tellural rounded-lg bg-secondary px-4 py-2 text-3xl font-semibold text-white"
                            >
                                $112.000
                            </span>
                        </div>
                        <div
                            class="mt-2 text-center md:absolute md:right-[8px] md:top-[15%] md:mt-0 md:translate-y-full"
                        >
                            <span class="tellural text-secondary"> $14.000/sesión </span>
                        </div>
                    </div>
                    <div class="relative mx-auto w-full border bg-white px-4 py-3">
                        <p class="font-semibold tracking-[.2rem]">PLAN PERSONALIZADO INDIVIDUAL</p>
                        <p class="text-sm font-semibold" style="letter-spacing: 0.15rem">
                            VIÑA DEL MAR
                        </p>
                        <p class="my-3 text-center">
                            Entrenamiento dos veces por semana por un mes
                            <br />
                            Sesión personalizada individual
                            <br />
                            Modalidad
                            <span class="text-secondary">presencial</span>
                        </p>
                        <div class="flex justify-center text-secondary md:justify-end">
                            <CommonButton class="tellural rounded-md px-3 py-1">
                                Contratar
                            </CommonButton>
                        </div>
                        <div
                            class="mt-4 flex justify-center md:absolute md:-right-8 md:-top-4 md:mt-0"
                        >
                            <span
                                class="tellural rounded-lg bg-secondary px-4 py-2 text-3xl font-semibold text-white"
                            >
                                $140.000
                            </span>
                        </div>
                        <div
                            class="mt-2 text-center md:absolute md:right-[8px] md:top-[15%] md:mt-0 md:translate-y-full"
                        >
                            <span class="tellural text-secondary"> $17.500/sesión </span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="col-span-1 mb-10 flex flex-col items-center justify-center space-y-2 lg:mb-0"
            >
                <p class="text-sm tracking-[.2rem]">SERVICIOS</p>
                <h5 class="text-4xl font-medium">Nuestros planes</h5>
                <p class="text-sm tracking-[.2rem]">MÁS VENDIDOS</p>
                <NuxtImg src=" /home/runner.png" alt="" width="350" />
                <router-link to="/" class="tellural bg-primary px-2 py-2 text-white"
                    >Ver todos los planes</router-link
                >
            </div>
        </div>
    </div>
</template>
<style scoped>
.bg-gradiente {
    background: url("/background.svg") no-repeat center center fixed;
}
</style>
