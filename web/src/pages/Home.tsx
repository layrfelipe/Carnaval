import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import axios from 'axios';

import styles from "../styles/Home.module.scss";

import Sidebar from '../components/Sidebar';
import Map from '../components/Map';
import { useState, useEffect } from 'react';

const Home = () => {
    const center = [-22.9131349,-43.1977729]
    const zoom = 14
    const scrollWheelZoom = true

    const [map, setMap] = useState(null);

    const [blocks, setBlocks] = useState([]);
    const [pois, setPois] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3002/blocks").then( (response) => {
            if (response) setBlocks(response.data);
        })

        axios.get("http://localhost:3002/pois").then( (response) => {
            if (response) setPois(response.data);
        })

    }, []);


    return(
        <>
            <div className={styles.container}>
                <div className={styles.sidebarWrapper}>
                    <Sidebar blocks={blocks} pois={pois} map={map}/>
                </div>
                <Map blocks={blocks} pois={pois} mapRef={setMap} center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom}/>
            </div>
        </>
    );
}

export default Home;