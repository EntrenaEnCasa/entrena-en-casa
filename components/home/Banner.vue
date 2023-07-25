<template>
    <div class="pt-5 bg-gradiente relative" style="padding-bottom: 100px">
        <div class="tellural">
            <h1 class="text-center font-bold text-5xl">
                Son cada vez más
                <br>
                alumnos entrenando
                <br>
                <div class="inline-block px-5 py-2 text-white rounded text-3xl font-bold bg-primary">
                    online
                </div>
            </h1>
            <div class="grid grid-cols-3 items-center">
                <div class="col d-flex flex-column">
                    <div class="align-self-start">
                        <img src="/icons/star.svg" alt="running" height="60">
                    </div>
                    <div>
                        <img src="/home/dad-son-exercising.png" alt="dad-son-exercising" class="img-fluid">
                    </div>
                    <div class="align-self-end">
                        <img src="/icons/star.svg" alt="running" height="40">
                    </div>
                </div>
                <div class="col gap-4 d-flex align-items-center flex-column">
                    <div class="px-5 py-2 text-white rounded-pill lh-sm shadow" style="background-color: #00A4E8">
                        Conoce la nueva
                        <br>
                        metodología
                    </div>
                </div>
                <div class="col d-flex">
                    <img src="/home/yoga-couple.png" alt="yoga-couple" width="200">
                    <div>
                        <div>
                            <span class="fs-2">+50</span>
                            <p class="lh-1 text-secondary">
                                Alumnos
                                <br>
                                activos
                            </p>
                        </div>
                        <div>
                            <span class="fs-2">+60</span>
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

        <div class="rounded shadow bg-white w-75 p-4 absolute">
            <div class="row row-cols-1 row-cols-md-2 row-gap-4 row-cols-lg-4 align-items-center">
                <div class="col">
                    <div class="d-flex">
                        <img src="/icons/location.svg" alt="location icon" width="40">
                        <div class="ms-1 d-flex flex-column lh-1">
                            <p class="fs-6 fw-semibold mb-1">Modalidad
                            </p>
                            <p class="fs-7">Online o presencial, tu escoges</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="d-flex">
                        <img src="/icons/dumbbell.svg" alt="location icon" width="40">
                        <div class="ms-2 d-flex flex-column lh-1">
                            <p class="fs-6 fw-semibold mb-1">Modalidad
                            </p>
                            <p class="fs-7">Programa tus propias
                                sesiones, ve a tu propio ritmo</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="d-flex">
                        <img src="/icons/user.svg" alt="location icon" width="40">
                        <div class="ms-1 d-flex flex-column lh-1">
                            <p class="fs-6 fw-semibold mb-1">Modalidad
                            </p>
                            <p class="fs-7">Entrena tanto
                                individual como grupal</p>
                        </div>
                    </div>
                </div>
                <div class="col d-flex justify-content-center">
                    <div>
                        <button class="border-0 rounded text-white px-3 py-2 fw-medium"
                            style="background-color: #00A4E8">Registrarse
                            ahora</button>
                    </div>
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

.absolute {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
}
</style>