import Oglas from "../Oglas/Oglas.js";
import { useState, useEffect } from "react";
import styles from "../../styles/oglas.module.css";
import {
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
  where,
  doc
} from "firebase/firestore";
import { db  } from "../../config/firebase.js";

const postoviRef = collection(db, "postovi");

export default function MojiOglasi(props) {
  
  let q = query(postoviRef, where('vlasnik', '==', doc(db, 'users', props.idVlasnika)));
  const [nistePostaviliNijedanOglas, setNistePostaviliNijedanOglas] = useState(false);

  const vlasnik = {
    id: props.idVlasnika,
    korisnickoIme: props.username,
    slika: props.slika
}

  useEffect(() => {
    
    if (props.isLoading) {
      
      getDocs(q)
        .then((snapshot) => {
          const oglasi2 = [];
          snapshot.forEach((doc) => {
            const noviOglas = {};
            const data = doc.data();

            noviOglas.key=doc.id;
            noviOglas.opis = data.opis;
            noviOglas.lokacija = data?.lokacija?.toJSON().latitude;
            noviOglas.slika = data.slika;
            noviOglas.tagovi = data.tagovi;
            noviOglas.vreme = data.vreme.toDate();
            
            
            noviOglas.vlasnik=vlasnik;
            oglasi2.push(noviOglas);

          });
          return oglasi2;
        })
        .then(o => {
          if(o.length==0)
          setNistePostaviliNijedanOglas(true);
            
          props.setMojiOglasi([...o]);
          props.setLoading(false);
        })
        
    }
    else
    {
      if(0==props.mojiOglasi.length)
      setNistePostaviliNijedanOglas(true);
    }
  }, []);

  return (
    <>
     <ul className={styles.obicnaLista}>
      
     {
      props.mojiOglasi.map((x) => (
          x&&<li key={x.key}><Oglas mojOglas={true} oglas={x} setPrikaziPoruke={props.setPrikaziPoruke} setPrikaziOglase={props.setPrikaziOglase} setIDKomeSaljem={props.setIDKomeSaljem}></Oglas></li>
      ))
            }</ul>
      {props.isLoading && <p>Ucitavanje...</p>}
      {nistePostaviliNijedanOglas && <p>Niste postavili nijedan oglas.</p>}
    </>
  );
}
