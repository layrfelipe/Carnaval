import { useMap } from 'react-leaflet';

function MapConfigs(props: any) {
    const map = useMap();
    map.on("click", (e)=>{console.log(e.latlng);})

    map.setMinZoom(10);
    map.setMaxZoom(18)
    map.setMaxBounds([[-22.739540887638487, -43.661810599399594], [-22.954683939052245, -42.687249570244234]])

    return null;
}

export default MapConfigs;