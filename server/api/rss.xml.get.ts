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
  setHeader(event, 'Content-Type', 'application/rss+xml')
  
  try {
    const posts = await readBlogPosts()
    const baseUrl = 'https://tudominio.com' // Cambiar por tu dominio
    const siteName = 'Tu Blog'
    const siteDescription = 'Artículos sobre desarrollo, educación y tecnología'
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName}</title>
    <description>${siteDescription}</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/api/blog/rss.xml" rel="self" type="application/rss+xml" />
    <language>es-ES</language>
    <managingEditor>contact@tudominio.com (Tu Nombre)</managingEditor>
    <webMaster>contact@tudominio.com (Tu Nombre)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    
    ${posts.slice(0, 10).map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.introduction}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category><![CDATA[${post.keywords[0] || 'General'}]]></category>
      ${post.author ? `<author>contact@tudominio.com (${post.author})</author>` : ''}
    </item>`).join('')}
  </channel>
</rss>`

    return rss
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating RSS feed'
    })
  }
})
