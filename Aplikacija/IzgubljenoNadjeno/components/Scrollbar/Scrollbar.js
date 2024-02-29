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
  where
} from "firebase/firestore";
import {getDownloadURL, ref} from "firebase/storage";
import { db, storage } from "../../config/firebase.js";

const postoviRef = collection(db, "postovi");

export default function InfiniteScroll(props) {
  const [loading, setLoading] = useState(false);

  const [q, setQ] = useState(query(
    postoviRef,
    orderBy("vreme", "desc"),
    limit(2),
    where("vreme", "<", props.poslednjiDatum)
  ));

useEffect(()=>{
  if(props.tagbarQuery!=undefined)
  {
    if(props.tagbarQuery==0)
  {
    setQ(query(
      postoviRef,
      orderBy("vreme", "desc"),
      limit(2),
      where("vreme", "<", props.poslednjiDatum)
    ));
    props.setOglasi([]);
    setLoading(true);
  }   
  else if(typeof(props.tagbarQuery)!="number")
    {
      props.setkrajOglasa(false);
      setQ(props.tagbarQuery);
      setLoading(true);
    }
  }

},[props.tagbarQuery]);


  useEffect(() => {
    if (loading) {
      
      getDocs(q)
        .then((snapshot) => {
          
          const oglasi2 = new Array();
          const vlasniciPromise = new Array();
          
          snapshot.forEach((doc) => {
            const noviOglas = {};
            const data = doc.data();

            noviOglas.key=doc.id;
            noviOglas.opis = data.opis;
            
            noviOglas.lokacija = data?.lokacija?.toJSON();
            noviOglas.mesto=data?.mesto;
            noviOglas.slika = data.slika;
            noviOglas.tagovi = data.tagovi;
            noviOglas.vreme = data.vreme.toDate();
            vlasniciPromise.push(getDoc(data.vlasnik));
            oglasi2.push(noviOglas);
          });
          return { vlasnici: vlasniciPromise, oglasi: oglasi2 };
        })
        .then(ovo => {
          if (ovo.oglasi.length > 0) {
            const vlasniciSlike=[];
            Promise.all(ovo.vlasnici).then((v) => {
              for (let index = 0; index < v.length; index++) {
                
                const vlasnik = {
                  id: v[index].data().slika,
                  korisnickoIme: v[index].data().username,
                  imejl: v[index].data().email
                };
                
                vlasniciSlike.push(getDownloadURL(ref(storage,`slikeKorisnika/${vlasnik.id}`)));
                ovo.oglasi[index].vlasnik = vlasnik;
              }
              
              props.setPoslednjiDatum(ovo.oglasi[ovo.oglasi.length - 1].vreme);

              return {oglasi: ovo.oglasi,slikeVlasnikaPromises: vlasniciSlike};
              })
              .then(snap=>{
                
              Promise.all(snap.slikeVlasnikaPromises)
              .then(slike=>{
                
                for (let index = 0; index < slike.length; index++) {
                  ovo.oglasi[index].vlasnik.slika=slike[index];
                }
                if(typeof(props.tagbarQuery)!="number")
                {
                  props.setOglasi([...snap.oglasi]);
                  console.log(props.oglasi);
                }
                else
                  props.setOglasi([...props.oglasi, ...snap.oglasi]);
                  setLoading(false);
                  console.log(props.oglasi);
                  
              })})
              .catch(err=>console.log(err));}
            else
            {
              if(props.tagbarQuery&&!props.krajOglasa)
                props.setOglasi([]);
              setLoading(false);
              props.setkrajOglasa(true);
              
            }
            
        })
        
    } 
  }, [loading]);

  function onScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight-200
    ) {
      return;
    }
    if(typeof(props.tagbarQuery)=="number")
    {setQ(query(
      postoviRef,
      orderBy("vreme", "desc"),
      limit(2),
      where("vreme", "<", props.poslednjiDatum)
    ));  
    setLoading(true);}
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", onScroll);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <>
     <ul className={styles.obicnaLista}>
      
     {
      props.oglasi.map((x) => (
          x&&<li key={x.key}>
            <Oglas 
            oglas={x}
            setVlasnikKomeSaljem={props.setVlasnikKomeSaljem}
            emailKorisnika={props.emailKorisnika}
            setLogprikazi={props.setLogprikazi}
            setPrikaziPoruke={props.setPrikaziPoruke}
            setPrikaziOglase={props.setPrikaziOglase}
            setEmailVlasnika={props.setEmailVlasnika}
            setTagbarQuery={props.setTagbarQuery}
            mojOglas={props.idulogovanogkorisnika==x.vlasnik.id} 
            setIDKomeSaljem={props.setIDKomeSaljem}>
              </Oglas>
              </li>
      ))
            }</ul>
      {!props.krajOglasa && loading && <p>Učitavanje...</p>}
      {props.krajOglasa && <p>Pregledali ste sva obaveštenja.</p>}
    </>
  );
}
