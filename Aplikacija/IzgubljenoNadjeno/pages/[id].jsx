import { doc, getDoc } from 'firebase/firestore';
import { storage, auth, db } from "../config/firebase.js";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";
import inLogo from "../public/inLogo.png";
import Image from "next/image";
import {getDownloadURL, ref} from "firebase/storage";
import Oglas from '../components/Oglas/Oglas.js';
import Link from 'next/link';


function OglasUrl() {
  
  const router = useRouter();
  const { id } = router.query;
  const [oglas, setOglas] = useState('');
  const [oglasPostoji, setOglasPostoji] = useState();
  const [opis, setOpis] = useState('');
  const [slika, setSlika] = useState('');
  const [tagovi, setTagovi] = useState('');
  const [vreme, setVreme] = useState('');
  const [vlasnik,setVlasnik]=useState('');
  let currentUser;
  const [ulogovan,setUlogovan]=useState(false);
  useEffect(()=>{
    currentUser = auth.currentUser;
        if (currentUser) {
          // Korisnik je prijavljen, možete pristupiti njegovim podacima
          setUlogovan(true);
          // ...
        } else {
          setUlogovan(false);
        }
  },[])
  const noviOglas = {};
  useEffect(() => {
    if (id) { // Provera da li je id definisan
      const podaciRef = doc(db, 'postovi', id);
      getDoc(podaciRef)
        .then((x) => {
          if (x.exists()) {
            const userData = x.data();

            
            noviOglas.key=x.id;
            noviOglas.opis = userData.opis;
            noviOglas.lokacija = userData?.lokacija?.toJSON();
            noviOglas.mesto=userData?.mesto;
            noviOglas.slika = userData.slika;
            noviOglas.tagovi = userData.tagovi;
            noviOglas.vreme = userData.vreme.toDate();
            
            setOglas(noviOglas);
            setOpis(userData.opis);
            setSlika(userData.slika);
            setTagovi(userData.tagovi);
            setVreme(userData.vreme);
            setVlasnik(userData.vlasnik);

            getDoc(userData.vlasnik).then(v=>{
              const vlasnik = {
                id: v.data().slika,
                korisnickoIme: v.data().username,
                imejl: v.data().email
              };
              noviOglas.vlasnik = vlasnik;
              
              getDownloadURL(ref(storage,`slikeKorisnika/${vlasnik.id}`))
              .then((s)=>{
                noviOglas.vlasnik.slika=s;
                setOglas(noviOglas);
                setOglasPostoji(true);
                console.log(oglas);
              })
            })
          } else {
            setOglasPostoji('defnema');
          }
        })
        .catch(error => console.log(error));
        
    }
  }, [id]); // Dodatni argument [id] osigurava da se useEffect ponovno poziva kada se promeni vrednost id-a

  return (
    <>
      <div className="sidebarLogo" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <Link href='/' >
          <Image style={{ borderRadius: '50%', margin: '0' }} width="70" height="70" alt="" src={inLogo} />
      </Link>
      </div>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>       
       {oglasPostoji===true?oglas&&oglas.vlasnik&&<Oglas jedanOglas = {true}oglas={oglas}/>:oglasPostoji=='defnema'?<div>Trazeni oglas ne postoji.</div>:<div>Ucitavanje...</div>}
        {/* {slika !== '' && <img src={slika} alt="" className="slikaOglasa" />}
        {opis}
        {ulogovan && <div>Pronadji vlasnika u aplikaciji, klikni <Link href="../">ovde</Link>.</div>}
        {!ulogovan && <div>Prijavi se <Link href="../">ovde</Link> i pronadji vlasnika vlasnika. </div>} */}
      </div>
    </>
  );
}

export default OglasUrl;
