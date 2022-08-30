/*import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
*/
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet'
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Map = ({putovanja, cookies}) => {
    /*const {isLoaded} = useLoadScript({googleMapsApiKey:"AIzaSyAkHk_PA1FMH5FJhdMSSfrv5utvlnGmkAA"})

    if (!isLoaded) return <div>Loading...</div>*/


    return <GMap putovanja={putovanja} cookies={cookies}/>
}


const GMap = ({putovanja, cookies}) => {


    return (<MapContainer center={[43.65526355803611, 17.961133606361983]} zoom={4} scrollWheelZoom={false} className="karta">
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Klik cookies={cookies}/>

        {putovanja !== [] ? <Markeri putovanja={putovanja}/> : <Marker></Marker>}
    </MapContainer>)
}

const Klik = ({cookies}) => {
    const navigate = useNavigate()
    const map = useMapEvents({
        click() {
            map.locate()

        },
        locationfound(e) {
            if(cookies.login.type === 'korisnik')
                navigate(`/zahtjevZaPutovanjem/${e.latlng.lat}/${e.latlng.lng}`)
            else navigate(`/dodajPutovanje/${e.latlng.lat}/${e.latlng.lng}`)
        },
    })
    return null
}

const Markeri = ({putovanja}) => {
    return (
        <div>
            {putovanja.map((putovanje) => {
                const {pk, fields} = putovanje
                return (
                    <Marker position={[fields.latituda, fields.longituda]} key={pk}>
                        <Popup>
                            <div className="okvir-slika-popup">

                                <img src={`http://127.0.0.1:8000/media/${fields.slika}`} className="slika-popup"/>
                            </div>
                            <p className="p-popup">{fields.lokacija}</p>
                        </Popup>
                    </Marker>
                )
            })}
        </div>
    )
}

export default Map