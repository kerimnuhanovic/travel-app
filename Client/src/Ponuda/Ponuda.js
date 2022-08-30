import {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import './ponuda.css'
import Kartica from "../Kartica/Kartica";
import {useNavigate} from "react-router-dom";
import Navbar2 from "../Navbar2/Navbar2";
const Ponuda = ({cookies}) => {

    const navigate = useNavigate()
    const [putovanja, setPutovanja] = useState([2,4])
    const [loading, setLoading] = useState(true)
    useEffect( () => {
        axios.get('http://127.0.0.1:8000/dajSvaPutovanja/').then((response) => {
            console.log(response.data)
            setPutovanja(response.data)
            setLoading(false)
            console.log(typeof (response.data))
        }).catch((error) => {console.log(error)})
    }, [])

    const napraviZahtjev = () => {
        navigate('/zahtjevZaPutovanjem')
    }

    return (
        <div>
            <Navbar2 cookies={cookies}/>
            <div className="naslov-dugme mt-5 mx-3">
                <h2 className="ponuda-naslov display-6">Ponuda</h2>
                <button className="btn btn-success kreiraj-zahtjev" onClick={napraviZahtjev}>Kreiraj zahtjev za putovanjem</button>
            </div>
            {loading ? <p>Loading...</p> : <InternaKomponenta putovanja={putovanja}/>}
        </div>
    )
}
const InternaKomponenta = ({putovanja}) => {
    return (
        <div className="mx-2 mx-sm-0 okvir-kartica">
            {putovanja.map((putovanje)=> {
                const {fields, pk} = putovanje
                return (
                    <Kartica naslov={fields.naslov} slika={fields.slika} cijena={fields.cijena} lokacija={fields.lokacija}
                             datum={fields.datum_putovanja} pk={pk}/>
                )
            })}
        </div>
    )
}

export default Ponuda