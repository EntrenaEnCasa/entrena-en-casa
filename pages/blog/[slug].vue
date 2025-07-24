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
        <div class="grid grid-cols-1 gap-8">
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

            <!-- Post Content -->
            <article class="prose prose-lg max-w-none">
              <!-- Introduction -->
              <div class="mb-8">
                <div 
                  v-html="renderedIntroduction"
                  class="markdown-content"
                ></div>
              </div>

              <!-- Primera imagen (después de introducción) -->
              <div v-if="post.images && post.images[0]" class="mb-8">
                <NuxtImg
                  :src="post.images[0].src"
                  :alt="post.images[0].alt"
                  class="w-auto h-[80vh] mx-auto object-cover rounded-lg shadow-lg"
                />
                <p v-if="post.images[0].caption" class="text-center text-sm text-gray-600 mt-2">
                  {{ post.images[0].caption }}
                </p>
              </div>

              <!-- Contenido principal en markdown -->
              <div class="markdown-content mb-8">
                <div v-html="renderedContent || 'Cargando contenido...'"></div>
              </div>

              <!-- Segunda imagen (después del contenido) -->
              <div v-if="post.images && post.images[1]" class="mb-8">
                <NuxtImg
                  :src="post.images[1].src"
                  :alt="post.images[1].alt"
                  class="w-auto h-[80vh] mx-auto object-cover rounded-lg shadow-lg"
                />
                <p v-if="post.images[1].caption" class="text-center text-sm text-gray-600 mt-2">
                  {{ post.images[1].caption }}
                </p>
              </div>

              <!-- Conclusión -->
              <div class="mt-12 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                <div 
                  v-html="renderedConclusion"
                  class="markdown-content text-center text-gray-600"
                ></div>
                
                <!-- Tercera imagen (después de conclusión) -->
                <div v-if="post.images && post.images[2]" class="mt-6">
                  <NuxtImg
                    :src="post.images[2].src"
                    :alt="post.images[2].alt"
                    class="w-auto h-[80vh] mx-auto object-cover rounded-lg"
                  />
                  <p v-if="post.images[2].caption" class="text-center text-sm text-gray-600 mt-2">
                    {{ post.images[2].caption }}
                  </p>
                </div>
              </div>
            </article>

            <!-- CTA Components -->
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
            <div class="mt-8 p-4 rounded-lg">
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
                  :image="post.images && post.images[0] ? post.images[0].src : undefined"
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
import { useBlog } from '~/composables/useBlog'

const route = useRoute()
const { getPostBySlug, getAllPosts, calculateReadTime, renderMarkdown } = useBlog()

// Obtener el post
const { data: post } = await useAsyncData(`blog/${route.params.slug}`, () =>
  getPostBySlug(route.params.slug as string)
)

// Posts relacionados optimizados
const { data: allPosts } = await useLazyAsyncData('all-posts', () => getAllPosts())

// Variables reactivas para contenido renderizado
const renderedIntroduction = ref('')
const renderedContent = ref('')
const renderedConclusion = ref('')

// Renderizar markdown de forma asíncrona cuando el post cambie
watch(post, async (newPost) => {
  if (newPost) {
    try {
      // Renderizar cada sección por separado
      renderedIntroduction.value = await renderMarkdown(newPost.introduction || '')
      renderedContent.value = await renderMarkdown(newPost.content || '')
      renderedConclusion.value = await renderMarkdown(newPost.conclusion || '')
    } catch (error) {
      console.error('Error rendering markdown:', error)
      // Fallback al contenido original
      renderedIntroduction.value = newPost.introduction || ''
      renderedContent.value = newPost.content || ''
      renderedConclusion.value = newPost.conclusion || ''
    }
  }
}, { immediate: true })

const relatedPosts = computed(() => {
  if (!post.value || !allPosts.value) return []

  const currentCategories = post.value.category ?? []
  const currentId = post.value.id

  let candidates = allPosts.value
    .filter(p => p.id !== currentId)
    .filter(p => Array.isArray(p.category) && p.category.some(cat => currentCategories.includes(cat)))

  if (candidates.length < 3) {
    const others = allPosts.value
      .filter(p => p.id !== currentId && !candidates.includes(p))
      .sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })
      .slice(0, 3 - candidates.length)
    candidates = candidates.concat(others)
  }

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
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Estilos para el contenido markdown */
.markdown-content {
  @apply text-gray-700 leading-relaxed;
}

.markdown-content h1, 
.markdown-content h2, 
.markdown-content h3, 
.markdown-content h4, 
.markdown-content h5, 
.markdown-content h6 {
  @apply font-bold text-gray-900;
}

.markdown-content ul, 
.markdown-content ol {
  @apply mb-4;
}

.markdown-content li {
  @apply mb-1;
}

.markdown-content blockquote {
  @apply border-l-4 border-cyan-500 pl-4 py-2 my-4 bg-gray-50 italic text-gray-700;
}

.markdown-content pre {
  @apply overflow-x-auto;
}

.markdown-content table {
  @apply w-full border-collapse border border-gray-300 my-4;
}

.markdown-content th,
.markdown-content td {
  @apply border border-gray-300 px-4 py-2;
}

.markdown-content th {
  @apply bg-gray-100 font-semibold;
}

.markdown-content p {
  @apply mb-4;
}

.markdown-content strong {
  @apply font-semibold;
}

.markdown-content em {
  @apply italic;
}
</style>