import { useState } from "react";
import { FaLayerGroup, FaList, FaWrench } from "react-icons/fa";

import styles from '../styles/Sidebar.module.scss';


const Sidebar = (props: any) => {

  const [showLayers, setShowLayers] = useState(false);
  const handleShowLayers = () => {
    hideAll();
    setShowLayers(!showLayers);
  };

  const [showBlocks, setShowBlocks] = useState(false);
  const handleShowBlocks = () => {
    hideAll();
    setShowBlocks(!showBlocks);
  };

  const [showConfigs, setShowConfigs] = useState(false);
  const handleShowConfigs = () => {
    hideAll();
    setShowConfigs(!showConfigs);
  };

  const hideAll = () => {
    setShowLayers(false);
    setShowBlocks(false);
    setShowConfigs(false);
  };

  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <FaLayerGroup className={styles.icon} onClick={ handleShowLayers } />
            <FaList className={styles.icon} onClick={ handleShowBlocks } />
            <FaWrench className={styles.icon} onClick={ handleShowConfigs } />
        </div>

        {showLayers &&
          <div className={styles.layers}>
            <h1>Camadas</h1>
          </div>
        }

        {showBlocks &&
          <div className={styles.blocks}>
            <h1>Blocos</h1>
            {
              props.blocks.map( (block: any, index: number) => {
                return(
                    <p key={index}>{block.name}</p>
                );
              })
            }
          </div>
        }

        {showConfigs &&
          <div className={styles.configs}>
            <h1>Configurações</h1>
          </div>
        }
    </div>
  )
}

export default Sidebar;