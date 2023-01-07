import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MapService from '../services/MapService';

import L from "leaflet"

const blockIcon = new L.Icon({
    iconUrl: require("../assets/icons/green-icon.png"),
    iconSize: new L.Point(25, 35),
})

const poiIcon = new L.Icon({
    iconUrl: require("../assets/icons/red-icon.png"),
    iconSize: new L.Point(42, 42),
})

const Map = (props: any) => {

    return(
        <>
            <MapContainer center={[-22.9131349,-43.1977729]} zoom={14} scrollWheelZoom={true} style={{width: "100%", height: "100%"}}>
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
                            <Marker position={poi.loc.coordinates} key={index} icon={poiIcon}>
                                <Popup>
                                    {poi.name}
                                </Popup>
                            </Marker>
                        );
                    })
                }

                <MapService />
            </MapContainer>
        </>
    );
}

export default Map;