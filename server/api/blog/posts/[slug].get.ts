import type { BlogPost, BlogResponse } from '~/types/blog'

async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    // Leer desde único archivo blog.json
    const blogFile = './content/blog/blog.json'
    const fs = await import('fs')
    if (!fs.existsSync(blogFile)) {
      return []
    }
    const content = fs.readFileSync(blogFile, 'utf8')
    const posts: BlogPost[] = JSON.parse(content)
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
      data: post    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: 'Error loading blog post'
    }
  }
})