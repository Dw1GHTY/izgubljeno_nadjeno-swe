import styles from "../../styles/tagbar.module.css";
import {query, collection, where, orderBy} from "firebase/firestore";
import { db } from "../../config/firebase.js";

export default function Tag(props) {
    function setQuery(){
        props.setTagQuery(query(collection(db, "postovi"),where('tagovi','array-contains', props.name)));
    }
    return (
        <div onClick={setQuery}className={styles.hoverEffect + " " + styles.tag}>
            <span className={styles.tagName} >#{props.name}</span>
        </div>
    )
}
