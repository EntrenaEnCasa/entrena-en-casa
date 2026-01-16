<template>
  <section id="contacto" class="relative py-10 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
    <!-- Background Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 md:px-12">
      
      <!-- Header -->
      <div class="text-center mb-12 md:mb-16">
        
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white shadow-md rounded-full mb-4">
          <Icon name="mdi:chat-processing" class="w-5 h-5 text-gray-700" />
          <span class="text-sm font-semibold text-gray-700">Contacto</span>
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          ¿Tienes dudas?
        </h2>
        <p class="text-lg md:text-xl text-gray-600 font-light">
          Estamos aquí para ayudarte
        </p>
      </div>

      <!-- Unified Contact Card -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          
          <!-- Form Side -->
          <div class="p-8 md:p-12">
            <div class="mb-8">
              <h3 class="text-3xl font-bold text-gray-900 mb-2">Envíanos un mensaje</h3>
              <p class="text-gray-600 text-sm">Responderemos lo antes posible</p>
            </div>

            <Form @submit="sendEmail" class="space-y-5 flex flex-col" v-slot="{ meta }">
              
              <!-- Email Input -->
              <div class="group">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico *
                </label>
                <CommonInput
                  v-model="formData.email"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="tu@email.com"
                  :rules="validateEmail"
                />
              </div>

              <!-- Subject Input -->
              <div class="group">
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  Asunto *
                </label>
                <CommonInput
                  v-model="formData.subject"
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="¿En qué podemos ayudarte?"
                  :rules="validateSubject"
                />
              </div>

              <!-- Message Textarea -->
              <div class="group">
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <CommonTextarea
                  v-model="formData.message"
                  name="message"
                  id="message"
                  placeholder="Cuéntanos más sobre tu consulta..."
                  rows="4"
                  maxlength="350"
                  :rules="validateMessage"
                />
                <div class="flex justify-end items-center mt-1.5">
                  <p class="text-xs text-gray-500">
                    {{ formData.message.length }}/350
                  </p>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full px-8 py-3.5 bg-secondary hover:bg-secondary-600 text-white text-base font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                :disabled="!meta.valid || loading"
              >
                <span v-if="!loading">
                  Enviar mensaje
                </span>
                <span v-else class="flex items-center gap-2">
                  <Icon name="mdi:loading" class="w-5 h-5 animate-spin" />
                  Enviando...
                </span>
              </button>
            </Form>
          </div>

          <!-- Image Side -->
          <div class="relative h-[500px] lg:h-auto">
            <NuxtImg
              class="w-full h-full object-cover"
              width="600"
              height="700"
              src="/home/about-us.jpeg"
              alt="Contacto - Entrena En Casa"
            />
            
            <!-- Floating Info - Always Visible -->
            <div class="absolute bottom-6 left-6 right-6">
              <div class="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg">
                <h4 class="text-xl font-bold text-gray-900 mb-1">Jorge Sierra</h4>
                <p class="text-sm text-gray-600 mb-4">Director y Fundador</p>
                
                <!-- Contact Buttons -->
                <div class="flex gap-3">
                  <a 
                    href="mailto:entrenaencasa0@gmail.com" 
                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary hover:bg-secondary-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    <Icon name="mdi:email" class="w-5 h-5" />
                    <span class="hidden sm:inline">Email</span>
                  </a>
                  
                  <a 
                    href="https://wa.me/56971370313" 
                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    <Icon name="mdi:whatsapp" class="w-5 h-5" />
                    <span class="hidden sm:inline">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
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