<template>
    <CommonModal ref="modalRef">
        <div class="relative mb-8 mt-2 text-center">
            <button
                @click="closeModal"
                class="absolute left-0 top-0 text-2xl text-gray-500 hover:text-gray-700"
            >
                <Icon name="fa6-solid:xmark" />
            </button>
            <h2 class="text-2xl font-bold">Subir Fotografía</h2>
        </div>
        <div class="flex flex-col items-center p-5">
            <div class="relative mb-6">
                <div 
                    class="h-64 w-64 overflow-hidden rounded-full border-4 border-secondary"
                    :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
                    ref="cropPreviewContainer"
                    @mousedown="startDrag"
                    @touchstart="startDrag"
                >
                    <img
                        v-if="imageUrl"
                        ref="imageElement"
                        :src="imageUrl"
                        :style="{
                            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
                            transformOrigin: 'center center',
                            pointerEvents: 'none',
                            userSelect: 'none',
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                        }"
                        draggable="false"
                        alt="Preview"
                        @load="onImageLoad"
                    />
                </div>
            </div>
            <div class="mb-4 w-full max-w-md">
                <p class="mb-2 text-center font-medium">Zoom</p>
                <div class="flex items-center gap-4">
                    <button @click="decreaseZoom" class="text-primary">
                        <Icon name="fa6-solid:minus" />
                    </button>
                    <input
                        v-model.number="imageScale"
                        type="range"
                        :min="minScale"
                        max="3"
                        step="0.1"
                        class="flex-1"
                    />
                    <button @click="increaseZoom" class="text-primary">
                        <Icon name="fa6-solid:plus" />
                    </button>
                </div>
            </div>
            <p class="mb-6 text-sm text-gray-500">
                Arrastra la imagen para reposicionarla y<br />usa los controles de zoom para ajustar el tamaño
            </p>
        </div>
        <div class="flex justify-between p-5 pb-2">
            <CommonButton 
                @click="closeModal" 
                class="bg-tertiary px-5 py-2"
                :disabled="isUploading"
            >
                Cancelar
            </CommonButton>
            <CommonButton 
                @click="confirmChange" 
                class="bg-lime-500 px-5 py-2 hover:bg-lime-600"
                :loading="isUploading"
                :disabled="isUploading"
            >
                {{ isUploading ? 'Subiendo...' : 'Confirmar Cambio' }}
            </CommonButton>
        </div>
    </CommonModal>
</template>

<script setup>
const emit = defineEmits(['confirm']);

const modalRef = ref(null);
const cropPreviewContainer = ref(null);
const imageElement = ref(null);
const imageUrl = ref(null);
const imageFile = ref(null);
const imageScale = ref(1);
const minScale = ref(1);
const imagePosition = reactive({ x: 0, y: 0 });
const isDragging = ref(false);
const dragStart = reactive({ x: 0, y: 0 });
const isUploading = ref(false);
const imageDimensions = reactive({ width: 0, height: 0 });
const containerSize = 256; // 64 * 4 (256px)

const onImageLoad = () => {
    if (imageElement.value) {
        imageDimensions.width = imageElement.value.naturalWidth;
        imageDimensions.height = imageElement.value.naturalHeight;
        
        // Calculate minimum scale so the image covers the entire circle
        // With object-fit: contain, we need to scale up to fill the shortest dimension
        const imgAspect = imageDimensions.width / imageDimensions.height;
        
        // For a square container (aspect ratio 1:1)
        if (imgAspect > 1) {
            // Wider image: height fits, need to scale to fill width
            minScale.value = imgAspect;
        } else {
            // Taller image: width fits, need to scale to fill height
            minScale.value = 1 / imgAspect;
        }
        
        // Start at minimum scale to show full coverage
        imageScale.value = minScale.value;
    }
};

const getMaxMovement = () => {
    const scaledWidth = containerSize * imageScale.value;
    const scaledHeight = containerSize * imageScale.value;
    
    const maxX = (scaledWidth - containerSize) / 2;
    const maxY = (scaledHeight - containerSize) / 2;
    
    return { maxX: Math.max(0, maxX), maxY: Math.max(0, maxY) };
};

const constrainPosition = (x, y) => {
    const { maxX, maxY } = getMaxMovement();
    
    return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y))
    };
};

const openModal = (data) => {
    imageUrl.value = data.url;
    imageFile.value = data.file;
    // Reset position and scale (scale will be recalculated on image load)
    imageScale.value = 1;
    minScale.value = 1;
    imagePosition.x = 0;
    imagePosition.y = 0;
    modalRef.value.openModal();
};

const closeModal = () => {
    modalRef.value?.closeModal();
    // Clean up
    imageUrl.value = null;
    imageFile.value = null;
    isUploading.value = false;
};

const confirmChange = () => {
    isUploading.value = true;
    emit('confirm', {
        url: imageUrl.value,
        file: imageFile.value,
        transformations: {
            scale: imageScale.value,
            position: { ...imagePosition }
        }
    });
    // Note: closeModal will be called from parent after upload completes
};

const increaseZoom = () => {
    if (imageScale.value < 3) {
        imageScale.value = Math.min(3, imageScale.value + 0.1);
        // Re-constrain position after zoom change
        const constrained = constrainPosition(imagePosition.x, imagePosition.y);
        imagePosition.x = constrained.x;
        imagePosition.y = constrained.y;
        adjustZoomToFit();
    }
};

const decreaseZoom = () => {
    if (imageScale.value > minScale.value) {
        imageScale.value = Math.max(minScale.value, imageScale.value - 0.1);
        // Re-constrain position after zoom change
        const constrained = constrainPosition(imagePosition.x, imagePosition.y);
        imagePosition.x = constrained.x;
        imagePosition.y = constrained.y;
        adjustZoomToFit();
    }
};

const startDrag = (event) => {
    event.preventDefault();
    isDragging.value = true;
    
    const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
    const clientY = event.type.includes('touch') ? event.touches[0].clientY : event.clientY;
    
    dragStart.x = clientX - imagePosition.x;
    dragStart.y = clientY - imagePosition.y;
    
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('touchend', stopDrag);
};

const onDrag = (event) => {
    if (!isDragging.value) return;
    event.preventDefault();
    
    const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
    const clientY = event.type.includes('touch') ? event.touches[0].clientY : event.clientY;
    
    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    
    const constrained = constrainPosition(newX, newY);
    imagePosition.x = constrained.x;
    imagePosition.y = constrained.y;
};

const stopDrag = () => {
    isDragging.value = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', stopDrag);
    
    // Check if we need to adjust zoom to prevent white spaces
    adjustZoomToFit();
};

// Adjust zoom to ensure no white spaces are visible
const adjustZoomToFit = () => {
    if (!imageElement.value) return;
    
    const imgAspect = imageDimensions.width / imageDimensions.height;
    
    // Calculate current display dimensions with object-fit: contain
    let displayWidth, displayHeight;
    
    if (imgAspect > 1) {
        displayWidth = containerSize;
        displayHeight = containerSize / imgAspect;
    } else {
        displayHeight = containerSize;
        displayWidth = containerSize * imgAspect;
    }
    
    // Current scaled dimensions
    const scaledWidth = displayWidth * imageScale.value;
    const scaledHeight = displayHeight * imageScale.value;
    
    // Calculate the bounds of the scaled image
    const imgLeft = (containerSize - scaledWidth) / 2 + imagePosition.x;
    const imgRight = imgLeft + scaledWidth;
    const imgTop = (containerSize - scaledHeight) / 2 + imagePosition.y;
    const imgBottom = imgTop + scaledHeight;
    
    // Circle bounds (circle fills the entire container)
    const circleLeft = 0;
    const circleRight = containerSize;
    const circleTop = 0;
    const circleBottom = containerSize;
    
    // Check if image covers the entire circle bounds
    const needsScaleX = imgLeft > circleLeft || imgRight < circleRight;
    const needsScaleY = imgTop > circleTop || imgBottom < circleBottom;
    
    if (needsScaleX || needsScaleY) {
        // Calculate required scale to cover the circle
        let requiredScaleX = 1;
        let requiredScaleY = 1;
        
        if (imgLeft > circleLeft || imgRight < circleRight) {
            // Need to scale to cover width
            const currentCoverage = scaledWidth - Math.abs(imagePosition.x) * 2;
            requiredScaleX = (containerSize / displayWidth) * (containerSize / currentCoverage);
        }
        
        if (imgTop > circleTop || imgBottom < circleBottom) {
            // Need to scale to cover height
            const currentCoverage = scaledHeight - Math.abs(imagePosition.y) * 2;
            requiredScaleY = (containerSize / displayHeight) * (containerSize / currentCoverage);
        }
        
        // Use the larger scale to ensure full coverage
        const newScale = Math.max(requiredScaleX, requiredScaleY, minScale.value);
        
        if (newScale > imageScale.value) {
            imageScale.value = newScale;
            // Re-constrain position with new scale
            const constrained = constrainPosition(imagePosition.x, imagePosition.y);
            imagePosition.x = constrained.x;
            imagePosition.y = constrained.y;
        }
    }
};

defineExpose({
    openModal,
    closeModal,
    setUploading: (value) => { isUploading.value = value; }
});
</script>
