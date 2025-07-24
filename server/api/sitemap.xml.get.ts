import { useSEO } from "~/composables/useSEO"
export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/xml')
  
  try {
    const { generateRoutes, baseUrl } = useSEO()
    const routes = await generateRoutes()
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .filter(route => !route.noindex) // Excluir páginas con noindex
    .map(route => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    ${route.lastmod ? `<lastmod>${new Date(route.lastmod).toISOString()}</lastmod>` : ''}
    <changefreq>${route.changefreq || 'monthly'}</changefreq>
    <priority>${route.priority || '0.5'}</priority>
  </url>`).join('')}
</urlset>`

    return sitemap
  } catch (error) {
    console.error('Error generating sitemap:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating sitemap'
    })
  }
})