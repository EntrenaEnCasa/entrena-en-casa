<template>
    <div>
        <Teleport to="body">
            <CommonModal ref="modal">
                <div class="grid grid-cols-2 gap-4 p-10">
                    <div>
                        <div class="text-sm text-gray-800">Fecha</div>
                        <div class="text-lg font-semibold text-gray-800">
                            {{ props.session ? formatDate(props.session.date) : "" }}
                        </div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-800">Hora</div>
                        <div class="text-lg font-semibold text-gray-800">
                            {{ props.session?.time }}hrs
                        </div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-800">Formato</div>
                        <div class="text-lg font-semibold text-gray-800">
                            {{ props.session?.format }}
                        </div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-800">Modalidad</div>
                        <div class="text-lg font-semibold text-gray-800">
                            {{ props.session?.modality }}
                        </div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-800">Enlace Reunión o Dirección</div>
                        <div class="text-lg font-semibold text-gray-800">
                            <a :href="props.session?.link" target="_blank" class="text-primary"
                                >Ir a la sesión</a
                            >
                        </div>
                    </div>
                    <div>
                        <div class="text-sm text-gray-800">Profesional</div>
                        <div class="text-lg font-semibold text-gray-800">
                            {{ props.session?.professional?.first_name }}
                            {{ props.session?.professional?.last_name }}
                        </div>
                    </div>
                </div>
            </CommonModal>
        </Teleport>
    </div>
</template>
<script setup lang="ts">
const modal = ref<Modal | null>(null);

const openModal = () => {
    modal.value?.openModal();
};

interface Session {
    session_id: number;
    date: string;
    time: string;
    available: boolean;
    modality: string;
    format: string;
    link: string;
    coordinates: string | null;
    professional: Professional;
}
interface Professional {
    first_name: string;
    last_name: string;
    title: string;
    phone: string | null;
    email: string;
}
const props = defineProps<{
    session: Session | null;
}>();

const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};
defineExpose({
    openModal,
});
</script>
