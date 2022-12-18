import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.scss";

function Login () {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/home")
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.centeredBox}>
                    <h1>Kd o bloco?</h1>
                    <input type="text" placeholder="Usuário"></input>
                    <input type="password" placeholder="Senha"></input>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </>
    )

}

export default Login;