import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import {
  BaseUserAreaLocation,
  getUserAreaLocation,
} from "@/services/mapUserService";
import { useQuery } from "react-query";

export default function Index() {
  const [pinPointArray, setPinPointArray] = useState([[]]);
  let pinPoint = [];
  const { data, isFetched } = useQuery<BaseUserAreaLocation>(
    "getUserAreaLocation",
    getUserAreaLocation
  );

  if (isFetched) {
    console.log(data);

    data?.data.map((landLocation) => {
      console.log(landLocation);
      let lat = landLocation.pointLocation.latitude;
      let lng = landLocation.pointLocation.longitude;
    });
  }

  useEffect(() => {
    if (isFetched) {
      console.log(data);
    }
  }, [isFetched]);

  return (
    <MapContainer
      center={[-2.071844, 120.225729]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "1000px", width: "100%" }}
      className="z-0"
    >
      <>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isFetched &&
          data?.data.map((landLocation, idx) => {
            console.log(landLocation);
            let lat = landLocation.pointLocation.latitude;
            let lng = landLocation.pointLocation.longitude;
            return (
              <Marker position={[Number(lat), Number(lng)]} key={idx}>
                <Popup>Ini kontrakan Saya dan Putu</Popup>
              </Marker>
            );
          })}
      </>
    </MapContainer>
  );
}
