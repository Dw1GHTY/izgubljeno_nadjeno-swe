import styles from "../../styles/oglas.module.css";
import styles2 from "../../styles/pocetna.module.css";
import fbImg from "../../public/fb.png";
import { LinkIcon, ShareIcon, ChatIcon } from "@heroicons/react/outline";
import { query, collection, where } from 'firebase/firestore';
import { useState, useEffect, useRef } from "react";
import { db } from '../../config/firebase';


export default function Oglas(props) {
  const oglas = props.oglas;
  const [prikaziPopUp, setPrikaziPopUp] = useState(false);
  const urlsajta="http://localhost:3000/";
  /*  function preuzmiAdresu() {
     const adresa =
       fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`)
         .then(a => console.log(a.json()));
     console.log(adresa.formatted_address);
   } */

  function handlePosaljiPoruku() {
    if(props.jedanOglas) {
      return alert('Napravite nalog kako biste se javili korisniku @' + props.oglas.vlasnik.korisnickoIme);
    }
    if (!props.setLogprikazi) {
      
      props.setPrikaziOglase(false);
      props.setPrikaziPoruke(true);
      props.setVlasnikKomeSaljem(oglas.vlasnik); //vlasnik
      
    } else props.setLogprikazi(true);
  }

  function handlePopup() {
    setPrikaziPopUp(!prikaziPopUp);
  }

  function Popup() {
    const outsidePopUpClose = useRef();
    const insidePopUp = useRef();

    useEffect(() => {
      window.addEventListener("click", backDropHandler);

      return () => window.removeEventListener("click", backDropHandler);
    }, []);

    const backDropHandler = (e) => {
      if (
        outsidePopUpClose?.current?.contains(e.target) &&
        !insidePopUp?.current?.contains(e.target)
      ) {
        handlePopup();
      }
    };

    function fb() {
      window.open(
        `http://www.facebook.com/share.php?u=${urlsajta}${oglas.key}`,                                          ///radi za validno hostovanje
        "",
        "width=600,height=400,left=200,top=200"
      );
      setPrikaziPopUp(!prikaziPopUp);
    }

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(urlsajta+`${oglas.key}`);
      } catch (err) {
        console.error("Neuspesno kopiranje u clipboard: ", err);
      }
      setPrikaziPopUp(!prikaziPopUp);
    };

    return (
      <>
        <div className={styles.popupDivBG} ref={outsidePopUpClose}>
          <div className={styles.popupDiv} ref={insidePopUp}>
            <button className={styles.popupDugme} onClick={handlePopup}>
              &times;
            </button>
            <div className={styles.flexBoxRow}>
            <LinkIcon className={styles.linkImg} onClick={copyToClipboard} />

            <img
              className={styles.popupSocials}
              src={fbImg.src}
              onClick={fb}
              alt=""
            />
            </div>
          </div>
        </div>
      </>
    );
  }

  function setQuery(tag){
    props.setTagbarQuery(query(collection(db, "postovi"),where('tagovi','array-contains', tag)));
  }
    return (
      <div className={styles.ceoOglas+" "+styles.border}>
        <table>
          <thead>
            <tr>
              <td className={styles.flexBoxRow}>
                  
                  <img src={oglas.vlasnik.slika} className={styles.pfp} alt="korisnicka slika" />
                  <section className={styles.flexBoxCol}>
                    <section className={styles.flexBoxRow+" "+styles.spaceBetween}>
                      <section className={styles.korisnickoIme}> @{oglas.vlasnik.korisnickoIme} </section>
                      <section className={styles.vreme+" "+styles.Nestani}>{oglas.vreme.toDateString()}</section>
                    </section>
                    <section >{oglas?.mesto}</section>
                 </section>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.OpisOglasa}>{oglas.opis}</td>
            </tr>
            
            <tr>
              <td><img src={oglas.slika} alt="" className={styles.slikaOglasa} /></td>
            </tr>
            <tr>
              <td>
                <ul className={styles.lista}>
                  {oglas.tagovi.map((tag, index) => (
                    <a onClick={()=>setQuery(tag)} key={index} className={styles.link}><li key={tag}>#{tag} </li></a>
                  ))}
                </ul>
              </td>
            </tr>
            <tr >
              <td className={styles.flexBoxRow+" "+styles.spaceAround}>
                <button onClick={handlePopup} className={styles.dugme}>
                  <ShareIcon className={styles.dugmeSlika}/>
                  <span className={styles.Nestani}>Podeli</span>
                </button>
                {prikaziPopUp&&<Popup></Popup>}
                {!props.mojOglas&&<button onClick={handlePosaljiPoruku} className={styles.dugme}>
                  <ChatIcon className={styles.dugmeSlika}/>
                  <span className={styles.Nestani}>Pošalji poruku</span>
                </button>}
              </td>
            </tr>
          </tbody>
  
          
        </table>
      </div>
  
    );
  }