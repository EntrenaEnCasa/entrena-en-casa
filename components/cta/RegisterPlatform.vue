<template>
  <div class="bg-primary-500/60 p-6 rounded-lg border border-primary-200">
    <h3 class="text-xl font-bold text-primary-800 mb-4">{{ title }}</h3>
    <p v-if="description" class="text-primary-700 mb-6">{{ description }}</p>
    
    <div
                class="mx-auto mt-3 w-10/12 rounded-xl bg-white px-4 py-6 shadow-lg"
            >
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
                    <div class="flex w-full items-center gap-2">
                        <div>
                            <Icon name="fa6-solid:location-dot" class="w-16 min-w-16 text-xl" />
                        </div>
                        <div class="flex flex-col leading-tight">
                            <h4 class="mb-1 text-sm font-semibold">Modalidad</h4>
                            <p class="text-xs">Online o presencial, tu escoges</p>
                        </div>
                    </div>
                    <div class="flex w-full items-center gap-2">
                        <div>
                            <Icon name="fa6-solid:dumbbell" class="w-16 text-xl" />
                        </div>

                        <div class="flex flex-col leading-tight">
                            <p class="mb-1 text-sm font-semibold">Modalidad</p>
                            <p class="text-xs">
                                Programa tus propias sesiones, ve a tu propio ritmo
                            </p>
                        </div>
                    </div>
                    <div class="flex w-full items-center gap-2">
                        <div>
                            <Icon name="fa6-solid:user" class="w-16 text-xl" />
                        </div>

                        <div class="flex flex-col leading-tight">
                            <p class="mb-1 text-sm font-semibold">Modalidad</p>
                            <p class="text-xs">Entrena tanto individual como grupal</p>
                        </div>
                    </div>
                    <div class="mx-auto flex items-center justify-center">
                        <NuxtLink
                            to="/user/auth/register"
                            class="cursor-pointer rounded-lg text-sm border-0 bg-secondary px-3 py-2 font-medium text-white"
                        >
                            Registrarse ahora
                        </NuxtLink>
                    </div>
                </div>
            </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>
