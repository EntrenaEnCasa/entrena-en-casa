<template>
  <section id="contacto" class="py-16 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      
      <!-- Header -->
      <div class="text-center mb-16">
        <p class="text-gray-500 text-sm md:text-base mb-3 tracking-wide">CONTACTO</p>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900">
          ¿Tienes dudas? ¡Contáctanos!
        </h2>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
        
        <!-- Form -->
        <div class="order-2 lg:order-1">
          <Form @submit="sendEmail" class="space-y-6" v-slot="{ meta }">
            
            <!-- Email Input -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
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
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                Asunto
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
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Mensaje
              </label>
              <CommonTextarea
                v-model="formData.message"
                name="message"
                id="message"
                placeholder="Cuéntanos más sobre tu consulta..."
                rows="5"
                maxlength="350"
                :rules="validateMessage"
              />
              <p class="text-xs text-gray-500 mt-2">
                Máximo 350 caracteres
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full px-8 py-4 bg-secondary hover:bg-secondary-600 text-white text-lg font-medium rounded-lg transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!meta.valid || loading"
            >
              <span v-if="!loading">Enviar mensaje</span>
              <span v-else>Enviando...</span>
            </button>
          </Form>
        </div>

        <!-- Image & Contact Info -->
        <div class=" space-y-8">
          <!-- Image -->
          <div class="relative rounded-3xl overflow-hidden">
            <NuxtImg
              class="w-full h-[450px] object-cover"
              width="500"
              height="450"
              src="/home/Jorge.jpg"
              alt="Contacto - Entrena En Casa"
            />
          </div>

          <!-- Contact Info -->
          <div class="space-y-4">
            <!-- Email -->
            <a 
              href="mailto:entrenaencasa0@gmail.com" 
              class="flex items-center gap-4 text-gray-700 hover:text-secondary-200 transition-colors duration-200"
            >
              <Icon name="mdi:email" class="w-6 h-6 flex-shrink-0" />
              <span class="text-lg">entrenaencasa0@gmail.com</span>
            </a>

            <!-- Phone -->
            <a 
              href="https://wa.me/56971370313" 
              class="flex items-center gap-4 text-gray-700 hover:text-secondary-200 transition-colors duration-200"
            >
              <Icon name="mdi:phone" class="w-6 h-6 flex-shrink-0" />
              <span class="text-lg">+56 9 7137 0313</span>
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