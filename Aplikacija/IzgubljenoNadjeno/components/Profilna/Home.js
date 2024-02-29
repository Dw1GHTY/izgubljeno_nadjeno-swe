import styles from "../../styles/profilna.module.css";

import React, {useState} from "react";



export default function Home(props){
    
    return(
        <div className={styles.homedugme}><label className={styles.imeback}>@{props.username}</label></div>
        
    );
}