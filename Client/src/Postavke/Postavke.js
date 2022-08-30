import './postavke.css'
import Navbar2 from "../Navbar2/Navbar2";
import {useEffect, useState} from "react";
import axios from "axios";

const Postavke = ({cookies, postaviCookie}) => {


    const [postavke, setPostavke] = useState([])


    useEffect(() => {
        axios.post('http://127.0.0.1:8000/postavke/', {
            id:cookies.login.id,
            tip:cookies.login.type
        }).then((response) => {
            console.log(response.data[0])
            setPostavke(response.data[0].fields)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <div>
            <Navbar2 cookies={cookies}/>
            {postavke === [] ? <p>Loading..</p> : <PodaciKorisnik podaci={postavke} cookies={cookies} postaviCookie={postaviCookie}/>}
        </div>
    )
}

const PodaciKorisnik = ({podaci, cookies, postaviCookie}) => {

    const [promijeniSifru, setPromijeniSifru] = useState(false)
    const promijeniLozinku = () => {
        const stara = document.getElementById('stara').value
        const nova = document.getElementById('nova').value
        const potvrda = document.getElementById('potvrda').value

        if(stara !== podaci.password) {
            alert("Stara lozinka se ne poklapa!")
            return
        }
        if(nova !== potvrda) {
            alert("Lozinke se ne poklapaju!")
            return
        }
        if(nova === "") {
            alert("Morate unijeti lozinku!")
            return
        }

        axios.post('http://127.0.0.1:8000/promijeniLozinku/', {
            tip:cookies.login.type,
            id: cookies.login.id,
            password: nova
        }).then((response) => {
            alert("Lozinka je promijenjena")
        }).catch((err) => {
            console.log(err)
        })


    }

    const postaviSliku = () => {
        const p = document.getElementById('inputGroupFile04').files[0].name
        postaviCookie('login', {username:cookies.login.username,type:cookies.login.type,id: cookies.login.id,
            profilna_slika:`images/${p}`}, {path:'/'})

    }

    return (
        <div className="postavke">
            <h1>Podaci</h1>

            {cookies.login.type === 'korisnik' ? <div><h5><span className="span-podatak">Ime:</span> {podaci.ime}</h5>
                    <h5><span className="span-podatak">Prezime:</span> {podaci.prezime}</h5></div>
             : <p></p>}
            <h5><span className="span-podatak">Korisničko ime:</span> {podaci.username}</h5>
            <h5><span className="span-podatak">Email:</span> {podaci.email}</h5>
            {cookies.login.type === 'agencija' ? <div><h5><span className="span-podatak">Datum osnivanja:</span> {podaci.datum_osnivanja}</h5></div>:<p></p>}
            {!promijeniSifru ? <button className="btn btn-success"
            onClick={()=> {setPromijeniSifru(true)}}>Unesi novu lozinku</button> : <div></div>}
            {promijeniSifru ? <div className="nova-lozinka">
                <input type="password" id="stara" placeholder="stara lozinka"/>
                <input type="password" id="nova" placeholder="nova lozinka"/>
                <input type="password" id="potvrda" placeholder="potvrda lozinke"/>
                <button className="btn btn-success" onClick={promijeniLozinku}>Promijeni lozinku</button>
            </div> : <div></div>}
            <form className="input-group mt-3" method="POST" action="http://127.0.0.1:8000/promijeniSliku/" encType="multipart/form-data"
            onSubmit={postaviSliku}>
                <input type="file" className="form-control" id="inputGroupFile04"
                       aria-describedby="inputGroupFileAddon04" aria-label="Upload" name="slika" required/>
                <input type="hidden" name="tip" value={cookies.login.type}/>
                <input type="hidden" name="id" value={cookies.login.id}/>
                    <input className="btn btn-success" type="submit" id="inputGroupFileAddon04" value="Promijeni sliku"
                           />


            </form>
        </div>
    )
}

export default Postavke