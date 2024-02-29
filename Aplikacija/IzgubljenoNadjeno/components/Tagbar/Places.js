import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";


import styles from "../../styles/places.module.css";

export default function Places(props) {

    const [lokacija, setLokacija] = useState("");
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    let mesto;

    const handleSelect = async (value) => {
        mesto = value;
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        props.setImeMesta(mesto);
        setLokacija(mesto);
        setAddress(value);
        setCoordinates(latLng);
        //Funkcija za prenos podataka u NapraviOglas.js
        props.onSelectPlace({ address: value, coordinates: latLng });
    };


    //#region UCITAVANJE API-KLJUCA
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });
    if (!isLoaded) return <div>Ucitavanje mape...</div>;
    //#endregion

    //#region RETURN()
    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (//Propovi komponente PlacesAutocomplete
                    <div>

                        {/* <p>Latitude: {coordinates.lat}</p>  <---TEST ZA PROVERU FUNKCIONALNOSTI
                        <p>Longitude: {coordinates.lng}</p> */}
                        <input className={styles.placesInput} {...getInputProps({ placeholder: "Unesite lokaciju" })} />
                        <div className={styles.placesDropdownContainer}>
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map((suggestion) => {

                                const style = suggestion.active
                                    ? { backgroundColor: "#ddb1ed", cursor: "pointer" }  //STIL ZA PREPORUKE
                                    : { backgroundColor: "#ffffff", cursor: "pointer" };

                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}> {/* SAM SUGGESTION U DIVU */}
                                        {suggestion.description} /
                                    </div>
                                )

                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    )
    //#endregion
}