import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Navbar2 from "../Navbar2/Navbar2";


const DodajPut = ({cookie}) => {

    const {lat, lng} = useParams()
    useEffect(() => {
        console.log(cookie.login)
    }, [])

    const afterSub = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <Navbar2 cookies={cookie}/>
            <div className="okvir-zahtjeva">
            <form method="POST" action="http://127.0.0.1:8000/dodajPutovanje/" encType="multipart/form-data">

                <h1 className="oboji">Dodaj putovanje</h1>
                <input type="text" name="naslov" required placeholder="naslov"/>
                <input type="text" name="lokacija" required placeholder="lokacija"/>
                <input type="file" className="form-control" id="inputGroupFile04"
                       aria-describedby="inputGroupFileAddon04" aria-label="Upload" name="slika" required/>

                <input type="text" name="kratak_opis" required placeholder="opis"/>
                <input type="number" name="cijena" required step="0.01" placeholder="cijena"/>
                <input type="date" name="datum_putovanja" required/>
                <select name="tip_putovanja" placeholder="tip putovanja">
                    <option value="samostalno">Samostalno</option>
                    <option value="organizovano">Organizovano</option>
                </select>
                <input type="text" name="prevoz" required placeholder="prevoz"/>
                <input type="number" name="maks_prijava" required placeholder="maksimalno prijava"/>
                <input type="number" name="min_prijava" required placeholder="minimalno prijava"/>
                <input type="number" name="latituda" required step="any" placeholder="latituda" value={lat}/>
                <input type="number" name="longituda" required step="any" placeholder="longituda" value={lng}/>
                <input type="hidden" name="agencija_id" value={cookie.login.id} />
                <input type="submit" value="Dodaj putovanje"/>
            </form>
            </div>
        </div>
    )
}

export default DodajPut