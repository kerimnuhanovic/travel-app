import logo from "../logo-travel.png";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div>
        <div className="navbar">
            <div className="logo-text">
                <img src={logo} className="navbar-logo"/>
                <p className="pt-3 display-6 ms-2">Travel app</p>
            </div>
            <div className="linkovi">
                <Link to="/" className="mx-1 mx-md-4 pocetna">Početna</Link>
                <Link to="/" className="ms-1 me-2 me-md-4">Putovanja</Link>
            </div>
        </div>
            <div className="putovanja-dropdown ms-1 me-2 me-md-4">
                <ul className="putovanja-lista">
                    <li><Link to="/ponuda">Ponuda</Link></li>
                    <li><Link to="/planiranaPutovanja">Planirana putovanja</Link></li>
                    <li><Link to="mojaPutovanja">Moja putovanja</Link></li>
                </ul>
            </div>

        </div>

    )
}
export default Navbar