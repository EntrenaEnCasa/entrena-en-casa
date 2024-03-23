export const useGeocoding = () => {
    const runtimeConfig = useRuntimeConfig();

    const getReverseGeocodingData = async (coordinates) => {
        const lng = coordinates[0];
        const lat = coordinates[1];
        try {
            const response = await $fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${runtimeConfig.public.mapboxApiKey}`);
            return response.features[0];
        }
        catch (error) {
            console.error(error);
            return null;
        }
    };

    return { getReverseGeocodingData };
}