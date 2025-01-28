import { useState } from "react";
import styles from "./Teste.module.css"; // Importa o CSS Module

function Teste() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleDiv = () => {
        setIsVisible(!isVisible); // Alterna entre true (mostrar) e false (esconder)
    };

    return (
        <div>
            <button onClick={toggleDiv}>
                {isVisible ? "Esconder" : "Mostrar"} Div
            </button>
            {/* Adiciona as classes dinamicamente */}
            <div className={`${styles.box} ${isVisible ? styles.show : styles.hide}`}>
                Olá, eu sou animada!
            </div>
        </div>
    );
}

export default Teste;
