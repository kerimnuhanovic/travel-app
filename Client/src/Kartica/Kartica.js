import './kartica.css'
import slika1 from './konjic3.jpg'
import {useNavigate} from "react-router-dom";
const Kartica = ({naslov, slika, lokacija, cijena, datum, pk}) => {
    const navigate = useNavigate()
    return (
        <div className="kartica" onClick={() => {navigate(`/putovanje/${pk}/`)}}>
            <div className="okvir-slike"><img src={`http://127.0.0.1:8000/media/${slika}`}/></div>
            <div className="podaci-kartice">
                <h3>{naslov}</h3>
                <div>
                    <p><span className="span-lokacija">{lokacija}</span> - {datum}</p>
                    <p>{cijena} <span className="span-km">KM</span></p>
                    <button className="btn dugme-kartice">Pogledaj</button>
                </div>
            </div>
        </div>
    )
}
export default Kartica