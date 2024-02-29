import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import inLogo from "../../public/inLogo.png";
import { HomeIcon, InboxIcon, UserIcon } from "@heroicons/react/solid";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import Forma from "../Registracija/Forma.js"
import styles from "../../styles/sidebar.module.css";
import styles2 from "../../styles/oglas.module.css"
import Profile from "../Profilna/Profile.js";
import React, { useState, useEffect, use } from "react";
import CelaSredina from "../Scrollbar/CelaSredina";
import Link from 'next/link';
import {ChartPieIcon} from "@heroicons/react/solid";

import Chat from "../../components/Chat/Chat";

import DropupLogout from "./DropupLogout.js";
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, getDownloadURL } from 'firebase/storage';

import { storage, auth, db } from "../../config/firebase.js";

export default function Sidebar(props) {
  const [admin, setAdmin]=useState(false);
  /****************OVO MI TREBA*******************/
  const [korisnik, setKorisnik] = useState(null);
  const [slikaKorisnika, setSlikaKorisnika] = useState('');
  const [imeKorisnika, setImeKorisnika] = useState('');
  const [prezimeKorisnika, setPrezimeKorisnika] = useState('');
  const [usernameKorisnika, setUsernameKorisnika] = useState('');
  const [emailKorisnika, setEmailKorisnika] = useState('');
  const [idKorisnika, setIDKorisnika] = useState('');
  const [emailVlasnika, setEmailVlasnika] = useState('');
  
  /********************************************* */
  const [poslednjiDatum, setPoslednjiDatum] = useState(new Date());
  const [krajOglasa, setkrajOglasa] = useState(false);
  const [oglasi, setOglasi] = useState([]);

  /******************OVO MI TREBA********************/
  const [vlasnikKomeSaljem, setVlasnikKomeSaljem] = useState(null);
  const [chats, setChats] = useState([]);

  /**************************************************/
  const [logprikazi, setLogprikazi] = useState(false);
  const [mojiOglasi, setMojiOglasi] = useState([]);
  const [isLoading, setLoading] = useState(true);

  
  function odloguj() {
    setPrikaziProfil(false);
    setPrikaziPoruke(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      if (korisnik) {
        setSlikaKorisnika('https://th.bing.com/th/id/OIP.cQL9pRlXh-HNIeU4NzYPmAHaHa?pid=ImgDet&rs=1');
      }

    };

    fetchData();

    return () => {

    };
  }, []);


  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {

      if (user) {
        const adminRef = doc(db, "admini", user.uid);
            getDoc(adminRef).then( (doc) => {
                if (doc.exists()) {
                    setAdmin(true);
                }
            });
        setKorisnik(user);

        const podaciRef = doc(db, 'users', user.uid);
        const imageRef = ref(storage, `slikeKorisnika/${user.uid}`);
        setIDKorisnika(user.uid);
        getDownloadURL(imageRef).then((url) => {
          setSlikaKorisnika(url);
        }).catch(() => {
          e =>{
            
            console.log(e);}
        });
        getDoc(podaciRef).then((x) => {
          if (x.exists()) {
            const userData = x.data();

            setImeKorisnika(userData.ime);
            setPrezimeKorisnika(userData.prezime);
            setEmailKorisnika(userData.email);

            setUsernameKorisnika(userData.username);
          } else {
            setImeKorisnika('');
            setPrezimeKorisnika('');
            setUsernameKorisnika('');
            setSlikaKorisnika('');
            setAdmin(false);
          }
        }).catch(error => console.log(error));
      }
      else {
        setKorisnik(null);
        setAdmin(false);
      }
    });

    return () => {
      listen();
    };

  }, []);


  const [prikaziProfil, setPrikaziProfil] = useState(false);
  
  const [prikaziPoruke, setPrikaziPoruke] = useState(false);

  function home() {
    if(props.tagbarQuery>=0)
      {
        props.setTagbarQuery(props.tagbarQuery+1);
      }
      else
        {
          props.setTagbarQuery(0);
          setPoslednjiDatum(new Date());
        }
    props.setPrikaziOglase(true);
    setPrikaziPoruke(false);
    setPrikaziProfil(false);
  }
  function profile() {
    setPrikaziPoruke(false);
    props.setPrikaziOglase(false);
    setPrikaziProfil(true);
  }

  function chat() {
    setPrikaziPoruke(true);
    props.setPrikaziOglase(false);
    setPrikaziProfil(false);
  }


  return (
    <>
      <div className={styles.sidebarContainer}>

        {/*logo*/}
        <div className={styles.sidebarLogo}>
          <Image style={{ borderRadius: '50%', margin: '0' }} width="50" height="50" alt="" src={inLogo} />
        </div>

        {/*menu*/}
        {korisnik != null && (
          <div className={styles.sidebarMenu} >
            <div style={{ padding: '0', margin: '0' }} onClick={home} >
              <SidebarMenuItem text="Novosti" Icon={HomeIcon} />
            </div>
            <div style={{ padding: '0', margin: '0' }} onClick={chat} >
              <SidebarMenuItem text="Sanduče" Icon={InboxIcon} />
            </div>
            <div style={{ padding: '0', margin: '0' }} onClick={profile}>
              <SidebarMenuItem text="Moj profil" Icon={UserIcon} />
            </div>
            
            {admin&&<Link href='../adminIndex' style={{ "text-decoration":"none", color:"black"}}>
            <div style={{ padding: '0', margin: '0' }}  >
              <div className={styles.sidebarMenuItem+" "+styles.hoverEffect}>
              <ChartPieIcon className={styles.sidebarIcon}/>
              <label className={styles.nestani + " " + styles.sidebarMenuItemLabel}>
                <span>
                  Admin panel
                </span>
              </label>
            </div>
            </div></Link>}

          </div>
        )}


        {/*post button*/}
        <div style={{ padding: '0', margin: '0' }}>
        <div className={styles.sidebarMenuItem}>
          <Forma admin={admin} setAdmin={setAdmin} usernameKorisnika={usernameKorisnika}
          slikaKorisnika={slikaKorisnika} korisnik={korisnik} setKorisnik={setKorisnik} logprikazi={logprikazi} setLogprikazi={setLogprikazi} />
        </div>
        </div>

        {/*profile minicard*/}
        {korisnik && slikaKorisnika && (
          <>
            <div className={styles.profileMinicard + " " +  " " + styles.nestani}>
              <img src={slikaKorisnika}
                alt="user-img" className={styles.profileMinicardImg + " " + styles2.pfp} />
              <div className={styles.nestani + " " + styles.profileImeUsername}>
                <h4 className={styles.ime}>{imeKorisnika} {prezimeKorisnika}</h4>
                <p className={styles.username}>@{usernameKorisnika}</p>
              </div>

              <div className={styles.dropup} onClick={odloguj}>
                <DotsHorizontalIcon className={styles.profileMinicardDots} />
                <DropupLogout setSlikaKorisnika={setSlikaKorisnika}/>
              </div>
            </div>

          </>)}
      </div>
      {

      (prikaziPoruke && <Chat   //<<-----OVDE PROSLEDJUJEM NEOPHODNO***/
      korisnik={korisnik}
      imeKorisnika={imeKorisnika}
      prezimeKorisnika={prezimeKorisnika}
      usernameKorisnika={usernameKorisnika}
      slikaKorisnika={slikaKorisnika}
      chats={chats}
      setChats={setChats}
      vlasnikKomeSaljem={vlasnikKomeSaljem}
      setVlasnikKomeSaljem={setVlasnikKomeSaljem} />)

        ||((!korisnik || props.prikaziOglase && idKorisnika && slikaKorisnika) && 
        <CelaSredina 
        setVlasnikKomeSaljem={setVlasnikKomeSaljem}
        emailKorisnika={emailKorisnika}
        setTagbarQuery={props.setTagbarQuery}
        tagbarQuery={props.tagbarQuery} 
        setPrikaziPoruke={setPrikaziPoruke} 
        setPrikaziOglase={props.setPrikaziOglase} 
        setEmailVlasnika={setEmailVlasnika}
        setLogprikazi={setLogprikazi} 
        korisnik={korisnik} 
        IDkorisnika={idKorisnika} 
        slikaKorisnika={slikaKorisnika} 
        oglasi={oglasi} 
        setOglasi={setOglasi} 
        poslednjiDatum={poslednjiDatum} 
        setPoslednjiDatum={setPoslednjiDatum} 
        krajOglasa={krajOglasa} 
        setkrajOglasa={setkrajOglasa}/>)

        || (prikaziProfil && idKorisnika && slikaKorisnika && <Profile isLoading={isLoading} setLoading={setLoading} mojiOglasi={mojiOglasi} setMojiOglasi={setMojiOglasi} id={idKorisnika} imeKorisnika={imeKorisnika} prezimeKorisnika={prezimeKorisnika} usernameKorisnika={usernameKorisnika} slikaKorisnika={slikaKorisnika} />)
      }
    </>
  );

}
