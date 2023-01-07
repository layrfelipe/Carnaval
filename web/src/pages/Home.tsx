import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import axios from 'axios';

import styles from "../styles/Home.module.scss";

import Sidebar from '../components/Sidebar';
import Map from '../components/Map';
import { useState, useEffect } from 'react';

const Home = () => {

    const [blocks, setBlocks] = useState([])
    const [pois, setPois] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3005/blocks").then( (response) => {
            setBlocks(response.data);
        })

        axios.get("http://localhost:3005/pois").then( (response) => {
            setPois(response.data);
        })

    }, []);

    return(
        <>
            <div className={styles.container}>
                <Sidebar />
                <Map blocks={blocks} pois={pois}/>
            </div>
        </>
    );
}

export default Home;