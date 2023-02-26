import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";

export default function Index() {
  return (
    <MapContainer
      center={[-6.5622152, 106.7376266]}
      zoom={100}
      scrollWheelZoom={true}
      style={{ height: "1000px", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-6.5622152, 106.7376266]}>
        <Popup>Ini kontrakan Saya dan Putu</Popup>
      </Marker>
    </MapContainer>
  );
}
