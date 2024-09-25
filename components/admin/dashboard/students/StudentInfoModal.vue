<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="mt-3 w-full">
                    <CommonLoading v-if="!student || futureSessionsLoading || pastSessionsLoading" />
                    <div v-else>
                        <h2 class="mb-5 text-center text-2xl font-semibold">Estudiante</h2>
                        <div class="mx-auto mb-10 w-10/12 space-y-5 text-center">
                            <div class="space-y-1 px-1">
                                <h3 class="text-gray-500">Nombre</h3>
                                <p class="text-2xl font-medium text-gray-700" v-if="student && student?.first_name">
                                    {{ student?.first_name }}
                                    {{ student?.last_name }}
                                </p>
                                <p class="text-2xl font-medium text-gray-700" v-else>Sin datos</p>
                            </div>
                            <div class="flex justify-center">
                                <CommonButton @click="generatePurchaseReport" bg-color="primary"
                                    class="px-4 py-2 text-white">
                                    Generar reporte de compras
                                </CommonButton>
                            </div>
                            <div class="space-y-1 px-1">
                                <h3 class="text-gray-500">Correo electrónico</h3>
                                <p class="break-all text-2xl font-medium text-gray-700">
                                    {{ student?.email }}
                                </p>
                            </div>
                            <div class="flex">
                                <CommonButton @click="disableUser()" bg-color="tertiary"
                                    class="mx-auto mb-5 px-3 py-2 text-white" v-if="student && student.enabled">
                                    Deshabilitar usuario</CommonButton>
                                <CommonButton @click="enableUser()" bg-color="primary"
                                    class="mx-auto mb-5 px-3 py-2 text-white" v-else-if="student && !student.enabled">
                                    Habilitar usuario</CommonButton>

                                <!-- Botón para restablecer contraseña -->
                                <CommonButton @click="resetPassword()" bg-color="secondary"
                                    class="mx-auto mb-5 px-3 py-2 text-white">
                                    Restablecer contraseña
                                </CommonButton>
                            </div>
                        </div>

                        <div class="mb-6 space-y-6">
                            <div class="flex items-center justify-between">
                                <div class="flex w-full items-center justify-between rounded-lg border px-5 py-3">
                                    <p class="text-lg">Planes comprados</p>
                                    <CommonButton bg-color="secondary" text-size="sm" class="px-4 py-2"
                                        @click="openModalPlans">
                                        Ver planes
                                    </CommonButton>
                                </div>
                            </div>
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
                                    class="table-auto bg-white text-left text-sm text-gray-500">
                                    <thead class="text-gray-400">
                                        <tr>
                                            <th scope="col" class="p-6 font-medium">Fecha</th>
                                            <th scope="col" class="p-6 font-medium">Hora</th>
                                            <th scope="col" class="p-6 font-medium">Modalidad</th>
                                            <th scope="col" class="p-6 font-medium">Formato</th>
                                            <th scope="col" class="p-6 font-medium">Profesional</th>
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
                                                <p>
                                                    {{ session.professional?.first_name }}
                                                    {{ session.professional?.last_name }}
                                                </p>
                                                <p class="text-sm text-gray-400">
                                                    {{ session.professional?.title }}
                                                </p>
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
                                    class="table-auto bg-white text-left text-sm text-gray-500">
                                    <thead class="text-gray-400">
                                        <tr>
                                            <th scope="col" class="p-6 font-medium">Fecha</th>
                                            <th scope="col" class="p-6 font-medium">Hora</th>
                                            <th scope="col" class="p-6 font-medium">Modalidad</th>
                                            <th scope="col" class="p-6 font-medium">Formato</th>
                                            <th scope="col" class="p-6 font-medium">Profesional</th>
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
                                                <p>
                                                    {{ session.professional.first_name }}
                                                    {{ session.professional.last_name }}
                                                </p>
                                                <p class="text-sm text-gray-400">
                                                    {{ session.professional.title }}
                                                </p>
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

        <AdminDashboardStudentsPlanStudentInfoModal :plansLoading="plansLoading" :student="student" :plans="plans"
            ref="planInfoModal" />
    </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const toast = useToast();

const runtimeConfig = useRuntimeConfig();
interface PlansResponse extends APIResponse {
    credits: Plan[];
}
interface PurchaseResponse extends APIResponse {
    purchases: Purchase[];
}

interface Purchase {
    purchase_id: number;
    purchase_date: string;
    credit_type: string;
    format_credit: string;
    purchase_credits: number;
    used_credits: number;
    available_credits: number;
    expiration_date: string;
}

interface Plan {
    transaction_id: number;
    credit_type: string;
    format_credit: string;
    used_credits: number;
    available_credits: number;
    expiration_date: string;
}

const planInfoModal = ref<Modal | null>(null);

const isPastSessionsVisible = ref(false);
const isFutureSessionsVisible = ref(false);
const plansLoading = ref(false);
const plans = ref<Plan[]>([]);

const toggleFutureSessions = () => {
    isFutureSessionsVisible.value = !isFutureSessionsVisible.value;
};
const togglePastSessions = () => {
    isPastSessionsVisible.value = !isPastSessionsVisible.value;
};

interface Student {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    enabled: boolean;
    region: number;
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
}

const modal = ref<Modal | null>(null);

const openModal = () => {
    modal.value?.openModal();
};

const props = defineProps<{
    student: Student | null;
    futureSessions: Session[];
    pastSessions: Session[];
    futureSessionsLoading: boolean;
    pastSessionsLoading: boolean;
}>();

defineExpose({
    openModal,
});

const getStudentPlans = async (student: Student) => {
    plansLoading.value = true;

    try {
        const response = await $fetch<PlansResponse>(
            `${runtimeConfig.public.apiBase}/admin/students/credits/${student.user_id}`,
            {
                method: "GET",
                credentials: "include",
            },
        );

        if (response.success) {
            plans.value = response.credits;
        } else {
            console.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        plansLoading.value = false;
    }
};

const openModalPlans = () => {
    planInfoModal.value?.openModal();
    getStudentPlans(props.student!);
    modal.value?.closeModal();
};

const resetPassword = async () => {
    if (!props.student || !props.student.email) return;
    try {
        const response = await $fetch("/api/auth/send-reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                email: props.student?.email,
            },
        });

        if (response.success) {
            toast.success(
                "Correo de verificación enviado. Se ha enviado un correo para restablecer la contraseña a la dirección de correo del estudiante",
            );
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("No se pudo enviar el correo de verificación");
    }
};

const disableUser = async () => {
    if (!props.student) return;
    const response = await $fetch<APIResponse>(
        `${runtimeConfig.public.apiBase}/admin/disable-account`,
        {
            method: "POST",
            credentials: "include",
            body: {
                user_id: props.student.user_id,
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
    if (!props.student) return;
    const response = await $fetch<APIResponse>(
        `${runtimeConfig.public.apiBase}/admin/enable-account`,
        {
            method: "POST",
            credentials: "include",
            body: {
                user_id: props.student.user_id,
            },
        },
    );
    if (response.success) {
        toast.success("Usuario habilitado");
        modal.value?.closeModal();
        reloadNuxtApp();
    } else {
        toast.error("Error al habilitar usuario");
    }
};
const formatCreditTranslation = (format: string) => {
    switch (format) {
        case 'PP': return 'Personalizado Presencial';
        case 'PO': return 'Personalizado Online';
        case 'GP': return 'Grupal Presencial';
        case 'GO': return 'Grupal Online';
        default: return format;
    }
};

const generatePurchaseReport = async () => {
    if (!props.student) {
        toast.error("No se ha seleccionado ningún estudiante");
        return;
    }

    try {
        const response = await $fetch<PurchaseResponse>(
            `${runtimeConfig.public.apiBase}/admin/all-purchases/${props.student.user_id}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (response.success && response.purchases.length > 0) {
            const purchases = response.purchases;

            const doc = new jsPDF();

            // Title
            doc.setFontSize(18);
            doc.text(`Reporte de compras de planes realizadas por ${props.student.first_name} ${props.student.last_name}`, 14, 20);

            // General information
            doc.setFontSize(12);
            doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 30);
            doc.text(`Hora de generación: ${new Date().toLocaleTimeString()}`, 14, 35);

            // Table of purchases
            autoTable(doc, {
                startY: 40,
                head: [['Fecha de compra', 'Tipo', 'Formato', 'Créditos comprados', 'Créditos usados', 'Créditos disponibles', 'Fecha de expiración']],
                body: purchases.map(p => [
                    new Date(p.purchase_date).toLocaleDateString(),
                    formatCreditTranslation(p.credit_type),
                    p.format_credit,
                    p.purchase_credits,
                    p.used_credits,
                    p.available_credits,
                    new Date(p.expiration_date).toLocaleDateString()
                ]),
            });

            // Footer
            const pageCount = doc.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.setTextColor(150);
                doc.text('Compras realizadas en www.entrenaencasa.cl', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
            }

            // Generate and download the PDF
            const fileName = `${props.student.last_name}_${props.student.first_name}_compras_historicas_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
            doc.save(fileName);

            toast.success("Reporte de compras generado y descargado exitosamente");
        } else {
            toast.warning("El usuario no tiene compras realizadas hasta el momento");
        }
    } catch (error) {
        console.error("Error al generar el reporte de compras:", error);
        toast.error("Error al generar el reporte de compras");
    }
};


</script>
