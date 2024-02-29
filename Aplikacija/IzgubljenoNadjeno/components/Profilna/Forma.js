import React, {useState} from "react";
import styles from "../../styles/profilna.module.css";
import Inputi from "./Inputi.js";

const Forma=(props)=>{

    const [prikazi,setPrikazi]=useState(false);

    function ova(){
        setPrikazi(false);
    }

    return (
        <>
        <button className={styles.btnModal2} onClick={()=>setPrikazi(true)}
        >Izmeni podatke</button>
               
{
    prikazi && (

            <div className={styles.modal}>
                <div className={styles.overlay}></div>
                <div className={styles.modalContent}>
                <h2 className={styles.naslov2}>Podaci</h2>
                <Inputi ime={props.ime} prezime={props.prezime} username={props.username} />
                    <button type="button" 
                    className={styles.closeModal}
                    onClick={()=>setPrikazi(false)}>X</button>
                    <label className={styles.prijava}><a className={styles.linkic} onClick={()=>ova()}>Potvrdi</a></label>
                </div>
            </div>
    )}
        </>
    );
}

export default Forma;