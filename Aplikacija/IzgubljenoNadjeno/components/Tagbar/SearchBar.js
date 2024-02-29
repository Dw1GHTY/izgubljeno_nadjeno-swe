import { SearchIcon } from "@heroicons/react/outline";
import styles from "../../styles/tagbar.module.css";
import { useState } from "react";
export default function SearchBar(props) {
    const [searchTekst, setSearchTekst] = useState("");
  
    const handleSearch = ()=>{
        props.setTagQuery(query(collection(db, "postovi"),where('tagovi','array-contains', searchTekst)));
    }

    const PostaviTekst = (e) => {
        setSearchTekst(e.target.value);
    };

  return  <>
    <div className={styles.searchbarContainer}>
      <div className={styles.searchDiv}>
        <input id="srč"
          type="button"
          onClick={handleSearch}
          className={styles.noStyle +" "+styles.hover}></input>

        <label htmlFor="srč">
          <SearchIcon className={styles.searchIcon} />
        </label>

        <input
          type="text"
          placeholder="Pretražite oglase"
          className={styles.searchBox}
          onChange={PostaviTekst}
        />
      </div>
    </div>
  </>;
}
