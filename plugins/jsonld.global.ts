import { useHead } from '#imports'

export default defineNuxtPlugin(() => {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Entrena en Casa",
          "url": "https://entrenaencasa.cl",
          "telephone": "+56-9-xxxx-xxxx",
          "areaServed": "Chile",
          "address": {
            "streetAddress": "Tu dirección",
            "addressLocality": "Viña del Mar",
            "addressRegion": "Región de Valparaíso",
            "addressCountry": "CL"
          },
          "sameAs": [
            "https://www.facebook.com/entrenaencasa",
            "https://www.instagram.com/entrenaencasa"
          ]
        })
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Entrena en Casa",
          "url": "https://entrenaencasa.cl"
        })
      }
    ]
  })
})
