import styles from "../../styles/profilna.module.css";
import Forma from "./Forma.js"

export default function SamoProfilna(props){
    
    let slikaDruga=props.slika;
    return(
        <div className={styles.divProfilne}>
            <div className={styles.slikaDiv} style={{
                        width: '10vw',
                        height: '10vw',
                        backgroundImage: `url(${slikaDruga})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}>
                    
                    <label htmlFor="dodajsliku">
                    <div className={styles.promeni}>
                      
                      </div>  
                      </label>
                    </div>
                    <div className={styles.podaci}>
                     <label className={styles.celoIme}>{props.ime + " " + props.prezime}</label><br /><label className={styles.username}>@{props.username}</label>
                    </div>
                    {/* <div className={styles.izmeni}>
                     <Forma ime={props.ime} prezime={props.prezime} username={props.username} />
                    </div> */}
                    
        </div>
        
    );
}