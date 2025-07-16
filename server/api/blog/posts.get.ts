import type { BlogPost, BlogResponse } from '~/types/blog'
export default defineEventHandler(async (event): Promise<BlogResponse> => {
    try {
        const posts: BlogPost[] = await readBlogPosts()
        return {
            success: true,
            data: posts
        }
    } catch (error) {
        return {
            success: false,
            error: 'Error loading blog posts'
        }
    }
})

async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    // Leer desde directorio de posts JSON
    const postsDir = './content/blog/'
    const fs = await import('fs')
    const path = await import('path')
    
    if (!fs.existsSync(postsDir)) {
      return []
    }
    
    const files = fs.readdirSync(postsDir)
    const posts: BlogPost[] = []
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(postsDir, file)
        const content = fs.readFileSync(filePath, 'utf8')
        const post = JSON.parse(content) as BlogPost
        posts.push(post)
      }
    }
    
    return posts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}
