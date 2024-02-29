import Admin from "../components/Admin/Admin.js";
import Korisnici from "../components/Admin/Korisnici.js";
import Oglasi from "../components/Admin/Oglasi.js";
import React, { useState, useEffect } from "react";
import { storage, auth, db, app } from "../config/firebase.js";
import { collection, doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';
import Grafici from "../components/Admin/Grafici.js";


export default function AdminHomePage() {


  const [korisnici, setKorisnici] = useState(false);
  const [oglasi, setOglasi] = useState(false);
  const [grafici, setGrafike] = useState(true);

  ///za tagove
  const [slikaKorisnika, setSlikaKorisnika] = useState('');
  const getCurrentUser = () => {
    const user = auth.currentUser;
    if (user) {
      const podaciRef = doc(db, 'users', user.uid);
      const imageRef = ref(storage, `slikeKorisnika/${user.uid}`);
      getDownloadURL(imageRef).then((url) => {
        setSlikaKorisnika(url);
      }).catch(() => {
        console.log('ovde');
      });
      getDoc(podaciRef).then((x) => {
        if (x.exists()) {
          const userData = x.data();
          // setImeKorisnika(userData.ime);
          // setPrezimeKorisnika(userData.prezime);
          // setUsernameKorisnika(userData.username);
        } else {
          // setImeKorisnika('');
          // setPrezimeKorisnika('');
          // setUsernameKorisnika('');
          setSlikaKorisnika('https://th.bing.com/th/id/OIP.cQL9pRlXh-HNIeU4NzYPmAHaHa?pid=ImgDet&rs=1');
        }
      }).catch(error => console.log(error));
    } else {

    }
  };

  getCurrentUser();


  return (
    <div className="adminIndex">
      
      <Admin slikaKorisnika={slikaKorisnika} setKorisnici={setKorisnici} setOglasi={setOglasi} setGrafike={setGrafike} />
      {/* <Korisnici /> */}
      {/* <Oglasi /> */}
      {/* <Analitika /> */}
      {
        (grafici && <Grafici />) || (korisnici && <Korisnici />) || (oglasi && <Oglasi />)
      }

    </div>
  );
}



