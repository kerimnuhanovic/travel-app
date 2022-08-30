import Navbar2 from "../Navbar2/Navbar2";
import slika from '../selfie.jpg'
import './oprojektu.css'
const OProjektu = ({cookies}) => {
    return (
        <div>
            <Navbar2 cookies={cookies}/>
            <h1 className="mx-0 mx-md-3 mt-3 oboji">Informacije o projektu</h1>
            <div className="mt-3 mt-md-3 mx-0 mx-md-3 informacije">
                <img src={slika} className="selfie"/>
                <div className="mx-md-5 mt-3 mt-md-4 info">
                    <h3><span>Ime: </span>Nuhanović Kerim</h3>
                    <h5><span>Predmet: </span>Dinamički web sistemi</h5>
                    <h5><span>Profesor: </span>dr. Adis Alihodžić</h5>
                    <h5><span>Asistent: </span>mr. Eldina Maslo Delalić</h5>
                    <h5><span>Projekat: </span>Travel app</h5>
                </div>

            </div>
        </div>
    )
}

export default OProjektu