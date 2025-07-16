<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Header del Blog -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
      <p class="text-xl text-gray-600">Descubre artículos, tutoriales y noticias</p>
    </div>

    <!-- Grid de Posts -->
    <div v-if="posts && posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="post in posts"
        :key="post.id"
        class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      >
        <NuxtLink :to="`/blog/${post.slug}`">
          <NuxtImg
            v-if="post.images[0]"
            :src="post.images[0].src"
            :alt="post.images[0].alt"
            class="w-full h-48 object-cover"
          />
          
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {{ post.title }}
            </h2>
            
            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ post.introduction }}
            </p>
            
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>{{ formatDate(post.publishedAt) }}</span>
              <span>{{ post.readTime || calculateReadTime(post.content) }} min lectura</span>
            </div>
            
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="keyword in post.keywords.slice(0, 3)"
                :key="keyword"
                class="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
              >
                {{ keyword }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>

    <!-- Estado de carga -->
    <div v-else-if="pending" class="text-center py-12">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Cargando posts...</p>
    </div>

    <!-- Estado sin posts -->
    <div v-else class="text-center py-12">
      <p class="text-gray-600">No hay posts disponibles</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useBlog} from '~/composables/useBlog'
const { getAllPosts, calculateReadTime } = useBlog()

// SEO Meta
useSeoMeta({
  title: 'Blog - Artículos y Tutoriales',
  description: 'Descubre artículos, tutoriales y noticias sobre educación y tecnología',
  ogTitle: 'Blog - Artículos y Tutoriales',
  ogDescription: 'Descubre artículos, tutoriales y noticias sobre educación y tecnología',
  ogImage: '/blog-og-image.jpg',
  twitterCard: 'summary_large_image'
})

// Cargar posts
const { data: posts, pending } = await useLazyAsyncData('blog-posts', () => getAllPosts())

// Formatear fecha
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
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
