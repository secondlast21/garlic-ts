import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useQuery } from "react-query";
import { getLand } from "@/services/mapService";
import { LandLocation } from "@/services/mapService";
import { BaseAreaLocation, getAreaLocation } from "@/services/mapService";

const param: LandLocation = {
  districtCode: "3308",
};

export default function Index() {
  const { data: dataLand, isFetched: isFetchedLand } = useQuery<any>(
    "getLandLocation",
    () => getLand(param)
  );

  const { data: dataArea, isFetched: isFetchedArea } =
    useQuery<BaseAreaLocation>("getAreaLocation", getAreaLocation);

  if (isFetchedLand) {
    console.log("Ini Land");
    console.log(dataLand);
  }

  if (isFetchedArea) {
    console.log("Ini Area");
    console.log(dataArea?.data?.[0][1]?.bpsCode);
  }
  return (
    <div className="z-10">
      <MapContainer
        center={[-6.5622152, 106.7376266]}
        zoom={100}
        scrollWheelZoom={true}
        style={{ height: "1000px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-6.5622152, 106.7376266]}>
          <Popup>Ini kontrakan Saya dan Putu</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
