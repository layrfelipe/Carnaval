import styles from '../styles/Header.module.scss'

const Header = () => {

  return (
    <div className={styles.container}>
      <h1>Kd o<br/>bloco?</h1>
      <h4 id={styles.username}>Layr Felipe</h4>
    </div>
  )
}

export default Header;