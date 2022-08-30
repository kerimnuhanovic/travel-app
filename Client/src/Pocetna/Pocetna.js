import './pocetna.css'
import '../Navbar/navbar.css'
import logo from '../logo-travel.png'
import {Link} from "react-router-dom";
import Map from "./Map";
import {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

import {MapContainer, TileLayer, useMap} from "react-leaflet";
import {LatLng} from "leaflet/dist/leaflet-src.esm";
import Map2 from "./Map2";
import Navbar2 from "../Navbar2/Navbar2";
import {datumProsliMjesec} from "../PomocneFunkcije/PomocneFunkcije";

const Pocetna = ({cookies}) => {

    const [dropdown, setDropdown] = useState(false)
    const [putovanja, setPutovanja] = useState([])
    const [putovanje, setPutovanje] = useState(null)
    const [svaPutovanja, setSvaPutovanja] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/putovanjaPrethodniMjesec/').then((response) => {
            console.log(response.data)
            const niz = []
            for(let i = 0; i<response.data.length; i++) {
                if(datumProsliMjesec(response.data[i].fields.datum_putovanja)) {
                    niz.push(response.data[i])
                }
            }
            setPutovanja(niz)
            setSvaPutovanja(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])




    const jeLiDatumProsao = (datum, lat, lon) => {
        const a = new Date()
        var c = a.getMonth() + 1
        if (c <= 9) {
            c = "0" + c.toString()
        }
        var dan = a.getDate()
        if (dan <= 9)
            dan = "0" + dan.toString()

        const danas = a.getFullYear() + "-" + c + "-" + dan
        if(datum <= danas) {
            if(putovanje === null) {

                setPutovanje({latituda:lat, longituda:lon})
            }
            return true
        }
        else return false
    }


    const setuj = () => {
        const arr = document.getElementById('s').value.split("/")

        setPutovanje({latituda: parseFloat(arr[0]), longituda:parseFloat(arr[1])})
        //alert(parseFloat(arr[0]) + " " + parseFloat(arr[1]))

    }
    return (
        <div>
            <Navbar2 cookies={cookies}/>
            <div className="okvir-mape okvir-mape-margina">
                <h1 className="mb-3 mx-3 mx-sm-0">Destinacije iz prošlog mjeseca</h1>
                <Map putovanja={putovanja} cookies={cookies}/>
            </div>
            <select onChange={setuj} id='s' className="mx-3 mt-4">
                {svaPutovanja.map((putovanje) => {
                    const {fields, pk} = putovanje
                    if(jeLiDatumProsao(fields.datum_putovanja,fields.latituda, fields.longituda)) {/*ukloonit !*/
                        return (<option value={fields.latituda.toString() + "/" + fields.longituda.toString()}>{fields.naslov}</option>)
                    }
                })}
            </select>
            <div className="okvir-mape mb-5">
                <h1 className="mb-3">Karta izabranog grada</h1>
                {putovanje !== null ? <MapContainer center={[putovanje.latituda, putovanje.longituda]} zoom={13} scrollWheelZoom={false} className="karta">
                    <ChangeView center={[putovanje.latituda, putovanje.longituda]} zoom={13}/>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>: <div></div>}
            </div>

        </div>
    )
}

const  ChangeView = ({ center, zoom }) => {
    const map = useMap();
    /*map.setView(center, zoom);*/
    map.flyTo(center, zoom, {
        duration: 2
    })
    return null;
}



export default Pocetna