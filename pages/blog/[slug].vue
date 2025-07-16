
<template>
  <div v-if="post" class="max-w-4xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="mb-8">
      <ol class="flex items-center space-x-2 text-sm text-gray-600">
        <li><NuxtLink to="/" class="hover:text-primary-600">Inicio</NuxtLink></li>
        <li>/</li>
        <li><NuxtLink to="/blog" class="hover:text-primary-600">Blog</NuxtLink></li>
        <li>/</li>
        <li class="text-gray-900">{{ post.title }}</li>
      </ol>
    </nav>

    <!-- Header del Post -->
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ post.title }}</h1>
      
      <div class="flex items-center space-x-4 text-sm text-gray-600 mb-6">
        <span>{{ formatDate(post.publishedAt) }}</span>
        <span>•</span>
        <span>{{ post.readTime || calculateReadTime(post.content) }} min lectura</span>
        <span v-if="post.author">•</span>
        <span v-if="post.author">{{ post.author }}</span>
      </div>
      
      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="keyword in post.keywords"
          :key="keyword"
          class="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
        >
          {{ keyword }}
        </span>
      </div>
    </header>

    <!-- Imagen principal -->
    <div v-if="getImageByPosition('intro')" class="mb-8">
      <NuxtImg
        :src="getImageByPosition('intro')!.src"
        :alt="getImageByPosition('intro')!.alt"
        class="w-full h-64 md:h-96 object-cover rounded-lg"
      />
      <p v-if="getImageByPosition('intro')!.caption" class="text-center text-sm text-gray-600 mt-2">
        {{ getImageByPosition('intro')!.caption }}
      </p>
    </div>

    <!-- Contenido del Post -->
    <article class="prose prose-lg max-w-none">
      <!-- Introducción -->
      <div class="mb-8">
        <p class="text-xl text-gray-700 leading-relaxed">{{ post.introduction }}</p>
      </div>

      <!-- Subtítulos y Contenido -->
      <div class="space-y-8">
        <div v-for="(subtitle, index) in post.subtitles" :key="index">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ subtitle }}</h2>
          
          <!-- Imagen en contenido -->
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
          
          <!-- Contenido del subtítulo -->
          <div v-html="formatContent(post.content, index)" class="text-gray-700 leading-relaxed"></div>
        </div>
      </div>

      <!-- Imagen final -->
      <div v-if="getImageByPosition('conclusion')" class="my-8">
        <NuxtImg
          :src="getImageByPosition('conclusion')!.src"
          :alt="getImageByPosition('conclusion')!.alt"
          class="w-full h-64 object-cover rounded-lg"
        />
        <p v-if="getImageByPosition('conclusion')!.caption" class="text-center text-sm text-gray-600 mt-2">
          {{ getImageByPosition('conclusion')!.caption }}
        </p>
      </div>

      <!-- Conclusión -->
      <div class="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Conclusión</h2>
        <p class="text-gray-700 leading-relaxed">{{ post.conclusion }}</p>
      </div>
    </article>

    <!-- CTA -->
    <div class="mt-12">
      <div v-show="post.cta.type === 'contact'">
        <CtaContactForm
          :title="post.cta.title"
          :description="post.cta.description"></CtaContactForm>
      </div>
        <div v-show="post.cta.type === 'website'">
            <CtaWebsiteLink
            :title="post.cta.title"
            :description="post.cta.description"
            :url="post.cta.data?.url || '/'"></CtaWebsiteLink>
        </div>
        <div v-show="post.cta.type === 'register'">
            <CtaRegisterPlatform
            :title="post.cta.title"
            :description="post.cta.description"
            :user-type="post.cta.data?.userType"></CtaRegisterPlatform>
        </div>
        <div v-show="post.cta.type === 'sales'">
            <CtaSalesWhatsApp
            :title="post.cta.title"
            :description="post.cta.description"
          ></CtaSalesWhatsApp>
        </div>
        <div v-show="post.cta.type === 'newsletter'">
            <CtaNewsletter
            :title="post.cta.title"
            :description="post.cta.description"></CtaNewsletter>

        </div>

    <!-- Posts relacionados -->
    <div v-if="relatedPosts.length > 0" class="mt-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Posts Relacionados</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="relatedPost in relatedPosts"
          :key="relatedPost.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <NuxtLink :to="`/blog/${relatedPost.slug}`">
            <NuxtImg
              v-if="relatedPost.images[0]"
              :src="relatedPost.images[0].src"
              :alt="relatedPost.images[0].alt"
              class="w-full h-32 object-cover"
            />
            <div class="p-4">
              <h3 class="font-bold text-gray-900 mb-2 line-clamp-2">{{ relatedPost.title }}</h3>
              <p class="text-sm text-gray-600">{{ formatDate(relatedPost.publishedAt) }}</p>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </div>
  </div>
  <!-- 404 si no existe el post -->
  <div v-else class="max-w-4xl mx-auto px-4 py-8 text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Post no encontrado</h1>
    <p class="text-gray-600 mb-8">El post que buscas no existe o ha sido eliminado.</p>
    <NuxtLink to="/blog" class="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors">
      Volver al Blog
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
import { useBlog } from '~/composables/useBlog'


const route = useRoute()
const { getPostBySlug, getAllPosts, calculateReadTime, generateSEOMeta } = useBlog()

// Obtener el post
const { data: post } = useAsyncData(`blog-${route.params.slug}`, () =>
  getPostBySlug(route.params.slug as string)
)

// Posts relacionados
const { data: allPosts } = await useLazyAsyncData('all-posts', () => getAllPosts())
const relatedPosts = computed(() => {
  if (!post.value || !allPosts.value) return []
  
  return allPosts.value
    .filter(p => p.id !== post.value!.id)
    .filter(p => p.keywords.some(k => post.value!.keywords.includes(k)))
    .slice(0, 3)
})

// SEO Meta
watchEffect(() => {
  if (post.value) {
    const seoMeta = generateSEOMeta(post.value)
    useSeoMeta(seoMeta)
  }
})

// 404 si no existe el post
if (!post.value) {
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
  if (!post.value) return null
  
  const images = post.value.images.filter(img => img.position === position)
  if (index !== undefined) {
    return images[index] || null
  }
  return images[0] || null
}

const formatContent = (content: string, subtitleIndex: number) => {
  // Dividir el contenido en párrafos basado en los subtítulos
  const paragraphs = content.split('\n\n')
  const paragraphsPerSubtitle = Math.ceil(paragraphs.length / post.value!.subtitles.length)
  
  const startIndex = subtitleIndex * paragraphsPerSubtitle
  const endIndex = startIndex + paragraphsPerSubtitle
  
  return paragraphs.slice(startIndex, endIndex).join('</p><p>')
    .replace(/\n/g, '<br>')
}

const getCtaComponent = () => {
  if (!post.value) return null
  
  const ctaComponents = {
    contact: 'CtaContactForm',
    website: 'CtaWebsiteLink',
    register: 'CtaRegisterPlatform',
    sales: 'CtaSalesWhatsApp',
    newsletter: 'CtaNewsletter'
  }
  
  return ctaComponents[post.value.cta.type] || null
}

const getCtaProps = () => {
  if (!post.value) return {}
  
  const { cta } = post.value
  const baseProps = {
    title: cta.title,
    description: cta.description
  }
  
  switch (cta.type) {
    case 'website':
      return { ...baseProps, url: cta.data?.url || '/' }
    case 'sales':
      return { ...baseProps, phone: cta.data?.phone || '' }
    case 'register':
      return { ...baseProps, userType: cta.data?.userType }
    default:
      return baseProps
  }
}
</script>