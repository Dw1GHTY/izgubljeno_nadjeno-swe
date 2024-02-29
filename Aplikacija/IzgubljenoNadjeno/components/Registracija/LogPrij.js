import styles from "../../styles/registracija.module.css";
import {onAuthStateChanged,  signInWithEmailAndPassword} from 'firebase/auth';
import {auth,db} from "../../config/firebase.js";
import React, {useState, useEffect} from "react";
import { doc, getDoc } from "firebase/firestore";

const LogPrij=({setPrikazi,setLogprikazi})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [prijavljen,setPrijavljen]=useState(false);
    function ova2(){
        setPrikazi(true);
        setLogprikazi(false);
    }
    const signIn=(e)=>{
        e.preventDefault();

        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            console.log(userCredential);
            setPrijavljen(true);
            
        }).catch((error)=>{
            switch(error.code){
                case "auth/invalid-email": alert("Neispravan imejl");break;
                case "auth/missing-password": alert("Unesite lozinku");break;
                case "auth/user-not-found": alert("Nepostojeći nalog");break;
                case "auth/wrong-password": alert("Pogrešna lozinka!");break;
                default: alert(error.code);
            }
        })
    }
    function handleOnKeyDown(e){
        if(e.key==="Enter")
        signIn(e);
    }
    
    return (
        <form className={styles.forma+" "+styles.nova}>
            {(prijavljen==false && (
                <>
                <div className={styles.tabela}>
            <label  className={styles.labele}>Email</label>
            <input className={styles.unos} type="text" name="email" placeholder="Email" value={email} onChange={({target})=>setEmail(target?.value)} ></input><br />
            <label  className={styles.labele}>Password</label>   
            <input className={styles.unos} type="password" name="password" placeholder="Password" value={password} onChange={({target})=>setPassword(target?.value)} onKeyDown={handleOnKeyDown}></input><br />
        </div>
            <br />
            <button
            className={styles.btnModal2}
            type="button" onClick={signIn} >Dalje</button><br />
            <label className={styles.prijava}>Nemate nalog? <a className={styles.linkic} onClick={()=>ova2()}>Registrujte se</a></label>
                </>
            ))||
            (prijavljen && (
                <h3 className={styles.naslov3}>Uspesno prijavljeni</h3>
            )) 
            }
        </form>
    );
}
export default LogPrij;