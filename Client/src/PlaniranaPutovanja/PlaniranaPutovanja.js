import {useEffect, useState} from "react";
import axios from "axios";
import Kartica from "../Kartica/Kartica";
import Navbar from "../Navbar/Navbar";
import "./planiranaPutovanja.css"
import Navbar2 from "../Navbar2/Navbar2";
import {provjeraDatuma1} from "../PomocneFunkcije/PomocneFunkcije";


const PlaniranaPutovanja = ({cookies}) => {

    return (
        <div>
            <Navbar2 cookies={cookies}/>

            {cookies.login.type === "korisnik" ? <Korisnik cookies={cookies}/> : <Agencija cookies={cookies}/>}
        </div>
    )
}


const Korisnik = ({cookies}) => {
    const [odobrena, setOdobrena] = useState([])
    const [odbijena, setOdbijena] = useState([])
    const [naCekanju, setNaCekanju] = useState([])
    const [odobrenaKopija, setOdobrenaKopija] = useState([])
    const [odbijenaKopija, setOdbijenaKopija] = useState([])
    const [naCekanjuKopija, setNaCekanjuKopija] = useState([])
    const [zahtjeviKorisnika, setZahtjeviKorisnika] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        axios.post('http://127.0.0.1:8000/planiranaPutovanja/', {
            id:cookies.login.id,
            tip: cookies.login.type
        }).then((response) => {

                console.log(response.data[0])
                const odob = []
                const odb = []
                const cek = []
                for(let i = 0; i < response.data[0].length; i++) {

                    if(response.data[0][i].status === "Na čekanju") {
                        cek.push(response.data[0][i])

                    }
                    else if(response.data[0][i].status === "Odobren") {
                        const a = new Date()
                        var c = a.getMonth()+1
                        if(c <= 9) {
                            c = "0" + c.toString()
                        }
                        var dan = a.getDate()
                        if(dan <= 9)
                            dan = "0" + dan.toString()
                        const b = a.getFullYear() + "-" + c + "-" + dan


                        if(response.data[0][i].datum_putovanja >= b) {
                            odob.push(response.data[0][i])
                        }
                    }
                    else {
                        odb.push(response.data[0][i])
                    }

                }
                setOdobrena(odob)
                setOdbijena(odb)
                setNaCekanju(cek)
                setOdobrenaKopija(odob)
                setOdbijenaKopija(odb)
                setNaCekanjuKopija(cek)
                setZahtjeviKorisnika(response.data[1])
                console.log(response.data[1])

        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const pretraga = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)

        var a = odobrena.filter(obj => obj.naslov.toLowerCase().includes(e.target.value))
        setOdobrenaKopija(a)

        console.log(a)
        var b = odbijena.filter(obj => obj.naslov.toLowerCase().includes(e.target.value))
        setOdbijenaKopija(b)


        var c = naCekanju.filter(obj => obj.naslov.toLowerCase().includes(e.target.value))
        setNaCekanjuKopija(c)
    }
    return (
        <div>
            <div className="search">
                <input type="text" placeholder="pretraži" value={search} onChange={(e) => pretraga(e)}/>
            </div>
            <h2 className="ponuda-naslov display-6 mt-3 ms-3">Odobrena putovanja</h2>
            {/*prijavljenaPutovanja !== [] ? <ListaPlaniranihPutovanja putovanja={prijavljenaPutovanja} /> : <p>Loading...</p>*/}

            {odobrena !== [] ? <ListaOdobrenihPutovanja odobrena={odobrenaKopija}/> : <p>Loading...</p>}

            <h2 className="ponuda-naslov display-6 mt-5 ms-3">Odbijena putovanja</h2>
            {odbijena !== [] ? <ListaOdbijenihPutovanja odbijena={odbijenaKopija}/> : <p>Loading...</p>}

            <h2 className="ponuda-naslov display-6 mt-5 ms-3">Putovanja na čekanju</h2>
            {naCekanju !== [] ? <ListaPutovanjaNaCekanju naCekanju={naCekanjuKopija}/> : <p>Loading...</p>}

            {zahtjeviKorisnika !== [] ? <ZahtjeviKorisnika zahtjevi={zahtjeviKorisnika}/> : <p>Loading</p>}
        </div>
    )
}


const Agencija = ({cookies}) => {



    const [prijavljenaPutovanja, setPrijavljenaPutovanja] = useState([])
    const [prijavljenaPutovanjaKopija, setPrijavljenaPutovanjaKopija] = useState([])
    const [zahtjevi, setZahtjevi] = useState([])
    const [zahtjeviAgenciji, setZahtjeviAgenciji] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        axios.post('http://127.0.0.1:8000/planiranaPutovanja/', {
            id:cookies.login.id,
            tip: cookies.login.type
        }).then((response) => {

                if(response.data !== "Prazna lista") {
                    setPrijavljenaPutovanja(JSON.parse(response.data[1]))
                    setPrijavljenaPutovanjaKopija(JSON.parse(response.data[1]))
                }
                setZahtjevi(response.data[0])
                console.log(typeof response.data[0] + " 0")
                console.log(typeof response.data[1] + " 1")
                console.log(typeof response.data[2] + " 2")
                const kopija = JSON.parse(response.data[2])
                setZahtjeviAgenciji(kopija)

        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const pretraga = (e) => {
        setSearch(e.target.value)

        var p = prijavljenaPutovanja.filter(obj => obj.fields.naslov.toLowerCase().includes(e.target.value))
        console.log(p)
        setPrijavljenaPutovanjaKopija(p)
    }

    return (
        <div>
            <div className="search">
                <input type="text" placeholder="pretraži" value={search} onChange={(e) => pretraga(e)}/>
            </div>
            <h2 className="ponuda-naslov display-6 mt-3 ms-3">Planirana putovanja</h2>
            {prijavljenaPutovanja !== [] ? <ListaPlaniranihPutovanja putovanja={prijavljenaPutovanjaKopija} /> : <p>Loading...</p>}
            <h2 className="ponuda-naslov display-6 mt-5 ms-3">Prijave korisnika</h2>
            {zahtjevi !== [] ? <Zahtjevi zahtjevi={zahtjevi} setZahtjevi={setZahtjevi}/> : <p>Loading</p>}
            <h2 className="ponuda-naslov display-6 mt-5 ms-3">Zahtjevi za novim putovanjima</h2>
            {zahtjeviAgenciji !== [] ? <ZahtjeviAgenciji zahtjeviAgenciji={zahtjeviAgenciji}/>: <h3>Nemate zahtjeva</h3>}
        </div>
    )
}

const ZahtjeviAgenciji = ({zahtjeviAgenciji}) => {
    return (
        <div>
            <table className="tabela">
                <tbody>
                <tr>
                    <th>
                        Lokacija
                    </th>
                    <th>Korisničko ime</th>
                    <th>Datum</th>
                    <th>Cijena</th>
                    <th>Prevoz</th>
                </tr>
                {zahtjeviAgenciji.map((zahtjev) => {
                    const {pk, fields} = zahtjev

                    return (
                        <tr key={pk}>
                            <td>{fields.lokacija}</td>
                            <td>{fields.korisnik_username}</td>
                            <td>{fields.datum}</td>
                            <td>{fields.cijena}</td>
                            <td>{fields.prevoz}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}





const Zahtjevi = ({zahtjevi, setZahtjevi}) => {
    useEffect(() => {
        console.log(zahtjevi)
        console.log("ok")
    }, [])

    const handleChange = (index,status, id_reda) => {
        const zahtjeviK = [...zahtjevi];
        zahtjeviK[index].status = status;
        setZahtjevi(zahtjeviK);
        axios.post('http://127.0.0.1:8000/promijeniStatus/',{
            id:id_reda,
            status:status
        }).then((response) => {

        }).catch((err) => {console.log(err)})
    }

    return (
        <div>
            <table className="tabela">
                <tbody>
                <tr>
                    <th>
                        Putovanje
                    </th>
                    <th>Korisničko ime</th>
                    <th>Status</th>
                    <th>Odobri</th>
                    <th>Odbij</th>
                </tr>
                {zahtjevi.map((zahtjev, index) => {
                    return (
                        <tr key={zahtjev.id_reda}>
                            <td>{zahtjev.naslov}</td>
                            <td>{zahtjev.korisnik_username}</td>
                            <td>{zahtjev.status}</td>
                            {provjeraDatuma1(zahtjev.datum_putovanja) ? <td><button className="btn status-zahtjeva"
                                                                         onClick={() => {
                                                                             handleChange(index, "Odobren", zahtjev.id_reda);
                                                                         }} >
                                Odobri</button></td> : <td></td>}
                            {provjeraDatuma1(zahtjev.datum_putovanja) ? <td><button className="btn status-zahtjeva"
                                                                         onClick={() => {
                                                                             handleChange(index, "Odbijen", zahtjev.id_reda);
                                                                         }}>Odbij</button></td>:<td></td>}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

const ZahtjeviKorisnika = ({zahtjevi}) => {
    return (
        <div>
            <h2 className="ponuda-naslov display-6 mt-5 ms-3 mb-3">Zahtjevi</h2>
            <table className="tabela">
                <tbody>
                <tr>
                    <th>
                        Lokacija
                    </th>
                    <th>Agencija</th>
                    <th>Datum</th>
                    <th>Cijena</th>
                </tr>
                {zahtjevi.map((zahtjev) => {
                    return (
                        <tr>
                            <td>{zahtjev.lokacija}</td>
                            <td>{zahtjev.agencija}</td>
                            <td>{zahtjev.datum}</td>
                            <td>{zahtjev.cijena} KM</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}




const ListaPlaniranihPutovanja = ({putovanja}) => {


    return (
        <div className="my-3 mx-2 mx-sm-0 okvir-kartica">
            {putovanja.map((putovanje)=> {
                const {pk, fields} = putovanje
                return (
                    <Kartica naslov={fields.naslov} slika={fields.slika} cijena={fields.cijena} lokacija={fields.lokacija}
                             datum={fields.datum_putovanja} key={pk} pk={pk}/>
                )
            })}
        </div>
    )
}

const ListaOdobrenihPutovanja = ({odobrena}) => {
    return (
        <div className="my-3 mx-2 mx-sm-0 okvir-kartica">
            {odobrena.map((putovanje)=> {
                const {datum_putovanja, lokacija, naslov, slika,status,id, cijena} = putovanje
                return (
                    <Kartica naslov={naslov} slika={slika} cijena={cijena} lokacija={lokacija}
                             datum={datum_putovanja} key={id} pk={id}/>
                )
            })}
        </div>
    )
}

const ListaOdbijenihPutovanja = ({odbijena}) => {
    return (
        <div className="my-3 mx-2 mx-sm-0 okvir-kartica">
            {odbijena.map((putovanje)=> {
                const {datum_putovanja, lokacija, naslov, slika,status,id, cijena} = putovanje
                return (
                    <Kartica naslov={naslov} slika={slika} cijena={cijena} lokacija={lokacija}
                             datum={datum_putovanja} key={id} pk={id}/>
                )
            })}
        </div>
    )
}

const ListaPutovanjaNaCekanju = ({naCekanju}) => {
    return (
        <div className="my-3 mx-2 mx-sm-0 okvir-kartica">
            {naCekanju.map((putovanje)=> {
                const {datum_putovanja, lokacija, naslov, slika,status,id, cijena} = putovanje
                return (
                    <Kartica naslov={naslov} slika={slika} cijena={cijena} lokacija={lokacija}
                             datum={datum_putovanja} key={id} pk={id}/>
                )
            })}
        </div>
    )
}
export default PlaniranaPutovanja