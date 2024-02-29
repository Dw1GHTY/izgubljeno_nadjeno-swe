import {storage,auth,db, app} from "../../config/firebase.js";
import React,{useState,useEffect} from 'react';
import { collection, doc, getDocs,getDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import styles from "../../styles/admin.module.css";
import { ref, deleteObject } from "firebase/storage";
import { TrashIcon } from "@heroicons/react/outline";

export default function Oglasi()
{
    const [oglasi,setOglasi]=useState([]);
    const [username,setUsername]=useState('');
    const oglasiCollectionRef=collection(db, "postovi");
    useEffect(()=>
    {
        onSnapshot(oglasiCollectionRef, data => {
            setOglasi(data.docs.map(doc=>({...doc.data(), id:doc.id})));
        });
        const getOglasi= async ()=>{
            const data=await getDocs(oglasiCollectionRef);
            
        }

        getOglasi();
    },[])

    const deleteOglas=async (id, slika)=>{
        const oglasDoc=doc(db,"postovi",id);
        await deleteDoc(oglasDoc);

        const desertRef = ref(storage, "Postovi/"+slika.split('%2F')[1].split('?')[0]);
        deleteObject(desertRef).then(() => {
        console.log("slika uspesno obrisana");
        }).catch((error) => console.log(error));        
    }
    

    return (<div className={styles.divOglasi} >
        <br />
        {oglasi.map((oglas)=>{
            getDoc(oglas.vlasnik).then((x)=>
             {
                if (x.exists()) {
                  const userData = x.data();
                  setUsername(userData.username);
                } else {
                }
              }).catch(error=>console.log(error));
          
            return <div className={styles.oglas} >
                
                <div className={styles.slika}><div style={{
            width: '4vw',
            height: '4vw',
            backgroundImage: `url(${oglas.slika})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: '50%',
        }}></div></div>
        <div className={styles.opis}><h1 className={styles.h1}>Opis:</h1><h1 className={styles.h1}>{oglas.opis}</h1></div>
                {/* <div className={styles.vreme}><h1 className={styles.h1}>Vreme:</h1><h1 className={styles.h1}>{oglas.vreme}</h1></div> */}
                {/* <div className={styles.vlasnik}><h1 className={styles.h1}>Vlasnik:</h1><h1 className={styles.h1}>@{username}</h1></div> */}
                <TrashIcon className={styles.icon} onClick={()=>{deleteOglas(oglas.id, oglas.slika)}} />
                </div>
            })}
        </div>);
}

// import {storage,auth,db, app} from "../../config/firebase.js";
// import React,{useState,useEffect} from 'react';
// import { collection, doc, getDocs,getDoc, deleteDoc } from "firebase/firestore";
// import styles from "../../styles/admin.module.css";
// import { TrashIcon } from "@heroicons/react/outline";

// export default function Oglasi()
// {
//     const [oglasi,setOglasi]=useState([]);
//     const [username,setUsername]=useState('');
//     const oglasiCollectionRef=collection(db, "postovi");
//     useEffect(()=>
//     {
//         const getOglasi= async ()=>{
//             const data=await getDocs(oglasiCollectionRef);
//             setOglasi(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
//         }

//         getOglasi();
//     },[])

//     const deleteOglas=async (id)=>{
//         const oglasDoc=doc(db,"postovi",id);
//         await deleteDoc(oglasDoc);
//     }
    

//     return (<div className={styles.divOglasi} >
//         <br />
//         {oglasi.map((oglas)=>{
//             getDoc(oglas.vlasnik).then((x)=>
//              {
//                 if (x.exists()) {
//                   const userData = x.data();
//                   setUsername(userData.username);
//                 } else {
//                 }
//               }).catch(error=>console.log(error));
          
//             return <div className={styles.oglas} >
                
//                 <div className={styles.slika}><div style={{
//             width: '4vw',
//             height: '4vw',
//             backgroundImage: `url(${oglas.slika})`,
//             backgroundPosition: 'center',
//             backgroundSize: 'cover',
//             borderRadius: '50%',
//         }}></div></div>
//         <div className={styles.opis}><h1 className={styles.h1}>Opis:</h1><h1 className={styles.h1}>{oglas.opis}</h1></div>
//                 {/* <div className={styles.vreme}><h1 className={styles.h1}>Vreme:</h1><h1 className={styles.h1}>{oglas.vreme}</h1></div> */}
//                 {/* <div className={styles.vlasnik}><h1 className={styles.h1}>Vlasnik:</h1><h1 className={styles.h1}>@{username}</h1></div> */}
//                 <TrashIcon className={styles.icon} onClick={()=>{deleteOglas(oglas.id)}} />
//                 </div>
//             })}
//         </div>);
// }