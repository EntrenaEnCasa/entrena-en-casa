import type { BlogPost } from '~/types/blog'
export const useSEO = () => {
  const generateStructuredData = (post: BlogPost) => {
    const baseUrl = useRuntimeConfig().public.baseUrl || 'http://localhost:3000'

    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.introduction,
      image: post.images.map(img => `${baseUrl}${img.src}`),
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author || 'Tu Blog'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Entrena en Casa',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/public/logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/blog/${post.slug}`
      },
      keywords: post.keywords.join(', '),
      wordCount: post.content.split(' ').length,
      timeRequired: `PT${post.readTime || 5}M`
    }
  }

  const generateBreadcrumbStructuredData = (post: BlogPost) => {
    const baseUrl = useRuntimeConfig().public.baseUrl || 'http://localhost:3000'
    
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: baseUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${baseUrl}/blog`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `${baseUrl}/blog/${post.slug}`
        }
      ]
    }
  }

  const generateWebsiteStructuredData = () => {

    const baseUrl = useRuntimeConfig().public.baseUrl || 'http://localhost:3000'

    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Tu Blog',
      description: 'Blog sobre desarrollo, educación y tecnología',
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/blog?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
  }

  return {
    generateStructuredData,
    generateBreadcrumbStructuredData,
    generateWebsiteStructuredData
  }
}