import styles from '../../styles/oglas.module.css';
import styles2 from '../../styles/pocetna.module.css';
import { useState, useEffect, useRef } from "react";
import NapraviOglas from './NapraviOglas.js'

export default function PopUpNapraviOglas(props)
{
  const [prikaziPopUp, setPrikaziPopUp] = useState(false);

  function handlePopup(){
    setPrikaziPopUp(!prikaziPopUp);
  }

  const outsidePopUpClose = useRef();
  const insidePopUp = useRef();

  useEffect(() => {
    window.addEventListener('click', backDropHandler);
    
    return () => window.removeEventListener('click', backDropHandler);
  }, []);

  const backDropHandler = e => {
    if (outsidePopUpClose?.current?.contains(e.target) && !insidePopUp?.current?.contains(e.target)) {
        handlePopup();
    }
  }

  return(
  <>
    {prikaziPopUp&&<div className={styles.popupDivBG} ref={outsidePopUpClose}>
      <div className={styles.popupDiv} ref={insidePopUp}>
      <h2 className={styles2.naslov}> OBJAVI NOVI OGLAS </h2>
        <button className={styles.popupDugme}onClick={handlePopup}>&times;</button>
        <NapraviOglas idkorisnika={props.IDkorisnika} slikaKorisnika={props.slikaKorisnika}/>
        
      </div>
    </div>}
    
    <button onClick={handlePopup} className={styles.dugme}>
                Postavi oglas
    </button>
  </>
  );
}