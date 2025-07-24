<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
    <div class="max-w-7xl mx-auto gap-4 px-4 py-8">
      <!-- Layout Principal: Post grande + Sidebar -->
      <div v-if="visiblePosts.length > 0" class=" h-full grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
        <!-- Post Principal (2/3 del ancho) -->
        <div class="h-full ">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
            <div class="flex flex-col md:flex-row place-content-center h-full ">
              <!-- Contenido del post principal -->
              <div class="md:w-2/3 p-8 flex flex-col justify-center">
                <div class="flex gap-2 mb-4">
                  <span class="px-3 py-1 bg-secondary-500 text-white text-sm font-medium rounded-full">
                    {{ visiblePosts[0].category?.[0] || 'Guías' }}
                  </span>
                  <span class="px-3 py-1 bg-secondary-500 text-white text-sm font-medium rounded-full">
                    {{ visiblePosts[0].category?.[1] || 'Entrenamiento' }}
                  </span>
                </div>
                
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {{ visiblePosts[0].title }}
                </h1>
                
                <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>📅 {{ formatDate(visiblePosts[0].publishedAt) }}</span>
                  <span>⏱️ {{ visiblePosts[0].readTime || calculateReadTime(visiblePosts[0].content) }} minutos de lectura</span>
                </div>
                
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {{ visiblePosts[0].introduction }}
                </p>
                
                <NuxtLink 
                  :to="`/blog/${visiblePosts[0].slug}`"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition-all duration-300 shadow-md hover:shadow-lg w-fit"
                >
                  Continuar leyendo →
                </NuxtLink>
              </div>
              
              <!-- Imagen del post principal -->
              <div class="md:w-1/3 ">
                <NuxtImg
                  v-if="visiblePosts[0].images && visiblePosts[0].images[0]"
                  :src="visiblePosts[0].images[0].src"
                  :alt="visiblePosts[0].images[0].alt"
                  class="w-full h-64 md:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar (1/3 del ancho) -->
        <div class="lg:col-span-1 space-y-6">
          <article
            v-for="post in visiblePosts.slice(1, 3)"
            :key="post.id"
            class="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div class="flex gap-2 mb-3">
              <span v-for="(category, index) in post.category" :key="index" class="px-3 py-1 bg-secondary-500 text-white text-xs font-medium rounded-full">
                {{ category || 'Listados' }}
              </span>
            </div>
            
            <h3 class="text-lg font-bold text-gray-900 mb-3 leading-tight">
              {{ post.title }}
            </h3>
            
            <div class="flex items-center gap-3 text-xs text-gray-600 mb-3">
              <span>📅 {{ formatDate(post.publishedAt) }}</span>
              <span>⏱️ {{ post.readTime || calculateReadTime(post.content) }} minutos de lectura</span>
            </div>
            
            <p class="text-gray-700 mb-4 leading-relaxed text-sm">
              {{ post.introduction }}
            </p>
            
            <NuxtLink 
              :to="`/blog/${post.slug}`"
              class="inline-flex items-center gap-2 px-5 py-2 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
            >
              Continuar leyendo →
            </NuxtLink>
          </article>
        </div>
      </div>

      <!-- Sección "Últimos Post" -->
      <div v-if="visiblePosts.length > 3" class="my-12">
        <div class="flex justify-center items-center mx-auto w-full gap-4 mb-8">
          <span class="bg-secondary-500 text-white px-6 py-3 rounded-full font-medium text-lg">
            Últimos
          </span>
          <span class="text-gray-700 font-medium text-lg">Post</span>
        </div>

        <!-- Posts horizontales -->
        <div class="space-y-8">
          <article
            v-for="post in visiblePosts.slice(3)"
            :key="post.id"
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div class="flex flex-col md:flex-row">
              <!-- Contenido del post -->
              <div class="md:w-1/2 p-8 flex flex-col justify-center">
                <div class="flex gap-2 mb-4">
                  <span class="px-3 py-1 bg-secondary-500 text-white text-sm font-medium rounded-full">
                    {{ post.category?.[0] || 'Guías' }}
                  </span>
                  <span class="px-3 py-1 bg-secondary-500 text-white text-sm font-medium rounded-full">
                    {{ post.category?.[1] || 'Familia' }}
                  </span>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {{ post.title }}
                </h3>
                
                <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>📅 {{ formatDate(post.publishedAt) }}</span>
                  <span>⏱️ {{ post.readTime || calculateReadTime(post.content) }} minutos de lectura</span>
                </div>
                
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {{ post.introduction }}
                </p>
                
                <NuxtLink 
                  :to="`/blog/${post.slug}`"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition-all duration-300 shadow-md hover:shadow-lg w-fit"
                >
                  Continuar leyendo →
                </NuxtLink>
              </div>
              
              <!-- Imagen del post -->
              <div class="md:w-1/2">
                <NuxtImg
                  v-if="post.images && post.images[0]"
                  :src="post.images[0].src"
                  :alt="post.images[0].alt"
                  class="w-full h-64 md:h-full md:max-h-[80vh] object-cover"
                />
              </div>
            </div>
          </article>
          <!-- Sentinel para carga infinita -->
          <div ref="sentinel" style="height: 1px;"></div>
        </div>
      </div>

    <!-- Estado de carga infinita -->
    <div v-if="!pending && posts.length < total" class="flex flex-col items-center justify-center py-10">
      <p class="text-gray-500 mb-4">Cargando más posts...</p>
      <div class="animate-spin rounded-full h-10 w-10 border-4 border-secondary-200 border-t-secondary-500"></div>
    </div>
    <div v-if="!pending && posts.length >= total && posts.length > 0" class="flex flex-col items-center justify-center py-10">
      <p class="text-gray-500">No hay más post por ahora. ¡Atento para más contenido!</p>
    </div>

    <!-- Estado de carga -->
    <div v-if="pending" class="blog-loading-spinner flex flex-col items-center justify-center py-20">
      <transition name="fade">
        <div v-if="pending" class="blog-loading-spinner flex flex-col items-center justify-center py-20">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-secondary-200 border-t-secondary-500"></div>
          <p class="mt-4 text-gray-600">Cargando posts...</p>
        </div>
      </transition>
    </div>

    <!-- Estado sin posts -->
    <div v-else-if="!visiblePosts || visiblePosts.length === 0" class="text-center py-20">
      <div class="text-6xl mb-4">📝</div>
      <p class="text-xl text-gray-600 mb-2">No hay posts disponibles</p>
      <p class="text-gray-500">Pronto tendremos contenido nuevo para ti</p>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useBlog } from '~/composables/useBlog'
import type { BlogPost } from '~/types/blog'
const { getAllPosts, calculateReadTime } = useBlog()



const posts = ref<BlogPost[]>([])
const pending = ref(false)
const page = ref(1)
const limit = 5
const total = ref(0)

const fetchPosts = async () => {
  pending.value = true
  try {
    const res = await $fetch('/api/blog/posts', {
      params: { page: page.value, limit }
    })
    if (res.success) {
      // Sumar posts nuevos
      posts.value = [...posts.value, ...(Array.isArray(res.data) ? res.data : [])]
      total.value = res.total || 0
      page.value = res.page || page.value
    }
  } catch (e) {
    // Manejo de error opcional
  }
  pending.value = false
  await nextTick()
  // Reactivar observer si hay más posts por cargar
  if (observer && sentinel.value && posts.value.length < total.value) {
    observer.observe(sentinel.value)
  }
}

onMounted(async () => {
  observer = new window.IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore()
    }
  }, { threshold: 1 })
  fetchPosts()
})
onUnmounted(() => {
  if (observer && sentinel.value) {
    observer.unobserve(sentinel.value)
  }
  window.removeEventListener('scroll', handleScroll)
})

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

const handleScroll = () => {
  if (pending.value) return
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    const scrollY = window.scrollY || window.pageYOffset
    const windowHeight = window.innerHeight
    const docHeight = document.documentElement.scrollHeight
    // Si el spinner de carga está visible en pantalla, cargar siguiente página
    const spinner = document.querySelector('.blog-loading-spinner')
    if (spinner) {
      const rect = spinner.getBoundingClientRect()
      if (rect.top < window.innerHeight && posts.value.length < total.value) {
        page.value++
        fetchPosts()
      }
    } else if (scrollY + windowHeight + 100 >= docHeight) {
      if (posts.value.length < total.value) {
        page.value++
        fetchPosts()
      }
    }
  }, 300)
}

const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const loadMore = () => {
  if (!pending.value && posts.value.length < total.value) {
    page.value++
    fetchPosts()
  } else if (observer && sentinel.value) {
    observer.unobserve(sentinel.value)
  }
}

const visiblePosts = computed(() => posts.value)

// Formatear fecha
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>