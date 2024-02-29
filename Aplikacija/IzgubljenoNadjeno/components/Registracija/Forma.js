import React, {useState, useEffect, useRef} from "react";
import Registracija from "./Registracija";
import LogPrij from "./LogPrij.js";
import styles from "../../styles/registracija.module.css";
import styles2 from "../../styles/sidebar.module.css";
import { onAuthStateChanged } from "firebase/auth";
import {storage,auth,db, analytics} from "../../config/firebase.js";
import { logEvent } from "firebase/analytics";
import { PencilAltIcon } from "@heroicons/react/outline";
import PopUpNapraviOglas from "../Oglas/popupNapraviOglas";
import NapraviOglas from "../Oglas/NapraviOglas";
import styles3 from '../../styles/oglas.module.css';
import styles4 from '../../styles/pocetna.module.css';


const Forma=({admin, setAdmin, usernameKorisnika,slikaKorisnika, korisnik, setKorisnik, logprikazi, setLogprikazi})=>{

    function refresh()
    {
        if(prikazi){
            setPrikazi(false)
            location.reload();
        }
        else
            setLogprikazi(false);
    }

    const [prikazi,setPrikazi]=useState(false);
    
    useEffect(()=>{
        const listen=onAuthStateChanged(auth,(user)=>{
            if(user){
                setKorisnik(user);
                
            }else{
                setKorisnik(null);
            }
        });

        return ()=>{listen();}
    },[])

    const [prikaziPopUp, setPrikaziPopUp] = useState(false);

  

  const outsidePopUpClose = useRef();
  const insidePopUp = useRef();

  function handlePopup(){
    if(korisnik)
    {
        console.log(korisnik);
        setPrikaziPopUp(!prikaziPopUp);
    }
    else
    {
        setLogprikazi(true);
    }
  }

    return (
        <>
            <button className={styles2.sidebarPostButton + " " + styles2.nestani} 
                    onClick={handlePopup}>
                    <span>Objavi</span>
            </button>
            <div className={styles2.sidebarPostButtonSmall  + " " + styles2.prikaziSidebarPostButtonSmall} 
                            onClick={handlePopup}>
                <PencilAltIcon className={styles2.sidebarPostButtonSmallIcon}/>
            </div>
            {
                
    (korisnik&&prikaziPopUp&&(
        <div className={styles3.popupDivBG} ref={outsidePopUpClose}>
            <div className={styles3.popupDiv} ref={insidePopUp}>
                <button className={styles3.popupDugme}onClick={handlePopup}>&times;</button>
                <NapraviOglas idkorisnika={usernameKorisnika} slikaKorisnika={slikaKorisnika}/>
            </div>
      </div>)||
        !korisnik&&(prikazi  && (

            <div className={styles.modal}>
                <div className={styles.overlay}></div>
                <div className={styles.modalContent}>
                <h2 className={styles.naslov2}>Registracija</h2>

                    <Registracija setPrikazi={setPrikazi} setLogprikazi={setLogprikazi} />
                    <button type="button" 
                    className={styles.closeModal}
                    onClick={refresh}>&times;</button>

                </div>
            </div>
    ) )|| (logprikazi &&(
        <div className={styles.modal}>
                <div className={styles.overlay}></div>
                <div className={styles.modalContent}>
                    <h1 className={styles.naslov}>Prijava</h1>
                <LogPrij admin={admin} setAdmin={setAdmin} setPrikazi={setPrikazi} setLogprikazi={setLogprikazi} />
                    <button type="button" 
                    className={styles.closeModal}
                    onClick={refresh}>&times;</button>

                </div>
            </div>
    )))}
        </>
    );
}
export default Forma;