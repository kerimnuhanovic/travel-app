import {MapContainer, Marker, TileLayer} from "react-leaflet";

const Map2 = ({putovanje}) => {

    return (<MapContainer center={[putovanje.latituda, putovanje.longituda]} zoom={13} scrollWheelZoom={false} className="karta">
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    </MapContainer>)
}

export default Map2
