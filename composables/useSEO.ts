import type { BlogPost } from '~/types/blog'
import type { Plan } from '~/types/models/plan'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_status' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other'
  author?: string
  publishedAt?: string
  modifiedAt?: string
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface PageRoute {
  path: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  title?: string
  description?: string
  noindex?: boolean
}

export const useSEO = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl || 'http://localhost:3000'
  const siteName = 'Entrena en'
  const siteDescription = config.public.siteDescription || 'Descripción de tu empresa'

  // Configuración SEO básica para cualquier página
  const setSEO = (options: SEOConfig) => {
    const route = useRoute()
    const fullUrl = `${baseUrl}${options.canonical || route.path}`
    
    const robotsContent = [
      options.noindex ? 'noindex' : 'index',
      options.nofollow ? 'nofollow' : 'follow'
    ].join(', ')

    useSeoMeta({
      title: options.title,
      description: options.description,
      keywords: options.keywords?.join(', '),
      author: options.author,
      robots: robotsContent,
      
      // Open Graph
      ogTitle: options.title,
      ogDescription: options.description,
      ogImage: options.image || '/images/default-og.jpg',
      ogUrl: fullUrl,
      ogType: options.type || 'website',
      ogSiteName: siteName,
      
      // Twitter Card
      twitterCard: 'summary_large_image',
      twitterTitle: options.title,
      twitterDescription: options.description,
      twitterImage: options.image || '/images/default-twitter.jpg',
      twitterSite: '@tuempresa', // Tu handle de Twitter

      
      // Artículos específicos
      ...(options.type === 'article' && {
        articleAuthor: options.author ? [options.author] : undefined,
        articlePublishedTime: options.publishedAt,
        articleModifiedTime: options.modifiedAt,
        articleSection: 'Blog',
        articleTag: options.keywords
      })
    })
  }

  // Generar datos estructurados para diferentes tipos de contenido
  const generateStructuredData = (type: string, data: any) => {
    const schemas: Record<string, (data?: any) => any> = {
      organization: () => ({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: siteDescription,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: data.phone || '',
          contactType: 'customer service',
          areaServed: data.areaServed || 'CL'
        },
        address: data.address ? {
          '@type': 'PostalAddress',
          streetAddress: data.address.street,
          addressLocality: data.address.city,
          addressRegion: data.address.region,
          postalCode: data.address.postalCode,
          addressCountry: data.address.country || 'CL'
        } : undefined,
        sameAs: data.socialLinks || []
      }),

      website: () => ({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        description: siteDescription,
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/buscar?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }),

      service: () => ({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data.title,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: siteName
        },
        areaServed: data.areaServed || 'CL',
        serviceType: data.serviceType || 'Educational Service',
        url: `${baseUrl}${data.path || ''}`,
        offers: data.offers ? {
          '@type': 'Offer',
          price: data.offers.price,
          priceCurrency: data.offers.currency || 'CLP',
          availability: 'https://schema.org/InStock'
        } : undefined
      }),

      course: () => ({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: data.title,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: siteName
        },
        educationalLevel: data.level || 'Beginner',
        courseMode: data.mode || 'Online',
        url: `${baseUrl}${data.path || ''}`,
        offers: data.offers ? {
          '@type': 'Offer',
          price: data.offers.price,
          priceCurrency: data.offers.currency || 'CLP'
        } : undefined
      }),

      blogPost: (post: BlogPost) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.introduction,
        image: post.images?.map(img => `${baseUrl}${img.src}`) || [],
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          '@type': 'Person',
          name: post.author || siteName
        },
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/blog/${post.slug}`
        },
        keywords: post.keywords?.join(', '),
        wordCount: post.content?.split(' ').length || 0,
        timeRequired: `PT${post.readTime || 5}M`
      }),

      breadcrumb: (items: BreadcrumbItem[]) => ({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`
        }))
      }),

      faq: (faqs: Array<{question: string, answer: string}>) => ({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }),

      localBusiness: () => ({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: siteName,
        description: siteDescription,
        url: baseUrl,
        telephone: data.phone,
        address: data.address ? {
          '@type': 'PostalAddress',
          streetAddress: data.address.street,
          addressLocality: data.address.city,
          addressRegion: data.address.region,
          addressCountry: data.address.country || 'CL'
        } : undefined,
        geo: data.coordinates ? {
          '@type': 'GeoCoordinates',
          latitude: data.coordinates.lat,
          longitude: data.coordinates.lng
        } : undefined,
        openingHours: data.hours || [],
        priceRange: data.priceRange || '$'
      })
    }

    return schemas[type]?.() || {}
  }

  // Generar rutas automáticamente desde el sistema de archivos
  const generateRoutes = async (): Promise<PageRoute[]> => {
    const routes: PageRoute[] = []
    
    // Rutas estáticas principales
    const staticRoutes: PageRoute[] = [
      { path: '/', title: 'Inicio - Entrena en Casa', description: 'Plataforma de entrenamiento personalizado', changefreq: 'weekly' as const, priority: 1.0 },
      { path: '/about-us', title: 'Sobre Nosotros', description: 'Conoce nuestro equipo', changefreq: 'monthly' as const, priority: 0.8 },
      { path: '/plans', title: 'Planes de Entrenamiento', description: 'Descubre nuestros planes', changefreq: 'weekly' as const, priority: 0.9 },
      { path: '/blog', title: 'Blog - Entrena en Casa', description: 'Artículos sobre fitness y salud', changefreq: 'daily' as const, priority: 0.8 },
      // { path: '/gift', title: 'Regala Entrenamiento', description: 'Regala salud y bienestar', changefreq: 'monthly' as const, priority: 0.7 },
      
      // Rutas de autenticación (con menor prioridad)
      { path: '/user/auth/login', title: 'Iniciar Sesión', description: 'Accede a tu cuenta', changefreq: 'yearly' as const, priority: 0.3, noindex: true },
      { path: '/user/auth/register', title: 'Registrarse', description: 'Crea tu cuenta', changefreq: 'yearly' as const, priority: 0.3, noindex: true },
      { path: '/professional/auth/login', title: 'Profesionales - Iniciar Sesión', changefreq: 'yearly' as const, priority: 0.2, noindex: true },
      { path: '/professional/auth/register', title: 'Profesionales - Registro', changefreq: 'yearly' as const, priority: 0.2, noindex: true },

      //Rutas de dashboard usuario relevantes
      { path: '/user/dashboard/home', title: 'Dashboard Usuario', description: 'Panel de control del usuario', changefreq: 'yearly' as const, priority: 0.6 },
      { path: '/user/dashboard/credits', title: 'Créditos del Usuario', description: 'Compra tus planes de entrenamiento', changefreq: 'yearly' as const, priority: 0.5 },
      { path: '/user/dashboard/schedule', title: 'Agendar Sesión', description: 'Agenda tus sesiones de entrenamiento', changefreq: 'yearly' as const, priority: 0.6 },
      { path: '/user/dashboard/sessions', title: 'Mis Sesiones', description: 'Consulta tus sesiones de entrenamiento', changefreq: 'yearly' as const, priority: 0.6 },

      //Rutas de dashboard profesional relevantes
      { path: '/professional/dashboard/home', title: 'Dashboard Profesional', description: 'Panel de control del profesional', changefreq: 'yearly' as const, priority: 0.6 },
      { path: '/professional/dashboard/calendar', title: 'Calendario Profesional', description: 'Gestiona tu calendario de sesiones', changefreq: 'yearly' as const, priority: 0.6 },
      { path: '/professional/dashboard/programmedSessions', title: 'Sesiones Programadas', description: 'Gestiona tus sesiones programadas', changefreq: 'yearly' as const, priority: 0.6 },

    ]
    
    routes.push(...staticRoutes)
    
    // Rutas dinámicas de blog
    try {
      const blogPosts = await readBlogPosts()
      const blogRoutes = blogPosts.map(post => ({
        path: `/blog/${post.slug}`,
        title: post.title,
        description: post.introduction,
        lastmod: post.publishedAt,
        changefreq: 'monthly' as const,
        priority: 0.7
      }))
      routes.push(...blogRoutes)
    } catch (error) {
      console.error('Error loading blog posts for sitemap:', error)
    }
    
    // Rutas de Planes de Entrenamiento
    try {
      const runtimeConfig = useRuntimeConfig();
      const { data } = await useFetch<{ plans: Plan[] }>(`${runtimeConfig.public.apiBase}/user/plans`, {
        method: "POST",
        body: {
          // Puedes ajustar los valores por defecto o parametrizar si lo necesitas
          region: 13,
          credit_type: "P",
          format_credit: "Individual",
        },
        lazy: true,
      });
      if (data?.value?.plans) {
        const planRoutes: PageRoute[] = data.value.plans.map(plan => {
          // Generar título y descripción como en index.vue
          // Ejemplo: "Plan {plan.credit_count} créditos - {plan.format_credit} - {plan.modality}"
            const title = `Plan de ${plan.credit_quantity} sesiones ${
              plan.format_credit === "Individual"
              ? "individuales"
              : plan.format_credit === "Dupla"
                ? "dupla"
                : "grupales"
            } - ${(plan.credit_type === "PP" || plan.credit_type == "GP") ? "presenciales" : "online"}`;
          const description = plan.description;
          return {
            path: `/plans/${plan.plan_id}`,
            title,
            description,
            changefreq: 'monthly' as const,
            priority: 0.6
          };
        });
        routes.push(...planRoutes);
      }
    } catch (error) {
      console.error('Error loading plans for sitemap:', error);
    }
    return routes
  }

  // Leer posts del blog (reutilizado de tu código)
  const readBlogPosts = async (): Promise<BlogPost[]> => {
    try {
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

  return {
    setSEO,
    generateStructuredData,
    generateRoutes,
    readBlogPosts,
    baseUrl,
    siteName,
    siteDescription
  }
}