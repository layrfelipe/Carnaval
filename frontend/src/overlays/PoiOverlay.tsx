import { Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface IPoiMarker {
    id: number;
    name: string;
    position: LatLngExpression;
    type: number;
}

interface IPoiOverlayProps {
    name: string;
    points: IPoiMarker[];
    active: boolean;
}

function PoiOverlay(props: IPoiOverlayProps) {
    return(
        <>
            {props.active &&
                props.points.map( marker => {
                    return(
                        <Marker position={marker.position}>
                            <Popup>
                                {marker.name}
                            </Popup>
                        </Marker>
                    );
                })
            }
        </>
    )
}

export default PoiOverlay;