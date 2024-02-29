import { useEffect, useState } from "react";
import styles from "../../styles/oglas.module.css";

const VrednostiTagova = [];                           ///zbog da bi se slalo van
export function vratiTagove() {
  return VrednostiTagova;
}

export function Tagovi({ reset }) {
  const [tagovi, setTagovi] = useState([]);
  
  useEffect(() => {
    if (reset) {
      console.log("iznutra");
      setTagovi([]);
    }
  }, [reset]);

  function handleKeyDown(e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTagovi([...tagovi, value.trim()]);
    VrednostiTagova.push(value.trim());
    e.target.value = "";
  }

  function ukloniTag(index) {
    setTagovi(tagovi.filter((el, i) => i !== index));

    for (let i = index; i < VrednostiTagova.length - 1; i++) {
      VrednostiTagova[i] = VrednostiTagova[i + 1];
    }
    VrednostiTagova.pop();
  }

  return (
    <div className={styles.tagsInputContainer}>
      {tagovi.map((tag, index) => (
        <div className={styles.tagItem} key={index}>
          <span className={styles.text}>{tag}</span>
          <span className={styles.close} onClick={() => ukloniTag(index)}>
            &times;
          </span>
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type="text"
        className={styles.tagsInput}
        placeholder="Unesite tagove"
      />
    </div>
  );
}
