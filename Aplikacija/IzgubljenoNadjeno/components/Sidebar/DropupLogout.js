import styles from "../../styles/sidebar.module.css";
import { LogoutIcon } from "@heroicons/react/outline";
import {signOut} from "firebase/auth";
import {auth} from "../../config/firebase.js";

export default function DropupLogout(props) {
  
    const userSignOut=()=>{
        signOut(auth).then(()=>{
            console.log('sign out successful');
            props.setSlikaKorisnika('');
        })
        .catch(error=>console.log(error));
        
    }
    return (
        <div className={styles.dropupContent} onClick={userSignOut}>
             <a href="/">Logout <LogoutIcon className={styles.sidebarDropupIcon} /></a>
        </div>
    )
}
