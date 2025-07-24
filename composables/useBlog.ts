import type { BlogPost, BlogResponse } from '~/types/blog'
import { marked } from 'marked'

export const useBlog = () => {
  // Variable para verificar si marked ya está configurado
  let isMarkdownConfigured = false

  // Configurar marked con opciones personalizadas
  const configureMarkdown = () => {
    if (isMarkdownConfigured) return

    marked.setOptions({
      breaks: true, // Convierte \n en <br>
      gfm: true, // GitHub Flavored Markdown
    })

    // Renderer personalizado para clases de Tailwind
    const renderer = new marked.Renderer()
    
    // Personalizar listas
    renderer.list = (token: any) => {
      const tag = token.ordered ? 'ol' : 'ul'
      const classes = token.ordered
        ? 'list-decimal list-inside space-y-2 ml-4 text-gray-700 mb-4'
        : 'list-disc list-inside space-y-2 ml-4 text-gray-700 mb-4'
      
      // Renderizar items de la lista
      let body = ''
      if (token.items && Array.isArray(token.items)) {
        body = token.items
          .map((item: any) => {
            const text = item.text || (item.tokens ? marked.parser(item.tokens) : '')
            return `<li class="leading-relaxed">${text}</li>`
          })
          .join('')
      }
      
      return `<${tag} class="${classes}">${body}</${tag}>`
    }

    // Personalizar elementos de lista
    renderer.listitem = (item: any) => {
      const text = item.text ?? (item.tokens ? marked.parser(item.tokens) : '')
      return `<li class="leading-relaxed">${text}</li>`
    }

    // Personalizar párrafos
    renderer.paragraph = (token: any) => {
      const text = token.tokens ? marked.parser(token.tokens) : token.text || ''
      return `<p class="mb-4 text-gray-700 leading-relaxed">${text}</p>`
    }

    // Personalizar headers
    renderer.heading = (token: any) => {
      const { text, depth } = token
      const classes = {
        1: 'text-3xl font-bold text-gray-900 mb-6 mt-8',
        2: 'text-2xl font-bold text-gray-900 mb-4 mt-6',
        3: 'text-xl font-semibold text-gray-900 mb-3 mt-5',
        4: 'text-lg font-semibold text-gray-900 mb-3 mt-4',
        5: 'text-base font-semibold text-gray-900 mb-2 mt-3',
        6: 'text-sm font-semibold text-gray-900 mb-2 mt-3'
      }
      return `<h${depth} class="${classes[depth as keyof typeof classes] || classes[6]}">${text}</h${depth}>`
    }

    // Personalizar énfasis
    renderer.strong = (token: any) => {
      const text = token.tokens ? marked.parser(token.tokens) : token.text || ''
      return `<strong class="font-semibold text-gray-900">${text}</strong>`
    }

    renderer.em = (token: any) => {
      const text = token.tokens ? marked.parser(token.tokens) : token.text || ''
      return `<em class="italic text-gray-800">${text}</em>`
    }

    // Personalizar blockquotes
    renderer.blockquote = (token: any) => {
      const quote = token.tokens ? marked.parser(token.tokens) : token.text || ''
      return `<blockquote class="border-l-4 border-cyan-500 pl-4 py-2 my-4 bg-gray-50 italic text-gray-700">${quote}</blockquote>`
    }

    // Personalizar código
    renderer.code = (token: any) => {
      const { text, lang } = token
      return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code${lang ? ` class="language-${lang}"` : ''}>${text}</code></pre>`
    }

    renderer.codespan = (token: any) => {
      return `<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">${token.text}</code>`
    }

    marked.use({ renderer })
    isMarkdownConfigured = true
  }

  // Función para renderizar markdown de forma asíncrona
  const renderMarkdown = async (content: string): Promise<string> => {
    if (!content) return ''
    
    try {
      configureMarkdown()
      const result = await marked(content)
      return result
    } catch (error) {
      console.error('Error rendering markdown:', error)
      // Fallback simple sin marked
      return content
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>')
        .replace(/^#{2}\s(.+)/gm, '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-6">$1</h2>')
        .replace(/^#{3}\s(.+)/gm, '<h3 class="text-xl font-semibold text-gray-900 mb-3 mt-5">$1</h3>')
        .replace(/^>\s(.+)/gm, '<blockquote class="border-l-4 border-cyan-500 pl-4 py-2 my-4 bg-gray-50 italic text-gray-700">$1</blockquote>')
        .replace(/^[-*]\s(.+)/gm, '<li class="leading-relaxed">$1</li>')
        .replace(/(<li class="leading-relaxed">.*?<\/li>)/gs, '<ul class="list-disc list-inside space-y-2 ml-4 text-gray-700 mb-4">$1</ul>')
        .replace(/^\d+\.\s(.+)/gm, '<li class="leading-relaxed">$1</li>')
        .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
        .replace(/^(?!<)/gm, '<p class="mb-4 text-gray-700 leading-relaxed">')
        .replace(/(?<!>)$/gm, '</p>')
    }
  }

  // Función para obtener todos los posts
  const getAllPosts = async (): Promise<BlogPost[]> => {
    try {
      const { data } = await $fetch<BlogResponse>('/api/blog/posts')
      return Array.isArray(data) ? data : []
    } catch (error) {
      console.error('Error loading blog posts:', error)
      return []
    }
  }

  // Función para obtener un post específico
  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      const response = await $fetch<BlogResponse>(`/api/blog/posts/${slug}`)
      return (response.data && !Array.isArray(response.data)) ? response.data : null
    } catch (error) {
      console.error('Error loading blog post:', error)
      return null
    }
  }

  // Función para obtener posts recientes
  const getRecentPosts = async (limit: number = 3): Promise<BlogPost[]> => {
    const posts = await getAllPosts()
    return posts
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit)
  }

  // Función para generar slug desde título
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  // Función para calcular tiempo de lectura
  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200
    // Remover markdown para contar palabras correctamente
    const plainText = content.replace(/[#*`_~\[\]()]/g, '').trim()
    const words = plainText.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  // Función para generar metadata SEO
  const generateSEOMeta = (post: BlogPost) => {
    const description = post.introduction.substring(0, 160)
    
    return {
      title: post.title,
      meta: [
        { name: 'description', content: description },
        { name: 'keywords', content: post.keywords.join(', ') },
        { name: 'author', content: post.author || 'Tu Blog' },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: post.images[0]?.src || '/default-blog-image.jpg' },
        { property: 'article:published_time', content: post.publishedAt },
        { property: 'article:author', content: post.author || 'Tu Blog' },
        { property: 'article:tag', content: post.keywords.join(', ') },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: post.title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: post.images[0]?.src || '/default-blog-image.jpg' }
      ]
    }
  }

  return {
    getAllPosts,
    getPostBySlug,
    getRecentPosts,
    generateSlug,
    calculateReadTime,
    generateSEOMeta,
    renderMarkdown
  }
}