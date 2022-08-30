import {useEffect, useState} from "react";
import axios from "axios";
import './mojaPutovanja.css'
import Navbar from "../Navbar/Navbar";
import Kartica from "../Kartica/Kartica";
import Navbar2 from "../Navbar2/Navbar2";

const MojaPutovanja = ({cookies}) => {

    const [mojaPutovanja, setMojaPutovanja] = useState([])
    const [mojaPutovanjaKopija, setMojaPutovanjaKopija] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        axios.post('http://127.0.0.1:8000/mojaPutovanja/', {
            tip: cookies.login.type,
            id: cookies.login.id
        }).then((response) => {
            console.log(response.data)
            if(response.data !== "Prazna lista") {
                setMojaPutovanja(response.data)
                setMojaPutovanjaKopija(response.data)
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const pretraga = (e) => {
        setSearch(e.target.value)

        var p = mojaPutovanja.filter(obj => obj.fields.naslov.toLowerCase().includes(e.target.value))
        console.log(p)
        setMojaPutovanjaKopija(p)
    }

    return (
        <div>
            <Navbar2  cookies={cookies}/>

            <div className="search">
                <input type="text" placeholder="pretraži" value={search} onChange={(e) => pretraga(e)}/>

            </div>
            <h2 className="ponuda-naslov display-6 mt-3 ms-3">Moja putovanja</h2>
            {mojaPutovanja !== []  ? <ListaMojihPutovanja mojaPutovanja={mojaPutovanjaKopija}/> : <p>Loading...</p>}
        </div>
    )
}

const ListaMojihPutovanja = ({mojaPutovanja}) => {
    return (
        <div className="my-5 mx-2 mx-sm-0 okvir-kartica">
            {mojaPutovanja.map((putovanje)=> {
                const {fields, pk} = putovanje
                return (
                    <Kartica naslov={fields.naslov} slika={fields.slika} cijena={fields.cijena} lokacija={fields.lokacija}
                             datum={fields.datum_putovanja} pk={pk} key={pk}/>
                )
            })}
        </div>
    )
}

export default MojaPutovanja