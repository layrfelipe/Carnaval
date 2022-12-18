import { useMap, useMapEvent } from 'react-leaflet';

interface IMapServiceProps {
    baseUrl: string
}

function MapService(props: IMapServiceProps) {
    const map = useMap();

    const mapCLick = useMapEvent("click", (e) => {
        console.log("Clicked at: ", e.latlng)
    });

    return null
}

export default MapService;