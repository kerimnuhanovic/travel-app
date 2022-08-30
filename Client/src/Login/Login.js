import './login.css'
import logo from './logo-svg.jpg'
import logo2 from './logo-png.png'
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";
const Login = ({postaviAuth, mojCookie}) => {
    const navigate = useNavigate()


    const provjeraLogina = () => {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        console.log(password)
        axios.post('http://127.0.0.1:8000/login/',{/*testirat*/
                username: username,
                password: password
            }).then((response) => {
            if(response.data.tip === "korisnik" || response.data.tip === "agencija") {
                console.log("Okej")
                console.log(response.data.tip)
                console.log(response.data.id)
                postaviAuth('login', {username:username,type:response.data.tip,id:response.data.id,
                    profilna_slika:response.data.profilna_slika}, {path:'/'})
                mojCookie(true)

                window.location.href = '/pocetna'


            }
            else {
                console.log(response.data)
                alert("Pogresna lozinka")
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const navigiraj = () => {
        navigate("/registracija/korisnik")
    }
    const navigiraj2 = () => {
        navigate("/vratiLozinku")
    }

    return (
        <div className="omotac">
            <div className="okvir1">
                <div>
                <div className="okvir-loga">
                    <img src={logo2} className="logo"/>
                </div>
                <div className="forma">
                    <input type="text" id="username" className="py-1 my-2" placeholder="korisničko ime"/>
                    <input type="password" id="password" className="py-1 my-2" placeholder="lozinka"/>
                    <button className="btn mt-3" onClick={provjeraLogina}>Prijavi se</button>
                </div>
                </div>
                <div className="okvir-buttona">
                    <button className="forget-button mb-2" onClick={navigiraj2}>Zaboravili ste šifru?</button>
                    <button className="forget-button mb-3" onClick={navigiraj}>Registruj se</button>
                </div>
            </div>
        </div>
    )
}
export default Login