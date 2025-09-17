<template>
    <div>
        <div class="space-y-4">
            <div>
                <h3 class="text-xl font-medium">Sesiones en curso</h3>
            </div>
            <div
                class="items-center gap-6 space-y-3 rounded-2xl border border-zinc-200 bg-white px-6 py-4"
                style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.1)"
            >
                <p class="text-center text-lg font-semibold">No hay sesiones en curso</p>
            </div>
            <h3 class="text-xl font-medium">Sesiones reservadas</h3>
            <CommonLoading v-if="futureSessionsLoading" />
            <div v-else-if="futureSessions?.success">
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div
                        v-for="session in futureSessions.sessions"
                        :key="session.session_id"
                        class="items-center rounded-2xl shadow-lg"
                        :class="session.confirmed ? 'bg-primary' : 'bg-secondary'"
                    >
                        <div class="rounded-2xl bg-white px-6 py-4">
                            <div class="flex justify-between gap-1">
                                <div class="text-gray-400">
                                    <p>{{ formatDate(session.date) }}</p>
                                </div>
                                <div class="text-right text-gray-400">
                                    <p>{{ session.time }}hrs</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-center gap-2 py-2">
                                <h3 class="text-2xl font-semibold">
                                    {{
                                        session.professional.first_name +
                                        " " +
                                        session.professional.last_name
                                    }}
                                </h3>
                                <p class="font-light text-gray-700">
                                    {{ session.professional.title }}
                                </p>
                                <p class="text-lg font-medium text-[#0EB3E0]">
                                    {{ session.professional.phone }}
                                </p>
                                <p v-if="session.link == ''" class="text-gray-700">
                                    Aún no hay link de acceso
                                </p>
                                <a
                                    v-else-if="session.modality === 'Online'"
                                    :href="session.link || ''"
                                    target="_blank"
                                    class="flex items-center gap-1 text-xl font-medium text-secondary underline decoration-secondary underline-offset-2"
                                >
                                    <Icon name="icon-park-outline:new-computer" />
                                    <p>Online</p>
                                </a>
                                <a
                                    v-else
                                    :href="session.link || ''"
                                    target="_blank"
                                    class="flex items-center gap-1 text-xl font-medium text-secondary decoration-secondary underline-offset-2"
                                >
                                    <Icon name="heroicons:map-pin" />
                                    <p>Lugar</p>
                                </a>
                            </div>
                        </div>
                        <div class="flex items-center justify-center px-5 py-2 text-white">
                            <button
                                v-show="!session.confirmed"
                                class=""
                                @click="viewSessionDetails(session)"
                            >
                                Ver detalles/Confirmar asistencia
                            </button>
                            <div v-show="session.confirmed" class="text-white">
                                Asistencia confirmada
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="!futureSessionsLoading && !futureSessions?.success">
                <div
                    class="items-center gap-6 space-y-3 rounded-2xl border border-zinc-200 bg-white px-6 py-4"
                    style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.1)"
                >
                    <p class="text-center text-lg font-semibold">
                        {{ futureSessions?.message }}
                    </p>
                </div>
            </div>
            <div>
                <h3 class="text-xl font-medium">Sesiones pasadas</h3>
            </div>
            <CommonLoading v-if="pastSessionsLoading" />
            <div v-else-if="pastSessions?.success">
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div
                        v-for="session in pastSessions.sessions"
                        :key="session.session_id"
                        class="items-center gap-6 space-y-3 rounded-2xl border border-zinc-200 bg-white px-6 py-4 opacity-60 transition-opacity hover:opacity-100"
                        style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.1)"
                    >
                        <div class="px-3">
                            <div class="grid grid-cols-2 gap-1">
                                <div class="text-left text-sm text-[#949494]">
                                    <p>{{ formatDate(session.date) }}</p>
                                </div>
                                <div class="text-right text-sm text-[#949494]">
                                    <p>{{ session.time }}hrs</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-center gap-y-2">
                                <b class="text-lg font-medium text-[#000000]">{{
                                    session.format + " - " + session.modality
                                }}</b>
                                <a
                                    :href="session.link || ''"
                                    target="_blank"
                                    ss="text-xl font-medium underline text-secondary decoration-secondary underline-offset-2"
                                    >Link</a
                                >
                                <p class="text-[#949494]">
                                    {{
                                        session.professional.first_name +
                                        " " +
                                        session.professional.last_name +
                                        " - " +
                                        session.professional.title
                                    }}
                                </p>
                            </div>
                            <div class="gap-2 text-center text-base text-[#949494]">
                                <p>Calificar sesión</p>
                                <div class="flex place-content-center">
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="bg-white py-4 px-6 rounded-2xl border border-zinc-200 gap-6 items-center space-y-3 opacity-60"
                        style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.10);">
                        <div class="px-3">
                            <div class="grid grid-cols-2 gap-1">
                                <div class="text-[#949494] text-sm text-left">
                                    <p>26 de Junio</p>
                                </div>
                                <div class="text-[#949494] text-sm text-right">
                                    <p>16:00hrs</p>
                                </div>
                            </div>
                            <div class="text-[#000000] text-lg font-medium text-center"><b>Tipo de sesión</b></div>
                            <div class="text-[#949494] text-base text-center">Nombre Profesional - Tipo Profesional</div>
                            <div class="text-[#0EB3E0] text-2xl font-medium text-center"><a href="#">Online</a></div>
                            <div class="text-[#949494] text-base text-center gap-2">
                                <p>Calificar sesión</p>
                                <div class="flex place-content-center">
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                    <Icon class="text-[#949494]" name="heroicons:star-20-solid" />
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <div v-else>
                <div
                    class="items-center gap-6 space-y-3 rounded-2xl border border-zinc-200 bg-white px-6 py-4"
                    style="box-shadow: 0px 4px 50px -16px rgba(0, 0, 0, 0.1)"
                >
                    <div class="text-md text-center">
                        <b>{{ pastSessions?.message }}</b>
                    </div>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <CommonModal ref="detailsModal">
                <div class="p-4">
                    <div class="grid grid-cols-1 lg:grid-cols-2">
                        <div>
                            <h3 class="mb-4 text-center text-xl font-semibold">
                                Detalles de la sesión
                            </h3>
                            <div class="space-y-2" v-if="detailsModalSession != null">
                                <div class="grid grid-cols-2 gap-x-4">
                                    <h4 class="place-self-end">Profesional:</h4>
                                    <p class="font-semibold">
                                        {{
                                            detailsModalSession.professional.first_name +
                                            " " +
                                            detailsModalSession.professional.last_name
                                        }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2 gap-x-4">
                                    <h4 class="place-self-end">Hora:</h4>
                                    <p class="font-semibold">
                                        {{ detailsModalSession.time }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2 gap-x-4">
                                    <h4 class="place-self-end">Fecha:</h4>
                                    <p class="font-semibold">
                                        {{ detailsModalSession.date }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2 gap-x-4">
                                    <h4 class="place-self-end">Modalidad:</h4>
                                    <p class="font-semibold">
                                        {{ detailsModalSession.modality }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 class="mb-3 text-center text-xl font-semibold">Sobre ti</h3>
                            <div
                                class="space-y-2"
                                v-if="
                                    !userDataLoading &&
                                    userData &&
                                    userData.info &&
                                    userData.success
                                "
                            >
                                <div class="grid grid-cols-2 gap-x-4">
                                    <h4 class="place-self-end">Alumno:</h4>
                                    <p class="font-semibold">
                                        {{
                                            userData.info.first_name + " " + userData.info.last_name
                                        }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2 gap-x-4">
                                    <h4 class="place-self-end">Edad:</h4>
                                    <p class="font-semibold">
                                        {{ calculateAge(userData.info.birth_date ?? "") }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2 gap-x-4">
                                    <h4 class="place-self-end">Genero:</h4>
                                    <p class="font-semibold">
                                        {{ userData.info.gender }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2 gap-x-4">
                                    <h4 class="place-self-end">Email:</h4>
                                    <p class="font-semibold">
                                        {{ user?.email }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2 gap-x-4">
                                    <h4 class="place-self-end">Teléfono:</h4>
                                    <p class="font-semibold">
                                        {{ userData.info.phone }}
                                    </p>
                                </div>
                            </div>
                            <div
                                v-else-if="
                                    userData && !userData.success && professionalWillFillUserData
                                "
                            >
                                <p class="text-center">
                                    Aún no has rellenado tus datos de estudiante
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p class="mx-auto max-w-xl text-center text-xs">
                            * Se te enviará el link de acceso a la reunión vía Google Meet por
                            correo electrónico para que logres entrar a la sesión de forma online.
                            También puedes acceder desde la pestaña de reservas.
                        </p>
                    </div>
                    <div class="mt-4 flex flex-col gap-2 lg:flex-row lg:justify-between">
                        <CommonButton
                            class="bg-tertiary px-4 py-2"
                            @click="detailsModal?.closeModal()"
                        >
                            Cancelar
                        </CommonButton>
                        <CommonButton @click="openModalDelete" class="bg-tertiary px-5 py-2">
                            Eliminar Reserva
                        </CommonButton>
                        <CommonButton
                            class="px-4 py-2"
                            @click="confirmSession"
                            :loading="confirmAttendanceLoading"
                        >
                            Confirmar asistencia
                        </CommonButton>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
        <Teleport to="body">
            <CommonModal ref="fillUserDataModal">
                <div class="max-w-3xl p-4">
                    <div class="text-center">
                        <h3 class="mb-4 text-2xl font-semibold text-primary">
                            Aún no has rellenados tus datos de estudiante
                        </h3>
                        <p>
                            Para poder agendar una sesión, es recomendable que rellenes tus datos de
                            estudiante. De esta manera, el profesional podrá contactarte en caso de
                            ser necesario, y podrá conocer datos que serán necesarios para realizar
                            los entrenamientos.
                        </p>
                        <p class="mt-4 font-medium">
                            Si así lo prefieres, puedes dejar que el profesional rellene tus datos
                            por ti.
                        </p>
                    </div>
                    <div class="mt-6 flex flex-col items-center gap-5 lg:flex-row">
                        <div class="w-full text-center">
                            <CommonButton
                                class="w-full px-5 py-2"
                                bg-color="secondary"
                                @click="handleProfessionalWillFillUserData"
                            >
                                Dejar que el profesional rellene mis datos
                            </CommonButton>
                            <p class="mx-auto mt-1.5 max-w-64 text-xs font-medium">
                                El profesional se encargará de rellenar tus datos al momento de
                                realizar la sesión
                            </p>
                        </div>
                        <div class="w-full text-center">
                            <CommonButton class="w-full px-5 py-2" @click="goToFillUserData">
                                Rellenar mis datos
                            </CommonButton>
                            <p class="mx-auto mt-1.5 max-w-64 text-xs font-medium">
                                Te llevaremos a la sección de rellenar datos de estudiante
                            </p>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
        <Teleport to="body">
            <CommonModal ref="modalDelete">
                <div class="p-4 text-center">
                    <div class="mb-4">
                        <h3 class="mb-2 text-2xl font-semibold">
                            ¿Estas seguro/a de eliminar esta reserva?
                        </h3>
                    </div>
                    <div class="flex flex-col gap-4 lg:flex-row lg:justify-center">
                        <div>
                            <CommonButton
                                bg-color="tertiary"
                                class="px-4 py-2"
                                @click="closeDeleteModal()"
                            >
                                Cancelar
                            </CommonButton>
                        </div>
                        <div>
                            <CommonButton class="px-4 py-2" @click="deleteScheduleSession()">
                                Si, estoy seguro/a
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from "~/stores/UserStore";
import { useToast } from "vue-toastification";
import Modal from "~/components/common/Modal.vue";

const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const user: null | User | Student = userStore.user;

interface APISessionResponseType extends APIResponse {
    sessions?: SessionExtended[];
}

interface APIUserResponseType extends APIResponse {
    info?: StudentInfo;
}

const confirmAttendanceLoading = ref(false);
const professionalWillFillUserData = ref(false);
const detailsModal = ref<Modal | null>(null);
const fillUserDataModal = ref<Modal | null>(null);
const detailsModalSession = ref<SessionExtended | null>(null);

// Utility function to format date
const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleString("es-ES", { day: "2-digit", month: "long" });
};

const { data: userData, pending: userDataLoading } = await useFetch<APIUserResponseType>(
    `${runtimeConfig.public.apiBase}/student/info/${userStore.user?.user_id}`,
    {
        method: "GET",
        credentials: "include",
        lazy: true,
    },
);

const viewSessionDetails = (session: SessionExtended) => {
    detailsModalSession.value = session;
    if (userData.value?.success || professionalWillFillUserData.value) {
        detailsModal.value?.openModal();
    } else {
        fillUserDataModal.value?.openModal();
    }
};

const handleProfessionalWillFillUserData = () => {
    professionalWillFillUserData.value = true;
    fillUserDataModal.value?.closeModal();
    detailsModal.value?.openModal();
};

const goToFillUserData = () => {
    fillUserDataModal.value?.closeModal();
    router.push("/user/dashboard/aboutYou");
};

const calculateAge = (dob: string): number => {
    const [year, month, day] = dob.split("-").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

// Fetch future sessions
const {
    data: futureSessions,
    pending: futureSessionsLoading,
    refresh: refreshFutureSessions,
    error: futureSessionsError,
} = await useFetch<APISessionResponseType>(
    `${runtimeConfig.public.apiBase}/student/${userStore.user?.user_id}/sessions/future`,
    {
        method: "GET",
        credentials: "include",
        lazy: true,
    },
);

// Fetch past sessions
const {
    data: pastSessions,
    pending: pastSessionsLoading,
    refresh: refreshPastSessions,
    error: pastSessionsError,
} = await useFetch<APISessionResponseType>(
    `${runtimeConfig.public.apiBase}/student/${userStore.user?.user_id}/sessions/past`,
    {
        method: "GET",
        credentials: "include",
        lazy: true,
    },
);

const confirmSession = async () => {
    confirmAttendanceLoading.value = true;

    const body = {
        user_id: user?.user_id,
        session_id: detailsModalSession.value?.session_id,
    };

    try {
        const response: APIResponse = await $fetch<APIResponse>(
            `${runtimeConfig.public.apiBase}/student/session/confirm`,
            {
                method: "PUT",
                credentials: "include",
                body: body,
            },
        );

        if (response.success) {
            detailsModal.value?.closeModal();
            refreshFutureSessions();
            toast.success("Asistencia confirmada con éxito");
        } else {
            console.log(response.message);
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("Ocurrió un error al confirmar la asistencia");
    } finally {
        confirmAttendanceLoading.value = false;
    }
};

watchEffect(() => {
    route.path;
    refreshFutureSessions();
});

const modalDelete = ref(Modal);

const openModalDelete = () => {
    modalDelete.value.openModal();
};

const deleteScheduleSession = async () => {
    modalDelete.value.closeModal();
    try {
        const response: APIResponse = await $fetch(
            `${runtimeConfig.public.apiBase}/student/cancel-session`,
            {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({
                    user_id: userStore.user?.user_id,
                    session_id: detailsModalSession.value?.session_id,
                }),
            },
        );

        if (response.success) {
            toast.success("Reserva eliminada con éxito");
            //reload page
            reloadNuxtApp();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("Ocurrió un error al eliminar la reserva. Intente más tarde.");
    }
};
const closeDeleteModal = () => {
    modalDelete.value.closeModal();
};
const { setSEO } = useSEO();
setSEO({
  title: 'Revisa tus Sesiones agendadas - Entrena en Casa',
  description: 'Revisa y gestiona tus sesiones agendadas con personal trainer online, a domicilio o grupales. Controla tu entrenamiento fácil y rápido con EntrenaEnCasa.',
  keywords: [
    "personal trainer a domicilio", "entrenamiento online", "ejercicios con hijos", "entrenador funcional casa", "personal trainer santiago centro",
    "sesión online", "sesión personalizada", "sesión grupal", "sesiones agendadas", "clases fitness hogar"
  ],
  image: '/SEO/user/dashboard/programmedSessions.png',
  type: 'website'
})


</script>
