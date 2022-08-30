import logo2 from "../Login/logo-png.png";
import './register.css'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
const Register = ({postaviCookie, mojCookie}) => {
    const {tip} = useParams()
    const navigate = useNavigate()

    const registrujKorisnika = () => {
        const ime = document.getElementById('ime').value
        const prezime = document.getElementById('prezime').value
        const username = document.getElementById('username').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const ponovljena = document.getElementById('ponovljena').value
        if(username === '' || email === '' || password === '' || ponovljena === '') {
            alert("Prazno mjesto")
            return
        }
        if(password !== ponovljena) {
            alert("Lozinke se ne podudaraju!")
            return
        }
        axios.post('http://127.0.0.1:8000/registracijaKorisnika/', {
            ime: ime,prezime:prezime,username:username,email:email,password:password
        }).then((response) => {
            if(response.data.ok === true)/*Postavit cookie*/ {
                postaviCookie('login', {username:username,type:'korisnik',id:response.data.id,profilna_slika:response.data.profilna_slika},
                    {path:'/'})
                mojCookie(true)
                console.log(response.data)
                window.location.href = '/pocetna'
            }
            else {alert("Postoji korisnik sa istim mailom ili korisnickim imenom")}
        }).catch((error) => {
            console.log(error)
        })
    }

    const registrujAgenciju = () => {
        const naziv = document.getElementById('naziv').value
        const id = document.getElementById('id').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const ponovljena = document.getElementById('ponovljena').value
        const datum = document.getElementById('date').value
        if(naziv === '' || email === '' || password === '' || ponovljena === '' || id === '') {
            alert("Prazno mjesto")
            return
        }
        if(password !== ponovljena) {
            alert("Lozinke se ne podudaraju!")
            return
        }
        axios.post('http://127.0.0.1:8000/registracijaAgencije/', {
            username:naziv,id:id,email:email,password:password,datum_osnivanja:datum
        }).then((response) => {
            if(response.data.ok === true)/*Postavit cookie*/ {
                postaviCookie('login', {username:naziv,type:'agencija',id: response.data.id,
                    profilna_slika:response.data.profilna_slika}, {path:'/'})
                mojCookie(true)
                console.log(response.data)
                window.location.href = '/pocetna'
            }
            else {alert("Postoji korisnik sa istim mailom ili korisnickim imenom")}
        }).catch((error) => {
            console.log(error)
        })
    }


    if(tip==='korisnik') return (
        <div className="omotac">
            <div className="okvir">
                <div>
                    <div className="okvir-loga">
                        <img src={logo2} className="logo"/>
                    </div>
                    <div className="forma">
                        <input type="text" id="ime" className="py-1 my-2" placeholder="ime"/>
                        <input type="text" id="prezime" className="py-1 my-2" placeholder="prezime"/>
                        <input type="text" id="username" className="py-1 my-2" placeholder="korisničko ime - obavezno"/>

                        <input type="email" id="email" className="py-1 my-2" placeholder="email - obavezno"/>
                        <input type="password" id="password" className="py-1 my-2" placeholder="lozinka - obavezno"/>
                        <input type="password" id="ponovljena" className="py-1 my-2" placeholder="ponovljena lozinka - obavezno"/>

                        <button className="btn mt-3" onClick={registrujKorisnika}>Registruj se</button>
                    </div>
                </div>

                <button className="forget-button mb-3" onClick={() => {navigate('/registracija/agencija')}}>Želite se registrovati kao agencija?</button>
            </div>
        </div>
    )
    else if(tip ==='agencija') return (
        <div className="omotac">
            <div className="okvir">
                <div>
                    <div className="okvir-loga">
                        <img src={logo2} className="logo"/>
                    </div>
                    <div className="forma">
                        <input type="text" id="naziv" className="py-1 my-2" placeholder="naziv agencije - obavezno"/>
                        <input type="text" id="id" className="py-1 my-2" placeholder="id agencije - obavezno"/>

                        <input type="email" id="email" className="py-1 my-2" placeholder="email - obavezno"/>
                        <input type="date" id="date" className="py-1 my-2" placeholder="datum osnivanja"/>
                        <input type="password" id="password" className="py-1 my-2" placeholder="lozinka - obavezno"/>
                        <input type="password" id="ponovljena" className="py-1 my-2" placeholder="ponovljena lozinka - obavezno"/>

                        <button className="btn mt-3" onClick={registrujAgenciju}>Registruj se</button>
                    </div>
                </div>

                <button className="forget-button mb-3" onClick={() => {navigate('/registracija/korisnik')}}>Želite se registrovati kao korisnik?</button>
            </div>
        </div>
    )
}

export default Register