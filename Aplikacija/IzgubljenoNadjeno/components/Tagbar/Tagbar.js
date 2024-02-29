
import styles from "../../styles/tagbar.module.css"
import Tag from "./Tag";
import Map from "./Map";
import styles2 from '../../styles/pocetna.module.css';

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import SearchBar from './SearchBar'
const tagzzz = ["dokumenta", "novčanik", "pas", "kljucevi"];
export default function Tagbar(props) {
    


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Ucitavanje mape...</div>;

    

    return (
        <>
            <div className={styles.tagbarContainer + " " + styles.nestani} >

                {/* <SearchBar setTagQuery={props.setQuery}/> */}

                {/*Tags*/}
                <div className={styles.tagsContainer}>
                <h1 className={styles2.naslov}>Bitno</h1>
                    {tagzzz.map((tag,i)=><Tag name={tag} key={i}setTagQuery={props.setQuery}/>)}
                </div>

                {/*Map*/}
                <div className={styles.tagbarMapContainer} >
                    <Map setTagQuery={props.setQuery}/>
                </div>
            </div >
        </>
    )
}
