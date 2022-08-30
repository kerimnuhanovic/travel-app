import {Navigate, Outlet, useNavigate} from "react-router-dom";

const CheckUser = ({cookie}) => {
    const checkCoockie = () => {
        console.log(cookie.login)
        if(cookie.login)
            return true
        else return false
    }
    return checkCoockie() ? <Outlet/> : <Navigate to="/"/>
}
export default CheckUser