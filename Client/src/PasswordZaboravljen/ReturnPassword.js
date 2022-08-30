import logo2 from "../Login/logo-png.png";
import '../Login/login.css'
import axios from "axios";
const ReturnPassword = () => {
    const posalji = () => {
        const email = document.getElementById('email').value
        axios.post('http://127.0.0.1:8000/vratiLozinku/', {
            email:email
        }).then((response) => {
            if(response.data === "OK") {
                console.log("Prosao email")
                alert("E-mail sa novom šifrom je poslan na vašu e-mail adresu.")
            }
            else {
                alert("Uneseni e-mail ne postoji u bazi podataka.")
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
            <div className="omotac">
                <div className="okvir1">
                    <div>
                        <div className="okvir-loga">
                            <img src={logo2} className="logo"/>
                        </div>
                        <div className="forma">
                            <input type="email" id="email" className="py-1 my-2" placeholder="E-mail"/>

                            <button className="btn mt-3" onClick={posalji}>Pošalji</button>
                        </div>
                    </div>
                </div>
            </div>

    )
}
export default ReturnPassword