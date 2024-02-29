import React, {useState, useEffect} from "react";
import styles from "../../styles/registracija.module.css";
import {onAuthStateChanged ,createUserWithEmailAndPassword} from 'firebase/auth';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { doc, setDoc } from "firebase/firestore";

import ImageUpload from './ImageUpload.js';

import { uploadBytes, ref } from "firebase/storage";

import {storage,auth,db, app} from "../../config/firebase.js";

const Registracija=({setPrikazi,setLogprikazi})=>{

  function ova(){
    setPrikazi(false);
    setLogprikazi(true);
}
    
    const [imageUrl, setImageUrl] = useState(null);
    const [registrovan,setRegistrovan]=useState(false);
    //setRegistrovan(false);
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    useEffect(()=>{
        const listen=onAuthStateChanged(auth,(user)=>{
            if(user){
                //setAuthUser(user);
                setRegistrovan(true);
            }else{
                //setAuthUser(null);
                setRegistrovan(false);
            }
        });
        return ()=>{listen();}
    },[])


    const register = () => {

      
      if (!validate_field(ime)) {
        alert('Molimo unesite Vaše ime');
        return;
      }

      if(!validate_field(prezime)) {
        alert('Molimo unesite Vaše prezime');
        return;
      }
        
        if (!validate_email(email)) {
          alert('Neispravan imejl');
          return;
        }

        if(!validate_password(password)){
          alert('Neispravna lozinka!');
          return;
        }
    
        

        const analytics = getAnalytics();
        logEvent(analytics, 'user_registration', {
          registrationMethod: 'your_registration_method', // Dodajte dodatne parametre ako je potrebno
        });
        let slika = imageUrl;
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            //const user = currentUser(auth);
            const user = auth.currentUser;
            
            
            const user_data = {
              
              email: email,
              ime: ime,
              prezime: prezime,
              username: username,
              slika: user.uid,
              last_login: Date.now()
            };
            
            const userRef = doc(db, 'users', user.uid);
                 
            
            setDoc(userRef, user_data)
                .then(() => {
                  if(imageUrl!=null)
                  {
                    const storageRef=ref(storage,`slikeKorisnika/${user.uid}`);
                    uploadBytes(storageRef,slika).then().catch();
                  }
                
                  // Korisnički podaci su uspešno sačuvani u Firestore-u
                })
                .catch((error) => {
                  
                  // Došlo je do greške prilikom čuvanja korisničkih podataka
                  // Obradite grešku na odgovarajući način
                });
          })
          .catch((error) => {
            switch(error.code){
              case "auth/invalid-email": alert("Neispravan imejl");break;
              case "auth/missing-password": alert("Unesite lozinku");break;
              case "auth/user-not-found": alert("Nepostojeći nalog");break;
              case "auth/wrong-password": alert("Pogrešna lozinka");break;
              case "auth/weak-password": alert("Slaba lozinka");break;
              case "auth/email-already-in-use": alert("Vec postoji nalog sa ovim imejlom!");break;
              default: alert(error.code);
          }
          });

      };

    function validate_email(email){
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(mailformat.test(email))
      {
        return true;
      }
      else
      {
        return false;
      }
      }
      
      function validate_password(password){
        if(password<6)
        {
          return false;
        }else{
          return true;
        }
      }
      
      function validate_field(field)
      {
        if(field==null){
          return false;
        }
        if(field.length<=0)
        {
          return false;
        }
        return true;
      }

      function handleOnKeyDown(e){
        if(e.key==="Enter")
        register();
    }
      


        return (
            <form className={styles.forma}>
              {(registrovan==false && 
                (<>
                 <ImageUpload setImageUrl={setImageUrl}  />
                 {imageUrl?<div>{imageUrl.name}</div>:""}
                 <div className={styles.tabela}>
                
                      <label className={styles.labele}>Ime</label>
                      
                      <input className={styles.unos} type="text" name="ime" placeholder="Ime" value={ime} onChange={({target})=>setIme(target?.value)}></input><br />
                      
                  
                      <label className={styles.labele}>Prezime</label>
                      
                      <input className={styles.unos} type="text" name="prezime" placeholder="Prezime" value={prezime} onChange={({target})=>setPrezime(target?.value)}></input><br />
                
                      <label className={styles.labele}>Username</label>
                    
                      <input className={styles.unos} type="text" name="username" placeholder="Username" value={username} onChange={({target})=>setUsername(target?.value)}></input><br />
                      
                      <label className={styles.labele}>Email</label>
                      
                      <input className={styles.unos} type="email" name="email" placeholder="E-mail" value={email} onChange={({target})=>setEmail(target?.value)}></input><br />
                      
                      <label className={styles.labele}>Password</label>
                      
                      <input className={styles.unos} type="password" name="password" placeholder="Password" value={password} onChange={({target})=>setPassword(target?.value)} onKeyDown={handleOnKeyDown}></input><br />
                      
                      
                  </div>
                        
                
                    <br />
                    
                    <button
                    className={styles.btnModal2}
                    type="button" onClick={register}>Dalje</button><br />
                    <label className={styles.prijava}>Imate nalog? <a className={styles.linkic} onClick={()=>ova()}>Prijavite se</a></label>
                    
                </>
              )) || (registrovan==true && (
                <h3 className={styles.naslov3}>Uspesno ste kreirali profil</h3>
              ))}
                
            </form>
        );
    
}

export default Registracija;
