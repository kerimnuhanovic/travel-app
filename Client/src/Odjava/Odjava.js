import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Odjava = ({cookies,remove}) => {
    const navigate = useNavigate()
    useEffect(() => {
        remove('login')
        console.log("EVO ME")
        window.location.href = "/"
    })

    return null
}
export default Odjava