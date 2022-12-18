import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import Sidebar from '../components/Sidebar';
import MarkerOverlay from '../overlays/MarkerOverlay';
import PoiOverlay from '../overlays/PoiOverlay';
import MapService from "../services/MapService";

import styles from "../styles/Map.module.scss";

interface IEventMarker {
    id: number;
    name: string;
    position: LatLngExpression;
    type: number;
    begins_at: Date;
}

interface IEventGroup {
    groupId: number;
    groupTitle: string;
    events: IEventMarker[];
    active: boolean;
    icon?: L.Icon;
}

interface IPointOfInterest {
    id: number;
    name: string;
    position: LatLngExpression;
    type: number;
}

interface IPointOfInterestGroup {
    groupId: number;
    groupTitle: string;
    points: IPointOfInterest[];
    active: boolean;
    icon?: L.Icon;
}

interface MapProps {
    zoom: number;
    scrollZoom: boolean;
    center: LatLngExpression;
    tileUrl: string;
}
function Map (props:MapProps) {

    const today: IEventMarker[] = [
        {id: 1, name: "Boi Tolo", position: [-22.917009628972366, -43.178447719937644], type: 1, begins_at: new Date(2023, 2, 9, 7)},
        {id: 2, name: "Vem cá, minha flor", position: [-22.907124160221947, -43.17353501888203], type: 1, begins_at: new Date(2023, 2, 9, 8)}
    ]

    const tomorrow: IEventMarker[] = [
        {id: 3, name: "Technobloco", position: [-22.90759853032786, -43.18392053125574], type: 2, begins_at: new Date(2023, 2, 10, 9)},
        {id: 4, name: "Cordão do bola preta", position: [-22.914799307054253, -43.18547848391132], type: 2, begins_at: new Date(2023, 2, 10, 10)}
    ]

    const todayGroupInitial: IEventGroup = {
        groupId: 1,
        groupTitle: "Blocos hoje",
        events: today,
        active: false
    }

    const tomorrowGroupInitial: IEventGroup = {
        groupId: 2,
        groupTitle: "Blocos amanhã",
        events: tomorrow,
        active: false
    }

    const [todayGroup, setTodayGroup] = useState(todayGroupInitial)
    const [tomorrowGroup, setTomorrowGroup] = useState(tomorrowGroupInitial)

    const [showToday, setShowToday] = useState(false)
    const [showTomorrow, setShowTomorrow] = useState(false)

    const handleShowToday = () => {
        if (showToday) {
            updateShowEventGroup(todayGroup, false)
        }
        else {
            updateShowEventGroup(todayGroup, true)
        }
        setShowToday(!showToday)
    }

    const handleShowTomorrow = () => {
        if (showTomorrow) {
            updateShowEventGroup(tomorrowGroup, false)
        }
        else {
            updateShowEventGroup(tomorrowGroup, true)
        }
        setShowTomorrow(!showTomorrow)
    }

    function updateShowEventGroup(group: IEventGroup, show: boolean) {
        if (group.groupId == 1) {
            setTodayGroup({
                groupId: group.groupId,
                groupTitle: group.groupTitle,
                events: group.events,
                active: show
            })
        }
        else if (group.groupId == 2) {
            setTomorrowGroup({
                groupId: group.groupId,
                groupTitle: group.groupTitle,
                events: group.events,
                active: show
            })
        }
    }


    const subwayStations: IPointOfInterest[] = [
        {id: 5, name: "Metrô Cinelândia", position: [-22.91109483232807, -43.175331580028434], type: 10},
        {id: 6, name: "Metrô Presidente Vargas", position: [-22.903405015038416, -43.18598037760813], type: 10}
    ]

    const policeStations: IPointOfInterest[] = [
        {id: 7, name: "Delegacia Álvaro Alvim", position: [-22.910373037999168, -43.17663803957165], type: 11},
        {id: 8, name: "Delegacia Rua da Relação", position: [-22.91011121060135, -43.18409266808915], type: 11}
    ]

    const hospitals: IPointOfInterest[] = [
        {id: 9, name: "Hospital Souza Aguiar", position: [-22.907992709531598, -43.18973049355087], type: 12},
        {id: 10, name: "Hospital da Cruz Vermelha", position: [-22.91159027943603, -43.188012816246484], type: 12}
    ]

    const subwayGroupInitial: IPointOfInterestGroup = {
        groupId: 3,
        groupTitle: "Estações de metrô",
        points: subwayStations,
        active: false
    }

    const policeGroupInitial: IPointOfInterestGroup = {
        groupId: 4,
        groupTitle: "Delegacias",
        points: policeStations,
        active: false
    }

    const hospitalGroupInitial: IPointOfInterestGroup = {
        groupId: 5,
        groupTitle: "Hospitais",
        points: hospitals,
        active: false
    }

    const [subwayGroup, setSubwayGroup] = useState(subwayGroupInitial)
    const [policeGroup, setPoliceGroup] = useState(policeGroupInitial)
    const [hospitalGroup, setHospitalGroup] = useState(hospitalGroupInitial)

    const [showSubway, setShowSubway] = useState(false)
    const [showPolice, setShowPolice] = useState(false)
    const [showHospital, setShowHospital] = useState(false)

    const handleShowSubway = () => {
        if (showSubway) {
            updateShowPoiGroup(subwayGroup, false)
        }
        else {
            updateShowPoiGroup(subwayGroup, true)
        }
        setShowSubway(!showSubway)
    }

    const handleShowPolice = () => {
        if (showPolice) {
            updateShowPoiGroup(policeGroup, false)
        }
        else {
            updateShowPoiGroup(policeGroup, true)
        }
        setShowPolice(!showPolice)
    }

    const handleShowHospital = () => {
        if (showHospital) {
            updateShowPoiGroup(hospitalGroup, false)
        }
        else {
            updateShowPoiGroup(hospitalGroup, true)
        }
        setShowHospital(!showHospital)
    }

    function updateShowPoiGroup(group: IPointOfInterestGroup, show: boolean) {
        if (group.groupId == 3) {
            setSubwayGroup({
                ...group,
                active: show
            })
        }
        else if (group.groupId == 4) {
            setPoliceGroup({
                ...group,
                active: show
            })
        }
        else if (group.groupId == 5) {
            setHospitalGroup({
                ...group,
                active: show
            })
        }
    }

    return (
        <div className={styles.mapContainer}>
            <Sidebar todayStateChanger={setShowToday} tomorrowStateChanger={setShowTomorrow} subwayStateChanger={setShowSubway} policeStateChanger={setShowPolice} hospitalStateChanger={setShowHospital} eventMarkers={[...todayGroup.events, ...tomorrowGroup.events]} points={[...subwayGroup.points, ...policeGroup.points, ...hospitalGroup.points]}/>
            <MapContainer center={props.center} zoom={props.zoom} scrollWheelZoom={props.scrollZoom} style={{height: "100%", width: "96vw"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={props.tileUrl}
                />

                <MapService baseUrl={props.tileUrl} />
                
                <MarkerOverlay name={todayGroup.groupTitle} events={todayGroup.events} active={showToday}/>
                <MarkerOverlay name={tomorrowGroup.groupTitle} events={tomorrowGroup.events} active={showTomorrow}/>

                <PoiOverlay name={subwayGroup.groupTitle} points={subwayGroup.points} active={showSubway}/>
                <PoiOverlay name={policeGroup.groupTitle} points={policeGroup.points} active={showPolice}/>
                <PoiOverlay name={hospitalGroup.groupTitle} points={hospitalGroup.points} active={showHospital}/>
            </MapContainer>
        </div>
    )
}

export default Map