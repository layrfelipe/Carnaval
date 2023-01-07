import styles from '../styles/Sidebar.module.scss'
import { FaLayerGroup, FaList, FaWrench } from "react-icons/fa"

function Sidebar () {
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <FaLayerGroup className={styles.icon} />
            <FaList className={styles.icon} />
            <FaWrench className={styles.icon} />
        </div>
    </div>
  )
}

export default Sidebar;