import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useQuery } from "react-query";
import { getLand } from "@/services/mapService";
import { LandLocation } from "@/services/mapService";
import {
  BaseAreaLocation,
  getAreaLocation,
  BaseMapResponse,
} from "@/services/mapService";
import { LatLngExpression } from "leaflet";
import { useState, useEffect } from "react";

const param: LandLocation = {
  districtCode: "3308",
};

export default function Index() {
  const purpleOptions = { color: "purple" };
  const [coordinates, setCoordinates] = useState<number[][][] | undefined>([]);

  const { data: dataLand, isFetched: isFetchedLand } =
    useQuery<BaseMapResponse>("getLandLocation", () => getLand(param));

  const { data: dataArea, isFetched: isFetchedArea } =
    useQuery<BaseAreaLocation>("getAreaLocation", getAreaLocation);

  useEffect(() => {
    if (isFetchedLand) {
      const _coordinates = dataLand?.data.map((landLocation) => {
        const temp =
          landLocation.geometryLandLocation.geometry.geometry.coordinates?.[0];
        temp?.map((location) => location.reverse());
        return temp;
      });
      console.log(_coordinates);
      setCoordinates(_coordinates);
    }
  }, [isFetchedLand]);

  console.log(coordinates);

  // if (isFetchedLand) {
  //   console.log("Ini Land");
  //   console.log(dataLand);
  //   dataLand?.data.map((landLocation) =>
  //     console.log(
  //       landLocation.geometryLandLocation.geometry.geometry.coordinates[0]
  //     )
  //   );

  return (
    <div>
      <MapContainer
        center={[-7.503168958076711, 110.18966941496906]}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: "1000px", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isFetchedLand && (
          <Polygon
            pathOptions={purpleOptions}
            positions={coordinates as LatLngExpression[][]}
          />
        )}
        <Marker position={[-7.503168958076711, 110.18966941496906]}>
          <Popup>{dataArea?.data?.[0][1]?.bpsCode}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
