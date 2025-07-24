<!-- components/SocialShare.vue -->
<template>
    <div class="flex flex-col items-center justify-between bg-white w-full p-4 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold text-gray-800"> Compartir </h3>
<div class="flex flex-wrap justify-center gap-2 mb-2">
    <!-- Twitter/X -->
    <NuxtLink
      :to="`https://twitter.com/share?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText)}`"
      target="_blank"
      rel="noopener"
      class="p-2 text-black transition-colors"
      aria-label="Compartir en X (Twitter)"
    >
      <Icon name="ion:logo-x" class="w-5 h-5" />
    </NuxtLink>

    <!-- Facebook Post -->
    <NuxtLink
      :to="`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`"
      target="_blank"
      rel="noopener"
      class="p-2 text-blue-600 flex gap-2 items-center transition-colors"
      aria-label="Compartir en Facebook"
    >
      <Icon name="mdi:facebook" class="w-5 h-5" />
        <p class="text-xs"> Post</p>
    </NuxtLink>

    <!-- Facebook Stories -->
    <button
      @click="shareToFacebookStories"
      class="p-2 text-blue-600 flex gap-2 items-center transition-colors"
      aria-label="Compartir en Historias de Facebook"
    >
      <Icon name="mdi:facebook" class="w-5 h-5" /> 
      <p class="text-xs"> Historias</p>
      
    </button>

    <!-- Instagram Stories -->
    <button
      @click="shareToInstagramStories"
      class="p-2 text-pink-500 transition-colors"
      aria-label="Compartir en Historias de Instagram"
    >
      <Icon name="mdi:instagram" class="w-5 h-5" />
    </button>

    <!-- WhatsApp -->
    <NuxtLink
      :to="`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + fullUrl)}`"
      target="_blank"
      rel="noopener"
      class="p-2 text-green-500 transition-colors"
      aria-label="Compartir en WhatsApp"
    >
      <Icon name="mdi:whatsapp" class="w-5 h-5" />
    </NuxtLink>

    <!-- Copiar link -->
    <button
      @click="copyPostLink"
      class="p-2 text-gray-500 flex gap-2 items-center transition-colors"
      aria-label="Copiar link del post"
    >
      <Icon name="mdi:content-copy" class="w-5 h-5" />
      <p class="text-xs"> Copiar link</p>
    </button>

    <!-- Compartir nativo (Web Share API) -->
    <button
      v-if="canShare"
      @click="shareNative"
      class="p-2 text-purple-500 transition-colors"
      aria-label="Compartir"
    >
      <Icon name="mdi:share-variant" class="w-5 h-5" />
    </button>
  </div>
    </div>
  <!-- Toast notification -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="transform translate-y-8 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-8 opacity-0"
  >
    <div
      v-if="showToast"
      class="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50"
    >
      {{ toastMessage }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
  url?: string
  image?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  url: '',
  image: ''
})

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

// Estados reactivos
const showToast = ref(false)
const toastMessage = ref('')
const canShare = ref(false)

// Computed properties
const fullUrl = computed(() => {
  if (props.url) return props.url
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return `${runtimeConfig.public.nuxtApiBase}${route.fullPath}`
})

const shareText = computed(() => {
  return props.description || props.title
})

// Verificar si el dispositivo soporta Web Share API
onMounted(() => {
  if (typeof window !== 'undefined') {
    canShare.value = 'share' in navigator
  }
})

// Función para mostrar toast
const showToastMessage = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Función para copiar link (mejorada)
const copyPostLink = async () => {
  if (typeof window === 'undefined') return
  
  try {
    await navigator.clipboard.writeText(fullUrl.value)
    showToastMessage('¡Link copiado al portapapeles!')
  } catch (error) {
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement('textarea')
    textArea.value = fullUrl.value
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    showToastMessage('¡Link copiado al portapapeles!')
  }
}

// Función para compartir nativamente
const shareNative = async () => {
  if (typeof window === 'undefined') return
  
  try {
    await navigator.share({
      title: props.title,
      text: shareText.value,
      url: fullUrl.value
    })
  } catch (error) {
    console.log('Error al compartir:', error)
  }
}

// Función para compartir en Instagram Stories
const shareToInstagramStories = () => {
  if (typeof window === 'undefined') return
  
  const instagramUrl = `https://www.instagram.com/stories/new/`
  
  // Para móviles, intentar abrir la app
  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Intentar abrir la app de Instagram
    window.location.href = `instagram://camera`
    
    // Fallback después de un tiempo
    setTimeout(() => {
      window.open(instagramUrl, '_blank')
    }, 1000)
  } else {
    // Para desktop, abrir Instagram web
    window.open(instagramUrl, '_blank')
    showToastMessage('Copia el link para compartir en Instagram Stories')
    copyPostLink()
  }
}

// Función para compartir en Facebook Stories
const shareToFacebookStories = () => {
  if (typeof window === 'undefined') return
  
  const facebookStoriesUrl = `https://www.facebook.com/stories/create/`
  
  // Para móviles, intentar abrir la app
  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Intentar abrir la app de Facebook
    window.location.href = `fb://story`
    
    // Fallback después de un tiempo
    setTimeout(() => {
      window.open(facebookStoriesUrl, '_blank')
    }, 1000)
  } else {
    // Para desktop, abrir Facebook web
    window.open(facebookStoriesUrl, '_blank')
    showToastMessage('Copia el link para compartir en Facebook Stories')
    copyPostLink()
  }
}
</script>