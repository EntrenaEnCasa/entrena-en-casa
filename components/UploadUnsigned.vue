<template>
  <CldUploadWidget
    v-slot="{ open }"
    :uploadPreset="uploadPreset"
    :options="{
      multiple: false,
      folder: 'entrena-en-casa',
      sources: ['local','camera','url'],
      resourceType: 'image',
      maxFileSize: 5_000_000
    }"
    :onSuccess="handleResult"
    :onError="onError"
    :onResult="handleResult"
  >
    <CommonButton class="bg-secondary py-4 px-3" @click="open()">
        Subir Imagen
    </CommonButton>
  </CldUploadWidget>
</template>

<script setup lang="ts">
const { $cloudinary } = useNuxtApp()
const config = useRuntimeConfig()

// Usar el uploadPreset desde la configuración
const uploadPreset = config.public.cloudinaryUploadPreset

const emit = defineEmits<{
  (e: 'uploaded', payload: { url: string; publicId: string }): void
}>()

function handleResult(result: any) {
  console.log('Cloudinary result:', result) // Para debug
  
  // Cloudinary retorna result.info con los datos del asset
  const url = result?.info?.secure_url as string
  const publicId = result?.info?.public_id as string
  
  if (url && publicId) {
    emit('uploaded', { url, publicId })
  } else {
    console.error('Missing URL or publicId in result:', result)
  }
}

function onError(err: unknown) {
  console.error('Cloudinary upload error:', err)
}
</script>