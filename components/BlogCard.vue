<template>
  <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
    <NuxtLink :to="`/blog/${post.slug}`" class="block">
      <!-- Imagen -->
      <div class="relative overflow-hidden">
        <NuxtImg
          v-if="post.images[0]"
          :src="post.images[0].src"
          :alt="post.images[0].alt"
          class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div v-else class="w-full h-48 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
          <Icon name="heroicons:document-text-20-solid" class="h-16 w-16 text-white opacity-50" />
        </div>
        
        <!-- Badge de categoría -->
        <div class="absolute top-4 left-4">
          <span class="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {{ post.keywords[0] }}
          </span>
        </div>
      </div>

      <!-- Contenido -->
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {{ post.title }}
        </h2>
        
        <p class="text-gray-600 mb-4 line-clamp-3">
          {{ post.introduction }}
        </p>
        
        <!-- Metadata -->
        <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:calendar-days-20-solid" class="h-4 w-4" />
            <span>{{ formatDate(post.publishedAt) }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:clock-20-solid" class="h-4 w-4" />
            <span>{{ post.readTime || calculateReadTime(post.content) }} min</span>
          </div>
        </div>
        
        <!-- Keywords -->
        <div class="flex flex-wrap gap-1">
          <span
            v-for="keyword in post.keywords.slice(0, 3)"
            :key="keyword"
            class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {{ keyword }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
import { useBlog } from '~/composables/useBlog'
const props = defineProps<{
  post: BlogPost
}>()

const { calculateReadTime } = useBlog()

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