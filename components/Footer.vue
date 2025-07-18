<template>
    <div class="bg-gray-50">
        <div class="mx-auto w-11/12 py-12 lg:w-9/12">
            <!-- Sección principal del footer -->
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4  lg:place-items-center">
                <!-- Logo y descripción -->
                <div class="space-y-4 mx-auto">
                    <NuxtLink to="/">
                        <NuxtImg src="/logo.png" class="w-1/3 lg:w-full h-auto object-contain mx-auto" alt="Entrena en Casa" />
                    </NuxtLink>
                    <p class="text-gray-600 text-sm leading-relaxed max-w-xs">
                        Entrenamiento personalizado online y presencial en la Región de Valparaíso y Metropolitana.
                    </p>
                    <NuxtLink to="#contacto" class="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-600 transition-colors flex items-center gap-2">
                        <Icon name="mdi:chat" class="text-base" />
                        Habla con Nosotros
                    </NuxtLink>
                </div>

                <!-- Información -->
                <div class="space-y-3">
                    <h5 class="text-gray-900 text-base font-semibold flex items-center">Información</h5>
                    <div class="flex flex-col gap-2">
                        <NuxtLink to="/sobre-nosotros" class="block text-gray-600 text-sm hover:text-primary transition-colors">
                            Sobre Nosotros
                        </NuxtLink>
                        <NuxtLink to="/servicios" class="block text-gray-600 text-sm hover:text-primary transition-colors">
                            Servicios
                        </NuxtLink>
                        <NuxtLink to="/planes" class="block text-gray-600 text-sm hover:text-primary transition-colors">
                            Planes
                        </NuxtLink>
                        <NuxtLink to="/blog" class="block text-gray-600 text-sm hover:text-primary transition-colors">
                            Blog
                        </NuxtLink>
                    </div>
                </div>

                <!-- Contacto -->
                <div class="space-y-5  ">
                    <h5 class="text-gray-900 text-base font-semibold">Contacto</h5>
                    <div class="flex flex-col gap-3">
                        <div class="text-gray-600 text-sm">
                            <p class="font-medium">Chile</p>
                        </div>
                        <NuxtLink to="https://wa.me/56971370313" class="text-gray-600 text-sm">
                            <p>+56 9 7137 0313</p>
                        </NuxtLink>
                        <NuxtLink to="mailto:entrenaencasa0@gmail.com" class="text-gray-600 text-sm">
                            <p>entrenaencasa0@gmail.com</p>
                        </NuxtLink>
                    </div>
                </div>

                <!-- Redes sociales -->
                <div class="space-y-3">
                    <div class="flex flex-col gap-2">
                        <NuxtLink to="https://www.facebook.com/entrenaencasaweb" target="_blank" class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Icon name="mdi:facebook" class="text-base" />
                            Facebook
                        </NuxtLink>
                        <NuxtLink to="https://www.linkedin.com/company/entrena-en-casa/"  target="_blank" class="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors flex items-center gap-2">
                            <Icon name="mdi:linkedin" class="text-base" />
                            LinkedIn
                        </NuxtLink>
                        <NuxtLink to="https://www.instagram.com/entrenaencasa"  target="_blank" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2">
                            <Icon name="mdi:instagram" class="text-base" />
                            Instagram
                        </NuxtLink>
                        <NuxtLink to="https://wa.me/56971370313" target="_blank" class="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2">
                            <Icon name="mdi:whatsapp" class="text-base" />
                            WhatsApp
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Newsletter -->
            <!-- <div class="mt-10 bg-secondary rounded-xl p-6">
                <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div>
                        <h3 class="text-white text-lg font-semibold mb-1">Boletín Informativo</h3>
                        <p class="text-blue-100 text-sm">Sé el primero de conocer las novedades de Entrena en Casa</p>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <div class="relative">
                            <Icon name="mdi:email-outline" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input 
                                type="email" 
                                placeholder="Ingresa tu correo electrónico" 
                                class="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent w-full sm:w-72 text-sm"
                            />
                        </div>
                        <button 
                            type="submit" 
                            class="bg-white text-secondary px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors whitespace-nowrap text-sm"
                        >
                            Suscribirse
                        </button>
                    </div>
                </div>
            </div> -->

            <!-- Portales -->
            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <NuxtLink to="/user/auth/login" class="bg-quaternary text-white py-4 rounded-xl text-center font-semibold text-base hover:bg-quaternary-600 transition-colors">
                    Portal Estudiante
                </NuxtLink>
                <NuxtLink to="/professional/auth/login" class="bg-quaternary text-white py-4 rounded-xl text-center font-semibold text-base hover:bg-quaternary-600 transition-colors">
                    Portal Entrenador
                </NuxtLink>
            </div>

            <!-- Copyright -->
            <div class="mt-8 pt-6 border-t border-gray-200 text-center">
                <p class="text-gray-500 text-sm">© Copyright 2025</p>
            </div>
        </div>
    </div>
</template>