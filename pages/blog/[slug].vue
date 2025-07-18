<template>
  <div>

    <div v-if="post" class="bg-gradiente min-h-screen">
      <!-- Breadcrumb -->
      <div class="max-w-6xl mx-auto px-4 pt-6">
        <nav class="mb-6">
          <ol class="flex items-center space-x-2 text-sm text-gray-500">
            <li><NuxtLink to="/" class="hover:text-blue-600">Inicio</NuxtLink></li>
            <li>></li>
            <li><NuxtLink to="/blog" class="hover:text-blue-600">Blog</NuxtLink></li>
            <li>></li>
            <li class="text-gray-700">{{ post.title }}</li>
          </ol>
        </nav>
      </div>

      <!-- Main Content -->
      <div class="max-w-6xl mx-auto px-4 pb-12">
        <div class="grid grid-cols-1  gap-8">
          <!-- Left Content -->
          <div class="">
            <!-- Post Header -->
            <div class="mb-8">
              <!-- Categories/Tags -->
            <div class="flex gap-2 mb-3">
              <span v-for="(category, index) in post.category" :key="index" class="px-3 py-1 bg-secondary-500 text-white text-xs font-medium rounded-full">
                {{ category}}
              </span>
            </div>
              
              <!-- Title -->
              <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {{ post.title }}
              </h1>
              
              <!-- Meta Info -->
              <div class="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <span class="flex items-center">
                  <Icon name="i-heroicons-calendar-days-solid" class="w-4 h-4 mr-1" />
                  {{ formatDate(post.publishedAt) }}
                </span>
                <span class="flex items-center">
                  <Icon name="i-heroicons-clock" class="w-4 h-4 mr-1" />
                  {{ post.readTime || calculateReadTime(post.content) }} minutos de lectura
                </span>
              </div>
            </div>

            <!-- Featured Image -->
            <div v-if="getImageByPosition('intro')" class="mb-8">
              <NuxtImg
                :src="getImageByPosition('intro')!.src"
                :alt="getImageByPosition('intro')!.alt"
                class="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
              />
                <p v-if="getImageByPosition('intro')!.caption" class="text-center text-sm text-gray-600 mt-2">
                  {{ getImageByPosition('intro')!.caption }}
                </p>
            </div>

            <!-- Post Content -->
            <article class="prose prose-lg max-w-none">
              <!-- Introduction -->
              <div class="mb-8">
                <p class=" text-gray-700 leading-relaxed">
                  {{ post.introduction }}
                </p>
              </div>

              <!-- Content Sections -->
              <div class="space-y-8">
                <div v-for="(subtitle, index) in post.subtitles" :key="index">
                  <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ subtitle }}</h2>
                  
                  <!-- Section Image -->
                  <div v-if="getImageByPosition('content', index)" class="mb-6">
                    <NuxtImg
                      :src="getImageByPosition('content', index)!.src"
                      :alt="getImageByPosition('content', index)!.alt"
                      class="w-full h-64 object-cover rounded-lg"
                    />
                    <p v-if="getImageByPosition('content', index)!.caption" class="text-center text-sm text-gray-600 mt-2">
                      {{ getImageByPosition('content', index)!.caption }}
                    </p>
                  </div>
                  
                  <!-- Section Content -->
                  <div 
                    v-html="formatContent(post.content, index)" 
                    class="text-gray-700 leading-relaxed mb-6"
                  ></div>
                </div>
              </div>

              <!-- Final Image -->
              <div  class="mt-12 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                <NuxtImg v-if="getImageByPosition('conclusion')"
                  :src="getImageByPosition('conclusion')!.src"
                  :alt="getImageByPosition('conclusion')!.alt"
                  class="w-full h-64 object-cover rounded-lg"
                />
                <p  class="text-center text-gray-600 mt-2">
                  {{ post.conclusion}}
                </p>
              </div>


      
            </article>

            <!-- CTA Components (mantiene la lógica original) -->
            <div class="mt-12">
              <div v-show="post.cta.type === 'contact'">
                <CtaContactForm
                  :title="post.cta.title"
                  :description="post.cta.description"
                />
              </div>
              <div v-show="post.cta.type === 'website'">
                <CtaWebsiteLink
                  :title="post.cta.title"
                  :description="post.cta.description"
                  :url="post.cta.data?.url || '/'"
                />
              </div>
              <div v-show="post.cta.type === 'register'">
                <CtaRegisterPlatform
                  :title="post.cta.title"
                  :description="post.cta.description"
                  :user-type="post.cta.data?.userType"
                />
              </div>
              <div v-show="post.cta.type === 'sales'">
                <CtaSalesWhatsApp
                  :title="post.cta.title"
                  :description="post.cta.description"
                />
              </div>
              <div v-show="post.cta.type === 'newsletter'">
                <CtaNewsletter
                  :title="post.cta.title"
                  :description="post.cta.description"
                />
              </div>
            </div>

            <!-- Keywords Section -->
            <div class="mt-8 p-4  rounded-lg">
              <p class="text-sm text-gray-600">
                <span class="font-medium">Palabras Clave:</span>
                <span v-for="(keyword, index) in post.keywords" :key="keyword">
                  {{ keyword }}<span v-if="index < post.keywords.length - 1">, </span>
                </span>
              </p>
            </div>

            <!-- Social Share -->
            <div class="mt-6 w-full flex items-center justify-center space-x-4">
              <div class="mt-6">
                <SocialShare
                  :title="post.title"
                  :description="post.introduction"
                  :image="getImageByPosition('intro')?.src"
                />
              </div>
            </div>
          </div>

          <div class="">
            <!-- Related Posts Section -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <h3 class="text-lg font-bold text-gray-900 flex justify-center mb-6">Post Relacionados</h3>
              
              <div v-if="relatedPosts.length > 0" class="space-y-6">
                <article
                  v-for="relatedPost in relatedPosts"
                  :key="relatedPost.id"
                  class="group cursor-pointer"
                >
                  <NuxtLink :to="`/blog/${relatedPost.slug}`">
                    <div class="flex space-x-4">
                      <NuxtImg
                        v-if="relatedPost.images[0]"
                        :src="relatedPost.images[0].src"
                        :alt="relatedPost.images[0].alt"
                        class="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div class="flex-1">
                        <h4 class="font-medium text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-2 text-sm mb-2">
                          {{ relatedPost.title }}
                        </h4>
                        <p class="text-xs text-gray-500">{{ formatDate(relatedPost.publishedAt) }}</p>
                      </div>
                    </div>
                  </NuxtLink>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 404 si no existe el post -->
    <div v-else class="max-w-4xl mx-auto px-4 py-8 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Post no encontrado</h1>
      <p class="text-gray-600 mb-8">El post que buscas no existe o ha sido eliminado.</p>
      <NuxtLink to="/blog" class="bg-cyan-500 text-white px-6 py-3 rounded-md hover:bg-cyan-600 transition-colors">
        Volver al Blog
      </NuxtLink>
    </div>

  </div>
</template>

<script setup lang="ts">
// import type { BlogPost } from '~/types/blog'
import { useBlog } from '~/composables/useBlog'

const route = useRoute()
const { getPostBySlug, getAllPosts, calculateReadTime } = useBlog()

// Obtener el post
const { data: post } = await useAsyncData(`blog/${route.params.slug}`, () =>
  getPostBySlug(route.params.slug as string)
)

// Posts relacionados optimizados
const { data: allPosts } = await useLazyAsyncData('all-posts', () => getAllPosts())

const relatedPosts = computed(() => {
  if (!post.value || !allPosts.value) return []

  // Prioridad: mismos tags/categorías, luego fecha cercana, luego popularidad (si existe)
  const currentCategories = post.value.category ?? []
  const currentId = post.value.id

  // Filtrar por categoría y excluir el actual
  let candidates = allPosts.value
    .filter(p => p.id !== currentId)
    .filter(p => Array.isArray(p.category) && p.category.some(cat => currentCategories.includes(cat)))

  // Si hay menos de 3, rellenar con otros posts (sin repetir)
  if (candidates.length < 3) {
    const others = allPosts.value
      .filter(p => p.id !== currentId && !candidates.includes(p))
      .sort((a, b) => {
        // Más reciente primero
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })
      .slice(0, 3 - candidates.length)
    candidates = candidates.concat(others)
  }

  // Limitar a 3
  return candidates.slice(0, 3)
})

// 404 si no existe el post
if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post no encontrado'
  })
}

// Funciones auxiliares
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getImageByPosition = (position: string, index?: number) => {
  if (!post.value || !post.value.images) return null
  
  const images = post.value.images.filter(img => img.position === position)
  if (index !== undefined) {
    return images[index] || null
  }
  return images[0] || null
}

const formatContent = (content: string, subtitleIndex: number) => {
  // Dividir el contenido en párrafos basado en los subtítulos
  const paragraphs = content.split('\n')
  const paragraphsPerSubtitle = Math.ceil(paragraphs.length / (post.value?.subtitles?.length || 1))
  
  const startIndex = subtitleIndex * paragraphsPerSubtitle
  const endIndex = startIndex + paragraphsPerSubtitle
  
  return paragraphs.slice(startIndex, endIndex).join('</p><p>')
    .replace(/\n/g, '<br>')
}


</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1rem;
}

.prose h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
</style>