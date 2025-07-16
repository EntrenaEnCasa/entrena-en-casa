import type { BlogPost, BlogResponse } from '~/types/blog'

export const useBlog = () => {
  // Función para obtener todos los posts
  const getAllPosts = async (): Promise<BlogPost[]> => {
    try {
      // Opción 1: Desde archivos JSON
      const { data } = await $fetch<BlogResponse>('/api/blog/posts')
      return Array.isArray(data) ? data : []
    } catch (error) {
      console.error('Error loading blog posts:', error)
      return []
    }
  }

  // Función para obtener un post específico
  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      const response = await $fetch<BlogResponse>(`/api/blog/posts/${slug}`)
      return (response.data && !Array.isArray(response.data)) ? response.data : null
    } catch (error) {
      console.error('Error loading blog post:', error)
      return null
    }
  }

  // Función para obtener posts recientes
  const getRecentPosts = async (limit: number = 3): Promise<BlogPost[]> => {
    const posts = await getAllPosts()
    return posts
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit)
  }

  // Función para generar slug desde título
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  // Función para calcular tiempo de lectura
  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  // Función para generar metadata SEO
  const generateSEOMeta = (post: BlogPost) => {
    const description = post.introduction.substring(0, 160)
    
    return {
      title: post.title,
      meta: [
        { name: 'description', content: description },
        { name: 'keywords', content: post.keywords.join(', ') },
        { name: 'author', content: post.author || 'Tu Blog' },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: post.images[0]?.src || '/default-blog-image.jpg' },
        { property: 'article:published_time', content: post.publishedAt },
        { property: 'article:author', content: post.author || 'Tu Blog' },
        { property: 'article:tag', content: post.keywords.join(', ') },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: post.title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: post.images[0]?.src || '/default-blog-image.jpg' }
      ]
    }
  }

  return {
    getAllPosts,
    getPostBySlug,
    getRecentPosts,
    generateSlug,
    calculateReadTime,
    generateSEOMeta
  }
}