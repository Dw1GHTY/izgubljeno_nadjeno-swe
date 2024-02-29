import styles from "../../styles/profilna.module.css";
import Slike from "./Slike.js";

export default function Profile(props){
    return(
        <div className={styles.osnova}>
            <Slike isLoading={props.isLoading} setLoading={props.setLoading} mojiOglasi={props.mojiOglasi} setMojiOglasi={props.setMojiOglasi} idkorisnika={props.id} ime={props.imeKorisnika} prezime={props.prezimeKorisnika} username={props.usernameKorisnika} slika={props.slikaKorisnika} />
        </div>
    );
}