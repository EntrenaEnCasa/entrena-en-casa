<template>
    <div class="group fixed bottom-4 right-4 z-20 flex h-32 w-32 items-end justify-end p-2">
        <NuxtLink
            to="https://wa.me/56971370313?text=Hola%20Entrena%20En%20Casa,%20tengo%20una%20duda."
            target="_blank"
            class="absolute z-50 flex cursor-pointer items-center justify-center rounded-full bg-green-500 bg-gradient-to-r p-3 text-white shadow-xl"
        >
            <Icon name="ic:outline-whatsapp" class="h-10 w-10 transition duration-[0.6s]" />
        </NuxtLink>
        <NuxtLink
            to="https://wa.me/56971370313?text=Hola%20Entrena%20En%20Casa,%20tengo%20una%20duda."
            target="_blank"
            class="absolute flex scale-100 scale-y-0 cursor-pointer rounded-full bg-green-300 p-2 text-white transition-all duration-[0.2s] ease-out hover:bg-green-400 hover:p-3 group-hover:-translate-x-20 group-hover:-translate-y-8 group-hover:scale-y-100"
        >
            <Icon name="ic:outline-whatsapp" class="h-8 w-8" />
        </NuxtLink>
        <!-- <NuxtLink to=""
            class="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-20 flex p-2 hover:p-3 bg-blue-300 hover:bg-blue-400 text-white cursor-pointer">
            <Icon name="circum:facebook" class="w-8 h-8" />
        </NuxtLink> -->
        <NuxtLink
            to="https://www.instagram.com/entrenaencasa/"
            target="_blank"
            class="absolute flex scale-x-0 cursor-pointer rounded-full bg-[#e77fc1] p-2 text-white transition-all duration-[0.2s] ease-out hover:bg-[#db59a9] hover:p-3 group-hover:-translate-x-8 group-hover:-translate-y-20 group-hover:scale-x-100"
        >
            <Icon name="mdi:instagram" class="h-8 w-8" />
        </NuxtLink>
    </div>
</template>
