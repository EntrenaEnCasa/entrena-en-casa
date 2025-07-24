import type { BlogPost, BlogResponse } from '~/types/blog'
import blogData from '~/public/blog/blog.json'

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
    const posts: BlogPost[] = blogData as BlogPost[]
    
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    
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