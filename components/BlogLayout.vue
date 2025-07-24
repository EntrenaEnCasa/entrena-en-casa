<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-primary-600">
              TuLogo
            </NuxtLink>
          </div>
          
          <nav class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-gray-700 hover:text-primary-600 transition-colors">
              Inicio
            </NuxtLink>
            <NuxtLink to="/blog" class="text-gray-700 hover:text-primary-600 transition-colors">
              Blog
            </NuxtLink>
            <NuxtLink to="/about" class="text-gray-700 hover:text-primary-600 transition-colors">
              Acerca de
            </NuxtLink>
            <NuxtLink to="/contact" class="text-gray-700 hover:text-primary-600 transition-colors">
              Contacto
            </NuxtLink>
          </nav>
          
          <!-- Mobile menu button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600"
          >
            <Icon name="heroicons:bars-3-20-solid" class="h-6 w-6" />
          </button>
        </div>
        
        <!-- Mobile menu -->
        <div v-if="mobileMenuOpen" class="md:hidden pb-4">
          <nav class="flex flex-col space-y-2">
            <NuxtLink to="/" class="px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
              Inicio
            </NuxtLink>
            <NuxtLink to="/blog" class="px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
              Blog
            </NuxtLink>
            <NuxtLink to="/about" class="px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
              Acerca de
            </NuxtLink>
            <NuxtLink to="/contact" class="px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
              Contacto
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company info -->
          <div>
            <h3 class="text-xl font-bold mb-4">TuEmpresa</h3>
            <p class="text-gray-400 mb-4">
              Creando soluciones educativas innovadoras para el futuro.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Icon name="mdi:facebook" class="h-5 w-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Icon name="mdi:twitter" class="h-5 w-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Icon name="mdi:linkedin" class="h-5 w-5" />
              </a>
            </div>
          </div>

          <!-- Quick links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/blog" class="text-gray-400 hover:text-white transition-colors">Blog</NuxtLink></li>
              <li><NuxtLink to="/about" class="text-gray-400 hover:text-white transition-colors">Acerca de</NuxtLink></li>
              <li><NuxtLink to="/contact" class="text-gray-400 hover:text-white transition-colors">Contacto</NuxtLink></li>
              <li><NuxtLink to="/privacy" class="text-gray-400 hover:text-white transition-colors">Privacidad</NuxtLink></li>
            </ul>
          </div>

          <!-- Categories -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Categorías</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/blog?category=desarrollo" class="text-gray-400 hover:text-white transition-colors">Desarrollo</NuxtLink></li>
              <li><NuxtLink to="/blog?category=educacion" class="text-gray-400 hover:text-white transition-colors">Educación</NuxtLink></li>
              <li><NuxtLink to="/blog?category=tecnologia" class="text-gray-400 hover:text-white transition-colors">Tecnología</NuxtLink></li>
              <li><NuxtLink to="/blog?category=tutoriales" class="text-gray-400 hover:text-white transition-colors">Tutoriales</NuxtLink></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Suscríbete</h3>
            <p class="text-gray-400 mb-4">Recibe las últimas noticias y artículos en tu email.</p>
            <form @submit.prevent="handleNewsletterSubmit" class="flex flex-col space-y-2">
              <input
                v-model="newsletterEmail"
                type="email"
                placeholder="Tu email"
                class="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TuEmpresa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
const newsletterEmail = ref('')

const handleNewsletterSubmit = async () => {
  try {
    await $fetch('/api/newsletter', {
      method: 'POST',
      body: { email: newsletterEmail.value }
    })
    
    newsletterEmail.value = ''
    // Mostrar mensaje de éxito
    alert('¡Suscripción exitosa!')
  } catch (error) {
    alert('Error al suscribirse')
  }
}

// Cerrar menú móvil al cambiar de ruta
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>
