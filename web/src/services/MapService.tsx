import { useMapEvent } from 'react-leaflet';

function MapService(props: any) {
    useMapEvent("click", (e) => {
        console.log(e.latlng);
    });

    return null;
}

export default MapService;