import logo from "../logo-travel.png";
import './navbar2.css'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
const Navbar2 = ({cookies}) => {
    const [profilna, setProfilna] = useState()

    useEffect(() => {
        console.log(cookies.login.profilna_slika)
    })
    const navigate = useNavigate()
    const odjavise = () => {
        navigate('/odjavise')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar2">
            <div className="container-fluid podnav">

                <Link className="navbar-brand" to="/pocetna"><img src={logo} className="navbar-logo"/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/pocetna">Travel app</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" id="navbarDropdownMenuLink" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Profil
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                                <li><Link className="dropdown-item" to="/postavke">Postavke</Link></li>
                                <li><Link className="dropdown-item" to="/odjavise">Odjavi se</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" id="navbarDropdownMenuLink" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Putovanja
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                { cookies.login.type==='korisnik' ?
                                    <li><Link className="dropdown-item" to="/ponuda">Ponuda</Link></li> :
                                    <li><Link className="dropdown-item" to="/dodajPutovanje">Dodaj putovanje</Link></li>}
                                <li><Link className="dropdown-item" to="/planiranaPutovanja">Planirana putovanja</Link></li>
                                <li><Link className="dropdown-item" to="/mojaPutovanja">Moja putovanja</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/projekat">O projektu</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav prof-user">
                        <li className="obojinar">{cookies.login.username}</li>
                        <li className="nav-item dropdown">
                            <a className="nav-link  profilna" href="#" id="navbarDropdownMenuLink" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={`http://127.0.0.1:8000/media/${cookies.login.profilna_slika}`}/>
                            </a>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar2


