export interface BlogPost {
  id: number
  title: string
  slug: string
  description: string
  subtitles: string[]
  introduction: string
  content: string
  conclusion: string
  images: BlogImage[]
  publishedAt: string
  keywords: string[]
  cta: CTAConfig
  author?: string
  readTime?: number
  category?: string[]
}

export interface BlogImage {
  src: string
  alt: string
  caption?: string
  position: 'intro' | 'content' | 'conclusion'
}

export interface CTAConfig {
  type: 'contact' | 'website' | 'register' | 'sales' | 'newsletter'
  title: string
  description?: string
  data?: {
    url?: string
    phone?: string
    userType?: 'student' | 'teacher'
  }
}

export interface BlogMeta {
  title: string
  description: string
  keywords: string[]
  publishedAt: string
  author?: string
  image?: string
}

export interface BlogResponse {
  success: boolean
  data?: BlogPost | BlogPost[] | null
  error?: string
  total?: number
  page?: number
}