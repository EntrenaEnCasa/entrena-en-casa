export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'text/plain')
  
  const baseUrl = 'https://tudominio.com' // Cambiar por tu dominio
  
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/api/blog/sitemap.xml

# Disallow admin pages
Disallow: /admin/
Disallow: /api/
Disallow: /_nuxt/

# Allow blog
Allow: /blog/
Allow: /blog/*`

  return robots
})
