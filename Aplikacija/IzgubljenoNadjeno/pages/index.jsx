
import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Tagbar from '../components/Tagbar/Tagbar';
import '../config/firebase';




export default function HomePage() {
  
    ///Tagbar
    const [tagbarQuery, setTagbarQuery] = useState(0);
    const [prikaziOglase, setPrikaziOglase] = useState(true);
  return (
    <>
    <div className="appContainer">
      <div className="levo">
      <Sidebar prikaziOglase={prikaziOglase} setPrikaziOglase={setPrikaziOglase} tagbarQuery={tagbarQuery} setTagbarQuery={setTagbarQuery}/>
      </div>
      
      { prikaziOglase&&
        <div className="desno">
      <Tagbar setQuery={setTagbarQuery}/>
      </div>}  
      </div>      
    </>
  );
}



