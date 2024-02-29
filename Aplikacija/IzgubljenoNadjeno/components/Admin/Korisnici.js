import {storage,auth,db, app} from "../../config/firebase.js";
import React,{useState,useEffect} from 'react';
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import styles from "../../styles/admin.module.css";
import { ref, getDownloadURL } from 'firebase/storage';

export default function Korisnici()
{
    const [users,setUsers]=useState([]);

    const usersCollectionRef=collection(db, "users");
    useEffect(()=>
    {
        const getUsers= async ()=>{
            const data=await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
        }

        getUsers();
    },[])

    

    return (<div  className={styles.divOglasi} >
        <br />
        {users.map((user)=>{
            return <div className={styles.osoba} >
                <div className={styles.ime}><h1 className={styles.h1}>Ime:</h1><h1 className={styles.h1}>{user.ime}</h1></div>
                <div className={styles.prezime}><h1 className={styles.h1}>Prezime:</h1><h1 className={styles.h1}>{user.prezime}</h1></div>
                <div className={styles.email}><h1 className={styles.h1}>Email:</h1><h1 className={styles.h1}>{user.email}</h1></div>
                <div className={styles.username}><h1 className={styles.h1}>Username:</h1><h1 className={styles.h1}>{user.username}</h1></div>
                {/* <button onClick={()=>{del(user)}}>Obrisi</button> */}
                </div>
            })}
        </div>);
}