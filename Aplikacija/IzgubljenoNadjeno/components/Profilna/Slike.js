import styles from "../../styles/profilna.module.css";
import SamoProfilna from "./SamoProfilna.js";
import InfiniteScroll from "../Scrollbar/Scrollbar.js";
import Home from "./Home.js";
import MojiOglasi from "../Scrollbar/MojiOglasi";

export default function Slike(props){
    //const register="https://c4.wallpaperflare.com/wallpaper/985/136/886/building-lights-illustration-romain-trystram-cityscape-hd-wallpaper-preview.jpg";
    const register="https://images.pexels.com/photos/4175060/pexels-photo-4175060.jpeg?auto=compress&cs=tinysrgb&w=600";
    return (
        <div className={styles.coverPhoto} style={{
            width: '100%',
            height: '12vw',
            backgroundImage: `url(${register})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}>
           
            <Home username={props.username} />
            <SamoProfilna ime={props.ime} prezime={props.prezime} username={props.username} slika={props.slika} />
            
            <div className={styles.mojiPostovi}>
                <MojiOglasi isLoading={props.isLoading} setLoading={props.setLoading} mojiOglasi={props.mojiOglasi} setMojiOglasi={props.setMojiOglasi} idVlasnika={props.idkorisnika} username={props.username} slika={props.slika}/>
            </div>
        </div>
    );
}