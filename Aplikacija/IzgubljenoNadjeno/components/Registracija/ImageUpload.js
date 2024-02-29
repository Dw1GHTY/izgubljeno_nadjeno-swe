
import React from 'react';
import register from "../../public/add-image.png";
import Image from "next/image";
import styles from "../../styles/registracija.module.css";

function ImageUpload({ setImageUrl }) {
  

  const handleSlikaChange = (e) => {
    const file = e.target.files[0];
    //const imageUrl = URL.createObjectURL(file);
    setImageUrl(file);
  };


  return (
    <>
      <input
        id="dodajsliku"
        className={styles.ovo}
        type="file"
        accept="image/*"
        required
        onChange={handleSlikaChange}
      />
      <label htmlFor="dodajsliku" className={styles.labelica}>
        <Image className={styles.slika} src={register} alt="Icon" />
      </label>
    </>
  );
}

export default ImageUpload;