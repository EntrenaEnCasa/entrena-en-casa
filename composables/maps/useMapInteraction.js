import * as turf from '@turf/turf';

export const useMapInteraction = (mapRef, inputRadius) => {

    const zoomLevels = [
        { maxRadius: 1, zoom: 13 },
        { maxRadius: 2, zoom: 12 },
        { maxRadius: 5, zoom: 11 },
        { maxRadius: 9, zoom: 10 },
        { maxRadius: 19, zoom: 9 },
        { maxRadius: Infinity, zoom: 8 }
    ];

    const easeInOutCubic = (t) => {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const prepareFlyTo = (fromCoordinates, toCoordinates) => {
        const distance = turf.distance(fromCoordinates, toCoordinates);
        const newDuration = calculateDurationBasedOnDistance(distance);
        const newZoom = calculateZoomLevel(inputRadius.value);

        return {
            duration: newDuration,
            zoom: newZoom
        };
    };

    const flyTo = (center, zoom, options = {}) => {
        const defaultOptions = {
            essential: true,
            speed: 1,
            curve: 1,
            easing: easeInOutCubic // Assuming easeInOutCubic is defined elsewhere
        };

        const flyOptions = {
            center,
            zoom,
            ...defaultOptions,
            ...options
        };

        mapRef.value?.flyTo(flyOptions);
    };

    const calculateZoomLevel = (radiusInKm) => {
        const level = zoomLevels.find((level) => radiusInKm <= level.maxRadius);
        return level ? level.zoom : zoomLevels[zoomLevels.length - 1].zoom;
    };

    const calculateZoomDifference = (currentZoom, newZoom) => {
        return Math.abs(currentZoom - newZoom);
    };

    const calculateTransitionSpeedBasedOnZoomDifference = (fromZoom, toZoom) => {
        const zoomDifference = calculateZoomDifference(fromZoom, toZoom);
        return zoomDifference <= 1 ? 0.5 : 1.2;
    } 

    const calculateDurationBasedOnDistance = (distance) => {
        const minDistance = 0;
        const maxDistance = 2000;
        const minDuration = 2500;
        const maxDuration = 10000;

        if (distance <= 1) {
            return 700;
        } else if (distance <= maxDistance) {
            return minDuration + (distance - minDistance) / (maxDistance - minDistance) * (maxDuration - minDuration);
        } else {
            return maxDuration;
        }
    };

    return { flyTo, prepareFlyTo, calculateZoomLevel, calculateTransitionSpeedBasedOnZoomDifference };
}
