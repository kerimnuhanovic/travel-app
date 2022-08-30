import Navbar from "../Navbar/Navbar";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import './putovanje.css'
import Navbar2 from "../Navbar2/Navbar2";

var fileDownload = require('js-file-download');

const Putovanje = ({cookies}) => {
    const {id} = useParams()
    const [putovanje, setPutovanje] = useState(null)

    const [prijavljen, setPrijavljen] = useState(null)
    useEffect(() => {
        axios.post(`http://127.0.0.1:8000/putovanje/`, {
            id:id,
            tip:cookies.login.type,
            id_ka: cookies.login.id
        }).then((response) => {
            if(response.data !== "Not found") {
                console.log(response.data)
                setPutovanje(response.data)
                setPrijavljen(response.data.prijavljeno)
            }
            else console.log("Putovanje ne postoji!")
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <div>
            <Navbar2 cookies={cookies}/>
            {putovanje !== null ? <PutovanjeDetalji putovanje={putovanje} id={id} cookies={cookies} prijavljen={prijavljen} setPrijavljen={setPrijavljen}/> : <p>Loading...</p>}
        </div>
    )
}

const PutovanjeDetalji = ({putovanje, id, cookies, prijavljen, setPrijavljen}) => {
    const navigate = useNavigate()
    const provjeraDatuma = () => {
        const a = new Date()
        var c = a.getMonth()+1
        if(c <= 9) {
            c = "0" + c.toString()
        }

        var dan = a.getDate()
        if(dan <= 9)
            dan = "0" + dan.toString()

        const b = a.getFullYear() + "-" + c + "-" + dan

        if(putovanje.datum_putovanja > b) {
            return true
        }
        return false
    }
    const prijavise = () => {
        const a = new Date()
        var c = a.getMonth()+1
        if(c <= 9) {
           c = "0" + c.toString()
        }

        var dan = a.getDate()
        if(dan <= 9)
            dan = "0" + dan.toString()

        const b = a.getFullYear() + "-" + c + "-" + dan

        if(putovanje.datum_putovanja < b) {
            alert("Putovanje je zavrseno, nije se moguce prijaviti!")
            return;
        }
        axios.post('http://127.0.0.1:8000/prijavaPutovanja/', {
            korisnik_id: cookies.login.id,
            putovanje_id: putovanje.id,
            status: "Na čekanju"
        }).then((response) => {
            alert("Prijavljeni ste za putovanje")
            document.getElementById('dugme').disabled = true;
        }).catch((err) => {
            console.log(err);
        })
    }

    const izbrisiPutovanje = () => {
        axios.post('http://127.0.0.1:8000/izbrisiPutovanje/', {
            id:putovanje.id
        }).then((response) => {
            alert("Putovanje je izbrisano!")
            navigate('/pocetna')
        }).catch((err)=> {
            console.log(err)
        })
    }

    const odjavise = () => {
        axios.post('http://127.0.0.1:8000/odjaviSe/', {
            putovanje_id:putovanje.id,
            korisnik_id:cookies.login.id
        }).then((response) => {
            alert("Odjavljeni ste sa putovanja!")
            setPrijavljen(false)

        }).catch((err)=> {
            console.log(err)
        })
    }

    const generisiPDF = () => {
        axios.post('http://127.0.0.1:8000/generisiPdf/', {
            naslov:putovanje.naslov,
            lokacija:putovanje.lokacija,
            cijena:putovanje.cijena,
            datum_putovanja:putovanje.datum_putovanja,
            agencija:putovanje.agencija,
            prevoz:putovanje.prevoz,
            tip_putovanja:putovanje.tip_putovanja
        }).then((response) => {
            console.log(response.data)
            fileDownload(response.data, `putovanje_${putovanje.naslov}.pdf`);

        }).catch((err) => {console.log(err)})
    }
    return (
        <div>
            <h1 className="putovanje-naslov">{putovanje.naslov}</h1>
            <div className="slika-podaci">
                <div className="okv-slike">
                    <img src={`http://127.0.0.1:8000/media/${putovanje.slika}`}/>
                </div>
                <div className="podaci-dugme">
                    <div className="podaci">
                        <p>Agencija: <span>{putovanje.agencija}</span></p>
                        <p>Cijena: <span>{putovanje.cijena} BAM</span></p>
                        <p>Datum: <span>{putovanje.datum_putovanja}</span></p>
                        <p>Prevoz: <span>{putovanje.prevoz}</span></p>
                        <p>Tip: <span>{putovanje.tip_putovanja}</span></p>

                        <div className="mt-3">
                            <p>{putovanje.kratak_opis}</p>
                        </div>
                    </div>
                    {cookies.login.type === 'korisnik' && prijavljen === false ? <button id="dugme" className="btn dugme-prijava" onClick={prijavise}>Prijavi se</button>: <div></div>}
                    {cookies.login.type === 'korisnik' && prijavljen === true && provjeraDatuma()? <button  className="btn dugme-prijava" onClick={odjavise}>Odjavi se</button>: <div></div>}
                    {cookies.login.type === 'agencija' && putovanje.agencija_id === cookies.login.id && provjeraDatuma() ? <button className="btn dugme-prijava" onClick={izbrisiPutovanje}>Izbrisi putovanje</button>:<div></div>}
                    <button onClick={generisiPDF} className="btn dugme-prijava">Generiši PDF</button>

                </div>
            </div>
        </div>
    )
}


export default Putovanje