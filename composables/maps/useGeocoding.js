export const useGeocoding = () => {
    const address = ref("");
    const accessToken = "pk.eyJ1IjoiZ29uemFsby1icnVuYSIsImEiOiJjbHJqcGlkcDgwMWZiMmtwOWliMHJsOGkxIn0.waguLODGXsYqrv8Ol0lwoQ";

    const getReverseGeocodingData = async (coordinates) => {
        const lng = coordinates[0];
        const lat = coordinates[1];
        const { data } = await useFetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`);
        address.value = data.value.features[0].place_name;
    };

    return { address, getReverseGeocodingData };
}