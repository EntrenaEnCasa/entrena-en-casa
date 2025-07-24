import type { BlogPost, BlogResponse } from '~/types/blog'
import path from 'path'

export default defineEventHandler(async (event): Promise<BlogResponse> => {
    try {
        const query = getQuery(event)
        const page = Number(query.page) || 1
        const limit = 5

        const { posts, total } = await readBlogPosts(page, limit)
        return {
            success: true,
            data: posts,
            total,
            page,
        }
    } catch (error) {
        return {
            success: false,
            error: 'Error loading blog posts'
        }
    }
})

async function readBlogPosts(page: number, limit: number): Promise<{ posts: BlogPost[], total: number }> {
  try {
    const fs = await import('fs')
    let blogFile: string
    let content: string
    
    // Intentar múltiples rutas
    const possiblePaths = [
      path.join(process.cwd(), '.output/public', 'blog/blog.json'), // Vercel producción
      path.join(process.cwd(), 'public', 'blog/blog.json'),         // Local con public
      path.join(process.cwd(), 'content', 'blog/blog.json')         // Original
    ]
    
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        blogFile = filePath
        break
      }
    }
    
    if (!blogFile!) {
      console.warn('Blog file not found in any of the expected locations')
      return { posts: [], total: 0 }
    }
    
    content = fs.readFileSync(blogFile, 'utf8')
    const posts: BlogPost[] = JSON.parse(content)
    
    const sortedPosts = posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    const total = sortedPosts.length
    const start = (page - 1) * limit
    const end = start + limit
    const pagePosts = sortedPosts.slice(start, end)
    
    return { posts: pagePosts, total }
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return { posts: [], total: 0 }
  }
}