<template>
    <div class="h-full">
        <div class="grid h-full grid-cols-1 gap-5 lg:grid-cols-2">
            <div class="mt-32">
                <div
                    class="flex h-full flex-col items-center rounded-lg border bg-white p-6 shadow-lg"
                >
                    <!-- Circle image container -->
                    <div class="relative -mt-40 mb-4">
                        <div class="h-52 w-52 overflow-hidden rounded-full bg-cyan-500 p-1">
                            <img 
                                v-if="profileData.photo_url" 
                                :src="profileData.photo_url" 
                                class="h-full w-full rounded-full object-cover" 
                                alt="Profile Photo"
                            />
                            <NuxtImg 
                                v-else 
                                src="/icons/dumbbell.png" 
                                class="h-full w-full rounded-full object-cover" 
                            />
                        </div>
                        <!-- Camera icon button -->
                        <button
                            @click="openPhotoUploadModal"
                            class="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white shadow-lg hover:bg-secondary-600"
                        >
                            <Icon name="fa6-solid:camera" class="text-xl" />
                        </button>
                    </div>
                    <!-- Content container -->
                    <div class="flex flex-col gap-4 text-center">
                        <div>
                            <p class="text-sm text-gray-500">Nombre Profesional</p>
                            <p class="text-2xl font-semibold">
                                {{ profileData.first_name && profileData.last_name 
                                    ? `${profileData.first_name} ${profileData.last_name}` 
                                    : 'Sin información' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Fecha de Nacimiento</p>
                            <p class="text-lg font-medium">
                                {{ formattedBirthDate || 'Sin información' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Correo contacto</p>
                            <p class="text-lg font-medium">
                                {{ userStore.user?.email || 'Sin información' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Número de teléfono de contacto</p>
                            <p class="text-lg font-medium">
                                {{ profileData.phone || 'Sin información' }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Professional Information Section -->
            <div class="rounded-lg border bg-white p-8 shadow-lg">
                <div class="mb-6 flex items-center justify-between">
                    <h3 class="text-2xl font-semibold">Información Profesional</h3>
                    <button 
                        @click="openEditProfileModal" 
                        class="flex items-center gap-2 text-gray-600 hover:text-primary"
                    >
                        <span class="text-sm">Editar</span>
                        <Icon name="fa6-solid:pen" class="text-sm" />
                    </button>
                </div>
                <div class="space-y-6">
                    <div>
                        <p class="text-sm text-gray-500">Título Profesional *</p>
                        <p class="text-lg font-medium">
                            {{ profileData.title || 'No especificado' }}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Instituto o Universidad</p>
                        <p class="text-lg font-medium">
                            {{ profileData.institution || 'No especificado' }}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Biografía</p>
                        <p class="text-base leading-relaxed text-gray-700">
                            {{ profileData.biography || 'No hay biografía disponible' }}
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="flex h-full flex-col items-center justify-between gap-6 rounded-lg border bg-white p-8 shadow-lg"
            >
                <h3 class="text-2xl font-semibold">Tus rangos de cobertura</h3>
                <CommonLoading
                    v-if="getCoverageRangesLoading"
                    text="cargando rangos de cobertura"
                />
                <div v-else-if="getCoverageRangesError">
                    <p class="text-red-500">Hubo un error al cargar los rangos de cobertura</p>
                </div>
                <div v-else-if="!coverageRanges?.success">
                    No hay rangos de cobertura actualmente
                </div>
                <div v-else class="flex flex-col items-center gap-y-2">
                    <div
                        v-for="(range, index) in coverageRanges?.data"
                        class="inline-flex items-center gap-x-2 rounded-full bg-gray-100 px-6 py-1.5"
                    >
                        <p class="font-semibold">{{ range.range_name }}</p>
                        <p class="font-light">{{ range.radius }} km</p>
                        <button @click="openEditModal(index)">
                            <Icon name="fa6-solid:pen-to-square" class="text-primary" />
                        </button>
                    </div>
                </div>
                <CommonButton
                    class="bg-secondary px-5 py-2"
                    @click="
                        resetModal();
                        openModal();
                    "
                >
                    Añadir rango de cobertura
                </CommonButton>
            </div>
        </div>
        <Teleport to="body">
            <CommonModal ref="mapModal">
                <div class="mb-10 mt-2 text-center">
                    <h2 class="text-2xl font-bold">
                        {{ !editMode ? "Nuevo rango de cobertura" : "Edita un rango de cobertura" }}
                    </h2>
                    <p v-show="!editMode" class="text-sm text-gray-500">
                        Selecciona tu ubicación para que los clientes puedan encontrarte más
                        fácilmente.
                    </p>
                </div>
                <div class="grid grid-cols-1 p-5 lg:grid-cols-2">
                    <div class="relative space-y-7 lg:pr-6">
                        <label class="flex w-full flex-col">
                            <span class="mb-2 font-medium">Nombre del rango</span>
                            <input
                                v-model="rangeName"
                                type="text"
                                placeholder="Escribe un nombre intuitivo..."
                                class="w-full rounded-md border px-5 py-3.5 text-sm text-gray-800 outline-none ring-primary focus:ring-2"
                            />
                        </label>
                        <MapsMapboxGeocoder
                            ref="geocoderComponent"
                            @locationSelected="flyToLocation"
                        />
                        <label class="flex w-full flex-col">
                            <span class="text font-medium">Radio de cobertura</span>
                            <p class="mb-3 text-sm text-gray-500">
                                Selecciona el radio de cobertura que deseas tener.
                            </p>
                            <ProfessionalDashboardProfileRangeInput
                                :inputMinValue="inputRadiusMinValue"
                                :inputMaxValue="inputRadiusMaxValue"
                                v-model:sliderValue="inputRadius"
                            />
                        </label>
                    </div>
                    <div
                        class="relative flex h-full min-h-[300px] w-full justify-center lg:min-w-[400px]"
                    >
                        <MapboxMap
                            :map-id="mapID"
                            class="h-full w-full rounded-xl"
                            :options="{
                                style: 'mapbox://styles/mapbox/streets-v12',
                                center: DEFAULT_COORDINATES,
                                zoom: 13,
                            }"
                        >
                            <MapboxSource
                                source-id="circleSource"
                                :source="{
                                    type: 'geojson',
                                    data: circleGeoJSON,
                                }"
                            />
                            <MapboxLayer
                                v-if="circleData.enabled"
                                :layer="{
                                    id: 'circleLayer',
                                    type: 'fill', // or 'line' depending on how you want to style it
                                    source: 'circleSource',
                                    paint: {
                                        'fill-color': circleData.fillColor,
                                        'fill-opacity': circleData.opacity,
                                    },
                                }"
                            />
                            <MapboxDefaultMarker
                                @dragstart="onMarkerDragStart"
                                :marker-id="markerID"
                                :options="{ draggable: true }"
                                :lnglat="markerCoordinates"
                                @dragend="onMarkerDragEnd"
                            >
                            </MapboxDefaultMarker>
                            <MapboxNavigationControl />
                        </MapboxMap>
                    </div>
                </div>
                <div v-show="editMode" class="flex justify-between p-5 pb-2">
                    <CommonButton
                        @click="deleteCoverage"
                        class="bg-tertiary px-5 py-2"
                        :loading="deleteCoverageRangeLoading"
                    >
                        Eliminar rango
                    </CommonButton>
                    <CommonButton
                        @click="saveEditChanges"
                        class="mr-2 px-5 py-2"
                        :loading="updateCoverageRangeLoading"
                    >
                        Guardar cambios
                    </CommonButton>
                </div>
                <div v-show="!editMode" class="flex justify-between p-5 pb-2">
                    <CommonButton @click="closeModal" class="bg-tertiary px-5 py-2">
                        Cancelar
                    </CommonButton>
                    <CommonButton
                        @click="addCoverage"
                        class="px-5 py-2"
                        :loading="addCoverageRangeLoading"
                    >
                        Añadir rango
                    </CommonButton>
                </div>
            </CommonModal>
        </Teleport>
        
        <!-- Profile Modals -->
        <ProfessionalDashboardProfileEditProfileModal
            ref="editProfileModal"
            :profileData="profileData"
            @save="saveProfileChanges"
        />
        
        <ProfessionalDashboardProfilePhotoUploadModal
            ref="photoUploadModal"
            @fileSelected="handleFileSelected"
        />
        
        <ProfessionalDashboardProfilePhotoCropModal
            ref="photoCropModal"
            @confirm="confirmPhotoChange"
        />
    </div>
</template>

<script setup lang="ts">
// @ts-ignore - TypeScript module resolution issue with @turf/circle
import circle from "@turf/circle";
import { useUserStore } from "~/stores/UserStore";
import { useMapInteraction } from "~/composables/maps/useMapInteraction";
import { useGeocoding } from "~/composables/maps/useGeocoding";
import { useToast } from "vue-toastification";

// Types
interface CoverageRange {
    range_id: number;
    range_name: string;
    radius: number;
    lng: number;
    lat: number;
    short_code: string;
}

interface CoverageRangesResponse {
    success: boolean;
    message?: string;
    data: CoverageRange[];
}

const DEFAULT_COORDINATES: [number, number] = [-71.593916, -33.040681];
const DEFAULT_RADIUS = "1";
const MIN_RADIUS = 1;
const MAX_RADIUS = 30;
const CIRCLE_OPACITY = 0.5;

const editMode = ref(false);
const editIndex = ref<number | null>(null);

const addCoverageRangeLoading = ref(false);
const updateCoverageRangeLoading = ref(false);
const deleteCoverageRangeLoading = ref(false);
const rangeName = ref("");

// Composables
const userStore = useUserStore();

// Profile data
const profileData = reactive({
    photo_url: (userStore.user as Professional)?.photo_url || null,
    first_name: (userStore.user as Professional)?.first_name || '',
    last_name: (userStore.user as Professional)?.last_name || '',
    birth_date: (userStore.user as Professional)?.birth_date || '',
    phone: (userStore.user as Professional)?.phone || '',
    title: (userStore.user as Professional)?.title || '',
    institution: (userStore.user as Professional)?.institution || '',
    biography: (userStore.user as Professional)?.biography || ''
});

// Format birth date for display (DD/MM/YYYY)
const formattedBirthDate = computed(() => {
    if (!profileData.birth_date) return '';
    const date = new Date(profileData.birth_date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
});

// IDs
const markerID = ref("draggableMarker");
const mapID = ref("map");

// Refs
const mapRef = useMapboxRef(mapID.value);
const marker = useMapboxMarkerRef(markerID.value);
const geocoderComponent = ref<{ updateSearchTerm: (term: string) => void } | null>(null);

// Data
const mapZoom = computed(() => {
    return mapRef.value?.getZoom();
});

// Radius Input
const inputRadiusMinValue = ref(MIN_RADIUS);
const inputRadiusMaxValue = ref(MAX_RADIUS);
const inputRadius = ref(DEFAULT_RADIUS); // Default radius in kilometers (km)

// Radius circle
const markerCoordinates = ref<[number, number]>(DEFAULT_COORDINATES);

const circleData = reactive({
    enabled: false,
    opacity: 0.5,
    fillColor: "#007cbf",
    center: computed(() => {
        return markerCoordinates.value;
    }),
});

// Composables
const runtimeConfig = useRuntimeConfig();
const {
    prepareFlyTo,
    calculateZoomLevel,
    calculateTransitionSpeedBasedOnZoomDifference,
    debounceFlyTo,
} = useMapInteraction(mapRef);
const { getReverseGeocodingData } = useGeocoding();
const toast = useToast();

// Methods

const {
    data: coverageRanges,
    error: getCoverageRangesError,
    pending: getCoverageRangesLoading,
    refresh: getCoverageRanges,
} = await useFetch<CoverageRangesResponse>(
    `${runtimeConfig.public.apiBase}/professional/range/user/${userStore.user?.user_id}`,
    {
        method: "GET",
        credentials: "include",
        lazy: true,
    },
);

const addCoverage = async () => {
    addCoverageRangeLoading.value = true;
    const geoData = await getReverseGeocodingData(markerCoordinates.value);
    const short_code = geoData.context[3].short_code;

    const body = {
        user_id: userStore.user?.user_id,
        range_name: rangeName.value,
        radius: inputRadius.value,
        lng: markerCoordinates.value[0],
        lat: markerCoordinates.value[1],
        short_code: short_code,
    };

    try {
        const response = await $fetch<{ success: boolean; message: string }>(`${runtimeConfig.public.apiBase}/professional/range`, {
            method: "POST",
            credentials: "include",
            body: body,
        });

        if (response.success) {
            toast.success(response.message);
            getCoverageRanges();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        addCoverageRangeLoading.value = false;
        closeModal();
    }
};

const saveEditChanges = async () => {
    updateCoverageRangeLoading.value = true;
    const rangeID = coverageRanges.value!.data[editIndex.value!].range_id;

    // Prepare the request body
    const body = {
        range_id: rangeID,
        updatedColumns: {
            range_name: rangeName.value,
            radius: inputRadius.value,
        },
    };

    try {
        const response = await $fetch<{ success: boolean; message: string }>(`${runtimeConfig.public.apiBase}/professional/range`, {
            method: "PUT",
            credentials: "include",
            body: body,
        });

        if (response.success) {
            toast.success("Rango de cobertura actualizado exitosamente");
            getCoverageRanges();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        updateCoverageRangeLoading.value = false;
        closeModal();
        editMode.value = false;
    }
};

const deleteCoverage = async () => {
    deleteCoverageRangeLoading.value = true;
    const rangeID = coverageRanges.value!.data[editIndex.value!].range_id;

    try {
        const response = await $fetch<{ success: boolean; message: string }>(
            `${runtimeConfig.public.apiBase}/professional/delete-range/${rangeID}`,
            {
                method: "DELETE",
                credentials: "include",
            },
        );

        if (response.success) {
            toast.success("Rango de cobertura eliminado exitosamente");
            getCoverageRanges();
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        deleteCoverageRangeLoading.value = false;
        closeModal();
    }
};

const resetModal = () => {
    rangeName.value = "";
    inputRadius.value = DEFAULT_RADIUS;
    setMarkerCoordinates(DEFAULT_COORDINATES);
};

const openEditModal = (index: number) => {
    rangeName.value = coverageRanges.value!.data[index].range_name;
    inputRadius.value = String(coverageRanges.value!.data[index].radius);
    const coordinates: [number, number] = [
        coverageRanges.value!.data[index].lng,
        coverageRanges.value!.data[index].lat,
    ];
    setMarkerCoordinates(coordinates);
    editIndex.value = index;
    editMode.value = true;
    openModal();
};

const createGeojsonCircle = (center: number[], radiusInKm: string | number) => {
    if (!center || center.length !== 2 || !radiusInKm) {
        throw new Error(`Invalid inputs for creating a circle: ${center}, ${radiusInKm}`);
    }
    return circle(center, radiusInKm, { steps: 80, units: "kilometers" });
};

const circleGeoJSON = computed(() => {
    return createGeojsonCircle(circleData.center, inputRadius.value);
});

const flyToCenter = () => {
    const zoom = calculateZoomLevel(inputRadius.value);
    const currentZoom = mapZoom.value;
    const transitionSpeed = calculateTransitionSpeedBasedOnZoomDifference(currentZoom, zoom);

    debounceFlyTo(circleData.center, zoom, {
        speed: transitionSpeed,
    });
};

watch(
    inputRadius,
    () => {
        flyToCenter();
    },
    { immediate: true },
);

const flyToLocation = (location: { center: number[] }) => {
    setCircleOpacity(0);
    const newCoordinates = location.center as [number, number];
    const currentLocation = mapRef.value?.getCenter().toArray();
    const { duration, zoom } = prepareFlyTo(currentLocation, newCoordinates, inputRadius.value);

    debounceFlyTo(newCoordinates, zoom, { duration });

    if (mapRef.value) {
        mapRef.value.once("moveend", () => {
            setMarkerCoordinates(newCoordinates);
            setCircleOpacity(CIRCLE_OPACITY);
        });
    }
};

const setMarkerCoordinates = (coordinates: [number, number]) => {
    if (!marker.value) return;
    const currentCoordinates = marker.value.getLngLat().toArray();
    const { duration, zoom } = prepareFlyTo(currentCoordinates, coordinates, inputRadius.value);
    markerCoordinates.value = coordinates;
    updateInputValue();
    debounceFlyTo(coordinates, zoom, { duration });
};

const onMarkerDragStart = () => {
    setCircleOpacity(0);
};

const onMarkerDragEnd = () => {
    if (!marker.value) return;
    const newCoordinates = marker.value.getLngLat().toArray() as [number, number];
    markerCoordinates.value = newCoordinates;
    setCircleOpacity(CIRCLE_OPACITY);
    flyToCenter();
    updateInputValue();
};

const setCircleOpacity = (opacity: number) => {
    circleData.opacity = opacity;
};

//updates geocoder input value
const updateInputValue = async () => {
    const geocodingData = await getReverseGeocodingData(markerCoordinates.value);
    const address = geocodingData.place_name;
    if (geocoderComponent.value) {
        geocoderComponent.value.updateSearchTerm(address);
    }
};

// Modal refs
interface ModalRef {
    openModal: () => void;
    closeModal: () => void;
}

interface PhotoCropModalRef {
    openModal: (data: { file: File; url: string }) => void;
    closeModal: () => void;
    setUploading: (value: boolean) => void;
}

const mapModal = ref<ModalRef | null>(null);
const editProfileModal = ref<ModalRef | null>(null);
const photoUploadModal = ref<ModalRef | null>(null);
const photoCropModal = ref<PhotoCropModalRef | null>(null);

// Map modal methods
const openModal = () => {
    mapModal.value?.openModal();
};

const closeModal = () => {
    mapModal.value?.closeModal();
};

// Profile editing modal methods
const openEditProfileModal = () => {
    editProfileModal.value?.openModal();
};

const saveProfileChanges = async (updatedData: Partial<typeof profileData>) => {
    try {
        toast.info('Guardando cambios...');
        
        const response = await $fetch<{ success: boolean; message: string }>(
            `${runtimeConfig.public.apiBase}/professional/profile`,
            {
                method: 'PUT',
                credentials: 'include',
                body: {
                    user_id: userStore.user?.user_id,
                    updates: updatedData
                }
            }
        );

        if (response.success) {
            // Update local profile data
            Object.assign(profileData, updatedData);
            
            // Update userStore with new data
            const updatedUser = { ...userStore.user, ...updatedData } as Professional;
            userStore.setUser(updatedUser);
            
            toast.success(response.message || 'Perfil actualizado exitosamente');
            editProfileModal.value?.closeModal();
        } else {
            toast.error(response.message || 'Error al actualizar el perfil');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Error al actualizar el perfil');
    }
};

// Photo upload modal methods
const openPhotoUploadModal = () => {
    photoUploadModal.value?.openModal();
};

const handleFileSelected = (data: { file: File; url: string }) => {
    if (photoCropModal.value) {
        photoCropModal.value.openModal(data);
    }
};

const confirmPhotoChange = async (data: { file: File; url: string; transformations: any }) => {
    try {
        toast.info('Procesando imagen...');
        
        // Apply transformations to the image before uploading (square format)
        const processedBlob = await processImageToSquare(data.url, data.transformations);
        
        if (!processedBlob) {
            toast.error('Error al procesar la imagen');
            photoCropModal.value?.setUploading(false);
            photoCropModal.value?.closeModal();
            return;
        }
        
        toast.info('Subiendo imagen...');
        
        // Upload processed image to Cloudinary (square format)
        const processedFile = new File([processedBlob], data.file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' });
        const cloudinaryUrl = await uploadToCloudinary(processedFile);
        
        if (cloudinaryUrl) {
            // Update backend with new photo URL
            const response = await $fetch<{ success: boolean; message: string }>(
                `${runtimeConfig.public.apiBase}/professional/profile`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    body: {
                        user_id: userStore.user?.user_id,
                        updates: {
                            photo_url: cloudinaryUrl
                        }
                    }
                }
            );

            if (response.success) {
                profileData.photo_url = cloudinaryUrl;
                
                // Update userStore with new photo
                const updatedUser = { ...userStore.user, photo_url: cloudinaryUrl } as Professional;
                userStore.setUser(updatedUser);
                
                toast.success('Foto de perfil actualizada exitosamente');
            } else {
                toast.error(response.message || 'Error al actualizar la foto de perfil');
            }
            photoCropModal.value?.closeModal();
        } else {
            toast.error('Error al subir la imagen');
            photoCropModal.value?.closeModal();
        }
    } catch (error) {
        console.error('Error uploading photo:', error);
        toast.error('Error al subir la imagen');
        photoCropModal.value?.closeModal();
    } finally {
        photoCropModal.value?.setUploading(false);
    }
};

// Process image to square with transformations (scale and position)
const processImageToSquare = (imageUrl: string, transformations: any): Promise<Blob | null> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
            const outputSize = 1024; // High quality output (1024x1024px)
            const containerSize = 256; // Preview container size
            const canvas = document.createElement('canvas');
            canvas.width = outputSize;
            canvas.height = outputSize;
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
                resolve(null);
                return;
            }
            
            // Enable image smoothing for better quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Fill background with white (optional, for transparency handling)
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, outputSize, outputSize);
            
            // Get transformations
            const scale = transformations.scale || 1;
            const posX = transformations.position?.x || 0;
            const posY = transformations.position?.y || 0;
            
            // Calculate scale factor from container to output
            const scaleFactor = outputSize / containerSize;
            
            // Calculate how the image is displayed with object-fit: contain
            const imgAspect = img.naturalWidth / img.naturalHeight;
            
            let displayWidth, displayHeight;
            
            if (imgAspect > 1) {
                // Wider image - width fills container, height is proportional
                displayWidth = containerSize;
                displayHeight = containerSize / imgAspect;
            } else {
                // Taller image - height fills container, width is proportional
                displayHeight = containerSize;
                displayWidth = containerSize * imgAspect;
            }
            
            // Apply user scale transformation
            const scaledWidth = displayWidth * scale * scaleFactor;
            const scaledHeight = displayHeight * scale * scaleFactor;
            
            // Calculate centered position (object-fit: contain centers the image)
            const baseX = (outputSize - scaledWidth) / 2;
            const baseY = (outputSize - scaledHeight) / 2;
            
            // Apply user position transformations
            const finalX = baseX + (posX * scaleFactor);
            const finalY = baseY + (posY * scaleFactor);
            
            // Draw the image
            ctx.drawImage(img, finalX, finalY, scaledWidth, scaledHeight);
            
            // Convert to blob with high quality JPEG
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg', 0.95);
        };
        
        img.onerror = () => {
            resolve(null);
        };
        
        img.src = imageUrl;
    });
};

// Cloudinary upload function
const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const cloudName = runtimeConfig.public.cloudinaryCloudName;
    const uploadPreset = runtimeConfig.public.cloudinaryUploadPreset;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'profile_photos');
    
    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );
        
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return null;
    }
};

onMounted(() => {
    setupMap();
});

const setupMap = () => {
    if (mapRef.value) {
        circleData.enabled = true;
    }
    updateInputValue();
};

onUpdated(() => {
    circleData.enabled = true;
});
</script>
