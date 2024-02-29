import styles from '../../styles/pocetna.module.css';
import NapraviOglas from '../Oglas/NapraviOglas';
import InfiniteScroll from "./Scrollbar.js";


export default function CelaSredina(props) {

  return (

    <div className={styles.flexbox}>
      <h1 className={styles.naslov}>Novosti</h1>
      {props.korisnik && props.IDkorisnika &&props.slikaKorisnika && <NapraviOglas idkorisnika={props.IDkorisnika} slikaKorisnika={props.slikaKorisnika} />}
      {/* {props.korisnik ? <NapraviOglas idkorisnika={props.IDkorisnika} slikaKorisnika={props.slikaKorisnika} />
        : <NapraviOglas setLogprikazi={props.setLogprikazi} slikaKorisnika='https://th.bing.com/th/id/OIP.cQL9pRlXh-HNIeU4NzYPmAHaHa?pid=ImgDet&rs=1' />} */}

      {props.korisnik ?
        <InfiniteScroll 
          setTagbarQuery={props.setTagbarQuery}
          tagbarQuery={props.tagbarQuery} 
          idulogovanogkorisnika={props.IDkorisnika}   
          setPrikaziPoruke={props.setPrikaziPoruke}
          setPrikaziOglase={props.setPrikaziOglase}
          setVlasnikKomeSaljem={props.setVlasnikKomeSaljem}
          setEmailVlasnika={props.setEmailVlasnika}
          oglasi={props.oglasi}
          setOglasi={props.setOglasi}
          poslednjiDatum={props.poslednjiDatum}
          setPoslednjiDatum={props.setPoslednjiDatum}
          krajOglasa={props.krajOglasa}
          setkrajOglasa={props.setkrajOglasa}
          emailKorisnika={props.emailKorisnika} />
        
          : <InfiniteScroll
          setTagbarQuery={props.setTagbarQuery}
          tagbarQuery={props.tagbarQuery}
          setLogprikazi={props.setLogprikazi}
          oglasi={props.oglasi}
          setOglasi={props.setOglasi}
          poslednjiDatum={props.poslednjiDatum}
          setPoslednjiDatum={props.setPoslednjiDatum}
          krajOglasa={props.krajOglasa}
          setkrajOglasa={props.setkrajOglasa} />

      }
    </div>
  );
} 