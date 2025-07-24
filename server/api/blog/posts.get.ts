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
    let blogFile = "";
    if (process.env.NODE_ENV === 'production') {
      blogFile = 'blog/blog.json';
    }
    else {
      blogFile = 'content/blog/blog.json';
    }
    const fs = await import('fs')
    
    if (!fs.existsSync(blogFile)) {
      console.warn('Blog file does not exist:', blogFile)
      return { posts: [], total: 0 }
    }
    
    const content = fs.readFileSync(blogFile, 'utf8')
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