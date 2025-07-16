import  { BlogPost } from '~/types/blog'
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
export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/xml')
  
  try {
    const posts = await readBlogPosts()
    const baseUrl = 'https://tudominio.com' // Cambiar por tu dominio
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Página principal del blog -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Posts del blog -->
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`

    return sitemap
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating sitemap'
    })
  }
})
