import './zahtjevZaPutovanjem.css'
import Navbar from "../Navbar/Navbar";
import {useEffect, useState} from "react";
import axios from "axios";
import Navbar2 from "../Navbar2/Navbar2";
import {useParams} from "react-router-dom";
const ZahtjevZaPutovanjem = ({cookies}) => {

    const [agencije, setAgencije] = useState([])
    const {lat,lng} = useParams()

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/dajAgencije/').then((response) => {
            console.log(response.data)
            setAgencije(response.data)


        }).catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <div>
            <Navbar2 cookies={cookies}/>
            <div className="okvir-zahtjeva">
                <form method="POST" action="http://127.0.0.1:8000/unesiZahtjev/">
                    <h1>Zahtjev</h1>
                    <select name="id_agencije">
                        {agencije.map((agencija) => {
                            const {pk, fields} = agencija
                            return (<option value={pk}>{fields.username}</option>)
                        })}
                    </select>
                    <input type="text" name="mjesto" placeholder="Mjesto putovanja" required/>
                    <input type="date" name="datum" required/>
                    <input type="text" name="prevoz" placeholder="prevoz" required/>
                    <input type="number" name="cijena" placeholder="Koliko biste platili putovanje?" step="any" required/>

                    <input type="number" name="latituda" placeholder="Latituda - neobavezno polje" step="any"
                    value={lat}/>


                    <input type="number" name="longituda" placeholder="Longituda - neobavezno polje" step="any"
                           value={lng}/>

                    <input type="hidden" value={cookies.login.id} name="id_korisnika"/>
                    <input type="hidden" value={cookies.login.username} name="korisnik_username"/>
                    <input type="submit" name="zahtjev"/>

                </form>
            </div>
        </div>
    )
}


export default ZahtjevZaPutovanjem