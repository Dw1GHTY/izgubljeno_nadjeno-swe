import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

import { db } from "../../config/firebase";
import { collection, onSnapshot, query, where, GeoPoint } from "firebase/firestore";

import styles from "../../styles/tagbar.module.css";


export default function Map(props) {

    const [markers, setMarkers] = useState([]); //sastoje se od lokacije (lat, lng)
    const postoviCollectionRef = collection(db, "postovi");


    useEffect(() => {
        const queryPostove = query(postoviCollectionRef, where("lokacija", "!=", "null"));
        const getLocations = async () => {
            onSnapshot(queryPostove, (snapshot) => {
                const lokacije = [];
                snapshot.forEach((doc) => {
                    lokacije.push(doc.data().lokacija);
                });
                setMarkers(lokacije);
            });
        }

        getLocations();
    }, [])

    //#region Podesavanja za mapu
    const darkMapOptions = {
        styles: [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 65
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": "50"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "hue": "#8500ff"
                    },
                    {
                        "saturation": "100"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "30"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "hue": "#ff00e4"
                    },
                    {
                        "saturation": "59"
                    },
                    {
                        "lightness": "-9"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "40"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "hue": "#9500ff"
                    },
                    {
                        "saturation": "100"
                    },
                    {
                        "lightness": "7"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "hue": "#a500ff"
                    },
                    {
                        "saturation": "100"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff00c7"
                    },
                    {
                        "saturation": "100"
                    }
                ]
            },
            {
                "featureType": "transit.station.rail",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "100"
                    },
                    {
                        "hue": "#ff008d"
                    }
                ]
            },
            {
                "featureType": "transit.station.rail",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "hue": "#ff00bc"
                    },
                    {
                        "saturation": "80"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ffff00"
                    },
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -97
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "hue": "#8400ff"
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "31"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -100
                    }
                ]
            }
        ]
    };
    const center = useMemo(() => ({ lat: 43.3209, lng: 21.8954 }), []); //sprecavanje re-renderovanja svaki put kad se pomeri mapa
    //#endregion
    function setQuery(lat,lng){
        console.log(lat+" "+lng);

        props.setTagQuery(query(postoviCollectionRef,where('lokacija','==', new GeoPoint(lat, lng))));
    }
    return (

        <GoogleMap
            zoom={13}
            center={center}
            mapContainerClassName="map-container"
            options={darkMapOptions}
        >
            {markers.map((marker, index) => (
                <Marker key={index} position={{ lat: marker._lat, lng: marker._long }} onClick={()=>setQuery(marker._lat,marker._long)}/> //dodati uslov ako je lat i lng = 0
            ))}
            {/* //Inace je lat i lng ali kada upise u firebase pamti kao _lat i _long */}
        </GoogleMap>
    );

}


//AIzaSyDyQbX29X8S4-Jo18zodrggGP9uSTTKc2g -- PRAVI KLJUC

