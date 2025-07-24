import type { BlogPost, BlogResponse } from '~/types/blog'
import blogData from '~/public/blog/blog.json'

async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts: BlogPost[] = blogData as BlogPost[]
    
    if (!Array.isArray(posts)) {
      console.warn('Blog data is not an array')
      return []
    }
    
    // Ordenar de más nuevo a más viejo
    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export default defineEventHandler(async (event): Promise<BlogResponse> => {
  const slug = getRouterParam(event, 'slug')

  try {
    const posts = await readBlogPosts()
    const post = posts.find(p => p.slug === slug)

    if (!post) {
      return {
        success: false,
        data: null,
        error: 'Post not found'
      }
    }

    return {
      success: true,
      data: post
    }
  } catch (error) {
    console.error('Error loading blog post:', error)
    return {
      success: false,
      data: null,
      error: 'Error loading blog post'
    }
  }
})