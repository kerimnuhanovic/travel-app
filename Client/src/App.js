import logo from './logo.svg';
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import {useState} from "react";
import CheckUser from "./checkUser/CheckUser";
import Proba from "./Proba";
import {useCookies} from "react-cookie";
import Pomocna from "./Pomocna";
import ReturnPassword from "./PasswordZaboravljen/ReturnPassword";
import Pocetna from "./Pocetna/Pocetna";
import DodajPut from "./DodajPut/DodajPut";
import Ponuda from "./Ponuda/Ponuda";
import Putovanje from "./Putovanje/Putovanje";
import MojaPutovanja from "./MojaPutovanja/MojaPutovanja";
import PlaniranaPutovanja from "./PlaniranaPutovanja/PlaniranaPutovanja";
import ZahtjevZaPutovanjem from "./ZahtjevZaPutovanjem/ZahtjevZaPutovanjem";
import Postavke from "./Postavke/Postavke";
import OProjektu from "./OProjektu/Oprojektu";
import Navbar2 from "./Navbar2/Navbar2";
import Odjava from "./Odjava/Odjava";
function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const [mojCookie, setMojCookie] = useState(false)
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={!cookies.login ? <Login postaviAuth={setCookie} mojCookie={setMojCookie}/> : <p>Vec ste logovani</p>}/>
          <Route path="/registracija/:tip" element={<Register postaviCookie={setCookie} mojCookie={setMojCookie}/>} />
          <Route path="/redirekcija" element={<Navigate to="/proba"/>}/>
          <Route path="/vratiLozinku" element={<ReturnPassword/>}/>
          <Route path="/proba" element={mojCookie || cookies.login ? <Proba /> : <Navigate to="/"/>}/>
          <Route path="/pocetna" element={mojCookie || cookies.login ? <Pocetna cookies={cookies}/> : <Navigate to="/"/>}/>
          <Route path="/dodajPutovanje" element={cookies.login && cookies.login.type === "agencija" ? <DodajPut cookie={cookies}/> : <p>Nemate pristup</p>}/>
          <Route path="/dodajPutovanje/:lat/:lng" element={cookies.login && cookies.login.type === "agencija" ? <DodajPut cookie={cookies}/> : <p>Nemate pristup</p>}/>
          <Route path="/odjavise" element={cookies.login ? <Odjava cookies={cookies} remove={removeCookie}/> : <Navigate to="/"/>}/>
          <Route path="/ponuda" element={cookies.login && cookies.login.type === "korisnik" ? <Ponuda cookies={cookies}/> : <p>Nemate pristup</p>}/>
          <Route path="/putovanje/:id" element={cookies.login ? <Putovanje cookies={cookies}/> : <p>Nemate pristup</p>} />
          <Route path="/mojaPutovanja" element={cookies.login ? <MojaPutovanja cookies={cookies}/> : <p>Nemate pristup</p>} />
          <Route path="/planiranaPutovanja" element={cookies.login ? <PlaniranaPutovanja cookies={cookies}/> : <p>Neamte pristup</p>} />
          <Route path="/zahtjevZaPutovanjem" element={cookies.login && cookies.login.type === "korisnik" ? <ZahtjevZaPutovanjem cookies={cookies}/> : <p>Nemate pristup</p>}/>
          <Route path="/zahtjevZaPutovanjem/:lat/:lng" element={cookies.login && cookies.login.type === "korisnik" ? <ZahtjevZaPutovanjem cookies={cookies}/> : <p>Nemate pristup</p>}/>

          <Route path="/postavke" element={cookies.login ? <Postavke cookies={cookies} postaviCookie={setCookie}/> : <p>Nemate pristup</p>}/>
          <Route path="/projekat" element={cookies.login ? <OProjektu cookies={cookies}/> : <p>Nemate pristup</p>}/>
        </Routes>
      </BrowserRouter>

  );
}

export default App;
