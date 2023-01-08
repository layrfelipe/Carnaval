import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import L from "leaflet"
import MapConfigs from './MapConfigs';

const blockIcon = new L.Icon({
    iconUrl: require("../assets/icons/carnival.png"),
    iconSize: new L.Point(35, 35),
})

const policeIcon = new L.Icon({
    iconUrl: require("../assets/icons/police.png"),
    iconSize: new L.Point(35, 35),
})

const hospitalIcon = new L.Icon({
    iconUrl: require("../assets/icons/hospital.png"),
    iconSize: new L.Point(35, 35),
})

const subwayIcon = new L.Icon({
    iconUrl: require("../assets/icons/subway.png"),
    iconSize: new L.Point(30, 30),
})

const handlePoiIcon = (category: string) => {
    let result;
    switch (category) {
        case "police":
            result = policeIcon;
            break;
        case "hospital":
            result = hospitalIcon;
            break;
        case "subway":
            result = subwayIcon;
            break;
    }
    return result
}

const Map = (props: any) => {
    return(
        <>
            <MapContainer ref={props.mapRef} center={props.center} zoom={props.zoom} scrollWheelZoom={props.scrollWheelZoom} style={{width: "100%", height: "100%"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />

                {
                    props.blocks.map((block: any, index: number) => {
                        return(
                            <Marker position={block.initialLoc.coordinates} key={index} icon={blockIcon}>
                                <Popup>
                                    {block.name}
                                </Popup>
                            </Marker>
                        );
                    })
                }

                {
                    props.pois.map((poi: any, index: number) => {
                        return(
                            <Marker position={poi.loc.coordinates} key={index} icon={handlePoiIcon(poi.category)}>
                                <Popup >
                                    {poi.name}
                                </Popup>
                            </Marker>
                        );
                    })
                }

                <MapConfigs />
            </MapContainer>
        </>
    );
}

export default Map;