import styles from "../../styles/profilna.module.css";

export default function Inputi(props){
    return (
        <div className={styles.tabela}>
                
                        <label className={styles.labele}>Ime</label>
                        
                        <input className={styles.unos} type="text" name="ime" placeholder={props.ime}></input><br />
                        
                    
                        <label className={styles.labele}>Prezime</label>
                       
                        <input className={styles.unos} type="text" name="prezime" placeholder={props.prezime}></input><br />
                  
                        <label className={styles.labele}>Username</label>
                      
                        <input className={styles.unos} type="text" name="username" placeholder={props.username}></input><br />
                       
                        
                        </div>
    );
}