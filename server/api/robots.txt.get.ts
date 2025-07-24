import { useSEO } from '~/composables/useSEO'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/rss+xml')
  
  try {
    const { readBlogPosts, baseUrl, siteName, siteDescription } = useSEO()
    const posts = await readBlogPosts()
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName} - Blog</title>
    <description>${siteDescription}</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/api/rss.xml" rel="self" type="application/rss+xml" />
    <language>es-ES</language>
    <managingEditor>contact@entrenaencasa.com (Entrena en Casa)</managingEditor>
    <webMaster>contact@entrenaencasa.com (Entrena en Casa)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Nuxt 3</generator>
    
    ${posts.slice(0, 20).map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.introduction}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category><![CDATA[${post.keywords?.[0] || 'Fitness'}]]></category>
      ${post.author ? `<author>contact@entrenaencasa.com (${post.author})</author>` : ''}
      ${post.images?.[0] ? `<enclosure url="${baseUrl}${post.images[0].src}" type="image/jpeg" />` : ''}
    </item>`).join('')}
  </channel>
</rss>`

    return rss
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating RSS feed'
    })
  }
})