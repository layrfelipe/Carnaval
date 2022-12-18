import { Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import styles from '../styles/Popup.module.scss';

interface IEventMarker {
    id: number;
    name: string;
    position: LatLngExpression;
    type: number;
    begins_at: Date;
}

interface IMarkerOverlayProps {
    name: string;
    events: IEventMarker[];
    active: boolean;
}

function MarkerOverlay(props: IMarkerOverlayProps) {
    return(
        <>
            {props.active &&
                props.events.map( marker => {
                    return(
                        <Marker position={marker.position}>
                            <Popup>
                                <div className={styles.container}>
                                    <h1>{marker.name}</h1>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })
            }
        </>
    )
}

export default MarkerOverlay;