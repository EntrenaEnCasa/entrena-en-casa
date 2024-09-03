<template>
    <div class="my-5">
        <div class="mx-auto w-11/12 text-center">
            <h3 class="tracking-[.3rem]">BENEFICIOS</h3>
            <h2 class="my-3 text-4xl font-medium">¿Por qué Entrena en Casa?</h2>
            <p class="font-light">
                Entrena en Casa es la nueva forma de ejercitarse y vivir de forma más saludable.
            </p>
        </div>
        <div class="my-10 flex justify-between">
            <NuxtImg
                class="hidden xl:block"
                src="/home/woman-exercising.png"
                alt="woman exercising"
                width="500"
            />
            <div class="mx-auto flex w-11/12 items-center justify-center">
                <ul class="flex flex-col items-center space-y-2 text-start">
                    <li class="flex w-3/4 items-center">
                        <Icon name="mingcute:check-fill" class="mr-2 text-4xl text-secondary" />
                        <p class="font-light">
                            Entrena sin tener que moverte de tu hogar, no pierdas tiempo.
                        </p>
                    </li>
                    <li class="flex w-3/4 items-center">
                        <Icon name="mingcute:check-fill" class="mr-2 text-4xl text-primary" />
                        <p class="font-light">
                            Ahorras dinero en combustible y en planes de gimnasio que no asistes.
                        </p>
                    </li>
                    <li class="flex w-3/4 items-center">
                        <Icon name="mingcute:check-fill" class="mr-2 text-4xl text-secondary" />
                        <p class="font-light">
                            Sé el propio dueño de tu tiempo, la hora de entrenar la defines tú.
                        </p>
                    </li>
                    <li class="flex w-3/4 items-center">
                        <Icon name="mingcute:check-fill" class="mr-2 text-4xl text-primary" />
                        <p class="font-light">
                            Asesoramiento integral: Coaching, actividad física y nutrición.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
