import { useState } from 'react'
import styles from '../styles/Sidebar.module.scss'
import { FaLayerGroup, FaList, FaWrench, FaCalendarAlt, FaMapPin, FaInfoCircle, FaToggleOn, FaToggleOff, FaUserLock, FaSignOutAlt, FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { LatLngExpression } from 'leaflet';

interface IEventMarker {
    id: number;
    name: string;
    position: LatLngExpression;
    type: number;
    begins_at: Date;
}

function Sidebar ({todayStateChanger, tomorrowStateChanger, subwayStateChanger, policeStateChanger, hospitalStateChanger, eventMarkers, points}: any) {

    const navigate = useNavigate();

    // BARS
    const [layersOpen, setLayersOpen] = useState(false)
    const [blocksOpen, setBlocksOpen] = useState(false)
    const [configOpen, setConfigOpen] = useState(false)

    const handleOpenLayers = () => {
        closeSidebars()
        setLayersOpen(!layersOpen)
    }

    const handleOpenBlocks = () => {
        closeSidebars()
        setBlocksOpen(!blocksOpen)
    }

    const handleOpenConfig = () => {
        closeSidebars()
        setConfigOpen(!configOpen)
    }

    function closeSidebars() {
        setLayersOpen(false)
        setBlocksOpen(false)
        setConfigOpen(false)
    }

    // EVENTS CHECKBOXES LAYERS
    const [showTodayCheckbox, setShowTodayCheckbox] = useState(false)
    const [showTomorrowCheckbox, setShowTomorrowCheckbox] = useState(false)

    const handleShowToday = () => {
        setShowTodayCheckbox(!showTodayCheckbox)
        if (showTodayCheckbox) {
            todayStateChanger(false)
        }
        else {
            todayStateChanger(true)
        }
    }

    const handleShowTomorrow = () => {
        setShowTomorrowCheckbox(!showTomorrowCheckbox)
        if (showTomorrowCheckbox) {
            tomorrowStateChanger(false)
        }
        else {
            tomorrowStateChanger(true)
        }
    }

    // POINTS OF INTEREST CHECKBOXES LAYERS
    const [showSubway, setShowSubway] = useState(false)
    const [showPolice, setShowPolice] = useState(false)
    const [showHospital, setShowHospital] = useState(false)

    const handleShowSubway = () => {
        if (showSubway) {
            subwayStateChanger(false)
        }
        else {
            subwayStateChanger(true)
        }
        setShowSubway(!showSubway)
    }

    const handleShowPolice = () => {
        if (showPolice) {
            policeStateChanger(false)
        }
        else {
            policeStateChanger(true)
        }
        setShowPolice(!showPolice)
    }

    const handleShowHospital = () => {
        if (showHospital) {
            hospitalStateChanger(false)
        }
        else {
            hospitalStateChanger(true)
        }
        setShowHospital(!showHospital)
    }


    // CONFIGS
    const [sound, setSound] = useState(true)
    const handleSound = () => {
        setSound(!sound)
    }

    const [showDetails, setShowDetails] = useState(false)
    const handleShowDetails = () => {
        setShowDetails(!showDetails)
    }

    const handlePasswordRecovery = () => {
        alert("Clicou em recuperar senha!")
    }

    const handleQuit = () => {
        navigate("/")        
    }


  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <FaLayerGroup onClick={handleOpenLayers} className={styles.icon} />
            <FaList onClick={handleOpenBlocks} className={styles.icon} />
            <FaWrench onClick={handleOpenConfig} className={styles.icon} />
        </div>

        <div className={layersOpen ? styles.expanded : styles.invisible}>
            <h1>Camadas</h1>

            <div className={styles.layerType}>
                
                <h3><span><FaCalendarAlt/></span>Eventos</h3>

                <div className={styles.inputs}>
                    <div className={styles.inputAndLabel}>
                        <input type="checkbox" id="today" name="today" onChange={handleShowToday} checked={showTodayCheckbox} />
                        <label htmlFor="today">Blocos hoje</label>
                    </div>

                    <div className={styles.inputAndLabel}>
                        <input type="checkbox" id="tomorrow" name="tomorrow" onChange={handleShowTomorrow} checked={showTomorrowCheckbox} />
                        <label htmlFor="tomorrow">Blocos amanhã</label>
                    </div>
                </div>
            </div>

            <div className={styles.layerType}>
                <h3><span><FaMapPin/></span>Pontos de interesse</h3>

                <div className={styles.inputs}>
                    <div className={styles.inputAndLabel}>
                        <input type="checkbox" id="subway" name="subway" onChange={handleShowSubway} checked={showSubway}/>
                        <label htmlFor="subway">Estações de metrô</label>
                    </div>

                    <div className={styles.inputAndLabel}>
                        <input type="checkbox" id="police" name="police" onChange={handleShowPolice} checked={showPolice} />
                        <label htmlFor="police">Delegacias</label>
                    </div>

                    <div className={styles.inputAndLabel}>
                        <input type="checkbox" id="hospitals" name="hospitals" onChange={handleShowHospital} checked={showHospital} />
                        <label htmlFor="hospitals">Hospitais</label>
                    </div>
                </div>
            </div>
        </div>

        <div className={blocksOpen ? styles.expanded : styles.invisible}>
            <h1>Meus blocos</h1>

            <div className={styles.blocks}>
                {
                    eventMarkers.map((eventMarker: IEventMarker) => {
                        return(
                            <button onClick={handleShowDetails}>{eventMarker.name} - {eventMarker.begins_at.toLocaleDateString("pt-BR").slice(0, 5)} - {eventMarker.begins_at.toLocaleTimeString("pt-BR").slice(0, 5)}h</button>
                        )
                    })
                }
            </div>

            <div className={showDetails ? styles.invisible : styles.invisible}>
                <div className={styles.container}>
                    <button onClick={handleShowDetails}><span><FaArrowLeft /></span></button>
                    <h1>Boi tolo</h1>
                </div>
            </div>
        </div>

        <div className={configOpen ? styles.expanded : styles.invisible}>
            <h1>Configurações</h1>

            <div className={styles.configs}>
                <h4 className={sound ? styles.sound : styles.invisible} onClick={handleSound}><span><FaToggleOn/></span>Desativar som</h4>
                <h4 className={sound ? styles.invisible : styles.sound} onClick={handleSound}><span><FaToggleOff/></span>Ativar som</h4>

                <h4 onClick={handlePasswordRecovery}><span><FaUserLock/></span>Recuperar senha</h4>

                <h4 onClick={handleQuit}><span><FaSignOutAlt/></span>Encerrar sessão</h4>
            </div>
        </div>
    </div>
  )
}

export default Sidebar;