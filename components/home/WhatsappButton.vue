<template>
    <div
        class="group fixed bottom-4 right-4 p-2 flex items-end justify-end w-32 h-32 z-20">
        <NuxtLink
            to="https://wa.me/56971370313?text=Hola%20Entrena%20En%20Casa,%20tengo%20una%20duda."
            target="_blank"
            class="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r bg-green-500 z-50 absolute cursor-pointer">
            <Icon
                name="ic:outline-whatsapp"
                class="w-10 h-10 transition duration-[0.6s]" />
        </NuxtLink>
        <NuxtLink
            to="https://wa.me/56971370313?text=Hola%20Entrena%20En%20Casa,%20tengo%20una%20duda."
            target="_blank"
            class="absolute rounded-full transition-all duration-[0.2s] ease-out scale-y-0 group-hover:scale-y-100 group-hover:-translate-x-20 group-hover:-translate-y-8 flex p-2 hover:p-3 bg-green-300 scale-100 hover:bg-green-400 text-white cursor-pointer">
            <Icon name="ic:outline-whatsapp" class="w-8 h-8" />
        </NuxtLink>
        <!-- <NuxtLink to=""
            class="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-20 flex p-2 hover:p-3 bg-blue-300 hover:bg-blue-400 text-white cursor-pointer">
            <Icon name="circum:facebook" class="w-8 h-8" />
        </NuxtLink> -->
        <NuxtLink
            to="https://www.instagram.com/entrenaencasa/"
            target="_blank"
            class="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-20 group-hover:-translate-x-8 flex p-2 hover:p-3 bg-[#e77fc1] hover:bg-[#db59a9] text-white cursor-pointer">
            <Icon name="mdi:instagram" class="w-8 h-8" />
        </NuxtLink>
    </div>
</template>
