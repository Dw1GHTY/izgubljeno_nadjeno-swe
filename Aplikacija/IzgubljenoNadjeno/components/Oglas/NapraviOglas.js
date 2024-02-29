import styles from "../../styles/oglas.module.css";
import { Tagovi, vratiTagove } from "./Tagovi";
import { use, useState } from "react";
import { LocationMarkerIcon, DocumentAddIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/outline";
import { collection, updateDoc, doc, addDoc, GeoPoint } from "firebase/firestore";
import { db, storage } from "../../config/firebase.js";
import { uploadBytes, ref } from "firebase/storage";
import Places from "../Tagbar/Places.js";
import Forma from "../Registracija/Forma";

const postoviRef = collection(db, "postovi");

export default function NapraviOglas(props) {
  const [brojKaraktera, setbrojKaraktera] = useState(0);
  const [opisPosta, setOpisPosta] = useState();
  const [imeMesta, setImeMesta] = useState("");
  /*DODATO->LOKACIJA*/
  const [adresa, setAdresa] = useState("");
  const [koordinate, setKoordinate] = useState({ lat: 0, lng: 0 });
  const [dodajLokaciju, setDodajLokaciju] = useState(false);
  /**********************************************/
  const [slikaPosta, setSlikuPosta] = useState();
  const [postaviPost, setPostaviPost] = useState(0);
  const [resetujTagove, setResetujTagove] = useState(false);
  const [uspesnoPostavljeno, setUspesnoPostavljeno] = useState(false);
  const PostaviTekst = (e) => {
    setbrojKaraktera(e.target.value.length);
    setOpisPosta(e.target.value);
    setResetujTagove(false);
  };

  const DodajSliku = (e) => {
    setSlikuPosta(e.target.files[0]);
  };

  /**PREUZETI ADRESA I KOORDINATE IZ PLACES.JS**/
  const handleSelectPlace = (place) => {
    setAdresa(place.address);
    setKoordinate(place.coordinates);
  }
  /**************************/

  const DodajUBazu = () => async () => {
    if (!props.idkorisnika) {
      props.setLogprikazi(true);
    }
    setPostaviPost(postaviPost + 1);
    if (slikaPosta == null) return;
    if (opisPosta == null || opisPosta == 0) return;

    //MENJANO
    const noviPost = await addDoc(postoviRef, {
      opis: opisPosta,
      vreme: new Date(),
      lokacija: new GeoPoint(koordinate.lat, koordinate.lng), //RADI
      vlasnik: doc(db, "users/" + props.idkorisnika),
      mesto: imeMesta,
      slika: "",
      tagovi: vratiTagove()
    })
      .then((e) => {
        const id_novog_dokumenta = e._key.path.segments[1];
        const idSlike = props.idkorisnika + "-" + id_novog_dokumenta + "." + slikaPosta.name.split(".").pop();
        const storageRef = ref(storage, "Postovi/" + idSlike);

        //dodavanje slike u Storage
        uploadBytes(storageRef, slikaPosta).catch((e) => console.log(e));

        //dodavanje u FireStore
        updateDoc(doc(db, "postovi", id_novog_dokumenta), {
          slika:
            "https://firebasestorage.googleapis.com/v0/b/izgubljenonadjeno-jjm.appspot.com/o/Postovi%2F" +
            idSlike +
            "?alt=media",
        }).catch((e) => console.log(e));
      })
      .then(() => {
        setOpisPosta("");
        setPostaviPost(0);
        setbrojKaraktera(0);
        setSlikuPosta(undefined);
        setResetujTagove(true);
        setUspesnoPostavljeno(true);
      });
  };

  function handleLokaciju()
  {
    setDodajLokaciju(!dodajLokaciju);
  }

  return (
    <div className={styles.NapraviOglas + " " +styles.ceoOglas + " " + styles.border}>

      <form
        id="formicazapost"
        onKeyDown={(e) => {
          if (e.key == "Enter") e.preventDefault();
        }}
      >
        <table>
          <thead>
            <tr>
              <td valign="top">
                {" "}
                <img
                  src={props.slikaKorisnika}
                  className={styles.pfp}
                  alt="korisnikova-slika"
                />
              </td>
              <td className={styles.sirina100}>
                {" "}
                <textarea
                  value={opisPosta}
                  rows="5"
                  maxLength="200"
                  className={
                    styles.tekstUnetogOglasa
                  }
                  placeholder="Šta sam pronašao/la danas?"
                  onChange={PostaviTekst}
                />
              </td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td />
              <td>
                {" "}
                <Tagovi reset={resetujTagove} />
              </td>
            </tr>
            <tr>
              <td />
              <td className={styles.sivtekst}>
                <input
                  id="dodajsliku"
                  className={styles.sakrij}
                  type="file"
                  accept="image/*"
                  onChange={DodajSliku}
                />
                <label htmlFor="dodajsliku">
                  <DocumentAddIcon className={styles.objaviNoviOglasAdd} />
                </label>

                <input
                  id="dodajLokaciju"
                  className={styles.sakrij}
                  type="button"
                  onClick={handleLokaciju}
                />
                <label htmlFor="dodajLokaciju">
                <LocationMarkerIcon className={styles.objaviNoviOglasAdd} />
                </label>

                {dodajLokaciju&&<Places className={styles.placesStyle} setImeMesta={setImeMesta} onSelectPlace={handleSelectPlace} />}

                <div className={styles.floatDesno}>
                  {brojKaraktera}/200
                  <input
                    onClick={DodajUBazu()}
                    type="button"
                    value="Objavi"
                    className={styles.objaviNoviOglasbtn}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {postaviPost > 0 &&
          (opisPosta == undefined ||
            opisPosta == "" ||
            brojKaraktera == 0 ||
            slikaPosta == undefined) && (
            <section className={styles.poravnaj}><ExclamationCircleIcon className={styles.minicheckmark + " " + styles.darkRed} /><span className={styles.darkRed}>Morate postaviti i opis i sliku</span></section>
          )}
        {uspesnoPostavljeno && <section className={styles.poravnaj}><CheckCircleIcon className={styles.minicheckmark + " " + styles.nasaBoja} /><span color="gray">Uspešno postavljeno</span></section>}
      </form>
    </div>
  );
}
