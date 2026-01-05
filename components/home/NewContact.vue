<template>
  <section id="contacto" class="relative py-10 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
    <!-- Background Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 md:px-12">
      
      <!-- Header -->
      <div class="text-center mb-16 md:mb-20">
        
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
          <Icon name="mdi:chat-processing" class="w-5 h-5 text-gray-700" />
          <span class="text-sm font-medium text-gray-700">Contacto</span>
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          ¿Tienes dudas?
        </h2>
        <p class="text-xl md:text-2xl text-gray-600 font-light">
          Estamos aquí para ayudarte
        </p>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch max-w-7xl mx-auto">
        
        <!-- Form -->
        <div class="order-2 lg:order-1 flex">
          <div class="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-10 border border-gray-100 hover:shadow-3xl transition-shadow duration-500 flex flex-col w-full">
            <div class="mb-8">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Envíanos un mensaje</h3>
              <p class="text-gray-600">Responderemos lo antes posible</p>
            </div>

            <Form @submit="sendEmail" class="space-y-6 flex-1 flex flex-col" v-slot="{ meta }">
              
              <!-- Email Input -->
              <div class="group">
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                  Correo electrónico *
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="mdi:email-outline" class="w-5 h-5 text-gray-400 group-focus-within:text-secondary transition-colors" />
                  </div>
                  <CommonInput
                    v-model="formData.email"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="tu@email.com"
                    :rules="validateEmail"
                    class="pl-12"
                  />
                </div>
              </div>

              <!-- Subject Input -->
              <div class="group">
                <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">
                  Asunto *
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="mdi:text-box-outline" class="w-5 h-5 text-gray-400 group-focus-within:text-secondary transition-colors" />
                  </div>
                  <CommonInput
                    v-model="formData.subject"
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="¿En qué podemos ayudarte?"
                    :rules="validateSubject"
                    class="pl-12"
                  />
                </div>
              </div>

              <!-- Message Textarea -->
              <div class="group flex-1 flex flex-col">
                <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
                  Mensaje *
                </label>
                <CommonTextarea
                  v-model="formData.message"
                  name="message"
                  id="message"
                  placeholder="Cuéntanos más sobre tu consulta..."
                  rows="6"
                  maxlength="350"
                  :rules="validateMessage"
                  class="flex-1"
                />
                <div class="flex justify-between items-center mt-2">
                  <p class="text-xs text-gray-500">
                    Máximo 350 caracteres
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ formData.message.length }}/350
                  </p>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="group w-full px-8 py-4 bg-gradient-to-r from-secondary to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                :disabled="!meta.valid || loading"
              >
                <span v-if="!loading" class="flex items-center gap-2">
                  Enviar mensaje
                  <Icon name="mdi:send" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span v-else class="flex items-center gap-2">
                  <Icon name="mdi:loading" class="w-5 h-5 animate-spin" />
                  Enviando...
                </span>
              </button>
            </Form>
          </div>
        </div>

        <!-- Image & Contact Info -->
        <div class="order-1 lg:order-2 space-y-8 flex flex-col">
          <!-- Image -->
          <div class="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/50 group">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <NuxtImg
              class="w-full h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              width="500"
              height="450"
              src="/home/Jorge.jpg"
              alt="Contacto - Entrena En Casa"
            />
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h4 class="text-xl font-bold mb-1">Jorge Sierra</h4>
              <p class="text-sm text-gray-200">Director y Fundador</p>
            </div>
          </div>

          <!-- Contact Info Cards -->
          <div class="space-y-4">
            <!-- Email Card -->
            <a 
              href="mailto:entrenaencasa0@gmail.com" 
              class="group flex items-center gap-4 p-6 bg-white hover:bg-gradient-to-r hover:from-secondary/5 hover:to-secondary/10 rounded-2xl shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-secondary/20"
            >
              <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon name="mdi:email" class="w-7 h-7 text-secondary" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</p>
                <span class="text-base md:text-lg font-medium text-gray-900 group-hover:text-secondary transition-colors break-all">
                  entrenaencasa0@gmail.com
                </span>
              </div>
              <Icon name="mdi:arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </a>

            <!-- Phone Card -->
            <a 
              href="https://wa.me/56971370313" 
              class="group flex items-center gap-4 p-6 bg-white hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100/50 rounded-2xl shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200"
            >
              <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon name="mdi:whatsapp" class="w-7 h-7 text-green-600" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">WhatsApp</p>
                <span class="text-base md:text-lg font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                  +56 9 7137 0313
                </span>
              </div>
              <Icon name="mdi:arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </a>
          </div>

        
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";

const toast = useToast();

const formData = reactive({
  email: "",
  subject: "",
  message: "",
});

const loading = ref(false);

const validateEmail = (value: string) => {
  if (!value) {
    return "El email es requerido";
  }

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "El email no es válido";
  }

  return true;
};

const validateSubject = (value: string) => {
  if (!value) {
    return "El asunto es requerido";
  }

  if (value.length < 10) {
    return "El asunto debe tener al menos 10 caracteres";
  }

  return true;
};

const validateMessage = (value: string) => {
  if (!value) {
    return "El mensaje es requerido";
  }

  if (value.length < 20) {
    return "El mensaje debe tener al menos 20 caracteres";
  }

  return true;
};

const sendEmail = async (values: any, { resetForm }: any) => {
  loading.value = true;

  const body = {
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  };

  try {
    const response = await $fetch("/api/email/send/contactForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (response.success) {
      toast.success("Mensaje enviado correctamente");
      resetForm();
      formData.email = "";
      formData.subject = "";
      formData.message = "";
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Ocurrió un error al enviar el correo");
  } finally {
    loading.value = false;
  }
};
</script>