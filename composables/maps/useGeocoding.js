export const useGeocoding = () => {
    const runtimeConfig = useRuntimeConfig();

    const getReverseGeocodingData = async (coordinates) => {
        const lng = coordinates[0];
        const lat = coordinates[1];
        const { data } = await useFetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${runtimeConfig.public.mapboxApiKey}`);
        return data.value.features[0];
    };

    return { getReverseGeocodingData };
}