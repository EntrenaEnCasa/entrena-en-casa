<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="mt-3 w-full">
                    <CommonLoading v-if="!professional || pastSessionsLoading || futureSessionsLoading" />
                    <div v-else>
                        <h2 class="mb-5 text-center text-2xl font-semibold">Entrenador</h2>

                        <div class="mx-auto mb-10 w-10/12 space-y-5 text-center">
                            <div class="space-y-1 px-1">
                                <h3 class="text-gray-500">Nombre</h3>
                                <p class="text-2xl font-medium text-gray-700" v-if="professional.first_name">
                                    {{ professional.first_name }}
                                    {{ professional.last_name }}
                                </p>
                                <p class="text-2xl font-medium text-gray-700" v-else>Sin datos</p>
                            </div>

                            <div class="space-y-1 px-1">
                                <h3 class="text-gray-500">Correo electrónico</h3>
                                <p class="text-2xl font-medium text-gray-700">
                                    {{ professional.email }}
                                </p>
                            </div>
                            <div class="flex">
                                <CommonButton @click="disableUser()" bg-color="tertiary"
                                    class="mx-auto mb-5 px-3 py-2 text-white"
                                    v-if="professional && professional.enabled">
                                    Deshabilitar usuario</CommonButton>
                                <CommonButton @click="enableUser()" bg-color="primary"
                                    class="mx-auto mb-5 px-3 py-2 text-white"
                                    v-else-if="professional && !professional.enabled">
                                    Habilitar usuario</CommonButton>
                                <!-- Botón para restablecer contraseña -->
                                <CommonButton @click="resetPassword()" bg-color="secondary"
                                    class="mx-auto mb-5 px-3 py-2 text-white">
                                    Restablecer contraseña
                                </CommonButton>
                            </div>
                            <div class="mt-5 flex justify-center">
                                <CommonButton @click="showReportModal" bg-color="primary" class="px-3 py-2 text-white">
                                    Crear reporte
                                </CommonButton>
                            </div>


                        </div>
                        <div class="mb-6 space-y-6">
                            <div class="flex items-center justify-between rounded-lg border px-5 py-3"
                                id="futureSessionsToggle" @click="toggleFutureSessions">
                                <!-- //toggle de sesiones próximas -->
                                <p class="text-lg">Sesiones próximas</p>
                                <Icon :name="isFutureSessionsVisible
                                    ? 'fa6-solid:chevron-down'
                                    : 'fa6-solid:chevron-right'
                                    " />
                            </div>
                            <div class="overflow-x-auto" id="futureSessions" v-show="isFutureSessionsVisible">
                                <div v-if="futureSessionsLoading">
                                    <CommonLoading />
                                </div>
                                <table v-else-if="futureSessions.length > 0"
                                    class="w-full table-auto bg-white text-left text-sm text-gray-500">
                                    <thead class="text-gray-400">
                                        <tr>
                                            <th scope="col" class="p-6 font-medium">Fecha</th>
                                            <th scope="col" class="p-6 font-medium">Hora</th>
                                            <th scope="col" class="p-6 font-medium">Modalidad</th>
                                            <th scope="col" class="p-6 font-medium">Formato</th>
                                            <th scope="col" class="p-6 font-medium">Alumnos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b" v-for="session in futureSessions">
                                            <td class="whitespace-nowrap px-6 py-4">
                                                {{ session.date }}
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                {{ session.time }} hrs
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                {{ session.format }}
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                {{ session.modality }}
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                {{ session.actual_assistant }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div v-else class="text-center text-gray-400">
                                    <p>No hay sesiones próximas</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-between rounded-lg border px-5 py-3"
                                id="pastSessionsToggle" @click="togglePastSessions">
                                <!-- //toggle de sesiones pasadas -->
                                <p class="text-lg">Sesiones pasadas</p>
                                <Icon :name="isPastSessionsVisible
                                    ? 'fa6-solid:chevron-down'
                                    : 'fa6-solid:chevron-right'
                                    " />
                            </div>
                            <div class="overflow-x-auto" id="pastSessions" v-show="isPastSessionsVisible">
                                <div v-if="pastSessionsLoading">
                                    <CommonLoading />
                                </div>
                                <table v-else-if="pastSessions.length > 0"
                                    class="w-full table-auto bg-white text-left text-sm text-gray-500">
                                    <thead class="text-gray-400">
                                        <tr>
                                            <th scope="col" class="p-6 font-medium">Fecha</th>
                                            <th scope="col" class="p-6 font-medium">Hora</th>
                                            <th scope="col" class="p-6 font-medium">Modalidad</th>
                                            <th scope="col" class="p-6 font-medium">Formato</th>
                                            <th scope="col" class="p-6 font-medium">Alumnos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b" v-for="session in pastSessions">
                                            <td class="whitespace-nowrap px-6 py-4">
                                                {{ session.date }}
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                {{ session.time }} hrs
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                {{ session.format }}
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                {{ session.modality }}
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                {{ session.actual_assistant }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div v-else class="text-center text-gray-400">
                                    <p>No hay sesiones pasadas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
        <Teleport to="body">
            <!-- Modal para seleccionar fechas del reporte -->
            <CommonModal ref="reportModal">
                <div class="p-5">
                    <h3 class="mb-4 text-xl font-semibold">Generar Reporte</h3>
                    <div class="mb-4">
                        <label class="mb-2 block">Fecha de inicio:</label>
                        <input type="date" v-model="startDate" class="w-full rounded border p-2">
                    </div>
                    <div class="mb-4">
                        <label class="mb-2 block">Fecha de término:</label>
                        <input type="date" v-model="endDate" class="w-full rounded border p-2">
                    </div>
                    <div class="flex flex-col md:flex-row justify-center align-baseline items-center gap-5">
                        <CommonButton @click="closeReportModal()" bg-color="secondary"
                            class="w-full block px-3 py-2 text-white">
                            Cancelar
                        </CommonButton>
                        <CommonButton @click="generateReport" bg-color="primary"
                            class="w-full block px-3 py-2 text-white">
                            Generar y Descargar Reporte
                        </CommonButton>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const toast = useToast();
const runtimeConfig = useRuntimeConfig();
const isPastSessionsVisible = ref(false);
const isFutureSessionsVisible = ref(false);
const reportModal = ref<Modal | null>(null);
const startDate = ref('');
const endDate = ref('');

const showReportModal = () => {
    reportModal.value?.openModal();
};

const closeReportModal = () => {
    reportModal.value?.closeModal();
};

const toggleFutureSessions = () => {
    isFutureSessionsVisible.value = !isFutureSessionsVisible.value;
};
const togglePastSessions = () => {
    isPastSessionsVisible.value = !isPastSessionsVisible.value;
};

interface ApiResponseReport {
    success: boolean;
    data: {
        professional: Professional;
        start_date: string;
        end_date: string;
        total_PP_credits: number;
        total_PO_credits: number;
        total_GP_credits: number;
        total_GO_credits: number;
        sessions: [
            {
                date: string;
                time: string;
                actual_assistant: number;
                format: string;
                modality: number;
            }
        ];
    };
}

interface Session {
    session_id: number;
    date: string;
    time: string;
    available: boolean;
    modality: string;
    format: string;
    link: string;
    actual_assistant: number;
    type: string;
    coordinates: string | null;
    professional: Professional;
}
interface Professional {
    user_id: number;
    first_name: string;
    last_name: string;
    title: string;
    phone: string | null;
    email: string;
    enabled: boolean;
}

const modal = ref<Modal | null>(null);

const openModal = () => {
    modal.value?.openModal();
};

const props = defineProps<{
    professional: Professional | null;
    futureSessions: Session[];
    pastSessions: Session[];
    futureSessionsLoading: boolean;
    pastSessionsLoading: boolean;
}>();

defineExpose({
    openModal,
});

const disableUser = async () => {
    if (!props.professional) return;
    const response = await $fetch<APIResponse>(
        `${runtimeConfig.public.apiBase}/admin/disable-account`,
        {
            method: "POST",
            credentials: "include",
            body: {
                user_id: props.professional.user_id,
            },
        },
    );
    if (response.success) {
        toast.success("Usuario deshabilitado");
        modal.value?.closeModal();
        reloadNuxtApp();
    } else {
        toast.error("Error al deshabilitar usuario");
    }
};
const enableUser = async () => {
    if (!props.professional) return;
    const response = await $fetch<APIResponse>(
        `${runtimeConfig.public.apiBase}/admin/enable-account`,
        {
            method: "POST",
            credentials: "include",
            body: {
                user_id: props.professional.user_id,
            },
        },
    );
    if (response.success) {
        toast.success("Usuario deshabilitado");
        modal.value?.closeModal();
        reloadNuxtApp();
    } else {
        toast.error("Error al deshabilitar usuario");
    }
};

const resetPassword = async () => {
    if (!props.professional || !props.professional.email) return;
    try {
        const response = await $fetch("/api/auth/send-reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                email: props.professional?.email,
            },
        });

        if (response.success) {
            toast.success(
                "Correo de verificación enviado. Se ha enviado un correo para restablecer la contraseña a la dirección de correo del profesional",
            );
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("No se pudo enviar el correo de verificación");
    }
};
const generateReport = async () => {
    if (!props.professional) return;

    try {
        const response = await $fetch<ApiResponseReport>(`${runtimeConfig.public.apiBase}/admin/professional-report`, {
            method: "POST",
            credentials: "include",
            body: {
                user_id: props.professional.user_id,
                start_date: startDate.value,
                end_date: endDate.value,
            },
        });

        if (response.success) {
            const { professional, start_date, end_date, total_PP_credits, total_PO_credits, total_GP_credits, total_GO_credits, sessions } = response.data;

            const doc = new jsPDF();

            // Título
            doc.setFontSize(18);
            doc.text(`Reporte de ${professional.first_name} ${professional.last_name}`, 14, 20);

            // Información general
            doc.setFontSize(12);
            doc.text(`Período: ${start_date} - ${end_date}`, 14, 30);
            doc.text(`Créditos Personalizados Presencial: ${total_PP_credits}`, 14, 40);
            doc.text(`Créditos Personalizados Online: ${total_PO_credits}`, 14, 50);
            doc.text(`Créditos Grupal Presencial: ${total_GP_credits}`, 14, 60);
            doc.text(`Créditos Grupal Online: ${total_GO_credits}`, 14, 70);

            // Tabla de sesiones
            autoTable(doc, {
                startY: 80,
                head: [['Fecha', 'Hora Inicio', 'Asistentes', 'Formato', 'Modalidad']],
                body: sessions.map(s => [
                    s.date,
                    s.time,
                    s.actual_assistant,
                    s.format,
                    s.modality]),
            });

            // Generar y descargar el PDF
            const fileName = `${professional.first_name}_${professional.last_name}_${start_date}_${end_date}.pdf`;
            doc.save(fileName);

            toast.success("Reporte generado y descargado exitosamente");
            closeReportModal();
        } else {
            toast.error("Error al generar el reporte");
        }
    } catch (error) {
        console.error(error);
        toast.error("Error al generar el reporte");
    }
};
</script>
